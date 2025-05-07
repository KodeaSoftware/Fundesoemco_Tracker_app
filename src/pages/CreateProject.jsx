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
import { DatePicker } from "../ui/DatePicker";
import { Textarea } from "@/components/ui/textarea";

function CreateProject(props) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 backdrop-blur-xs">
      <Card className="w-[700px]">
        <button onClick={props.actionBack}>adas</button>
        <CardHeader>
          <CardTitle>Nuevo Proyecto</CardTitle>
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
              <Input id="project-title" placeholder="" />
            </div>
            <div>
              <label
                htmlFor="project-description"
                className="block text-sm font-medium text-gray-700"
              >
                Descripción del Proyecto
              </label>
              <Textarea placeholder="" />
            </div>
            <div>
              <label
                htmlFor="start-date"
                className="block text-sm font-medium text-gray-700"
              >
                Fecha de Inicio
              </label>
              <DatePicker />
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button type="submit">Crear Proyecto</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default CreateProject;
