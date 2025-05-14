// PageLayout es un componente dictamina el layout general de las paginas
// Modificar para poder aplicar reglas de estilo generales a todas las /pages

// addStyle es para agregar clases personalizadas de tailwind donde sea que
// se llame el componente para más personalización
function PageLayout({ children, addStyle }) {
  return (
    <div
      className={`bg-gray-50 w-full min-h-screen overflow-hidden  ${addStyle}`}
    >
      {children}
    </div>
  );
}

export default PageLayout;
