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
import CreateEmployee from "./CreateEmployee";
import EditEmployee from "./EditEmployee";

export const InfoCoordinador = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>No hay data</p>;
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
              <TableCell className="font-semibold">{item.name}</TableCell>
              <TableCell>{item.department}</TableCell>
              <TableCell className="font-semibold">{item.cargo}</TableCell>
              <TableCell>{item.phone}</TableCell>
              <TableCell className="flex items-center gap-2">
                {item.proyectos.join(", ")}
              </TableCell>

              <TableCell className="text-center">
                <EditEmployee
                  name={item.name}
                  id={item.id}
                  department={item.department}
                  rol={item.cargo}
                  phone={item.phone}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
