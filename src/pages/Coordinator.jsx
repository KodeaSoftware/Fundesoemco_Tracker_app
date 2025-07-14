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
import { getCoordinadores } from "../utils/coordinator";

const coordinadores = await getCoordinadores()

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
