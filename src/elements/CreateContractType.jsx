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
import { FileEdit, Trash2, Edit2, Check, X, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { getContractTypes, createContractType, updateContractType, deleteContractType } from "../utils/contract.js";

function CreateContractType({ onContractCreated }) {
  const [contractTypesList, setContractTypesList] = useState([]);
  const [newContractType, setNewContractType] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const fetchContracts = async () => {
    try {
      const data = await getContractTypes();
      setContractTypesList(data || []);
    } catch (error) {
      console.error("Error al obtener tipos de contrato:", error);
    }
  };

  useEffect(() => {
    if (open) {
      fetchContracts();
    }
  }, [open]);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newContractType.trim()) return;

    try {
      setLoading(true);
      const result = await createContractType({ contract_type: newContractType.trim() });
      if (result) {
        setNewContractType("");
        await fetchContracts();
        if (onContractCreated) onContractCreated(result);
      }
    } catch (error) {
      alert("Error al crear tipo de contrato: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStartEdit = (contract) => {
    setEditingId(contract.id);
    setEditingText(contract.contract_type);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingText("");
  };

  const handleSaveEdit = async (id) => {
    if (!editingText.trim()) return;

    try {
      setLoading(true);
      await updateContractType({ id, contract_type: editingText.trim() });
      setEditingId(null);
      setEditingText("");
      await fetchContracts();
      if (onContractCreated) onContractCreated();
    } catch (error) {
      alert("Error al actualizar tipo de contrato: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!confirm(`¿Estás seguro de eliminar el tipo de contrato "${name}"?`)) return;

    try {
      setLoading(true);
      await deleteContractType(id);
      await fetchContracts();
      if (onContractCreated) onContractCreated();
    } catch (error) {
      alert("Error al eliminar tipo de contrato: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="cursor-pointer border-emerald-500 text-emerald-600 hover:bg-emerald-50 gap-2">
          Gestionar Contratos
          <FileEdit className="size-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Tipos de Contrato <FileEdit className="text-emerald-500 size-5" />
          </DialogTitle>
          <DialogDescription>
            Crea, edita o elimina tipos de contrato para empleados.
          </DialogDescription>
        </DialogHeader>

        {/* Formulario para nuevo contrato */}
        <form onSubmit={handleCreate} className="flex gap-2 my-2">
          <Input
            placeholder="Nuevo tipo de contrato..."
            value={newContractType}
            onChange={(e) => setNewContractType(e.target.value)}
            disabled={loading}
          />
          <Button
            type="submit"
            className="bg-emerald-500 hover:bg-emerald-600 text-white cursor-pointer shrink-0"
            disabled={loading || !newContractType.trim()}
          >
            <Plus className="size-4 mr-1" /> Agregar
          </Button>
        </form>

        {/* Lista de contratos existentes */}
        <div className="max-h-[250px] overflow-y-auto space-y-2 border rounded-md p-2">
          {contractTypesList.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-4">No hay tipos de contrato registrados</p>
          ) : (
            contractTypesList.map((c) => (
              <div
                key={c.id}
                className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50 border border-gray-100"
              >
                {editingId === c.id ? (
                  <div className="flex items-center gap-2 w-full">
                    <Input
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      className="h-8 text-sm"
                      autoFocus
                    />
                    <Button
                      size="sm"
                      onClick={() => handleSaveEdit(c.id)}
                      disabled={loading || !editingText.trim()}
                      className="h-8 w-8 p-0 bg-emerald-600 hover:bg-emerald-700 text-white"
                    >
                      <Check className="size-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={handleCancelEdit}
                      className="h-8 w-8 p-0 text-gray-500"
                    >
                      <X className="size-4" />
                    </Button>
                  </div>
                ) : (
                  <>
                    <span className="text-sm font-medium text-gray-800">{c.contract_type}</span>
                    <div className="flex items-center gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleStartEdit(c)}
                        className="h-8 w-8 p-0 text-gray-500 hover:text-blue-600"
                      >
                        <Edit2 className="size-3.5" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(c.id, c.contract_type)}
                        className="h-8 w-8 p-0 text-gray-500 hover:text-red-600"
                      >
                        <Trash2 className="size-3.5" />
                      </Button>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CreateContractType;
