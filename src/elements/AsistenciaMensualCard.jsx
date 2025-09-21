// Componentes

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaRegCalendarAlt } from "react-icons/fa";
import { useState, useEffect } from "react";

function AsistenciaMensualCard() {

  return (
    <div className="w-full">
      <Card className="gap-1.5">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-base font-semibold">
            Asistencia Mensual <FaRegCalendarAlt className="text-purple-500" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <h2 className="font-bold text-3xl"></h2>
        </CardContent>
        <CardFooter>
          <CardDescription>
          </CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
}

export default AsistenciaMensualCard;
