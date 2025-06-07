# Utilidades del Proyecto

## Funciones de Gestión de Empleados

### employees.js
Utilidades para la gestión de empleados.
```javascript
// Funciones principales
getEmployees()      // Obtiene lista de empleados
createEmployee()    // Crea nuevo empleado
updateEmployee()    // Actualiza empleado existente
deleteEmployee()    // Elimina empleado
```

### bulkCreateEmployees.js
Utilidades para la creación masiva de empleados.
```javascript
// Funciones principales
bulkCreateEmployees() // Crea múltiples empleados desde datos CSV
```

## Funciones de Gestión de Coordinadores

### coordinator.js
Utilidades para la gestión de coordinadores.
```javascript
// Funciones principales
getCoordinators()    // Obtiene lista de coordinadores
createCoordinator()  // Crea nuevo coordinador
updateCoordinator()  // Actualiza coordinador existente
deleteCoordinator()  // Elimina coordinador
```

## Funciones de Gestión de Proyectos

### projects.js
Utilidades para la gestión de proyectos.
```javascript
// Funciones principales
getProjects()       // Obtiene lista de proyectos
createProject()     // Crea nuevo proyecto
updateProject()     // Actualiza proyecto existente
deleteProject()     // Elimina proyecto
```

## Funciones de Prueba

### test.js
Utilidades para pruebas y desarrollo.
```javascript
// Funciones principales
testConnection()    // Prueba conexión con backend
testData()         // Genera datos de prueba
```

## Estructura de Datos

### Empleado
```typescript
interface Empleado {
  id: string;
  nombre: string;
  cedula: string;
  // Otros campos según implementación
}
```

### Coordinador
```typescript
interface Coordinador {
  id: string;
  nombre: string;
  area: string;
  // Otros campos según implementación
}
```

### Proyecto
```typescript
interface Proyecto {
  id: string;
  nombre: string;
  estado: string;
  // Otros campos según implementación
}
```

## Manejo de Errores
Todas las funciones de utilidad incluyen manejo de errores y retornan promesas que pueden ser manejadas con try/catch.

## Ejemplo de Uso
```javascript
import { getEmployees, createEmployee } from '../utils/employees';

// Obtener empleados
try {
  const employees = await getEmployees();
  console.log(employees);
} catch (error) {
  console.error('Error al obtener empleados:', error);
}

// Crear empleado
try {
  const newEmployee = await createEmployee({
    nombre: 'Juan Pérez',
    cedula: '1234567890'
  });
  console.log('Empleado creado:', newEmployee);
} catch (error) {
  console.error('Error al crear empleado:', error);
}
```

## Consideraciones
- Todas las funciones son asíncronas
- Se recomienda usar try/catch para manejar errores
- Los datos se validan antes de ser procesados
- Se mantiene consistencia en el formato de respuesta 