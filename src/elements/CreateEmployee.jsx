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
import { LuFolderPlus, LuFileText } from "react-icons/lu";
import SelectComponent from "./SelectComponent";
import ErrorModal from "./ErrorModal";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import QRCode from 'qrcode';
import {
  createEmployee,
} from "../utils/employees.js"
import { getProjects } from "../utils/projects.js";
import { getContractTypes } from "../utils/contract.js";

function CreateEmployee() {
  const navigate = useNavigate();
  const [selectedContrato, setSelectedContrato] = useState("");
  const [selectedProyectos, setSelectedProyectos] = useState("");
  const [proyectos, setProyectos] = useState([]);
  const [tiposContrato, setTiposContrato] = useState([]);
  const [loading, setLoading] = useState(true);
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

  // Cargar proyectos y tipos de contrato desde la API
  const cargarDatos = async () => {
    try {
      setLoading(true);

      const proyectosData = await getProjects();
      if (proyectosData && Array.isArray(proyectosData) && proyectosData.length > 0) {
        const opcionesProyectos = proyectosData.map(proyecto => ({
          value: String(proyecto.id),
          label: proyecto.titulo
        }));
        setProyectos(opcionesProyectos);
      } else {
        setProyectos([]);
      }

      const tiposContratoData = await getContractTypes();
      if (tiposContratoData && Array.isArray(tiposContratoData)) {
        const opcionesContrato = tiposContratoData.map(tipo => ({
          value: String(tipo.id),
          label: tipo.contract_type
        }));
        setTiposContrato(opcionesContrato);
      } else {
        setTiposContrato([]);
      }
    } catch (error) {
      console.error('Error al cargar datos:', error);
      setProyectos([]);
      setTiposContrato([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, [dialogOpen]);

  async function handleCreateEmployee(event) {
    event.preventDefault();

    if (!selectedContrato) {
      showError("Datos Incompletos", "Por favor selecciona un tipo de contrato.");
      return;
    }

    if (!selectedProyectos) {
      showError("Datos Incompletos", "Por favor selecciona al menos un proyecto.");
      return;
    }

    const newEmployee = {
      cedula: parseInt(event.target.cedula.value) || 0,
      nombre: event.target.nombre.value,
      departamento: event.target.departamento.value,
      telefono: parseInt(event.target.telefono.value) || 0,
      cargo: event.target.cargo.value,
      contrato: parseInt(selectedContrato),
      proyecto: [selectedProyectos],
    }

    if (newEmployee.cedula === 0) {
      showError("Datos Inválidos", "La cédula debe ser un número válido.");
      return;
    }

    try {
      const creado = await createEmployee(newEmployee);
      console.log('Empleado creado:', creado);

      const cedula = newEmployee.cedula;
      const url = await QRCode.toDataURL(String(cedula));
      const link = document.createElement('a');
      link.href = url;
      link.download = `QR_${newEmployee.nombre}_${cedula}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDialogOpen(false);
      window.location.reload();
    } catch (error) {
      console.error('Error al crear empleado:', error);
      showError("Error de Creación", error.message || "No se pudo crear el empleado. Verifica los datos e intenta de nuevo.");
    }
  }

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
            Crear Empleado
            <FiUserPlus className="text-back-100" />
          </Button>
        </DialogTrigger>

        {loading ? (
          <DialogContent className="sm:max-w-[400px] p-6 text-center">
            <p className="text-gray-600">Verificando proyectos y contratos...</p>
          </DialogContent>
        ) : proyectos.length === 0 ? (
          <DialogContent className="sm:max-w-[480px]">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold flex items-center gap-2 text-amber-600">
                <LuFolderPlus className="size-6 text-amber-600" />
                Primero debes crear un proyecto
              </DialogTitle>
              <DialogDescription className="text-sm pt-2 text-gray-700">
                Actualmente no hay proyectos registrados en el sistema. Todo empleado debe pertenecer a al menos un proyecto.
              </DialogDescription>
            </DialogHeader>

            <div className="p-3 bg-amber-50 border border-amber-200 rounded-md text-sm text-amber-800 my-2">
              Por favor crea primero un proyecto antes de registrar empleados.
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
        ) : tiposContrato.length === 0 ? (
          <DialogContent className="sm:max-w-[480px]">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold flex items-center gap-2 text-amber-600">
                <LuFileText className="size-6 text-amber-600" />
                Primero debes registrar un tipo de contrato
              </DialogTitle>
              <DialogDescription className="text-sm pt-2 text-gray-700">
                Actualmente no hay tipos de contrato registrados en el sistema. Todo empleado debe tener un tipo de contrato asignado.
              </DialogDescription>
            </DialogHeader>

            <div className="p-3 bg-amber-50 border border-amber-200 rounded-md text-sm text-amber-800 my-2">
              Por favor crea al menos un tipo de contrato usando el botón <strong>"Gestionar Contratos"</strong> antes de registrar empleados.
            </div>

            <DialogFooter className="flex sm:flex-row flex-col gap-2 mt-4">
              <DialogClose asChild>
                <Button variant="outline" className="cursor-pointer">
                  Cerrar
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        ) : (
          <DialogContent className="sm:max-w-[700px] flex flex-col items-center">
            <DialogHeader className="w-full pl-4">
              <DialogTitle className="text-xl font-bold mt-2 flex items-center gap-2">
                Nuevo Empleado <FiUserPlus className="text-back-100" />
              </DialogTitle>
              <DialogDescription>
                Completa la información para crear un nuevo empleado.
              </DialogDescription>
            </DialogHeader>
            <form className="flex flex-col h-full w-full" onSubmit={handleCreateEmployee}>
              <div className="flex flex-wrap gap-4">
                <div className="w-[300px] flex flex-col gap-2">
                  <label htmlFor="nombre" className="text-sm font-medium text-gray-700">
                    Nombre y Apellido
                  </label>
                  <Input id="nombre" placeholder="Ej: Juan Pérez" name="nombre" required />

                  <label htmlFor="cedula" className="text-sm font-medium text-gray-700">
                    ID / Cédula
                  </label>
                  <Input id="cedula" placeholder="Ej: 1234567890" name="cedula" type="number" required />

                  <label htmlFor="telefono" className="text-sm font-medium text-gray-700">
                    Teléfono
                  </label>
                  <Input id="telefono" placeholder="Ej: 3001234567" name="telefono" type="number" required />
                </div>

                <div className="w-[300px] flex flex-col gap-2">
                  <label htmlFor="departamento" className="text-sm font-medium text-gray-700">
                    Departamento
                  </label>
                  <Input id="departamento" placeholder="Ej: Recursos Humanos" name="departamento" required />

                  <label htmlFor="cargo" className="text-sm font-medium text-gray-700">
                    Cargo
                  </label>
                  <Input id="cargo" placeholder="Ej: Analista" name="cargo" required />

                  <label htmlFor="contrato" className="text-sm font-medium text-gray-700">
                    Contrato
                  </label>
                  <SelectComponent
                    label="Tipo de contrato"
                    options={tiposContrato}
                    onChange={(value) => setSelectedContrato(value)}
                    value={selectedContrato}
                    placeholder="Selecciona contrato"
                  />
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-4">
                <div>
                  <label htmlFor="proyecto" className="text-sm font-medium text-gray-700">
                    Proyectos Asignados *
                  </label>
                  <SelectComponent
                    label="Proyecto"
                    options={proyectos}
                    onChange={(value) => setSelectedProyectos(value)}
                    value={selectedProyectos}
                    placeholder="Selecciona proyecto"
                  />
                </div>

                <DialogFooter className="flex justify-between mt-4">
                  <Button type="submit" className="bg-[#00BF40] hover:bg-[#00a636] cursor-pointer text-white">
                    Guardar Empleado
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

export default CreateEmployee;
