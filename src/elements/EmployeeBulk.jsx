import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FaFileExcel, FaDownload } from "react-icons/fa6";
import { downloadEmployeeTemplate, bulkUploadEmployeesExcel } from "@/utils/employees";
import { getEmployees } from "@/utils/employees";

import { getProjects } from "@/utils/projects";
import { getContractTypes } from "@/utils/contract";

export default function EmployeeBulk({ onUpload }) {
  const [loading, setLoading] = useState(false);

  const handleDownloadTemplate = async () => {
    try {
      await downloadEmployeeTemplate();
    } catch (err) {
      alert("Error al descargar la plantilla: " + err.message);
    }
  };

  const handleUploadClick = async () => {
    try {
      const projects = await getProjects();
      if (!projects || projects.length === 0) {
        alert("Primero debes crear al menos un proyecto antes de realizar la carga masiva de empleados.");
        return;
      }

      const contracts = await getContractTypes();
      if (!contracts || contracts.length === 0) {
        alert("Primero debes registrar al menos un tipo de contrato en 'Gestionar Contratos' antes de realizar la carga masiva de empleados.");
        return;
      }

      document.getElementById("excel-upload-input").click();
    } catch (err) {
      document.getElementById("excel-upload-input").click();
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setLoading(true);
    try {
      const results = await bulkUploadEmployeesExcel(file);
      alert(`Éxito: ${results.created} empleados creados.${results.errors.length > 0 ? '\nErrores: ' + results.errors.join(', ') : ''}`);
      
      if (onUpload) {
        const data = await getEmployees();
        onUpload(data);
      }
    } catch (err) {
      alert("Error al cargar empleados: " + err.message);
    } finally {
      setLoading(false);
      e.target.value = null; // Reset input
    }
  };

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleDownloadTemplate}
        className="cursor-pointer hover:bg-gray-100"
      >
        <FaDownload className="mr-2 text-blue-600" />
        Plantilla Excel
      </Button>

      <Button
        variant="secondary"
        size="sm"
        disabled={loading}
        onClick={handleUploadClick}
        className="cursor-pointer hover:bg-gray-200"
      >
        <FaFileExcel className="mr-2 text-green-700" />
        <span>{loading ? "Cargando..." : "Cargar Excel"}</span>
      </Button>
      
      <input
        id="excel-upload-input"
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileUpload}
        className="hidden"
      />
    </div>
  );
}
