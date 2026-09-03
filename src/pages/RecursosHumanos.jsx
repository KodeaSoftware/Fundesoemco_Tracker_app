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
import { InfoRecursosHumanos } from "../elements/InfoRecursosHumanos";
import CreateRecursosHumanos from "../elements/CreateRecursosHumanos";
import { getRecursosHumanos } from "../utils/recursosHumanos";

function RecursosHumanosPage() {
  const [search, setSearch] = useState("");
  const [rrhhList, setRrhhList] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const fetchRRHH = async () => {
    const data = await getRecursosHumanos();
    setRrhhList(data || []);
  };

  useEffect(() => {
    fetchRRHH();
  }, []);

  useEffect(() => {
    setFiltered(
      rrhhList.filter(
        (item) =>
          item.nombre?.toLowerCase().includes(search.toLowerCase()) ||
          item.cedula?.toString().includes(search)
      )
    );
  }, [search, rrhhList]);

  return (
    <>
      <Header pageTitle="Recursos Humanos" />
      <PageLayout addStyle="flex sm:pt-0 flex-col items-center pt-7">
        <div className="bg-white h-[100%] w-[95%] p-7 border-1 rounded-lg shadow-sm">
          <motion.div {...pageAnimationsParams}>
            <div className="flex sm:flex-row sm:gap-5 flex-col gap-5 mb-5 sm:mb-0">
              <Input
                className="w-[400px] sm:mb-10 mb-1 bg-gray-50"
                placeholder="Buscar por nombre o cédula"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <CreateRecursosHumanos onCreated={fetchRRHH} />
            </div>
            <InfoRecursosHumanos data={filtered} onUpdated={fetchRRHH} />
          </motion.div>
        </div>
      </PageLayout>
    </>
  );
}

export default RecursosHumanosPage;
