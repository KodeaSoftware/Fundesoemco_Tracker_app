import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { getAttendance, formatAttendanceForChart } from "@/utils/employees";
import { useState, useEffect } from "react";

export function AsistenciaMensualGrafico() {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        setLoading(true);
        const attendanceData = await getAttendance();
        
        if (attendanceData) {
          const formattedData = formatAttendanceForChart(attendanceData);
          setChartData(formattedData);
        } else {
          // Datos de fallback si no hay datos reales
          setChartData([
            { dia: "Lunes", puntual: 0 },
            { dia: "Martes", puntual: 0 },
            { dia: "Miércoles", puntual: 0 },
            { dia: "Jueves", puntual: 0 },
            { dia: "Viernes", puntual: 0 },
            { dia: "Sábado", puntual: 0 },
            { dia: "Domingo", puntual: 0 },
           
          ]);
        }
      } catch (error) {
        console.error('Error al cargar datos de asistencia:', error);
        setChartData([
        


          { dia: "Lunes", puntual: 0 },
          { dia: "Martes", puntual: 0 },
          { dia: "Miércoles", puntual: 0 },
          { dia: "Jueves", puntual: 0 },
          { dia: "Viernes", puntual: 0 },
          { dia: "Sábado", puntual: 0 },
          { dia: "Domingo", puntual: 0 },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendanceData();
  }, []);
  

  return (
    <Card className="col-span-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Asistencia de la Semana</CardTitle>
        <p className="text-sm text-gray-600">Asistencias puntuales por día de la semana</p>
      </CardHeader>
      <CardContent className="pl-2 pt-0">
        <div className="mb-2 text-xs text-gray-500">
        </div>
        {loading ? (
          <div className="flex items-center justify-center h-[250px]">
            <p className="text-gray-500">Cargando datos...</p>
          </div>
        ) : (
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData} className="">
            <CartesianGrid strokeDasharray="5 5" />
            <XAxis
              dataKey="dia"
              tick={{ fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis
              label={{ value: 'Cantidad', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip
              labelFormatter={(label) => `Día: ${label}`}
              formatter={(value) => [value, 'Puntual']}
            />
            <Bar
              dataKey="puntual"
              fill="#10b981"
              radius={[4, 4, 0, 0]}
              name="Puntual"
            />
          </BarChart>
        </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
} 