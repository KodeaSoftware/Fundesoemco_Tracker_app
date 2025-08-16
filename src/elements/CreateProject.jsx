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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { IoBusinessOutline } from "react-icons/io5";
import { IoAddCircleOutline } from "react-icons/io5";
import { useState } from "react";
import { createProject } from "@/utils/projects";

function CreateProject() {
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    fechaInicio: "",
    horaEntrada: "",
    horaSalida: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación básica
    if (!formData.titulo || !formData.descripcion || !formData.fechaInicio || !formData.horaEntrada || !formData.horaSalida) {
      alert("Por favor, completa todos los campos");
      return;
    }

    setIsLoading(true);

    try {
      // Crear las fechas ISO para la jornada
      const fechaInicio = new Date(formData.fechaInicio);
      const [horaEntrada, minutoEntrada] = formData.horaEntrada.split(':');
      const [horaSalida, minutoSalida] = formData.horaSalida.split(':');

      const jornadaEntrada = new Date(fechaInicio);
      jornadaEntrada.setHours(parseInt(horaEntrada), parseInt(minutoEntrada), 0, 0);

      const jornadaSalida = new Date(fechaInicio);
      jornadaSalida.setHours(parseInt(horaSalida), parseInt(minutoSalida), 0, 0);

      // Crear el objeto del proyecto en el formato requerido
      const projectData = {
        titulo: formData.titulo,
        descripcion: formData.descripcion,
        creadoEn: new Date().toISOString(),
        jornada: {
          horaEntrada: jornadaEntrada.toISOString(),
          horaSalida: jornadaSalida.toISOString()
        }
      };

      await createProject(projectData);

      // Limpiar el formulario y cerrar el diálogo
      setFormData({
        titulo: "",
        descripcion: "",
        fechaInicio: "",
        horaEntrada: "",
        horaSalida: ""
      });
      setIsOpen(false);

    } catch (error) {
      console.error("Error al crear el proyecto:", error);
      alert("Error al crear el proyecto. Por favor, intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#00BF40] hover:bg-[#00a636] cursor-pointer">
          Crear Proyecto
          <IoAddCircleOutline />
        </Button>
      </DialogTrigger>

      <DialogContent className=" max-w-[600px] sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold mt-2 flex items-center gap-2">
            Nuevo Proyecto <IoBusinessOutline />
          </DialogTitle>
          <DialogDescription>
            Completa la información para crear un nuevo proyecto.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="relative space-y-4 w-full">
          <div>
            <label
              htmlFor="project-title"
              className="block text-sm font-medium text-gray-700 break-words"
            >
              Título de Proyecto
            </label>
            <Input
              id="project-title"
              placeholder="Ingresa el título del proyecto"
              className="mt-2"
              value={formData.titulo}
              onChange={(e) => handleInputChange('titulo', e.target.value)}
              maxLength={100}
              required
            />
            <div className="text-xs text-gray-500 mt-1 text-right">
              {formData.titulo.length}/100 caracteres
            </div>
          </div>

          <div className="w-full">
            <label
              htmlFor="project-description"
              className="block text-sm font-medium text-gray-700 break-words"
            >
              Descripción del Proyecto
            </label>
            <Textarea
              id="project-description"
              placeholder="Ingresa la descripción del proyecto"
              className="mt-2 resize-none overflow-auto text-wrap break-words max-w-[550px]"
              value={formData.descripcion}
              onChange={(e) => handleInputChange('descripcion', e.target.value)}
              maxLength={500}
              rows={4}
              required
            />
            <div className="text-xs text-gray-500 mt-1 text-right">
              {formData.descripcion.length}/500 caracteres
            </div>
          </div>

          <div>
            <label
              htmlFor="start-date"
              className="block text-sm font-medium text-gray-700 break-words"
            >
              Fecha de Inicio
            </label>
            <Input
              type="date"
              id="start-date"
              className="mt-2"
              value={formData.fechaInicio}
              onChange={(e) => handleInputChange('fechaInicio', e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            <div className="w-full">
              <label
                htmlFor="hora-entrada"
                className="block text-sm font-medium text-gray-700 break-words"
              >
                Hora de Entrada
              </label>
              <Select
                value={formData.horaEntrada}
                onValueChange={(value) => handleInputChange('horaEntrada', value)}
                required
              >
                <SelectTrigger className="mt-1 h-9 w-full">
                  <SelectValue placeholder="Entrada" />
                </SelectTrigger>
                <SelectContent className="max-h-48">
                  {Array.from({ length: 24 }, (_, i) => {
                    const hour = i;
                    const ampm = hour >= 12 ? 'PM' : 'AM';
                    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
                    const timeString = `${displayHour}:00 ${ampm}`;
                    const value = `${hour.toString().padStart(2, '0')}:00`;
                    return (
                      <SelectItem key={`entrada-${hour}`} value={value} className="text-sm">
                        {timeString}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            <div className="w-full">
              <label
                htmlFor="hora-salida"
                className="block text-sm font-medium text-gray-700 break-words"
              >
                Hora de Salida
              </label>
              <Select
                value={formData.horaSalida}
                onValueChange={(value) => handleInputChange('horaSalida', value)}
                required
              >
                <SelectTrigger className="mt-1 h-9 w-full">
                  <SelectValue placeholder="Salida" />
                </SelectTrigger>
                <SelectContent className="max-h-48">
                  {Array.from({ length: 24 }, (_, i) => {
                    const hour = i;
                    const ampm = hour >= 12 ? 'PM' : 'AM';
                    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
                    const timeString = `${displayHour}:00 ${ampm}`;
                    const value = `${hour.toString().padStart(2, '0')}:00`;
                    return (
                      <SelectItem key={`salida-${hour}`} value={value} className="text-sm">
                        {timeString}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="flex justify-between mt-6">
            <Button
              type="submit"
              className="bg-[#00BF40] hover:bg-[#00a636] cursor-pointer"
              disabled={isLoading}
            >
              {isLoading ? "Creando..." : "Crear Proyecto"}
            </Button>

            <DialogClose asChild>
              <Button
                type="button"
                className="bg-white border text-black hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setFormData({
                    titulo: "",
                    descripcion: "",
                    fechaInicio: "",
                    horaEntrada: "",
                    horaSalida: ""
                  });
                }}
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
