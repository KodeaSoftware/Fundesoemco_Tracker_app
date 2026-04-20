// React
import { useState, useEffect, useMemo } from "react";

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

// Utils
import { getProjects } from "../utils/projects";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showArchived, setShowArchived] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsData = await getProjects();
        setProjects(projectsData || []);
      } catch (error) {
        console.error("Error al cargar proyectos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);


  // Función para formatear la fecha en español
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };


  const filteredProjects = useMemo(
    () => {
      const baseFilter = projects.filter(project => {
        const matchesSearch = project.titulo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.descripcion?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          formatDate(project.creadoEn)?.toLowerCase().includes(searchTerm.toLowerCase());

        const projectStatus = project.estado || 'activo';
        const statusMatch = showArchived ? projectStatus === 'archivado' : projectStatus === 'activo';

        return matchesSearch && statusMatch;
      });
      return baseFilter;
    }, [projects, searchTerm, showArchived]
  );


  return (
    <>
      <Header pageTitle="Lista de proyectos" />
      <PageLayout>
        <motion.div {...pageAnimationsParams}>
          <div className="flex sm:flex-row  mb-10  pl-9 pr-9 pt-7 sm:pt-0 justify-center gap-3 items-center sm:justify-between sm:w-full w-[100%]   ">
            <div className="flex gap-4 sm:flex-row flex-col w-full  ">
              <Input
                className="sm:w-[50%]  bg-white "
                placeholder="Buscar proyecto por titulo, mes, descripción"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <CreateProject />
              <Button 
                onClick={() => setShowArchived(!showArchived)}
                className={`${showArchived ? 'bg-amber-100 text-amber-700 border-amber-200' : 'bg-gray-200 border text-gray-500'} hover:bg-white-200 cursor-pointer sm:w-auto`}
              >
                {showArchived ? "Ver Activos" : "Proyectos archivados"}
                <TbArchive className={showArchived ? "text-amber-700" : ""} />
              </Button>
            </div>
          </div>

          <div className="pt-0 px-9 py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-10W">
            {loading ? (
              <div className="col-span-full text-center">Cargando proyectos...</div>
            ) : filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <ProjectCard
                  id={project.id}
                  title={project.titulo}
                  desc={project.descripcion}
                  createAt={formatDate(project.creadoEn)}
                  jornada={project.jornada}
                  estado={project.estado}
                />
              ))
            ) : (
              <div className="col-span-full text-center">
                {searchTerm ? "No se encontraron proyectos que coincidan con la búsqueda" : "No hay proyectos disponibles"}
              </div>
            )}
          </div>
          <div className="w-full h-full flex items-center p-10 pt-0"></div>

          <AnimatePresence exitBeforeEnter></AnimatePresence>
        </motion.div>
      </PageLayout>
    </>
  );
}

export default Projects;
