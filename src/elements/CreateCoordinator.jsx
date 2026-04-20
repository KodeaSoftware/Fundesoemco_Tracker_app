import { useState, useEffect } from "react";
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
import { IoBusinessOutline } from "react-icons/io5";
import { FiUserPlus } from "react-icons/fi";
import { FiEye, FiEyeOff } from "react-icons/fi";
import SelectComponent from "./SelectComponent";
import ErrorModal from "./ErrorModal";
import { createCoordinador } from "../utils/coordinator";
import { getProjects } from "../utils/projects";
import { sendPassword } from "../utils/email";
import QRCode from "qrcode";

function CreateCoordinator() {
  const [selectedProyectos, setSelectedProyectos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [proyectos, setProyectos] = useState([]);
  const [loadingProyectos, setLoadingProyectos] = useState(true);

  // Estados para el Modal de Error
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorTitle, setErrorTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const showError = (title, message) => {
    setErrorTitle(title);
    setErrorMessage(message);
    setErrorModalOpen(true);
  };

  // Cargar proyectos al montar el componente
  useEffect(() => {
    const cargarProyectos = async () => {
      try {
        setLoadingProyectos(true);
        const proyectosData = await getProjects();
        if (proyectosData) {
          const opcionesProyectos = proyectosData.map(proyecto => ({
            value: proyecto.id,
            label: proyecto.titulo
          }));
          setProyectos(opcionesProyectos);
        }
      } catch (error) {
        console.error('Error al cargar proyectos:', error);
        setProyectos([
          { value: "cvc", label: "CVC" },
          { value: "Fundesoemco", label: "Fundesoemco" },
        ]);
      } finally {
        setLoadingProyectos(false);
      }
    };

    cargarProyectos();
  }, []);

  async function handleCreateCoordinator(event) {
    event.preventDefault();
    setIsLoading(true);

    try {
      if (!event.target.cedula.value || !event.target.password.value) {
        showError("Campos Requeridos", "Por favor completa la cédula y la contraseña.");
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

      // Limpiar formulario
      event.target.reset();
      setSelectedProyectos([]);

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
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-[#00BF40] hover:bg-[#00a636] cursor-pointer">
            Crear Coordinador
            <FiUserPlus className="text-back-100" />
          </Button>
        </DialogTrigger>

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

                <label className="text-sm font-medium text-gray-700">Proyectos Asignados</label>
                <SelectComponent
                  options={proyectos}
                  value={selectedProyectos}
                  onChange={handleProyectosChange}
                  placeholder={loadingProyectos ? "Cargando..." : "Selecciona proyectos"}
                  isMulti={true}
                  disabled={loadingProyectos}
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
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
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
                <Button type="submit" disabled={isLoading} className="bg-[#00BF40] hover:bg-[#00a636] cursor-pointer">
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
      </Dialog>
    </>
  );
}

export default CreateCoordinator;
