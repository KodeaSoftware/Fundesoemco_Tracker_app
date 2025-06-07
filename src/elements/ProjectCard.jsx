import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IoBusinessOutline } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function ProjectCard(props) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/project/${props.title}`, {
      state: {
        projectName: props.title,
        projectDesc: props.desc,
        createdAt: props.createAt
      }
    });
  };

  return (
    <div 
      className="w-full hover:scale-102 transition-all duration-300 ease-in-out cursor-pointer"
      onClick={handleClick}
    >
      <Card className="gap-2">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-base font-semibold">
            {props.title}
            <IoBusinessOutline className="text-emerald-700" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>{props.desc}</CardDescription>
        </CardContent>
        <CardFooter className="pt-4">
          <CardDescription className="text-sm text-gray-500 flex items-center gap-2 w-full">
            Creado en {props.createAt}
            <FaRegCalendarAlt className="text-gray-500" />
          </CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
}

export default ProjectCard;
