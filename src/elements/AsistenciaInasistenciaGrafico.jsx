import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
// Arreglo de main 


const data = [
  { name: "Asistencias", value: 255 },
  { name: "Inasistencias", value: 15 },
  { name: "Excusa", value: 80 },
];

const COLORS = ["#8442ff", "#ff4262", "#ffad42"];

export function AsistenciaInasistenciaGrafico() {
  return (
    <Card className="col-span-3 hidden sm:block">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Distribución de Asistencia mensual</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
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