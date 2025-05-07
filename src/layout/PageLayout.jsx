// PageLayout es un componente dictamina el layout general de las paginas
// Modificar para poder aplicar reglas de estilo generales a todas las /pages

function PageLayout({ children }) {
  return (
    <div className="bg-gray-50 w-screen min-h-screen overflow-hidden">
      {children}
    </div>
  );
}

export default PageLayout;
