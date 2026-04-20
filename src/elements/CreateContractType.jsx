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
import { FileEdit } from "lucide-react";
import { useState } from "react";
import { createContractType } from "../utils/contract.js";

function CreateContractType({ onContractCreated }) {
  const [contractType, setContractType] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    if (!contractType.trim()) return;

    try {
      setLoading(true);
      const result = await createContractType({ contract_type: contractType });
      if (result) {
        setOpen(false);
        setContractType("");
        if (onContractCreated) onContractCreated(result);
      }
    } catch (error) {
      console.error("Error al crear tipo de contrato:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="cursor-pointer border-emerald-500 text-emerald-600 hover:bg-emerald-50">
          Gestionar Contratos
          <FileEdit className="size-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Nuevo Tipo de Contrato <FileEdit className="text-emerald-500 size-5" />
          </DialogTitle>
          <DialogDescription>
            Agrega una nueva categoría de contrato para los empleados.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="contract_type" className="text-sm font-medium">
              Nombre del Contrato
            </label>
            <Input
              id="contract_type"
              placeholder="Ej: Prestación de Servicios, Temporal, etc."
              value={contractType}
              onChange={(e) => setContractType(e.target.value)}
              required
            />
          </div>

          <DialogFooter className="pt-4">
            <DialogClose asChild>
              <Button type="button" variant="ghost">
                Cancelar
              </Button>
            </DialogClose>
            <Button 
              type="submit" 
              className="bg-emerald-500 hover:bg-emerald-600 text-white"
              disabled={loading || !contractType.trim()}
            >
              {loading ? "Guardando..." : "Guardar Tipo"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateContractType;
