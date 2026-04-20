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
import { FiEdit } from "react-icons/fi";
import { useState, useEffect } from "react";
import { updateProject } from "@/utils/projects";

function EditProject({ project, onProjectUpdated }) {
    const [formData, setFormData] = useState({
        titulo: "",
        descripcion: "",
        fechaInicio: new Date().toISOString().split('T')[0],
        horaEntrada: "08:00", 
        horaSalida: "17:00",
        estado: "activo"
    }); 
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    
    useEffect(() => {
        if (project && isOpen) {
            let fechaInicio = new Date().toISOString().split('T')[0];
            let horaEntrada = "08:00";
            let horaSalida = "17:00"

            if (project.jornada?.horaEntrada && project.jornada?.horaSalida) {
                try {
                    const entrada = new Date(project.jornada.horaEntrada);
                    const salida = new Date(project.jornada.horaSalida);
                    
                    if (!isNaN(entrada.getTime())) {
                        const h = entrada.getHours().toString().padStart(2, '0');
                        const m = entrada.getMinutes().toString().padStart(2, '0');
                        horaEntrada = `${h}:${m}`;
                        fechaInicio = entrada.toISOString().split('T')[0];
                    }
                    
                    if (!isNaN(salida.getTime())) {
                        const h = salida.getHours().toString().padStart(2, '0');
                        const m = salida.getMinutes().toString().padStart(2, '0');
                        horaSalida = `${h}:${m}`;
                    }
                } catch (error) {
                }
            }

            setFormData({
                titulo: project.titulo || "",
                descripcion: project.descripcion || "",
                fechaInicio: fechaInicio,
                horaEntrada: horaEntrada,
                horaSalida: horaSalida,
                estado: project.estado || "activo"
            });
        }
    }, [project, isOpen]);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.titulo || !formData.descripcion || !formData.fechaInicio || !formData.horaEntrada || !formData.horaSalida) {
            alert("Por favor, completa todos los campos");
            return;
        }

        setIsLoading(true);

        try {
            const fechaInicio = new Date(formData.fechaInicio);
            const [horaEntrada, minutoEntrada] = formData.horaEntrada.split(':');
            const [horaSalida, minutoSalida] = formData.horaSalida.split(':');

            const jornadaEntrada = new Date(fechaInicio);
            jornadaEntrada.setHours(parseInt(horaEntrada), parseInt(minutoEntrada), 0, 0);

            const jornadaSalida = new Date(fechaInicio);
            jornadaSalida.setHours(parseInt(horaSalida), parseInt(minutoSalida), 0, 0);

            const projectData = {
                id: project.id,
                titulo: formData.titulo,
                descripcion: formData.descripcion,
                creadoEn: project.creadoEn ? new Date(project.creadoEn).toISOString() : new Date().toISOString(),
                jornada: {
                    horaEntrada: jornadaEntrada.toISOString(),
                    horaSalida: jornadaSalida.toISOString()
                },
                estado: formData.estado
            };
            await updateProject(projectData);
            setIsOpen(false);
            onProjectUpdated?.(projectData);
            console.log(projectData)
        } catch (error) {
           
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="bg-white hover:bg-gray-300 text-black cursor-pointer">
                    <FiEdit className="mr-2" />
                    Editar Proyecto
                </Button>
            </DialogTrigger>

            <DialogContent className="w-[400px] max-w-[600px] sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold mt-2 flex items-center gap-2">
                        Editar Proyecto <IoBusinessOutline />
                    </DialogTitle>
                    <DialogDescription>
                        Modifica la información del proyecto. Todos los campos son obligatorios.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="relative space-y-4 w-full max-w-[350px]">
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
                            className="mt-2 resize-none max-w-[550px] max-h-[90px] overflow-auto text-wrap break-words"
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
                                    <SelectValue placeholder="Seleccionar hora de entrada" />
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
                                    <SelectValue placeholder="Seleccionar hora de salida" />
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

                    <div className="pt-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Estado del Proyecto
                        </label>
                        <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg border">
                            <span className={`text-sm font-semibold ${formData.estado === 'activo' ? 'text-green-600' : 'text-amber-600'}`}>
                                {formData.estado === 'activo' ? 'Proyecto Activo' : 'Proyecto Archivado'}
                            </span>
                            <Button 
                                type="button" 
                                variant="outline" 
                                size="sm" 
                                className={`ml-auto ${formData.estado === 'activo' ? 'hover:bg-amber-50 hover:text-amber-700' : 'hover:bg-green-50 hover:text-green-700'}`}
                                onClick={() => handleInputChange('estado', formData.estado === 'activo' ? 'archivado' : 'activo')}
                            >
                                {formData.estado === 'activo' ? 'Archivar' : 'Desarchivar'}
                            </Button>
                        </div>
                        <p className="text-[11px] text-gray-500 mt-1">
                            {formData.estado === 'activo' 
                                ? 'Los proyectos archivados se ocultan de la lista principal.' 
                                : 'Restaurar el proyecto para que sea visible en el panel principal.'}
                        </p>
                    </div>

                    <DialogFooter className="flex justify-between mt-6">
                        <Button
                            type="submit"
                            className="bg-[#00BF40] hover:bg-[#00a636] cursor-pointer"
                            disabled={isLoading}
                        >
                            {isLoading ? "Actualizando..." : "Actualizar Proyecto"}
                        </Button>

                        <DialogClose asChild>
                            <Button
                                type="button"
                                className="bg-white border text-black hover:bg-gray-100 cursor-pointer"
                                onClick={() => {
                                    setFormData({
                                        titulo: "",
                                        descripcion: "",
                                        fechaInicio: new Date().toISOString().split('T')[0],
                                        horaEntrada: "08:00",
                                        horaSalida: "17:00"
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

export default EditProject;
