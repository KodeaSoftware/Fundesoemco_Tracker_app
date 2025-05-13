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

function DeleteEmployeeModal({ onCloseParent }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-white text-red-500 border-1 border-red-400 hover:bg-red-500 hover:text-white cursor-pointer">
          Eliminar Empleado
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. El empleado será eliminado
            permanentemente.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-white text-red-500 border-1 border-red-400 hover:bg-red-500 hover:text-white cursor-pointer"
            onClick={() => {
              // Eliminar Empleado
              onCloseParent(); // Cierra el modal padre
            }}
          >
            Confirmar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteEmployeeModal;
