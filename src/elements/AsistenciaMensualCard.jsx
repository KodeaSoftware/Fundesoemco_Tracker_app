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
import { getAttendance, calculateDailyStats } from "@/utils/employees";
import { useState, useEffect } from "react";

function AsistenciaMensualCard() {
  const [stats, setStats] = useState({ porcentajeAsistencia: 0, presentes: 0, totalEmpleados: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        const attendanceData = await getAttendance();
        if (attendanceData) {
          const dailyStats = calculateDailyStats(attendanceData);
          setStats(dailyStats);
        }
      } catch (error) {
        console.error('Error al cargar estadísticas de asistencia mensual:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="w-full">
        <Card className="gap-1.5">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-base font-semibold">
              Asistencia Mensual <FaRegCalendarAlt className="text-purple-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-12 bg-gray-200 animate-pulse rounded"></div>
          </CardContent>
          <CardFooter>
            <div className="h-4 bg-gray-200 animate-pulse rounded w-24"></div>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Card className="gap-1.5">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-base font-semibold">
            Asistencia Mensual <FaRegCalendarAlt className="text-purple-500" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <h2 className="font-bold text-3xl">{`${stats.porcentajeAsistencia}%`}</h2>
        </CardContent>
        <CardFooter>
          <CardDescription>
            {stats.totalEmpleados > 0 ? `${stats.presentes}/${stats.totalEmpleados} empleados` : 'Sin datos disponibles'}
          </CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
}

export default AsistenciaMensualCard;
