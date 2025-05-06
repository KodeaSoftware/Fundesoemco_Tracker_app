import Header from "../ui/Header";
import ProjectCard from "../ui/projects/ProjectCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IoAddCircleOutline } from "react-icons/io5";
import NuevoProyectoModal from "../ui/modales/NuevoProyectoModal";

function Projects() {
  return (
    <div className="bg-gray-50 w-screen min-h-screen overflow-hidden ">
      <Header pageTitle="Lista de proyectos" />
      <div className="flex flex-row  mb-10 mt-20 pl-9 pr-9 gap-3 items-center w-full ">
        <Input className="w-100 bg-gray-50 " placeholder="Buscar proyecto" />

        <Button className="bg-[#00BF40] hover:bg-[#00a636] cursor-pointer">
          Crear proyecto
          <IoAddCircleOutline />
        </Button>
      </div>

      <div className="pt-0 px-9 py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-10W">
        <ProjectCard
          title="Conexión 2023"
          desc="Senderos ecológicos, torre avistamiento pance"
          createAt="2024-01-01"
        />
        <ProjectCard
          title="CVC 025 2024"
          desc="Bosque urbano el saman, cerrito"
          createAt="2024-01-01"
        />

        <ProjectCard
          title="Compensaciónes FSF"
          desc="Proyecto Dabeiba - Check"
          createAt="2024-01-01"
        />
        <ProjectCard
          title="Conexión 2023"
          desc="Senderos ecológicos, torre avistamiento pance"
          createAt="2024-01-01"
        />
        <ProjectCard
          title="CVC 025 2024"
          desc="Bosque urbano el saman, cerrito"
          createAt="2024-01-01"
        />
      </div>
      <div className="w-full h-full flex items-center p-10 pt-0"></div>
    </div>
  );
}

export default Projects;
