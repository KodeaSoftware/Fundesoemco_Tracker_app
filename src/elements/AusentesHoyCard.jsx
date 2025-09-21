// Componentes

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FiUserX } from "react-icons/fi";
import { useState, useEffect } from "react";

export default function AusentesHoyCard() {


  return (
    <div className="w-full">
      <Card className="gap-1.5">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-base font-semibold">
            Ausentes Hoy <FiUserX className="text-red-500" />
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
