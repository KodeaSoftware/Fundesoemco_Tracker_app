import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

import PuntualBadge from "./badges/PuntualBadge";
import NoAsistioBadge from "./badges/NoAsistioBadge";
import RetardadoBadge from "./badges/RetardadoBadge";
import { Input } from "@/components/ui/input";
import { CiSearch } from "react-icons/ci";

function RegistroAsistencia() {
  return (
    <div className="bg-white w-full p-10 border-1 rounded-lg shadow-sm flex-col h-auto overflow-hidden">
      <Input
        className="w-100 mb-10 bg-gray-50 "
        placeholder="Buscar empleado"
      />
      <Table>
        <TableCaption>Listado de asistencia</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] text-center">ID</TableHead>
            <TableHead className="w-[100px] text-center">Empleado</TableHead>
            <TableHead className="text-center">Proyecto</TableHead>
            <TableHead className="text-center">Entrada</TableHead>
            <TableHead className="text-center">Estado</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium text-center ">
              1111480601
            </TableCell>
            <TableCell className="font-medium text-center ">
              Sebastian Zapata Restrepo
            </TableCell>
            <TableCell className="text-center">
              DEMO Compunet enlace CRM
            </TableCell>
            <TableCell className="text-center"> 02 / 05 / 2025 </TableCell>
            <TableCell className="text-center">
              <PuntualBadge />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

export default RegistroAsistencia;

/*

<NoAsistioBadge />
<RetardadoBadge />


*/
