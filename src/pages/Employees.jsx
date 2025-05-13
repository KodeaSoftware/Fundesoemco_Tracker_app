// Layout
import PageLayout from "../layout/PageLayout";

// Componentes
import Header from "../elements/Header";
import { Input } from "@/components/ui/input";

// motion animaciones
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { pageAnimationsParams } from "../motion/pageAnimation";
import { InfoEmployeTable } from "../elements/InfoEmployeTable";
import CreateEmployee from "../elements/CreateEmployee";

const employees = [
  {
    id: 1032456789,
    name: "Sebastian Zapata",
    department: "IT",
    phone: "123-456-7890",
    cargo: "Developer",
    contrato: "directo",
  },
  {
    id: 1023456789,
    name: "Maria Lopez",
    department: "HR",
    phone: "234-567-8901",
    cargo: "HR Manager",
    contrato: "directo",
  },
  {
    id: 1012345678,
    name: "Carlos Gomez",
    department: "Finance",
    phone: "345-678-9012",
    cargo: "Accountant",
    contrato: "contratista",
  },
  {
    id: 1009876543,
    name: "Ana Martinez",
    department: "Marketing",
    phone: "456-789-0123",
    cargo: "Marketing Specialist",
    contrato: "contratista",
  },
  {
    id: 1098765432,
    name: "Luis Torres",
    department: "Sales",
    phone: "567-890-1234",
    cargo: "Sales Executive",
    contrato: "directo",
  },
  {
    id: 1087654321,
    name: "Sofia Ramirez",
    department: "IT",
    phone: "678-901-2345",
    cargo: "System Analyst",
    contrato: "contratista",
  },
  {
    id: 1076543210,
    name: "Jorge Herrera",
    department: "HR",
    phone: "789-012-3456",
    cargo: "Recruiter",
    contrato: "directo",
  },
  {
    id: 1065432109,
    name: "Laura Sanchez",
    department: "Finance",
    phone: "890-123-4567",
    cargo: "Financial Analyst",
    contrato: "directo",
  },
  {
    id: 1054321098,
    name: "Diego Vargas",
    department: "Marketing",
    phone: "901-234-5678",
    cargo: "Content Creator",
    contrato: "contratista",
  },
  {
    id: 1043210987,
    name: "Camila Perez",
    department: "Sales",
    phone: "012-345-6789",
    cargo: "Sales Manager",
    contrato: "directo",
  },
];

function Employees() {
  return (
    <PageLayout addStyle="flex justify-center pt-22  ">
      <Header pageTitle="Lista de empleados" />
      <div className="bg-white w-[95%] p-10  border-1 rounded-lg shadow-sm ">
        <motion.div {...pageAnimationsParams}>
          <div className="flex flex-wrap gap-5">
            <Input
              className="w-100 mb-10 bg-gray-50 "
              placeholder="Buscar empleado"
            />
            <CreateEmployee />
          </div>

          {/* Componente que renderiza empleados */}
          <InfoEmployeTable data={employees} />
        </motion.div>
      </div>
    </PageLayout>
  );
}

export default Employees;
