// Componentes
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FiUserCheck } from "react-icons/fi";
import { getAttendance } from "../utils/employees";
import { useState, useEffect } from "react";

export default function PresentesHoyCard() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await getAttendance();
        const attendanceData = data || [];
        const today = new Date().toISOString().split('T')[0];
        const todayCount = attendanceData.filter(record => {
          const recordDate = new Date(record.fecha_asistencia || record.hora_asistencia).toISOString().split('T')[0];
          return recordDate === today;
        }).length;
        setCount(todayCount);
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
            Presentes Hoy <FiUserCheck className="text-green-500" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <h2 className="font-bold text-3xl">
            {loading ? "..." : count}
          </h2>
        </CardContent>
        <CardFooter>
          <CardDescription>
            {loading ? "Calculando..." : "Empleados que han registrado su entrada hoy"}
          </CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
}
