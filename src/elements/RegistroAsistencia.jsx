// Componentes
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import PuntualBadge from "./PuntualBadge";
import RetardadoBadge from "./RetardadoBadge";
import NoAsistioBadge from "./NoAsistioBadge";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { getAttendance } from "@/utils/employees";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

function RegistroAsistencia() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // Función para renderizar el badge correcto según el estado
  const renderStatusBadge = (estado) => {
    switch (estado) {
      case "puntual":
        return <PuntualBadge />;
      case "tarde":
        return <RetardadoBadge />;
      case "ausente":
      case "no_asistio":
        return <NoAsistioBadge />;
      default:
        return <Badge className="bg-gray-500 text-white p-1">Sin estado</Badge>;
    }
  };

  // Función para formatear la fecha
  const formatDate = (dateString) => {
    if (!dateString) return "Sin fecha";
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Cargar datos de asistencia al montar el componente
  useEffect(() => {
    const loadAttendanceData = async () => {
      try {
        setLoading(true);
        const data = await getAttendance();
        const attendanceList = data || [];
        setAttendanceData(attendanceList);
        setFilteredData(attendanceList);
      } catch (error) {
        console.error('Error al cargar datos de asistencia:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAttendanceData();
  }, []);

  // Filtrar datos cuando cambie el término de búsqueda
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredData(attendanceData);
    } else {
      const filtered = attendanceData.filter(item => {
        const nombre = item.empleado?.nombre?.toLowerCase() || '';
        const cedula = String(item.cedula || '');
        const depto = item.empleado?.departamento?.toLowerCase() || '';
        return (
          nombre.includes(searchTerm.toLowerCase()) ||
          cedula.includes(searchTerm) ||
          depto.includes(searchTerm.toLowerCase())
        );
      });
      setFilteredData(filtered);
    }
  }, [searchTerm, attendanceData]);

  if (loading) {
    return (
      <div className="bg-white w-full p-10 border-1 rounded-lg shadow-sm flex-col h-auto overflow-hidden">
        <div className="flex flex-col gap-2">
          <Skeleton className="w-full h-10 mb-2" />
          <Skeleton className="w-full h-10 mb-2" />
          <Skeleton className="w-full h-10 mb-2" />
          <Skeleton className="w-full h-10 mb-2" />
          <Skeleton className="w-full h-10 mb-2" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white w-full p-10 border-1 rounded-lg shadow-sm flex-col h-auto overflow-hidden">
      <Input
        className="w-100 mb-10 bg-gray-50"
        placeholder="Buscar empleado por nombre, cédula o departamento"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Table>
        <TableCaption>Listado de asistencia - {filteredData.length} registros</TableCaption>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead>Cédula</TableHead>
            <TableHead>Empleado</TableHead>
            <TableHead>Departamento</TableHead>
            <TableHead>Cargo</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Estado</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-semibold max-w-[100px] truncate">
                  {item.cedula}
                </TableCell>
                <TableCell className="font-semibold max-w-[200px] truncate">
                  {item.empleado?.nombre || '—'}
                </TableCell>
                <TableCell className="max-w-[150px] truncate">
                  {item.empleado?.departamento || '—'}
                </TableCell>
                <TableCell className="font-semibold max-w-[150px] truncate">
                  {item.empleado?.cargo || '—'}
                </TableCell>
                <TableCell className="max-w-[120px] truncate">
                  {formatDate(item.fecha_asistencia)}
                </TableCell>
                <TableCell className="max-w-[120px] truncate">
                  {renderStatusBadge(item.estado)}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                <span className="text-gray-500 text-lg">
                  {searchTerm ? 'No se encontraron empleados con ese criterio de búsqueda' : 'No hay datos de asistencia disponibles'}
                </span>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default RegistroAsistencia;

