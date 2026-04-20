import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { FiXCircle } from "react-icons/fi";

/**
 * Modal de error genérico.
 * @param {boolean} isOpen - Estado de apertura del modal.
 * @param {function} onClose - Función para cerrar el modal.
 * @param {string} title - Título del error.
 * @param {string} message - Mensaje detallado del error.
 */
function ErrorModal({ isOpen, onClose, title, message }) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="border-red-100">
        <AlertDialogHeader className="flex flex-col items-center justify-center">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
            <FiXCircle className="text-red-500 text-4xl" />
          </div>
          <AlertDialogTitle className="text-xl font-bold text-gray-900 text-center">
            {title || "Ha ocurrido un error"}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-gray-600 mt-2">
            {message || "No se pudo completar la operación. Por favor, inténtalo de nuevo."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="sm:justify-center mt-4">
          <AlertDialogAction
            className="bg-red-500 text-white hover:bg-red-600 cursor-pointer border-0 px-8"
            onClick={onClose}
          >
            Entendido
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ErrorModal;
