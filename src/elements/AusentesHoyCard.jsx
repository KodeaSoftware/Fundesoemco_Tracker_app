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
import { getEmployees, getAttendance } from "../utils/employees";
import { useState, useEffect } from "react";

export default function AusentesHoyCard() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const [employees, attendance] = await Promise.all([
          getEmployees(),
          getAttendance()
        ]);
        
        const employeesList = employees || [];
        const attendanceList = attendance || [];
        
        const today = new Date().toISOString().split('T')[0];
        const presentTodayIds = new Set(
          attendanceList
            .filter(record => {
              const date = record.fecha_asistencia || record.hora_asistencia;
              return date && new Date(date).toISOString().split('T')[0] === today;
            })
            .map(record => record.employee_id)
        );
        
        const totalEmployees = employeesList.length;
        const absentCount = totalEmployees - presentTodayIds.size;
        setCount(absentCount >= 0 ? absentCount : 0);
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
            Ausentes Hoy <FiUserX className="text-red-500" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <h2 className="font-bold text-3xl">
            {loading ? "..." : count}
          </h2>
        </CardContent>
        <CardFooter>
          <CardDescription>
            {loading ? "Calculando..." : "Empleados que no han registrado entrada hoy"}
          </CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
}
