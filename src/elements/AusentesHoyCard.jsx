// Componentes

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FiUserX } from "react-icons/fi";
import { getAttendance, calculateDailyStats } from "@/utils/employees";
import { useState, useEffect } from "react";

export default function AusentesHoyCard() {
  const [stats, setStats] = useState({ ausentes: 0, totalEmpleados: 0 });
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
        console.error('Error al cargar estadísticas de ausentes:', error);
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
              Ausentes Hoy <FiUserX className="text-red-500" />
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
            Ausentes Hoy <FiUserX className="text-red-500" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <h2 className="font-bold text-3xl">{stats.ausentes}</h2>
        </CardContent>
        <CardFooter>
          <CardDescription>
            {stats.totalEmpleados > 0 ? `${Math.round((stats.ausentes / stats.totalEmpleados) * 100)}% del total` : 'Sin datos'}
          </CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
}
