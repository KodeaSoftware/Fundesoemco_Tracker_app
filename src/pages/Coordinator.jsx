// Layout
import PageLayout from "../layout/PageLayout";
import { useState, useEffect } from "react";

// Componentes
import Header from "../elements/Header";
import { Input } from "@/components/ui/input";

// motion animaciones
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { pageAnimationsParams } from "../motion/pageAnimation";
import { InfoCoordinador } from "../elements/InfoCoordinador";
import CreateCoordinator from "../elements/CreateCoordinator";
import { getCoordinadores } from "../utils/coordinator";

function Coordinator() {
  const [search, setSearch] = useState("");
  const [coordinadoresList, setCoordinadoresList] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const fetchCoordinadores = async () => {
      const coordinadores = await getCoordinadores();
      setCoordinadoresList(coordinadores);
    };
    fetchCoordinadores();
  }, []);

  useEffect(() => {
    // Filtrar coordinadores cuando cambia el input
    setFiltered(
      coordinadoresList.filter(
        (coord) =>
          coord.nombre?.toLowerCase().includes(search.toLowerCase()) ||
          coord.cedula?.toString().includes(search)
      )
    );
  }, [search, coordinadoresList]);

  return (
    <>
      <Header pageTitle="Lista de coordinadores" />
      <PageLayout addStyle="flex  sm:pt-0 flex-col items-center pt-7 ">
        <div className="bg-white h-[100%]s w-[95%] p-7 border-1 rounded-lg shadow-sm  ">
          <motion.div {...pageAnimationsParams}>
            <div className="flex sm:flex-row sm:gap-5 flex-col gap-5 mb-5 sm:mb-0">
              <Input
                className="w-[400px] sm:mb-10 mb-1 bg-gray-50"
                placeholder="Buscar por nombre o cédula"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <CreateCoordinator />
            </div>
            <InfoCoordinador data={filtered} />
          </motion.div>
        </div>
      </PageLayout>
    </>
  );
}

export default Coordinator;
