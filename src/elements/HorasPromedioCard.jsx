// Componentes
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FiClock } from "react-icons/fi";
import { getAttendance } from "../utils/employees";
import { useState, useEffect } from "react";

function HorasPromedioCard() {
  const [avgTime, setAvgTime] = useState("--:--");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await getAttendance();
        if (data && data.length > 0) {
          let totalMinutes = 0;
          let count = 0;
          
          data.forEach(record => {
            const date = new Date(record.hora_asistencia || record.fecha_asistencia);
            if (!isNaN(date.getTime())) {
              totalMinutes += date.getHours() * 60 + date.getMinutes();
              count++;
            }
          });
          
          if (count > 0) {
            const avgMinutes = Math.floor(totalMinutes / count);
            const hours = Math.floor(avgMinutes / 60);
            const minutes = avgMinutes % 60;
            setAvgTime(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`);
          }
        }
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
            Hora Promedio <FiClock className="text-blue-500" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <h2 className="font-bold text-3xl">
            {loading ? "..." : avgTime}
          </h2>
        </CardContent>
        <CardFooter>
          <CardDescription>
            {loading ? "Calculando..." : "Hora promedio de entrada de todos los registros"}
          </CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
}

export default HorasPromedioCard;
