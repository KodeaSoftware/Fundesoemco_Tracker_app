import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { getAttendance } from "@/utils/employees";
import { useState, useEffect } from "react";

const COLORS = ["#8442ff", "#ff4262", "#ffad42"];

export function AsistenciaInasistenciaGrafico() {

  return (
    <Card className="col-span-3 hidden sm:block">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Distribución de Asistencia Diaria</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
} 