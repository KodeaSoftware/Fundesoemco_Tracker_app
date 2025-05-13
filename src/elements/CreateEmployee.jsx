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
import SelectComponent from "./SelectComponent";
import { useState } from "react";

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
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#00BF40] hover:bg-[#00a636] cursor-pointer">
          Crear Empleado
          <FiUserPlus className="text-back-100" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[700px] flex flex-col items-center  ">
        <DialogHeader className="w-full pl-4    ">
          <DialogTitle className="text-xl font-bold mt-2 flex items-center gap-2">
            Nuevo Empleado <FiUserPlus className="text-back-100" />
          </DialogTitle>
          <DialogDescription>
            Completa la información para crear un nuevo empleado.
          </DialogDescription>
        </DialogHeader>
        <form className="flex flex-col h-full">
          {/* Inputs agrupados */}
          <div className="flex flex-wrap gap-4">
            <div className="w-[300px] flex flex-col gap-2">
              <label
                htmlFor="employee-fullname"
                className="text-sm font-medium text-gray-700"
              >
                Nombre y Apellido
              </label>
              <Input id="employee-fullname" placeholder="Ej: Juan Pérez" />

              <label
                htmlFor="employee-id"
                className="text-sm font-medium text-gray-700"
              >
                ID / Cédula
              </label>
              <Input id="employee-id" placeholder="Ej: 1234567890" />

              <label
                htmlFor="employee-phone"
                className="text-sm font-medium text-gray-700"
              >
                Teléfono
              </label>
              <Input id="employee-phone" placeholder="Ej: 3001234567" />
            </div>

            <div className="w-[300px] flex flex-col gap-2">
              <label
                htmlFor="employee-department"
                className="text-sm font-medium text-gray-700"
              >
                Departamento
              </label>
              <Input
                id="employee-department"
                placeholder="Ej: Recursos Humanos"
              />

              <label
                htmlFor="employee-role"
                className="text-sm font-medium text-gray-700"
              >
                Cargo
              </label>
              <Input id="employee-role" placeholder="Ej: Analista" />

              <label
                htmlFor="employee-role"
                className="text-sm font-medium text-gray-700"
              >
                Contrato
              </label>
              <SelectComponent
                label="Tipo de contrato"
                options={OPCIONES_CONTRATO}
                onChange={(value) => setSelectedContrato(value)}
              />
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
                label="Tipo de contrato"
                options={OPCIONES_PROYECTOS}
                onChange={(value) => setSelectedProyectos(value)}
              />
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
