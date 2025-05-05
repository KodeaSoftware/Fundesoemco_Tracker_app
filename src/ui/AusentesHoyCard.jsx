import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FiUserX } from "react-icons/fi";

export default function AusentesHoyCard() {
  return (
    <div className=" w-[300px] ">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-lg font-semibold">
            Ausentes Hoy <FiUserX className="text-red-500" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <h2 className="font-bold text-4xl">5</h2>
        </CardContent>
        <CardFooter>
          <CardDescription>-5% respecto ayer</CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
}
