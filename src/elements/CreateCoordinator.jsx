import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FiUserPlus } from "react-icons/fi";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { LuFolderPlus } from "react-icons/lu";
import SelectComponent from "./SelectComponent";
import ErrorModal from "./ErrorModal";
import { createCoordinador } from "../utils/coordinator";
import { getProjects } from "../utils/projects";
import { sendPassword } from "../utils/email";
import QRCode from "qrcode";

function CreateCoordinator() {
  const navigate = useNavigate();
  const [selectedProyectos, setSelectedProyectos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [proyectos, setProyectos] = useState([]);
  const [loadingProyectos, setLoadingProyectos] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Estados para el Modal de Error
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorTitle, setErrorTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const showError = (title, message) => {
    setErrorTitle(title);
    setErrorMessage(message);
    setErrorModalOpen(true);
  };

  const cargarProyectos = async () => {
    try {
      setLoadingProyectos(true);
      const proyectosData = await getProjects();
      if (proyectosData && Array.isArray(proyectosData) && proyectosData.length > 0) {
        const opcionesProyectos = proyectosData.map(proyecto => ({
          value: proyecto.id,
          label: proyecto.titulo
        }));
        setProyectos(opcionesProyectos);
      } else {
        setProyectos([]);
      }
    } catch (error) {
      console.error('Error al cargar proyectos:', error);
      setProyectos([]);
    } finally {
      setLoadingProyectos(false);
    }
  };

  // Cargar proyectos al montar o abrir el componente
  useEffect(() => {
    cargarProyectos();
  }, [dialogOpen]);

  async function handleCreateCoordinator(event) {
    event.preventDefault();
    setIsLoading(true);

    try {
      if (!event.target.cedula.value || !event.target.password.value) {
        showError("Campos Requeridos", "Por favor completa la cédula y la contraseña.");
        setIsLoading(false);
        return;
      }

      if (!selectedProyectos || (Array.isArray(selectedProyectos) && selectedProyectos.length === 0)) {
        showError("Proyecto Requerido", "Debes seleccionar al menos un proyecto para el coordinador.");
        setIsLoading(false);
        return;
      }

      const newCoordinator = {
        cedula: parseInt(event.target.cedula.value) || 0,
        nombre: event.target.nombre.value,
        departamento: event.target.departamento.value,
        cargo: event.target.cargo.value,
        correo: event.target.email.value,
        proyecto: Array.isArray(selectedProyectos) ? selectedProyectos : [selectedProyectos],
        password: event.target.password.value
      };

      if (newCoordinator.cedula === 0) {
        showError("Cédula Inválida", "La cédula debe ser un número válido.");
        setIsLoading(false);
        return;
      }

      const creado = await createCoordinador(newCoordinator);
      console.log('Coordinador creado:', creado);

      // Enviar correo con las credenciales
      try {
        const emailData = {
          correo: event.target.email.value,
          nombre: event.target.nombre.value,
          password: event.target.password.value
        };
        await sendPassword(emailData);
      } catch (emailError) {
        console.error('Error al enviar el correo:', emailError);
      }

      // Generar QR
      const url = await QRCode.toDataURL(event.target.cedula.value);
      const link = document.createElement('a');
      link.href = url;
      link.download = `QR_${event.target.nombre.value}_${event.target.cedula.value}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Limpiar formulario y cerrar dialog
      event.target.reset();
      setSelectedProyectos([]);
      setDialogOpen(false);
      window.location.reload();

    } catch (error) {
      console.error('Error al crear coordinador:', error);
      showError("Error de Creación", error.message || "No se pudo crear el coordinador. Inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  }

  const handleProyectosChange = (proyectos) => {
    setSelectedProyectos(proyectos);
  };

  return (
    <>
      <ErrorModal 
        isOpen={errorModalOpen} 
        onClose={() => setErrorModalOpen(false)} 
        title={errorTitle} 
        message={errorMessage} 
      />
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button className="bg-[#00BF40] hover:bg-[#00a636] cursor-pointer">
            Crear Coordinador
            <FiUserPlus className="text-back-100" />
          </Button>
        </DialogTrigger>

        {loadingProyectos ? (
          <DialogContent className="sm:max-w-[400px] p-6 text-center">
            <p className="text-gray-600">Verificando proyectos...</p>
          </DialogContent>
        ) : proyectos.length === 0 ? (
          <DialogContent className="sm:max-w-[480px]">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold flex items-center gap-2 text-amber-600">
                <LuFolderPlus className="size-6 text-amber-600" />
                Primero debes crear un proyecto
              </DialogTitle>
              <DialogDescription className="text-sm pt-2 text-gray-700">
                Actualmente no hay proyectos registrados en el sistema. Todo coordinador debe estar asignado a al menos un proyecto.
              </DialogDescription>
            </DialogHeader>

            <div className="p-3 bg-amber-50 border border-amber-200 rounded-md text-sm text-amber-800 my-2">
              Por favor crea primero un proyecto para poder continuar con el registro de coordinadores.
            </div>

            <DialogFooter className="flex sm:flex-row flex-col gap-2 mt-4">
              <DialogClose asChild>
                <Button variant="outline" className="cursor-pointer">
                  Cerrar
                </Button>
              </DialogClose>
              <Button
                onClick={() => {
                  setDialogOpen(false);
                  navigate("/project-list");
                }}
                className="bg-[#00BF40] hover:bg-[#00a636] text-white cursor-pointer"
              >
                Ir a Crear Proyecto
              </Button>
            </DialogFooter>
          </DialogContent>
        ) : (
          <DialogContent className="sm:max-w-[700px] flex flex-col items-center p-4 sm:p-6">
            <DialogHeader className="w-full pl-0 sm:pl-4">
              <DialogTitle className="text-lg sm:text-xl font-bold mt-2 flex items-center gap-2">
                Nuevo Coordinador <FiUserPlus className="text-back-100" />
              </DialogTitle>
              <DialogDescription className="text-start text-sm sm:text-base">
                Al crear un nuevo coordinador, también se creará una cuenta de inicio de sesión al sistema para el coordinador.
              </DialogDescription>
            </DialogHeader>
            <form className="flex flex-col h-full w-full" onSubmit={handleCreateCoordinator}>
              <div className="flex flex-col sm:flex-row flex-wrap gap-4 w-full">
                <div className="w-full sm:w-[300px] flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">Nombre y Apellido</label>
                  <Input name="nombre" placeholder="Ej: Juan Pérez" required />

                  <label className="text-sm font-medium text-gray-700">ID / Cédula</label>
                  <Input name="cedula" placeholder="Ej: 1234567890" type="number" required />

                  <label className="text-sm font-medium text-gray-700">Proyectos Asignados *</label>
                  <SelectComponent
                    options={proyectos}
                    value={selectedProyectos}
                    onChange={handleProyectosChange}
                    placeholder="Selecciona proyectos"
                    isMulti={true}
                  />
                </div>

                <div className="w-full sm:w-[300px] flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">Departamento</label>
                  <Input name="departamento" placeholder="Ej: Recursos Humanos" required />

                  <label className="text-sm font-medium text-gray-700">Cargo</label>
                  <Input name="cargo" placeholder="Ej: Coordinador" required />

                  <label className="text-sm font-medium text-gray-700">Correo Electrónico</label>
                  <Input name="email" type="email" placeholder="Ej: juan.perez@empresa.com" required />

                  <label className="text-sm font-medium text-gray-700">Contraseña</label>
                  <div className="relative">
                    <Input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Contraseña segura"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                    >
                      {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-4 w-full">
                <div className="w-full p-3 bg-blue-50 border border-blue-200 rounded-md">
                  <p className="text-sm text-blue-700">📧 Se enviará un correo con la contraseña al coordinador.</p>
                </div>

                <DialogFooter className="flex flex-col sm:flex-row justify-between gap-2 w-full">
                  <Button type="submit" disabled={isLoading} className="bg-[#00BF40] hover:bg-[#00a636] cursor-pointer text-white">
                    {isLoading ? "Guardando..." : "Guardar Coordinador"}
                  </Button>
                  <DialogClose asChild>
                    <Button type="button" className="bg-white border text-black hover:bg-gray-100 cursor-pointer">
                      Cancelar
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </div>
            </form>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
}

export default CreateCoordinator;
