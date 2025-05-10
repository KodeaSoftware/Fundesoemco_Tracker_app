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

import DropDownButton from "./DropDownButton";
import { SlOptions } from "react-icons/sl";
import DeleteEmployeeModal from "./DeleteEmployeeModal";

export const InfoEmployeTable = ({ data }) => {
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
              <TableCell className="text-center"></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
