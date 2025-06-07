# Componente Employees

## Descripción
El componente `Employees` es el componente principal para la gestión de empleados en la aplicación. Maneja la visualización, búsqueda y gestión de la lista de empleados.

## Funcionalidades
- Visualización de lista de empleados
- Búsqueda por nombre o cédula
- Importación de datos mediante CSV
- Creación de nuevos empleados

## Estado
```javascript
const [search, setSearch] = useState("");           // Estado para el término de búsqueda
const [employeesList, setEmployeesList] = useState([]); // Lista completa de empleados
const [filtered, setFiltered] = useState([]);       // Lista filtrada de empleados
```

## Props
Este componente no recibe props ya que es un componente de página.

## Dependencias
- `PageLayout`: Componente de diseño base
- `Header`: Componente para el encabezado de la página
- `Input`: Componente de entrada de texto
- `Button`: Componente de botón
- `InfoEmployeTable`: Componente para mostrar la tabla de empleados
- `CreateEmployee`: Componente para crear nuevos empleados
- `EmployeeCSV`: Componente para importar datos CSV

## Uso
```jsx
import Employees from './pages/Employees';

function App() {
  return <Employees />;
}
```

## Funciones Principales

### Filtrado de Empleados
```javascript
useEffect(() => {
  setFiltered(
    employeesList.filter(
      (emp) =>
        emp.nombre?.toLowerCase().includes(search.toLowerCase()) ||
        emp.cedula?.toString().includes(search)
    )
  );
}, [search, employeesList]);
```

### Carga de Datos
```javascript
getEmployees().then((data) => {
  if (!data || data.length === 0) {
    console.log("Cargando empleados....");
    console.log(data);
  }
  setEmployeesList(data);
  setFiltered(data);
});
```

## Estilos
El componente utiliza Tailwind CSS para los estilos y está diseñado para ser responsivo:
- Contenedor principal: `bg-white sm:w-[95%] w-[85%] p-8 border-1 rounded-lg shadow-sm`
- Layout: `flex pt- flex-col items-center`
- Controles: `flex sm:flex-row sm:gap-5 flex-col gap-5 mb-5 sm:mb-0`

## Animaciones
Utiliza la biblioteca Motion para animaciones suaves en la página:
```javascript
import { motion } from "motion/react";
import { pageAnimationsParams } from "../motion/pageAnimation";
```

## Consideraciones
- El componente realiza una carga inicial de datos al montarse
- La búsqueda es sensible a mayúsculas/minúsculas
- La búsqueda funciona tanto por nombre como por cédula
- Los datos se actualizan automáticamente al importar un nuevo CSV 