import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateRecursosHumanos, deleteRecursosHumanos } from "../utils/recursosHumanos";
import { FiEdit, FiTrash2 } from "react-icons/fi";

function EditRecursosHumanos({ id, nombre, cedula, cargo, correo, onUpdated }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    id,
    cedula,
    nombre,
    cargo,
    correo,
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const dataToSend = { ...formData };
      if (!dataToSend.password) delete dataToSend.password;
      await updateRecursosHumanos(dataToSend);
      setOpen(false);
      if (onUpdated) onUpdated();
      else window.location.reload();
    } catch (error) {
      alert("Error al actualizar RRHH: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm(`¿Estás seguro de eliminar a ${nombre}?`)) return;
    try {
      setLoading(true);
      await deleteRecursosHumanos(id);
      setOpen(false);
      if (onUpdated) onUpdated();
      else window.location.reload();
    } catch (error) {
      alert("Error al eliminar RRHH: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="cursor-pointer">
          <FiEdit className="mr-1" /> Editar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Editar Usuario RRHH</DialogTitle>
          <DialogDescription>
            Modifica los datos del usuario de Recursos Humanos
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
          <div>
            <label className="text-sm font-medium">Cédula</label>
            <Input name="cedula" value={formData.cedula} onChange={handleChange} required />
          </div>
          <div>
            <label className="text-sm font-medium">Nombre completo</label>
            <Input name="nombre" value={formData.nombre} onChange={handleChange} required />
          </div>
          <div>
            <label className="text-sm font-medium">Cargo</label>
            <Input name="cargo" value={formData.cargo} onChange={handleChange} required />
          </div>
          <div>
            <label className="text-sm font-medium">Correo electrónico</label>
            <Input name="correo" type="email" value={formData.correo} onChange={handleChange} required />
          </div>
          <div>
            <label className="text-sm font-medium">Nueva contraseña (dejar vacío para no cambiar)</label>
            <Input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="••••••••" />
          </div>
          <div className="flex gap-3 mt-2">
            <Button type="submit" disabled={loading} className="flex-1 bg-[#00BF40] hover:bg-[#00a636] cursor-pointer">
              {loading ? "Guardando..." : "Guardar Cambios"}
            </Button>
            <Button type="button" variant="destructive" disabled={loading} onClick={handleDelete} className="cursor-pointer">
              <FiTrash2 className="mr-1" /> Eliminar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditRecursosHumanos;
