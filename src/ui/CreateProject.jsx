import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { IoClose } from "react-icons/io5";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

function CreateProject(props) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 10 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <Card className="w-[500px]  relative">
          <button onClick={props.actionBack}>
            <IoClose className="text-xl absolute text-gray-500 hover:text-gray-800 top-3 right-3 cursor-pointer transform hover:rotate-180  transition duration-400" />
          </button>
          <CardHeader>
            <CardTitle className="text-xl font-bold absolute top-6 left-6">
              Nuevo Proyecto
            </CardTitle>
          </CardHeader>
          <CardContent>
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
                <Textarea placeholder="" className="mt-2" />
              </div>
              <div>
                <label
                  htmlFor="start-date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fecha de Inicio
                </label>
                <input
                  type="date"
                  className="border-[2px] rounded-sm p-[5px]"
                />
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="bg-[#00BF40] hover:bg-[#00a636] cursor-pointer"
            >
              Crear Proyecto
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}

export default CreateProject;
