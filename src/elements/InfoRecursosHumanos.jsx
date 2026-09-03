import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FaUser } from "react-icons/fa";
import EditRecursosHumanos from "./EditRecursosHumanos";

export const InfoRecursosHumanos = ({ data, onUpdated }) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex justify-center items-center h-full flex-col gap-2">
        <p className="text-gray-500">No hay usuarios RRHH registrados</p>
        <FaUser className="text-gray-500" size={20} />
      </div>
    );
  }

  return (
    <>
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead>Cédula</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Cargo</TableHead>
            <TableHead>Correo</TableHead>
            <TableHead className="text-center">Acciones</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-semibold">{item.cedula}</TableCell>
              <TableCell className="font-semibold">{item.nombre}</TableCell>
              <TableCell>{item.cargo}</TableCell>
              <TableCell className="font-semibold">{item.correo}</TableCell>
              <TableCell className="text-center">
                <EditRecursosHumanos
                  id={item.id}
                  nombre={item.nombre}
                  cedula={item.cedula}
                  cargo={item.cargo}
                  correo={item.correo}
                  onUpdated={onUpdated}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
