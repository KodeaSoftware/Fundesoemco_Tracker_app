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
import SelectComponent from "./SelectComponent";
import { useState } from "react";
import QRCode from 'qrcode';
import {
  createEmployee,
} from "../utils/employees.js"



function CreateEmployee() {
  const [selectedContrato, setSelectedContrato] = useState("");
  const [selectedProyectos, setSelectedProyectos] = useState();

  const OPCIONES_CONTRATO = [
    { value: "contratista", label: "Contratista" },
    { value: "directo", label: "Directo" },
  ];

  const OPCIONES_PROYECTOS = [
    { value: "cvc", label: "CVC" },
    { value: "Fundesoemco", label: "Fundesoemco" },
  ];

  async function handleCreateEmployee(event) {
    event.preventDefault();
    const newEmployee = {
      cedula: event.target.cedula.value,
      nombre: event.target.nombre.value,
      departamento: event.target.departamento.value,
      telefono: event.target.telefono.value,
      cargo: event.target.cargo.value,
      contrato: event.target.contrato.value,
      proyecto: [event.target.proyecto.value],
    }

    const creado = await createEmployee(newEmployee);
    console.log('Empleado creado:', creado);


    const url = await QRCode.toDataURL(cedula);
    // Crear y descargar el QR
    const link = document.createElement('a');
    link.href = url;
    link.download = `QR_${event.target.nombre.value}_${cedula}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#00BF40] hover:bg-[#00a636] cursor-pointer">
          Crear Empleado
          <FiUserPlus className="text-back-100" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[700px]  flex flex-col items-center  ">
        <DialogHeader className="w-full pl-4    ">
          <DialogTitle className="text-xl font-bold mt-2 flex items-center gap-2">
            Nuevo Empleado <FiUserPlus className="text-back-100" />
          </DialogTitle>
          <DialogDescription>
            Completa la información para crear un nuevo empleado.
          </DialogDescription>
        </DialogHeader>
        <form className="flex flex-col h-full" onSubmit={handleCreateEmployee}>
          <div className="flex flex-wrap gap-4">
            <div className="w-[300px] flex flex-col gap-2">
              <label
                htmlFor="employee-fullname"
                className="text-sm font-medium text-gray-700"
              >
                Nombre y Apellido
              </label>
              <Input id="nombre" placeholder="Ej: Juan Pérez" name="nombre" />

              <label
                htmlFor="employee-id"
                className="text-sm font-medium text-gray-700"
              >
                ID / Cédula
              </label>
              <Input id="cedula" placeholder="Ej: 1234567890" name="cedula" />

              <label
                htmlFor="employee-phone"
                className="text-sm font-medium text-gray-700"
              >
                Teléfono
              </label>
              <Input id="telefono" placeholder="Ej: 3001234567" name="telefono" />
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
                placeholder="Ej: Recursos Humanos"
                name="departamento"
              />

              <label
                htmlFor="employee-role"
                className="text-sm font-medium text-gray-700"
              >
                Cargo
              </label>
              <Input id="cargo" placeholder="Ej: Analista" name="cargo" />

              <label
                htmlFor="employee-contrato"
                className="text-sm font-medium text-gray-700"
              >
                Contrato
              </label>
              <SelectComponent
                label="Tipo de contrato"
                options={OPCIONES_CONTRATO}
                onChange={(value) => setSelectedContrato(value)}
              />
              <input type="hidden" name="contrato" value={selectedContrato} />
            </div>
          </div>

          {/* Selector y botones abajo */}
          <div className="mt-6 flex flex-col gap-4">
            <div>
              <label
                htmlFor="employee-projects"
                className="text-sm font-medium text-gray-700"
              >
                Proyectos Asignados
              </label>
              <SelectComponent
                label="Proyecto"
                options={OPCIONES_PROYECTOS}
                onChange={(value) => setSelectedProyectos(value)}
              />
              <input type="hidden" name="proyecto" value={selectedProyectos} />
            </div>

            <DialogFooter className="flex justify-between">
              <Button
                type="submit"
                className="bg-[#00BF40] hover:bg-[#00a636] cursor-pointer"

              >
                Guardar Empleado
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

export default CreateEmployee;
