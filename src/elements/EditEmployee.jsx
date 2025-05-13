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
import { TbUserEdit } from "react-icons/tb";
import { GoAlert } from "react-icons/go";
import DeleteEmployeeModal from "./DeleteEmployeeModal";
import { useState } from "react";

function EditEmployee(props) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="bg-white border-0 text-black  hover:bg-white  cursor-pointer "
          onClick={() => setOpen(true)}
        >
          <TbUserEdit />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[700px] flex flex-col items-center  ">
        <DialogHeader className="w-full pl-4"></DialogHeader>
        <form className="flex flex-col h-full">
          <div className="flex flex-wrap gap-4">
            <div className="w-[300px] flex flex-col gap-2">
              <label
                htmlFor="employee-fullname"
                className="text-sm font-medium text-gray-700"
              >
                Nombre y Apellido
              </label>
              <Input id="employee-fullname" defaultValue={props.name} />

              <label
                htmlFor="employee-id"
                className="text-sm font-medium text-gray-700"
              >
                ID / Cédula
              </label>
              <Input id="employee-id" defaultValue={props.id} />

              <label
                htmlFor="employee-phone"
                className="text-sm font-medium text-gray-700"
              >
                Teléfono
              </label>
              <Input id="employee-phone" defaultValue={props.phone} />
            </div>

            <div className="w-[300px] flex flex-col gap-2">
              <label
                htmlFor="employee-department"
                className="text-sm font-medium text-gray-700"
              >
                Departamento
              </label>
              <Input id="employee-department" defaultValue={props.department} />

              <label
                htmlFor="employee-role"
                className="text-sm font-medium text-gray-700"
              >
                Cargo
              </label>
              <Input id="employee-role" defaultValue={props.rol} />
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-4">
            <div>
              <label
                htmlFor="employee-projects"
                className="text-sm font-medium text-gray-700"
              >
                Proyectos Asignados
              </label>
              <SelectComponent onCloseParent={() => setOpen(false)} />
            </div>

            <div className="">
              <p className="flex items-center gap-1 text-sm text-red-500 font-semibold mb-1">
                Zona de riesgo <GoAlert />
              </p>

              <DeleteEmployeeModal />
            </div>
            <DialogFooter className="flex justify-between">
              <Button
                type="submit"
                className="bg-[#00BF40]   hover:bg-[#00a636]  cursor-pointer"
              >
                Guardar Cambios
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
