import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { mes: "Ene", asistencias: 65 },
  { mes: "Feb", asistencias: 59 },
  { mes: "Mar", asistencias: 80 },
  { mes: "Abr", asistencias: 81 },
  { mes: "May", asistencias: 56 },
  { mes: "Jun", asistencias: 55 },
];

export function AsistenciaMensualGrafico() {
  return (
    <Card className="col-span-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Asistencia Mensual</CardTitle>
      </CardHeader>
      <CardContent className="pl-2 pt-0">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="asistencias" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
} 