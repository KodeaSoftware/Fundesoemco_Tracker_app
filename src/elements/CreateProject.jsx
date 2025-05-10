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
import { IoAddCircleOutline } from "react-icons/io5";

function CreateProject() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#00BF40] hover:bg-[#00a636] cursor-pointer">
          Crear Proyecto
          <IoAddCircleOutline />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold mt-2 flex items-center gap-2">
            Nuevo Proyecto <IoBusinessOutline />
          </DialogTitle>
          <DialogDescription>
            Completa la información para crear un nuevo proyecto.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4">
          <div>
            <label
              htmlFor="project-title"
              className="block text-sm font-medium text-gray-700"
            >
              Título de Proyecto
            </label>
            <Input id="project-title" placeholder="" className="mt-2" />
          </div>

          <div>
            <label
              htmlFor="project-description"
              className="block text-sm font-medium text-gray-700"
            >
              Descripción del Proyecto
            </label>
            <Textarea
              id="project-description"
              placeholder=""
              className="mt-2"
            />
          </div>

          <div>
            <label
              htmlFor="start-date"
              className="block text-sm font-medium text-gray-700"
            >
              Fecha de Inicio
            </label>
            <Input type="date" id="start-date" className="mt-2" />
          </div>

          <DialogFooter className="flex justify-between mt-6">
            <Button
              type="submit"
              className="bg-[#00BF40] hover:bg-[#00a636] cursor-pointer"
            >
              Crear Proyecto
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
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateProject;
