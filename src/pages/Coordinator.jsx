// Layout
import PageLayout from "../layout/PageLayout";
import { useState } from "react";

// Componentes
import Header from "../elements/Header";
import { Input } from "@/components/ui/input";

// motion animaciones
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { pageAnimationsParams } from "../motion/pageAnimation";
import { InfoEmployeTable } from "../elements/InfoEmployeTable";
import { InfoCoordinador } from "../elements/InfoCoordinador";
import CreateCoordinator from "../elements/CreateCoordinator";

const coordinadores = [
  {
    id: 1032456789,
    name: "Sebastian Zapata",
    department: "IT",
    phone: "123-456-7890",
    cargo: "Coordinador de IT",
    proyectos: ["CVC"],
  },
  {
    id: 1023456789,
    name: "Maria Lopez",
    department: "HR",
    phone: "234-567-8901",
    cargo: "Coordinadora de Recursos Humanos",
    proyectos: ["Fundesoemco"],
  },
  {
    id: 1012345678,
    name: "Carlos Gomez",
    department: "Finance",
    phone: "345-678-9012",
    cargo: "Coordinador Financiero",
    proyectos: ["CVC", "Fundesoemco"],
  },
  {
    id: 1009876543,
    name: "Ana Martinez",
    department: "Marketing",
    phone: "456-789-0123",
    cargo: "Coordinadora de Marketing",
    proyectos: ["CVC"],
  },
  {
    id: 1098765432,
    name: "Luis Torres",
    department: "Sales",
    phone: "567-890-1234",
    cargo: "Coordinador de Ventas",
    proyectos: ["Fundesoemco"],
  },
  {
    id: 1087654321,
    name: "Sofia Ramirez",
    department: "IT",
    phone: "678-901-2345",
    cargo: "Coordinadora de Sistemas",
    proyectos: ["Fundesoemco", "CVC", "Compunet", "Nose"],
  },
  {
    id: 1076543210,
    name: "Jorge Herrera",
    department: "HR",
    phone: "789-012-3456",
    cargo: "Coordinador de Selección",
    proyectos: ["CVC"],
  },
  {
    id: 1065432109,
    name: "Laura Sanchez",
    department: "Finance",
    phone: "890-123-4567",
    cargo: "Coordinadora de Análisis Financiero",
    proyectos: ["Fundesoemco"],
  },
  {
    id: 1054321098,
    name: "Diego Vargas",
    department: "Marketing",
    phone: "901-234-5678",
    cargo: "Coordinador de Contenidos",
    proyectos: ["CVC"],
  },
  {
    id: 1043210987,
    name: "Camila Perez",
    department: "Sales",
    phone: "012-345-6789",
    cargo: "Coordinadora de Ventas",
    proyectos: ["Fundesoemco", "CVC"],
  },
];

function Coordinator() {
  return (
    <>
      <Header pageTitle="Lista de coordinadores" />
      <PageLayout addStyle="flex  sm:pt-0 flex-col items-center pt-7 ">
        <div className="bg-white h-[100%]s w-[95%] p-7 border-1 rounded-lg shadow-sm  ">
          <motion.div {...pageAnimationsParams}>
            <div className="flex sm:flex-row sm:gap-5 flex-col gap-5 mb-5 sm:mb-0">
              <Input
                className="w-full sm:mb-10 mb-1 bg-gray-50"
                placeholder="Buscar por nombre o ID"
              />
              <CreateCoordinator />
            </div>
            <InfoCoordinador data={coordinadores} />
          </motion.div>
        </div>
      </PageLayout>
    </>
  );
}

export default Coordinator;
