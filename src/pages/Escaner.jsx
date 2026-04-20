import { Html5Qrcode } from "html5-qrcode";
import { useState, useEffect } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FiCamera,
  FiSquare,
  FiCheckCircle,
  FiInfo,
  FiUser,
} from "react-icons/fi";
import Header from "../elements/Header";
import PageLayout from "../layout/PageLayout";
import { motion } from "motion/react";
import { pageAnimationsParams } from "../motion/pageAnimation";
import { Button } from "@/components/ui/button";
import { getEmployees, recordAttendance } from "../utils/employees";

function Escaner() {
  const [scanResult, setScanResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanner, setScanner] = useState(null);
  const [empleadoEncontrado, setEmpleadoEncontrado] = useState(undefined);
  const [employees, setEmployees] = useState([]);
  const [loadingEmployees, setLoadingEmployees] = useState(true);
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Cargar empleados al montar el componente
  useEffect(() => {
    const loadEmployees = async () => {
      try {
        setLoadingEmployees(true);
        const employeesData = await getEmployees()
        setEmployees(employeesData || []);
      } catch (error) {
        console.error('Error al cargar empleados:', error);
      } finally {
        setLoadingEmployees(false);
      }
    };

    loadEmployees();
  }, []);

  useEffect(() => {
    return () => {
      if (scanner) {
        scanner.clear();
      }
    };
  }, [scanner]);

  useEffect(() => {
    if (scanResult && employees.length > 0) {

      // Buscar el empleado con diferentes métodos de comparación
      let empleado = employees.find(
        (emp) => emp.cedula === parseInt(scanResult)
      );

      // Si no se encuentra con parseInt, intentar como string
      if (!empleado) {
        empleado = employees.find(
          (emp) => emp.cedula.toString() === scanResult.toString()
        );
      }

      // Si aún no se encuentra, intentar sin espacios ni caracteres especiales
      if (!empleado) {
        const cedulaLimpia = scanResult.replace(/\s+/g, '').trim();
        empleado = employees.find(
          (emp) => emp.cedula.toString().replace(/\s+/g, '').trim() === cedulaLimpia
        );
      }

      setEmpleadoEncontrado(empleado);

      // Auto-select project if only one exists
      if (empleado && empleado.proyecto && empleado.proyecto.length > 0) {
        if (empleado.proyecto.length === 1) {
          setSelectedProjectId(empleado.proyecto[0].id);
        } else {
          setSelectedProjectId(""); // Reset so user must select
        }
      }
    }
  }, [scanResult, employees]);

  const handleConfirmarAsistencia = async () => {
    if (!empleadoEncontrado) return;
    
    if (!selectedProjectId) {
      alert("Por favor selecciona un proyecto");
      return;
    }

    try {
      setSubmitting(true);
      await recordAttendance(empleadoEncontrado.cedula, selectedProjectId);
      alert(`Asistencia confirmada para ${empleadoEncontrado.nombre}`);
      setScanResult(null);
      setEmpleadoEncontrado(undefined);
      setSelectedProjectId("");
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const startScanning = async () => {
    setIsScanning(true);
    setScanResult(null);

    setTimeout(async () => {
      try {
        const newScanner = new Html5Qrcode("reader");
        setScanner(newScanner);

        // Configuración para usar directamente la cámara trasera
        const config = {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0,
        };

        // Intentar usar facingMode environment (cámara trasera)
        const constraints = {
          facingMode: "environment",
        };

        await newScanner.start(
          constraints,
          config,
          (decodedText) => {
            // Éxito - código QR escaneado
            newScanner.stop();
            setScanResult(decodedText);
            setIsScanning(false);
            setScanner(null);
          },
          (errorMessage) => {
            // Error de escaneo - esto es normal, no hacer nada
            console.warn(`QR scan error: ${errorMessage}`);
          }
        );
      } catch (err) {
        console.error("Error al iniciar el escáner:", err);
        setIsScanning(false);

        // Si falla con environment, intentar con la primera cámara disponible
        try {
          const devices = await Html5Qrcode.getCameras();
          if (devices && devices.length > 0) {
            const newScanner = new Html5Qrcode("reader");
            setScanner(newScanner);

            const config = {
              fps: 10,
              qrbox: { width: 250, height: 250 },
            };

            await newScanner.start(
              devices[devices.length > 1 ? 1 : 0].id, // Usar la segunda cámara si existe (suele ser trasera)
              config,
              (decodedText) => {
                newScanner.stop();
                setScanResult(decodedText);
                setIsScanning(false);
                setScanner(null);
              },
              (errorMessage) => {
                console.warn(`QR scan error: ${errorMessage}`);
              }
            );
          }
        } catch (fallbackErr) {
          console.error("Error en fallback:", fallbackErr);
          setIsScanning(false);
        }
      }
    }, 100);
  };

  const stopScanning = () => {
    if (scanner) {
      scanner
        .stop()
        .then(() => {
          scanner.clear();
          setScanner(null);
        })
        .catch((err) => {
          console.error("Error al detener scanner:", err);
        });
    }
    setIsScanning(false);
  };

  return (
    <>
      <Header pageTitle="Escaner" />
      <PageLayout>
        <motion.div {...pageAnimationsParams}>
          {loadingEmployees ? (
            <div className="w-full max-w-4xl mx-auto p-6">
              <Card>
                <CardContent className="flex items-center justify-center py-8">
                  <div className="text-center">
                    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Cargando empleados...</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : !scanResult ? (
            <div className="w-full max-w-4xl mx-auto p-6 space-y-6 ">
              {/* Header Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base font-semibold">
                    {isScanning ? "Escaneando..." : "Área de Escaneo"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-gray-200 rounded-lg p-4">
                    {isScanning ? (
                      <div>
                        {isScanning && (
                          <div className="flex items-center gap-2 text-blue-600 mb-4">
                            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                            <span className="text-sm font-medium">
                              Buscando código QR...
                            </span>
                          </div>
                        )}
                        <div
                          id="reader"
                          className="w-full min-h-80 rounded-md overflow-hidden"
                        ></div>
                      </div>
                    ) : (
                      <div className="text-center py-16">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
                          <FiCamera className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="font-semibold text-gray-700 mb-2">
                          Listo para escanear
                        </h3>
                        <p className="text-gray-500 text-sm">
                          Presiona "Iniciar Escaneo" para comenzar
                        </p>
                        <p className="text-xs text-gray-400 mt-2">
                          {employees.length} empleados cargados
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-2xl font-semibold">
                    Escáner de empleados
                    <FiCamera className="text-blue-500" />
                  </CardTitle>
                  <CardDescription>
                    Escanea el código QR de los empleados para registrar su
                    asistencia
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-3">
                    {!isScanning ? (
                      <button
                        onClick={startScanning}
                        className="flex items-center gap-2  bg-[#00BF40] hover:bg-[#00a636] text-white px-4 py-2 rounded-md font-medium transition-colors"
                      >
                        <FiCamera className="w-4 h-4" />
                        Iniciar Escaneo
                      </button>
                    ) : (
                      <button
                        onClick={stopScanning}
                        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-medium transition-colors"
                      >
                        <FiSquare className="w-4 h-4" />
                        Detener Escaneo
                      </button>
                    )}
                  </div>
                </CardContent>
              </Card>
              {/* Tips Card */}
              <Card className="bg-blue-50 border-blue-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base font-semibold">
                    <FiInfo className="text-blue-500" />
                    Consejos para un mejor escaneo
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-600">
                        Asegúrate de tener una buena iluminación
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-600">
                        Mantén el código QR estable y centrado
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-600">
                        El escaneo se detiene automáticamente
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-600">
                        Permite el acceso a la cámara
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="fixed inset-0  flex items-center justify-center p-4">
              <Card className="w-full max-w-md h-auto min-h-[400px] flex flex-col">
                <CardHeader className="flex-none">
                  <CardTitle className="text-xl font-semibold flex items-center gap-2">
                    <FiUser className="text-blue-500" />
                    {empleadoEncontrado
                      ? "Empleado Encontrado"
                      : "Empleado No Encontrado"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-between">
                  {empleadoEncontrado ? (
                    <>
                      <div className="space-y-4 ">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-xl font-semibold text-gray-800">
                            {empleadoEncontrado.nombre}
                          </p>
                          <div className="mt-3 space-y-2">
                            <p className="text-sm text-gray-600 flex items-center gap-2">
                              <span className="font-medium">Cédula:</span>{" "}
                              {empleadoEncontrado.cedula}
                            </p>
                            <p className="text-sm text-gray-600 flex items-center gap-2">
                              <span className="font-medium">Departamento:</span>{" "}
                              {empleadoEncontrado.departamento}
                            </p>
                            <p className="text-sm text-gray-600 flex items-center gap-2">
                              <span className="font-medium">Cargo:</span>{" "}
                              {empleadoEncontrado.cargo}
                            </p>
                            <div className="text-sm text-gray-600">
                              <span className="font-medium">Proyectos:</span>
                              <ul className="list-disc list-inside mt-1 ml-2">
                                {empleadoEncontrado.proyecto.map((proyecto, index) => (
                                  <li key={index}>{proyecto.nombre}</li>
                                ))}
                              </ul>
                            </div>
                            <p className="text-sm text-gray-600 flex items-center gap-2">
                              <span className="font-medium">Teléfono:</span>{" "}
                              {empleadoEncontrado.telefono}
                            </p>
                            
                            {/* Selección de Proyecto */}
                            <div className="mt-4 pt-4 border-t border-gray-200">
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                {empleadoEncontrado.proyecto.length > 1 
                                  ? "Selecciona el proyecto para esta asistencia:" 
                                  : "Proyecto asignado:"}
                              </label>
                              {empleadoEncontrado.proyecto.length > 1 ? (
                                <select 
                                  value={selectedProjectId}
                                  onChange={(e) => setSelectedProjectId(e.target.value)}
                                  className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500 bg-white"
                                >
                                  <option value="">-- Selecciona un proyecto --</option>
                                  {empleadoEncontrado.proyecto.map((p) => (
                                    <option key={p.id} value={p.id}>{p.nombre}</option>
                                  ))}
                                </select>
                              ) : (
                                <div className="p-2 bg-blue-50 text-blue-700 rounded-md text-sm font-medium">
                                  {empleadoEncontrado.proyecto[0]?.nombre || "Sin proyecto asignado"}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col  gap-3 pt-6 mt-auto ">
                        <Button
                          onClick={handleConfirmarAsistencia}
                          disabled={submitting || (empleadoEncontrado.proyecto.length > 1 && !selectedProjectId)}
                          className="w-full bg-[#00BF40] hover:bg-[#00a636] cursor-pointer h-12"
                        >
                          {submitting ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          ) : (
                            <FiCheckCircle className="mr-2" />
                          )}
                          {submitting ? "Registrando..." : "Confirmar Asistencia"}
                        </Button>
                        <Button
                          onClick={() => {
                            setScanResult(null);
                            setEmpleadoEncontrado(undefined);
                          }}
                          variant="outline"
                          className="w-full h-12 cursor-pointer"
                        >
                          Cancelar
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col justify-center items-center h-full">
                      <div className="text-center space-y-4">
                        <p className="text-red-500 text-lg">
                          No se encontró ningún empleado con este QR
                        </p>
                        <div className="bg-gray-50 p-4 rounded-lg text-left">
                          <p className="text-sm text-gray-600 mb-2">
                            <span className="font-medium">Cédula escaneada:</span> {scanResult}
                          </p>
                          <p className="text-sm text-gray-600 mb-2">
                            <span className="font-medium">Tipo de dato:</span> {typeof scanResult}
                          </p>
                          <p className="text-sm text-gray-600 mb-2">
                            <span className="font-medium">Total empleados cargados:</span> {employees.length}
                          </p>
                          <details className="text-xs text-gray-500">
                            <summary className="cursor-pointer hover:text-gray-700">
                              Ver cédulas disponibles (primeras 5)
                            </summary>
                            <div className="mt-2 space-y-1">
                              {employees.slice(0, 5).map((emp, index) => (
                                <div key={index} className="flex justify-between">
                                  <span>{emp.name}:</span>
                                  <span className="font-mono">{emp.cedula} ({typeof emp.cedula})</span>
                                </div>
                              ))}
                              {employees.length > 5 && (
                                <p className="text-gray-400">... y {employees.length - 5} más</p>
                              )}
                            </div>
                          </details>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button
                            onClick={() => {
                              setScanResult(null);
                              setEmpleadoEncontrado(undefined);
                            }}
                            variant="outline"
                            className="w-full"
                          >
                            Volver a escanear
                          </Button>
                          <Button
                            onClick={() => {
                              console.log('🔍 Debug info:');
                              console.log('Cédula escaneada:', scanResult, typeof scanResult);
                              console.log('Empleados:', employees);
                              console.log('Comparación parseInt:', parseInt(scanResult));
                              console.log('Comparación string:', scanResult.toString());
                            }}
                            variant="outline"
                            className="w-full text-xs"
                          >
                            Ver logs en consola
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </motion.div>
      </PageLayout>
    </>
  );
}

export default Escaner;
