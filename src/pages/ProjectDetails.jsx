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
import { getEmployeeByIdProjecAndContract } from "../utils/projects"

const ProjectDetails = () => {
  const location = useLocation();
  const { projectName, projectDesc, createdAt, id } = location.state || {};
  const [backgroundImage, setBackgroundImage] = useState("/img-login.webp");
  const [employeeContratista, setEmployeeContratista] = useState([]);
  const [employeeDirecto, setEmployeeDirecto] = useState([]);
  const [loading, setLoading] = useState(true);

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
              <CardHeader>
                <CardTitle>Descripción del Proyecto</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground h-full max-w-full break-words">{projectDesc}</p>
                <p className="text-sm text-muted-foreground mt-4">
                  Creado el: {createdAt}
                </p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row justify-between items-center pl-7 pr-8">
                  <CardTitle>Coordinadores</CardTitle>
                  <LuUserCog className="text-emerald-500" />
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell>Juan Director</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>María Coordinadora</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Empleados Directos */}
              <Card>
                <CardHeader className="flex flex-row justify-between items-center pl-7 pr-8">
                  <CardTitle>Empleados Directos</CardTitle>
                  <LuUsers className="text-blue-500" />
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableBody>
                      {loading ? (
                        <TableRow>
                          <TableCell className="text-muted-foreground">Cargando...</TableCell>
                        </TableRow>
                      ) : employeeDirecto && employeeDirecto.length > 0 ? (
                        employeeDirecto.map((employee, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              {employee.nombre}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell className="text-muted-foreground">No hay empleados directos asignados</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Contratistas */}
              <Card>
                <CardHeader className="flex flex-row justify-between items-center pl-7 pr-8">
                  <CardTitle>Contratistas</CardTitle>
                  <LuBuilding2 className="text-purple-500" />
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableBody>
                      {loading ? (
                        <TableRow>
                          <TableCell className="text-muted-foreground">Cargando...</TableCell>
                        </TableRow>
                      ) : employeeContratista && employeeContratista.length > 0 ? (
                        employeeContratista.map((employee, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              {employee.nombre}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell className="text-muted-foreground">No hay contratistas asignados</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </PageLayout>
    </>
  );
};

export default ProjectDetails;
