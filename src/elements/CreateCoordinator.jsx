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
import { Textarea } from "@/components/ui/textarea";
import { IoBusinessOutline } from "react-icons/io5";
import { FiUserPlus } from "react-icons/fi";
import { FiEye, FiEyeOff } from "react-icons/fi";
import SelectComponent from "./SelectComponent";
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

  // Cargar proyectos al montar el componente
  useEffect(() => {
    const cargarProyectos = async () => {
      try {
        setLoadingProyectos(true);
        const proyectosData = await getProjects();
        if (proyectosData) {
          // Transformar los datos para el SelectComponent
          const opcionesProyectos = proyectosData.map(proyecto => ({
            value: proyecto.id,
            label: proyecto.titulo
          }));
          setProyectos(opcionesProyectos);
        }
      } catch (error) {
        console.error('Error al cargar proyectos:', error);
        // Fallback a opciones por defecto si hay error
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


      const newCoordinator = {
        cedula: event.target.cedula.value,
        nombre: event.target.nombre.value,
        departamento: event.target.departamento.value,
        cargo: event.target.cargo.value,
        correo: event.target.email.value,
        proyecto: [selectedProyectos],
        password: event.target.password.value
      };

      const creado = await createCoordinador(newCoordinator);
      console.log('Coordinador creado:', creado);

      // Enviar correo con las credenciales
      try {
        const emailData = {
          correo: event.target.email.value,
          nombre: event.target.nombre.value,
          password: event.target.password.value
        };
        console.log(emailData)
        await sendPassword(emailData);
        console.log('Correo enviado exitosamente');
      } catch (emailError) {

        console.error('Error al enviar el correo:', emailError);
      }


      // Generar QR con la cédula
      const url = await QRCode.toDataURL(event.target.cedula.value);
      // Crear y descargar el QR
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
      alert('Error al crear el coordinador. Por favor, inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  }

  const handleProyectosChange = (proyectos) => {
    setSelectedProyectos(proyectos);
  };

  return (
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
            Al crear un nuevo coordinador, también se creará una cuenta de inicio de sesión al sistema para el coordinador, por favor completa correctamente la información.
          </DialogDescription>
        </DialogHeader>
        <form className="flex flex-col h-full w-full" onSubmit={handleCreateCoordinator} >

          <div className="flex flex-col sm:flex-row flex-wrap gap-4 w-full">
            <div className="w-full sm:w-[300px] flex flex-col gap-2">
              <label
                htmlFor="coordinator-fullname"
                className="text-sm font-medium text-gray-700"
              >
                Nombre y Apellido
              </label>
              <Input
                id="coordinator-fullname"
                placeholder="Ej: Juan Pérez"
                name="nombre"
                required
              />

              <label
                htmlFor="coordinator-id"
                className="text-sm font-medium text-gray-700"
              >
                ID / Cédula
              </label>
              <Input
                id="coordinator-id"
                name="cedula"
                placeholder="Ej: 1234567890"
                type="number"
                className="appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-moz-appearance]:textfield"
                required
              />

              <label
                htmlFor="coordinator-projects"
                className="text-sm font-medium text-gray-700 "
              >
                Proyectos Asignados
              </label>
              <SelectComponent
                options={proyectos}
                value={selectedProyectos}
                onChange={handleProyectosChange}
                placeholder={loadingProyectos ? "Cargando proyectos..." : "Selecciona los proyectos"}
                isMulti={true}
                disabled={loadingProyectos}
              />
            </div>

            <div className="w-full sm:w-[300px] flex flex-col gap-2">
              <label
                htmlFor="coordinator-department"
                className="text-sm font-medium text-gray-700"
              >
                Departamento
              </label>
              <Input
                id="coordinator-department"
                name="departamento"
                placeholder="Ej: Recursos Humanos"
                required
              />

              <label
                htmlFor="coordinator-role"
                className="text-sm font-medium text-gray-700"
              >
                Cargo
              </label>
              <Input
                id="coordinator-role"
                name="cargo"
                placeholder="Ej: Coordinador"
                required
              />

              <label
                htmlFor="coordinator-email"
                className="text-sm font-medium text-gray-700"
              >
                Correo Electrónico
              </label>
              <Input
                id="coordinator-email"
                name="email"
                type="email"
                placeholder="Ej: juan.perez@empresa.com"
                required
              />

              <label
                htmlFor="coordinator-password"
                className="text-sm font-medium text-gray-700"
              >
                Contraseña
              </label>
              <div className="relative">
                <Input
                  id="coordinator-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Ingrese una contraseña segura"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-4 w-full">
            <div className="w-full p-3 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-sm text-blue-700">
                📧 Mandaremos un correo al coordinador con la contraseña
              </p>
            </div>

            <DialogFooter className="flex flex-col sm:flex-row justify-between gap-2 w-full">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto bg-[#00BF40] hover:bg-[#00a636] cursor-pointer disabled:opacity-50"
              >
                {isLoading ? "Guardando..." : "Guardar Coordinador"}
              </Button>
              <DialogClose asChild>
                <Button
                  type="button"
                  className="w-full sm:w-auto bg-white border text-black hover:bg-gray-100 cursor-pointer"
                >
                  Cancelar
                </Button>
              </DialogClose>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateCoordinator;
