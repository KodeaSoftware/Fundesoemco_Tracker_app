import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { getAttendance, getChartData } from "@/utils/employees";
import { useState, useEffect } from "react";

export function AsistenciaMensualGrafico() {
  const [chartData, setChartData] = useState({
    barChartData: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadChartData = async () => {
      try {
        setLoading(true);
        console.log('Cargando datos de asistencia...');
        const attendanceData = await getAttendance();
        console.log('Datos obtenidos:', attendanceData);

        if (attendanceData) {
          const data = getChartData(attendanceData);
          console.log('Datos procesados para el gráfico:', data);
          setChartData(data);
        } else {
          console.log('No se obtuvieron datos de asistencia');
          // Establecer datos por defecto
          const dias = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
          const defaultData = {
            pieChartData: [
              { name: "Asistencias", value: 0 },
              { name: "Inasistencias", value: 0 },
              { name: "Excusa", value: 0 }
            ],
            barChartData: dias.map(dia => ({
              mes: dia,
              asistencias: 0
            }))
          };
          setChartData(defaultData);
        }
      } catch (error) {
        console.error('Error al cargar datos del gráfico de barras:', error);
        // Establecer datos por defecto en caso de error
        const dias = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
        const defaultData = {
          pieChartData: [
            { name: "Asistencias", value: 0 },
            { name: "Inasistencias", value: 0 },
            { name: "Excusa", value: 0 }
          ],
          barChartData: dias.map(dia => ({
            mes: dia,
            asistencias: 0
          }))
        };
        setChartData(defaultData);
      } finally {
        setLoading(false);
      }
    };

    loadChartData();
  }, []);

  if (loading) {
    return (
      <Card className="col-span-4">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Asistencia de la Semana</CardTitle>
          <p className="text-sm text-gray-600">Asistencias por día de la última semana</p>
        </CardHeader>
        <CardContent className="pl-2 pt-0">
          <div className="h-[250px] bg-gray-200 animate-pulse rounded"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="col-span-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Asistencia de la Semana</CardTitle>
        <p className="text-sm text-gray-600">Asistencias por día de la última semana</p>
      </CardHeader>
      <CardContent className="pl-2 pt-0">
        <div className="mb-2 text-xs text-gray-500">
          Debug: {chartData.barChartData?.length || 0} días cargados
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData.barChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="mes"
              tick={{ fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis
              label={{ value: 'Asistencias', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip
              labelFormatter={(label) => `Día: ${label}`}
              formatter={(value) => [value, 'Asistencias']}
            />
            <Bar
              dataKey="asistencias"
              fill="#10b981"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
} 