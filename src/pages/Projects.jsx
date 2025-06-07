// React

// Layout
import PageLayout from "../layout/PageLayout";

// Componentes
import Header from "../elements/Header";
import ProjectCard from "../elements/ProjectCard";

// Componentes shadcn
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TbArchive } from "react-icons/tb";

// motion animaciones
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "motion/react";
import { pageAnimationsParams } from "../motion/pageAnimation";
import CreateProject from "../elements/CreateProject";

function Projects() {
  return (
    <>
      <Header pageTitle="Lista de proyectos" />
      <PageLayout>
        <motion.div {...pageAnimationsParams}>
          <div className="flex sm:flex-row  mb-10  pl-9 pr-9 pt-7 sm:pt-0 justify-center gap-3 items-center sm:justify-between sm:w-full w-[100%]   ">
            <div className="flex gap-4 sm:flex-row flex-col w-full  ">
              <Input
                className="sm:w-[50%]  bg-white "
                placeholder="Buscar proyecto"
              />
              <CreateProject />
              <Button className="bg-white  border hover:bg-gray-200 cursor-pointer text-black sm:w-auto">
                Proyectos archivados
                <TbArchive />
              </Button>
            </div>
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

          <AnimatePresence exitBeforeEnter></AnimatePresence>
        </motion.div>
      </PageLayout>
    </>
  );
}

export default Projects;
