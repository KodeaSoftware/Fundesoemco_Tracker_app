import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FaFileExcel } from "react-icons/fa6";
import { bulkCreateEmployees } from "@/utils/bulkCreateEmployees";
import { getEmployees } from "@/utils/employees";

export default function EmployeeCSV({ onUpload }) {
  const [csvLoading, setCsvLoading] = useState(false);

  const handleCsvUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setCsvLoading(true);
    try {
      const text = await file.text();
      const lines = text.split(/\r?\n/).filter(Boolean);
      const headers = lines[0].split(",").map((h) => h.trim());
      const employees = lines.slice(1).map((line) => {
        const values = line.split(",");
        const obj = {};
        headers.forEach((h, i) => {
          obj[h] = values[i]?.trim();
        });
        return obj;
      });
      await bulkCreateEmployees(employees);
      if (onUpload) {
        const data = await getEmployees();
        onUpload(data);
      }
      alert("Empleados cargados correctamente");
    } catch (err) {
      alert("Error al cargar empleados: " + err.message);
    } finally {
      setCsvLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="secondary"
        size="sm"
        disabled={csvLoading}
        onClick={() => document.getElementById("csv-upload-input").click()}
        className="cursor-pointer hover:bg-gray-200"
      >
        <FaFileExcel className="text-green-700" />
        <span>{csvLoading ? "Cargando..." : "Cargar Excel"}</span>
      </Button>
      <input
        id="csv-upload-input"
        type="file"
        accept=".csv"
        onChange={handleCsvUpload}
        className="hidden"
      />
    </>
  );
}
