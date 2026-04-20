import PageLayout from "../layout/PageLayout";
import Header from "../elements/Header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { FaCamera } from "react-icons/fa";
import { motion } from "motion/react";
import { pageAnimationsParams } from "../motion/pageAnimation";
import { LuUserCog, LuUsers, LuBuilding2 } from "react-icons/lu";
import { getEmployeeByIdProjecAndContract, getProjectById } from "../utils/projects"
import EditProject from "../elements/EditProject";

const ProjectDetails = () => {
  const location = useLocation();
  const { projectName, projectDesc, createdAt, id, jornada } = location.state || {};
  const [backgroundImage, setBackgroundImage] = useState("/img-login.webp");
  const [employeeContratista, setEmployeeContratista] = useState([]);
  const [employeeDirecto, setEmployeeDirecto] = useState([]);
  const [loading, setLoading] = useState(true);
  const [projectData, setProjectData] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const userRole = localStorage.getItem("role");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setBackgroundImage(imageUrl);
    }
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      if (!id) return;

      try {
        setLoading(true);

        const [contratistas, directos] = await Promise.all([
          getEmployeeByIdProjecAndContract({
            idProject: id,
            tipoContrato: 1
          }),
          getEmployeeByIdProjecAndContract({
            idProject: id,
            tipoContrato: 2
          })
        ]);

        setEmployeeContratista(contratistas || []);
        setEmployeeDirecto(directos || []);
      } catch (error) {
        console.error('Error al obtener empleados:', error);
        setEmployeeContratista([]);
        setEmployeeDirecto([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, [id]);

  useEffect(() => {
    const fetchProjectData = async () => {
      if (!id) return;

      try {
        const projectData = await getProjectById(id);
        if (projectData) {
          setProjectData(projectData);
        } else {
          // Fallback a los datos del location.state si no se puede obtener del servidor
          setProjectData({
            id: id,
            titulo: projectName,
            descripcion: projectDesc,
            creadoEn: createdAt,
            jornada: jornada
          });
        }
      } catch (error) {
        console.error('Error al obtener datos del proyecto:', error);
        // Fallback a los datos del location.state en caso de error
        setProjectData({
          id: id,
          titulo: projectName,
          descripcion: projectDesc,
          creadoEn: createdAt,
          jornada: jornada
        });
      }
    };

    fetchProjectData();
  }, [id, projectName, projectDesc, createdAt, jornada]);

  const handleProjectUpdated = (updatedProject) => {
    // Actualizar el estado local con los nuevos datos del proyecto
    setProjectData(updatedProject);

    // Actualizar también el estado de location para reflejar los cambios
    if (location.state) {
      location.state.projectName = updatedProject.titulo;
      location.state.projectDesc = updatedProject.descripcion;
    }

    // Opcional: Recargar la página para mostrar los cambios
    window.location.reload();
  };


  if (!location.state) {
    return (
      <PageLayout>
        <Header pageTitle="Proyecto no encontrado" />
        <div className="p-6">
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground">
                No se encontró la información del proyecto.
              </p>
            </CardContent>
          </Card>
        </div>
      </PageLayout>
    );
  }

  return (
    <>
      <Header pageTitle={`Proyectos > ${projectName}`} />
      <PageLayout>
        <motion.div {...pageAnimationsParams}>
          <div
            className="relative w-full h-[200px] mt-[-40px] bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          >
            <Dialog>
              <DialogTrigger asChild>

                {
                  /*
                
                <Button
                  variant="ghost"
                  className="absolute bottom-4 right-4 bg-black/30 hover:bg-black/50 text-white"
                >
                  <FaCamera className="mr-2" />
                  Cambiar imagen
                </Button>
                */}
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Cambiar imagen de fondo</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full"
                  />
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="p-6 space-y-6">
            <Card>
              <CardHeader className="flex flex-row justify-between items-center">
                <CardTitle>Descripción del Proyecto</CardTitle>
                {projectData && (
                  <div className="flex items-center gap-3">
                    {projectData?.estado === 'archivado' && (
                      <span className="px-2 py-1 bg-amber-100 text-amber-700 border border-amber-200 rounded text-xs font-bold uppercase">
                        Archivado
                      </span>
                    )}
                    <EditProject
                      project={projectData}
                      onProjectUpdated={handleProjectUpdated}
                    />
                  </div>
                )}
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground h-full max-w-full break-words">{projectDesc}</p>
                <p className="text-sm text-muted-foreground mt-4">
                  Creado el: {createdAt}
                </p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="flex flex-row justify-between items-center pl-7 pr-8">
                  <CardTitle>Coordinadores</CardTitle>
                  <LuUserCog className="text-emerald-500" />
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableBody>
                      {loading ? (
                        <TableRow>
                          <TableCell className="text-muted-foreground">Cargando...</TableCell>
                        </TableRow>
                      ) : projectData && projectData.coordinators && projectData.coordinators.length > 0 ? (
                        projectData.coordinators.map((coord, index) => (
                          <TableRow key={index}>
                            <TableCell>{coord.nombre}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell className="text-muted-foreground italic">Todavía no hay coordinadores asignados</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Empleados (Todos) */}
              <Card>
                <CardHeader className="flex flex-row justify-between items-center pl-7 pr-8">
                  <CardTitle>Empleados Asignados</CardTitle>
                  <LuUsers className="text-blue-500" />
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableBody>
                      {loading ? (
                        <TableRow>
                          <TableCell className="text-muted-foreground">Cargando...</TableCell>
                        </TableRow>
                      ) : (employeeDirecto.length > 0 || employeeContratista.length > 0) ? (
                        [
                          ...employeeDirecto.map(e => ({ ...e, isContratista: false, tipo: e.tipoContrato, color: 'bg-blue-100 text-blue-700 border-blue-200' })),
                          ...employeeContratista.map(e => ({ ...e, isContratista: true, tipo: e.tipoContrato, color: 'bg-purple-100 text-purple-700 border-purple-200' }))
                        ]
                          .sort((a, b) => a.nombre.localeCompare(b.nombre))
                          .map((employee, index) => {
                            const canViewDetails = !employee.isContratista || userRole === "rrhh";
                            
                            return (
                              <TableRow 
                                key={index} 
                                className={canViewDetails ? "cursor-pointer hover:bg-gray-50" : ""}
                                onClick={() => canViewDetails && setSelectedEmployee(employee)}
                              >
                                <TableCell className="flex justify-between items-center">
                                  <span>{employee.nombre}</span>
                                <span className={`text-[12px] font-bold px-3 py-0.7 rounded-full border ${employee.color}`}>
                                  {employee.tipo}
                                </span>
                              </TableCell>
                            </TableRow>
                            );
                          })
                      ) : (
                        <TableRow>
                          <TableCell className="text-muted-foreground italic">No hay empleados asignados</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <Dialog open={!!selectedEmployee} onOpenChange={(open) => !open && setSelectedEmployee(null)}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Información del Empleado</DialogTitle>
              </DialogHeader>
              {selectedEmployee && (
                <div className="space-y-4 pt-4">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <span className="text-sm font-medium text-gray-500">Nombre</span>
                    <span className="col-span-2 font-semibold text-gray-900">{selectedEmployee.nombre}</span>
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <span className="text-sm font-medium text-gray-500">Cédula</span>
                    <span className="col-span-2 text-gray-900">{selectedEmployee.cedula}</span>
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <span className="text-sm font-medium text-gray-500">Dpto.</span>
                    <span className="col-span-2 text-gray-900">{selectedEmployee.departamento}</span>
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <span className="text-sm font-medium text-gray-500">Cargo</span>
                    <span className="col-span-2 text-gray-900">{selectedEmployee.cargo}</span>
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <span className="text-sm font-medium text-gray-500">Teléfono</span>
                    <span className="col-span-2 text-gray-900">{selectedEmployee.telefono}</span>
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <span className="text-sm font-medium text-gray-500">Contrato</span>
                    <span className="col-span-2 text-gray-900">
                      <span className={`text-[12px] font-bold px-3 py-0.5 rounded-full border ${selectedEmployee.color}`}>
                        {selectedEmployee.tipo}
                      </span>
                    </span>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </motion.div>
      </PageLayout>
    </>
  );
};

export default ProjectDetails;
