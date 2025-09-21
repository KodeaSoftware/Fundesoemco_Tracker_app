import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { getAttendance } from "@/utils/employees";
import { useState, useEffect } from "react";

export function AsistenciaMensualGrafico() {


  return (
    <Card className="col-span-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Asistencia de la Semana</CardTitle>
        <p className="text-sm text-gray-600">Asistencias por día de la última semana</p>
      </CardHeader>
      <CardContent className="pl-2 pt-0">
        <div className="mb-2 text-xs text-gray-500">
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart>
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