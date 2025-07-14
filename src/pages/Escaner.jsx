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
import { getEmployees } from "../utils/employees";

// Array de ejemplo de empleados


function Escaner() {
  const [scanResult, setScanResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanner, setScanner] = useState(null);
  const [empleadoEncontrado, setEmpleadoEncontrado] = useState(undefined);

  const employees = getEmployees()
  console.log(employees)

  useEffect(() => {
    return () => {
      if (scanner) {
        scanner.clear();
      }
    };
  }, [scanner]);

  useEffect(() => {
    if (scanResult) {
      // Buscar el empleado en el array
      const empleado = employees.map(
        (emp) => emp.cedula === parseInt(scanResult)
      );
      setEmpleadoEncontrado(empleado);
    }
  }, [scanResult]);

  const handleConfirmarAsistencia = () => {
    // Aquí puedes agregar la lógica para confirmar la asistencia
    alert(`Asistencia confirmada para ${empleadoEncontrado.name}`);
    setScanResult(null);
    setEmpleadoEncontrado(null);
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
          {!scanResult ? (
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
                            {empleadoEncontrado.name}
                          </p>
                          <div className="mt-3 space-y-2">
                            <p className="text-sm text-gray-600 flex items-center gap-2">
                              <span className="font-medium">Cédula:</span>{" "}
                              {empleadoEncontrado.cedula}
                            </p>
                            <p className="text-sm text-gray-600 flex items-center gap-2">
                              <span className="font-medium">Departamento:</span>{" "}
                              {empleadoEncontrado.department}
                            </p>
                            <p className="text-sm text-gray-600 flex items-center gap-2">
                              <span className="font-medium">Cargo:</span>{" "}
                              {empleadoEncontrado.cargo}
                            </p>
                            <p className="text-sm text-gray-600 flex items-center gap-2">
                              <span className="font-medium">Contrato:</span>{" "}
                              {empleadoEncontrado.contrato}
                            </p>
                            <p className="text-sm text-gray-600 flex items-center gap-2">
                              <span className="font-medium">Teléfono:</span>{" "}
                              {empleadoEncontrado.phone}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col  gap-3 pt-6 mt-auto ">
                        <Button
                          onClick={handleConfirmarAsistencia}
                          className="w-full bg-[#00BF40] hover:bg-[#00a636] cursor-pointer h-12"
                        >
                          <FiCheckCircle className="mr-2" />
                          Confirmar Asistencia
                        </Button>
                        <Button
                          onClick={() => {
                            setScanResult(null);
                            setEmpleadoEncontrado(null);
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
                        <Button
                          onClick={() => {
                            setScanResult(null);
                            setEmpleadoEncontrado(null);
                          }}
                          variant="outline"
                          className="w-full sm:w-auto"
                        >
                          Volver a escanear
                        </Button>
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
