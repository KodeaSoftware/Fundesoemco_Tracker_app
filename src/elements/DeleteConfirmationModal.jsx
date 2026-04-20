import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

/**
 * Modal de confirmación genérico para eliminación de recursos.
 * @param {string} triggerText - Texto del botón que abre el modal.
 * @param {string} title - Título del modal.
 * @param {string} description - Descripción del modal.
 * @param {string} id - ID del recurso a eliminar.
 * @param {function} onConfirm - Función a ejecutar al confirmar (recibe el id).
 */
function DeleteConfirmationModal({ triggerText, title, description, id, onConfirm }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-white text-red-500 border-1 border-red-400 hover:bg-red-500 hover:text-white cursor-pointer px-4 py-2 rounded-md transition-colors font-medium">
          {triggerText || "Eliminar"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title || "¿Estás seguro?"}</AlertDialogTitle>
          <AlertDialogDescription>
            {description || "Esta acción no se puede deshacer. El registro será eliminado permanentemente."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 text-white hover:bg-red-600 cursor-pointer border-0"
            onClick={() => onConfirm && onConfirm(id)}
          >
            Confirmar Eliminación
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteConfirmationModal;
