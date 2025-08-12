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
import { FaQrcode } from "react-icons/fa";
import SelectComponent from "./SelectComponent";
import { TbUserEdit } from "react-icons/tb";
import { GoAlert } from "react-icons/go";
import DeleteEmployeeModal from "./DeleteEmployeeModal";
import { useState } from "react";
import QRCode from "qrcode";
import { updateEmployee } from "../utils/employees.js";

function EditEmployee(props) {
  const [open, setOpen] = useState(false);
  const [selectedContrato, setSelectedContrato] = useState(
    props.contrato || ""
  );
  const [selectedProyectos, setSelectedProyectos] = useState(
    props.proyecto || ""
  );

  const OPCIONES_CONTRATO = [
    { value: "contratista", label: "Contratista" },
    { value: "directo", label: "Directo" },
  ];

  const OPCIONES_PROYECTOS = [
    { value: "cvc", label: "CVC" },
    { value: "Fundesoemco", label: "Fundesoemco" },
  ];

  // Función para crear el QR
  async function handleCreateQR(event) {
    event.preventDefault();
    const cedula = document.getElementById("cedula").value;
    const url = await QRCode.toDataURL(cedula);

    // Crear y descargar el QR
    const name = document.getElementById("fullname").value;
    const link = document.createElement("a");
    link.href = url;
    link.download = `QR_${name}_${cedula}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Función para actualizar empleado
  async function handleUpdateEmployee(event) {
    event.preventDefault();
    const employeeId = props.id;
    const updates = {
      id: employeeId,
      cedula: event.target.cedula.value,
      nombre: event.target.fullname.value,
      departamento: event.target.departamento.value,
      cargo: event.target.cargo.value,
      telefono: event.target.telefono.value,
      contrato: selectedContrato,
    };


    try {
      const actualizado = await updateEmployee(updates);
      console.log("Empleado actualizado:", actualizado);
      setOpen(false);
      window.location.reload();
    } catch (error) {
      console.error("Error al actualizar empleado:", error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="bg-white border-0 text-black hover:bg-white cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <TbUserEdit />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[700px] flex flex-col items-center">
        <DialogHeader className="w-full pl-4">
          <DialogTitle className="text-xl font-bold mt-2 flex items-center gap-2">
            Editar Empleado <TbUserEdit className="text-back-100" />
          </DialogTitle>
        </DialogHeader>
        <form className="flex flex-col h-full" onSubmit={handleUpdateEmployee}>
          <div className="flex flex-wrap gap-4">
            <div className="w-[300px] flex flex-col gap-2">
              <label
                htmlFor="employee-fullname"
                className="text-sm font-medium text-gray-700"
              >
                Nombre y Apellido
              </label>
              <Input
                id="fullname"
                defaultValue={props.nombre}
                name="fullname"
              />

              <label
                htmlFor="employee-id"
                className="text-sm font-medium text-gray-700"
              >
                ID / Cédula
              </label>
              <Input id="cedula" defaultValue={props.cedula} name="cedula" disabled className="cursor-not-allowed" />

              <label
                htmlFor="employee-phone"
                className="text-sm font-medium text-gray-700"              >
                Teléfono
              </label>
              <Input
                id="telefono"
                defaultValue={props.telefono}
                name="telefono"
              />
            </div>

            <div className="w-[300px] flex flex-col gap-2">
              <label
                htmlFor="employee-department"
                className="text-sm font-medium text-gray-700"
              >
                Departamento
              </label>
              <Input
                id="departamento"
                defaultValue={props.departamento}
                name="departamento"
              />

              <label
                htmlFor="employee-role"
                className="text-sm font-medium text-gray-700"
              >
                Cargo
              </label>
              <Input id="cargo" defaultValue={props.cargo} name="cargo" />

              <label
                htmlFor="employee-contrato"
                className="text-sm font-medium text-gray-700"
              >
                Contrato
              </label>
              <SelectComponent
                label="Tipo de contrato"
                options={OPCIONES_CONTRATO}
                defaultValue={props.contrato}
                onChange={(value) => setSelectedContrato(value)}
              />
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-4">

            <div className="">
              <p className="flex items-center gap-1 text-sm text-red-500 font-semibold mb-1">
                Zona de riesgo <GoAlert />
              </p>
              <DeleteEmployeeModal id={props.id} />
            </div>

            <DialogFooter className="flex justify-between">
              <Button
                type="submit"
                className="bg-[#00BF40] hover:bg-[#00a636] cursor-pointer"
              >
                Guardar Cambios
              </Button>
              <Button
                onClick={handleCreateQR}
                className="bg-white border-1 text-black hover:bg-gray-100 cursor-pointer"
              >
                Generar QR
                <FaQrcode />
              </Button>

              <DialogClose asChild>
                <Button
                  type="button"
                  className="bg-white border text-black hover:bg-gray-100 cursor-pointer"
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

export default EditEmployee;
