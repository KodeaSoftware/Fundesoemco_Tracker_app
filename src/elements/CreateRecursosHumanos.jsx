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
import { createRecursosHumanos } from "../utils/recursosHumanos";
import { sendPassword } from "../utils/email";

function CreateRecursosHumanos({ onCreated }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    cedula: "",
    nombre: "",
    cargo: "",
    correo: "",
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
      const dataToSend = {
        ...formData,
        cedula: parseInt(formData.cedula),
      };
      await createRecursosHumanos(dataToSend);

      // Enviar contraseña por email
      try {
        await sendPassword({
          correo: formData.correo,
          nombre: formData.nombre,
          password: formData.password,
        });
      } catch (emailErr) {
        console.error("Error al enviar email:", emailErr);
      }

      setFormData({ cedula: "", nombre: "", cargo: "", correo: "", password: "" });
      setOpen(false);
      if (onCreated) onCreated();
    } catch (error) {
      alert("Error al crear usuario RRHH: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#00BF40] hover:bg-[#00a636] cursor-pointer">
          + Nuevo RRHH
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Crear Usuario RRHH</DialogTitle>
          <DialogDescription>
            Completa los datos del nuevo usuario de Recursos Humanos
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
          <div>
            <label className="text-sm font-medium">Cédula</label>
            <Input name="cedula" value={formData.cedula} onChange={handleChange} placeholder="Número de cédula" required />
          </div>
          <div>
            <label className="text-sm font-medium">Nombre completo</label>
            <Input name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre completo" required />
          </div>
          <div>
            <label className="text-sm font-medium">Cargo</label>
            <Input name="cargo" value={formData.cargo} onChange={handleChange} placeholder="Cargo" required />
          </div>
          <div>
            <label className="text-sm font-medium">Correo electrónico</label>
            <Input name="correo" type="email" value={formData.correo} onChange={handleChange} placeholder="correo@fundesoemco.com" required />
          </div>
          <div>
            <label className="text-sm font-medium">Contraseña</label>
            <Input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Contraseña" required />
          </div>
          <Button type="submit" disabled={loading} className="bg-[#00BF40] hover:bg-[#00a636] cursor-pointer mt-2">
            {loading ? "Creando..." : "Crear Usuario RRHH"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateRecursosHumanos;
