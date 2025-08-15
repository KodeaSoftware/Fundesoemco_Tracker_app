// Layout
import PageLayout from "../layout/PageLayout";

// Componentes
import Header from "../elements/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// motion animaciones
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { pageAnimationsParams } from "../motion/pageAnimation";
import { InfoEmployeTable } from "../elements/InfoEmployeTable";

import CreateEmployee from "../elements/CreateEmployee";
import EmployeeCSV from "../elements/employeeCSV";

import { getEmployees } from "../utils/employees.js";

import { useState, useEffect } from "react";

function Employees() {
  const [search, setSearch] = useState("");
  const [employeesList, setEmployeesList] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      const employees = await getEmployees();
      setEmployeesList(employees);
    };
    fetchEmployees();
  }, []);

  useEffect(() => {
    // Filtrar empleados cuando cambia el input
    setFiltered(
      employeesList.filter(
        (emp) =>
          emp.nombre?.toLowerCase().includes(search.toLowerCase()) ||
          emp.cedula?.toString().includes(search)
      )
    );
  }, [search, employeesList]);

  return (
    <>
      <Header pageTitle="Lista de empleados" />
      <PageLayout addStyle="flex pt- flex-col items-center ">
        <div className="bg-white sm:w-[95%] w-[85%] p-8  border-1 rounded-lg shadow-sm ">
          <motion.div {...pageAnimationsParams}>
            <div className="flex sm:flex-row sm:gap-5 flex-col gap-5 mb-5 sm:mb-0">
              <Input
                className=" sm:w-100 w-full sm:mb-10 bg-gray-50 "
                placeholder="Buscar empleado"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <CreateEmployee />


              {/*

              PENDIENTE IMPLEMENTAR ESTO DESPUES DEL MVP
              
                <EmployeeCSV
                onUpload={(data) => {
                  setEmployeesList(data);
                  setFiltered(data);
                }}


              />
              */}
            </div>

            {/* Componente que renderiza empleados */}
            <InfoEmployeTable data={filtered} />
          </motion.div>
        </div>
      </PageLayout>
    </>
  );
}

export default Employees;

