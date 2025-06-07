# Sistema de Gestión de Empleados

## Descripción
Este es un sistema de gestión de empleados desarrollado con React y Vite, que permite administrar y visualizar información de empleados de manera eficiente.

## Estructura del Proyecto
```
src/
├── components/     # Componentes reutilizables de UI
├── elements/       # Elementos específicos de la aplicación
├── layout/         # Componentes de diseño y estructura
├── lib/           # Utilidades y configuraciones
├── motion/        # Configuraciones de animaciones
├── pages/         # Páginas principales de la aplicación
├── routes/        # Configuración de rutas
└── utils/         # Funciones utilitarias
```

## Características Principales
- Gestión de empleados
- Búsqueda y filtrado de empleados
- Búsqueda de emleados por código QR generado 
- Importación de datos mediante CSV
- Interfaz moderna y responsiva
- Animaciones suaves

## Tecnologías Utilizadas
- React
- Vite
- Tailwind CSS
- Motion (para animaciones)
- Supabase (para backend)

## Componentes Principales

### Employees.jsx
El componente principal para la gestión de empleados que incluye:
- Búsqueda de empleados
- Visualización en tabla
- Importación de CSV
- Creación de nuevos empleados

### InfoEmployeTable
Componente para mostrar la información de empleados en formato de tabla.

### CreateEmployee
Componente para la creación de nuevos empleados.

### EmployeeCSV
Componente para la importación de datos de empleados mediante archivos CSV.

## Configuración del Proyecto

### Requisitos Previos
- Node.js (versión recomendada: 16.x o superior)
- npm o yarn

### Instalación
1. Clonar el repositorio
```bash
git clone https://github.com/sb4ss/demo
```

2. Instalar dependencias
```bash
npm install
```

3. Iniciar el servidor de desarrollo
```bash
npm run dev
```

## Contribución
1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## Licencia
Este proyecto está bajo la Licencia MIT - ver el archivo [LICENCE.md](LICENCE.md) para más detalles.

## Contacto
[Información de contacto del mantenedor del proyecto]
