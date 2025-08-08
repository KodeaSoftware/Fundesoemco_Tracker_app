// Layout
import PageLayout from "../layout/PageLayout";

// Componentes
import Header from "../elements/Header";
import PresentesHoyCard from "../elements/PresentesHoyCard";
import AusentesHoyCard from "../elements/AusentesHoyCard";
import HorasPromedioCard from "../elements/HorasPromedioCard";
import AsistenciaMensualCard from "../elements/AsistenciaMensualCard";
import RegistroAsistencia from "../elements/RegistroAsistencia";
import { AsistenciaMensualGrafico } from "../elements/AsistenciaMensualGrafico";
import { AsistenciaInasistenciaGrafico } from "../elements/AsistenciaInasistenciaGrafico";

// motion animaciones
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { pageAnimationsParams } from "../motion/pageAnimation";

function Dashboard() {
  return (
    <>
      <Header pageTitle="Dashboard" />
      <PageLayout>
        <motion.div {...pageAnimationsParams}>
          <div className="px-9 top-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 gb-red-200 pt-7 sm:pt-0  mb-7 ">
            <PresentesHoyCard />
            <AusentesHoyCard />
            <HorasPromedioCard />
            <AsistenciaMensualCard />
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 p-9 pt-0">
            <AsistenciaMensualGrafico />
            <AsistenciaInasistenciaGrafico />
          </div>

          <div className="w-full h-full flex items-center p-10 pt-0">
            <RegistroAsistencia />
          </div>
        </motion.div>
      </PageLayout>
    </>
  );
}

export default Dashboard;


<div className="hidden lg:flex flex-col gap-8">
  {/* Primera fila: 2 imágenes */}
  {movie.imagenes.length > 1 && (
    <div className="grid grid-rows-2 gap-x-5 gap-y-3">
      {movie.imagenes.slice(1, 3).map((img, index) => (
        <div
          key={index}
          className={`relative cursor-pointer w-auto h-auto`}
          onClick={() => movie.aficheId && openImageViewer(img.id)}
        >
          <Image
            src={getImageUrl(img.id)}
            alt={`Imagen ${index + 2} de ${movie.titulo}`}
            fill={true}
            quality={100}
            className={`object-cover ${getPositionClass(img.objectPosition)}`}
          />
        </div>
      ))}
    </div>

  ))}
</div>
