import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EditEmployee from "./EditEmployee";
import { FaUser } from "react-icons/fa";


export const InfoCoordinador = ({ data }) => {
  if (!data || data.length === 0) {
    return <div className="flex justify-center items-center h-full flex-col gap-2">
      <p className="text-gray-500">No hay coordinador registrado</p>
      <FaUser className="text-gray-500" size={20} />
    </div>
  }

  return (
    <>
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Departamento</TableHead>
            <TableHead>Cargo</TableHead>
            <TableHead>Teléfono</TableHead>
            <TableHead>Proyectos</TableHead>

            <TableHead className="text-center">Acciones</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-semibold">{item.id}</TableCell>
              <TableCell className="font-semibold">{item.nombre}</TableCell>
              <TableCell>{item.departamento}</TableCell>
              <TableCell className="font-semibold">{item.cargo}</TableCell>
              <TableCell>{item.telefono}</TableCell>
              <TableCell className="flex items-center gap-2">
                {item.proyecto}
              </TableCell>

              <TableCell className="text-center">
                <EditEmployee
                  nombre={item.nombre}
                  cedula={item.cedula}
                  telefono={item.telefono}
                  departamento={item.departamento}
                  cargo={item.cargo}
                  contrato={item.contrato}
                  proyecto={item.proyecto}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
