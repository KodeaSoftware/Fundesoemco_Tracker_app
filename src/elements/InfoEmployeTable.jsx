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
import { Skeleton } from "@/components/ui/skeleton";
import CreateEmployee from "./CreateEmployee";
import EditEmployee from "./EditEmployee";
import { FaUser } from "react-icons/fa";

export const InfoEmployeTable = ({ data }) => {
  if (data === undefined) {
    return (
      <div className="flex justify-center items-center h-full flex-row gap-2 relative">
        <span>..</span>
        <Skeleton className="w-full h-10 mb-2 " />
        <Skeleton className="w-full h-10 mb-2" />
        <Skeleton className="w-ful h-10 mb-2" />
        <Skeleton className="w-full h-10 mb-2" />
        <Skeleton className="w-full h-10 mb-2" />
      </div>
    );
  }
  if (!data || data.length === 0) {
    return (
      <div className="flex justify-center items-center h-full flex-row gap-2 relative">
        <span>Cargando..</span>
        <Skeleton className="w-full h-10 mb-2 " />
        <Skeleton className="w-full h-10 mb-2" />
        <Skeleton className="w-ful h-10 mb-2" />
        <Skeleton className="w-full h-10 mb-2" />
        <Skeleton className="w-full h-10 mb-2" />
      </div>
    );
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
            <TableHead>Contrato</TableHead>
            <TableHead>Proyecto</TableHead>
            <TableHead className="text-center">Acciones</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-semibold max-w-[100px] truncate">
                {item.cedula}
              </TableCell>
              <TableCell className="font-semibold max-w-[200px] truncate">
                {item.nombre}
              </TableCell>
              <TableCell className="max-w-[150px] truncate">
                {item.departamento}
              </TableCell>
              <TableCell className="font-semibold max-w-[150px] truncate">
                {item.cargo}
              </TableCell>
              <TableCell className="max-w-[120px] truncate">
                {item.telefono}
              </TableCell>
              <TableCell className="max-w-[120px] truncate">
                {item.contrato}
              </TableCell>
              <TableCell className="max-w-[120px] flex gap-2 truncate">
                {item.proyecto.map(proyecto => <p> {proyecto} </p>)}
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
                  id={item.id}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
