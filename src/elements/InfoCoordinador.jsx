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
import EditCoordinator from "./EditCoordinator.jsx";


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
            <TableHead>Proyectos</TableHead>
            <TableHead>Correo</TableHead>

            <TableHead className="text-center">Acciones</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-semibold">{item.cedula}</TableCell>
              <TableCell className="font-semibold">{item.nombre}</TableCell>
              <TableCell>{item.departamento}</TableCell>
              <TableCell className="font-semibold">{item.cargo}</TableCell>
              <TableCell className="flex items-center gap-2">
                {item.proyecto.map(project => project.nombre)}
              </TableCell>
              <TableCell className="font-semibold">{item.correo}</TableCell>

              <TableCell className="text-center">
                <EditCoordinator
                  id={item.id}
                  nombre={item.nombre}
                  cedula={item.cedula}
                  departamento={item.departamento}
                  cargo={item.cargo}
                  proyecto={item.proyecto}
                  correo={item.correo}
                  password={item.password}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
