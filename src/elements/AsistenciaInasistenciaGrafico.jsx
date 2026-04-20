import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { getAttendance } from "../utils/employees";
import { useState, useEffect } from "react";

const COLORS = ["#10b981", "#f59e0b", "#3b82f6"];

export function AsistenciaInasistenciaGrafico() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const attendance = await getAttendance();
        const attendanceList = attendance || [];
        
        // Contar estados
        const stats = {
          'puntual': 0,
          'tarde': 0,
        };
        
        attendanceList.forEach(record => {
          const status = record.status || record.estado; // Handle potential naming differences
          if (stats[status] !== undefined) {
            stats[status]++;
          } else if (status) {
            stats[status] = (stats[status] || 0) + 1;
          }
        });
        
        const chartData = [
          { name: 'Puntual', value: stats['puntual'] },
          { name: 'Tarde', value: stats['tarde'] },
        ].filter(item => item.value > 0);
        
        // Si no hay datos, mostrar algo por defecto para que no se vea vacío
        if (chartData.length === 0) {
          setData([{ name: 'Sin datos', value: 1 }]);
        } else {
          setData(chartData);
        }
      } catch (error) {
        console.error("Error al cargar estadísticas del gráfico:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <Card className="col-span-3 hidden sm:block">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Distribución de Estados de Asistencia</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        {loading ? (
          <div className="flex items-center justify-center h-[250px]">
            <p className="text-gray-500 text-sm">Cargando gráfico...</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.name === 'Sin datos' ? '#e5e7eb' : COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36}/>
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}