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

function AsistenciaMensualCard() {
  return (
    <div className=" w-full ">
      <Card className=" gap-1.5">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-base font-semibold">
            Asistencia Mensual <FaRegCalendarAlt className="text-purple-500" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <h2 className="font-bold text-3xl">{`90%`}</h2>
        </CardContent>
        <CardFooter>
          <CardDescription>+5% respecto ayer</CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
}

export default AsistenciaMensualCard;
