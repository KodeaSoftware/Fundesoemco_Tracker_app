// Componentes
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FiClock } from "react-icons/fi";

function HorasPromedioCard() {
  return (
    <div className=" w-full ">
      <Card className=" gap-1.5">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-base font-semibold">
            Horas Promedio <FiClock className="text-blue-500" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <h2 className="font-bold text-3xl">{`10h`}</h2>
        </CardContent>
        <CardFooter>
          <CardDescription>+5% respecto ayer</CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
}

export default HorasPromedioCard;
