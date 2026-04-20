// Componentes

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaRegCalendarAlt } from "react-icons/fa";
import { getAttendance } from "../utils/employees";
import { useState, useEffect } from "react";

function AsistenciaMensualCard() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await getAttendance();
        const attendanceData = data || [];
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();
        
        const monthCount = attendanceData.filter(record => {
          const date = new Date(record.fecha_asistencia || record.hora_asistencia);
          return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
        }).length;
        
        setCount(monthCount);
      } catch (error) {
        console.error("Error al cargar estadísticas:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="w-full">
      <Card className="gap-1.5">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-base font-semibold">
            Asistencia Mensual <FaRegCalendarAlt className="text-purple-500" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <h2 className="font-bold text-3xl">
            {loading ? "..." : count}
          </h2>
        </CardContent>
        <CardFooter>
          <CardDescription>
            {loading ? "Calculando..." : "Total de asistencias registradas este mes"}
          </CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
}

export default AsistenciaMensualCard;
