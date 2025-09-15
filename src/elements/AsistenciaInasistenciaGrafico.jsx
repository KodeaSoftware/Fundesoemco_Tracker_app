import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { getAttendance, getChartData } from "@/utils/employees";
import { useState, useEffect } from "react";

const COLORS = ["#8442ff", "#ff4262", "#ffad42"];

export function AsistenciaInasistenciaGrafico() {
  const [chartData, setChartData] = useState({
    pieChartData: [
      { name: "Asistencias", value: 0 },
      { name: "Inasistencias", value: 0 },
      { name: "Excusa", value: 0 }
    ]
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadChartData = async () => {
      try {
        setLoading(true);
        const attendanceData = await getAttendance();
        if (attendanceData) {
          const data = getChartData(attendanceData);
          setChartData(data);
        }
      } catch (error) {
        console.error('Error al cargar datos del gráfico:', error);
      } finally {
        setLoading(false);
      }
    };

    loadChartData();
  }, []);

  if (loading) {
    return (
      <Card className="col-span-3 hidden sm:block">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Distribución de Asistencia Diaria</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="h-[250px] bg-gray-200 animate-pulse rounded"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="col-span-3 hidden sm:block">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Distribución de Asistencia Diaria</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={chartData.pieChartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {chartData.pieChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
} 