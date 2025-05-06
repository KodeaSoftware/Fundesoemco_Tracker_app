function NuevoProyectoModal() {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-96 shadow-lg relative">
        <h2 className="text-xl font-bold mb-4">Este es un Modal</h2>
        <p className="text-gray-600">Contenido del modal va aquí.</p>
        <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
          Cerrar
        </button>
      </div>
    </div>
  );
}

export default NuevoProyectoModal;
