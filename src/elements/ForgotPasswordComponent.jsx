// Componentes
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { forgotPassword, resetPassword } from "../utils/auth";
import { FiMail, FiLock, FiCheckCircle } from "react-icons/fi";

function ForgotPasswordComponent() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(1); // 1: Pedir email, 2: Resetear con código
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSendCode = async (e) => {
    e.preventDefault();
    if (!email) return setError("Por favor ingresa tu correo");
    
    setLoading(true);
    setError("");
    try {
      await forgotPassword(email);
      setStep(2);
    } catch (err) {
      setError(err.message || "Error al enviar el código");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!code || !password || !confirmPassword) return setError("Todos los campos son obligatorios");
    if (password !== confirmPassword) return setError("Las contraseñas no coinciden");
    
    setLoading(true);
    setError("");
    try {
      await resetPassword({ correo: email, code, newPassword: password });
      alert("Contraseña restablecida con éxito. Ahora puedes iniciar sesión.");
      navigate("/login");
    } catch (err) {
      setError(err.message || "Error al restablecer la contraseña");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute w-full left-0 top-0 bottom-0 h-full sm:relative sm:w-105 sm:h-auto py-10 border rounded-xl flex flex-col justify-center items-center bg-white shadow-2xl shadow-gray-200 font-[Noto sans] px-8">
      <div className="flex flex-col gap-6 w-full max-w-sm items-center">
        <img
          src="fundesoemco-logo.png"
          alt="fundesoemco-logo"
          className="w-16 mb-2"
        />
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-800">
            {step === 1 ? "Recuperar Acceso" : "Nueva Contraseña"}
          </h1>
          <p className="text-gray-500 text-sm">
            {step === 1 
              ? "Ingresa tu correo para recibir un código de verificación" 
              : `Hemos enviado un código a ${email}`}
          </p>
        </div>

        {error && (
          <div className="w-full p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg text-center animate-pulse">
            {error}
          </div>
        )}

        <form className="w-full flex flex-col gap-5" onSubmit={step === 1 ? handleSendCode : handleResetPassword}>
          {step === 1 ? (
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <FiMail className="text-[#00BF40]" /> Correo Electrónico
              </label>
              <Input
                type="email"
                placeholder="juan.perez@fundesoemco.org"
                className="h-12 border-gray-200 focus:ring-[#00BF40] text-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <FiCheckCircle className="text-[#00BF40]" /> Código de 6 dígitos
                </label>
                <Input
                  placeholder="000000"
                  maxLength={6}
                  className="h-12 border-gray-200 text-center tracking-widest text-2xl font-bold"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <FiLock className="text-[#00BF40]" /> Nueva Contraseña
                </label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="h-12 border-gray-200"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <FiLock className="text-[#00BF40]" /> Confirmar Contraseña
                </label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="h-12 border-gray-200"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={loading}
                />
              </div>
            </>
          )}

          <Button
            type="submit"
            className="w-full h-12 mt-4 bg-[#00BF40] hover:bg-[#00a636] text-white font-bold rounded-lg transition-all shadow-lg shadow-green-100 flex items-center justify-center gap-2"
            disabled={loading}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              step === 1 ? "Enviar Código" : "Restablecer Contraseña"
            )}
          </Button>

          <div className="text-center mt-2">
            <Link to="/login" className="text-sm text-[#00BF40] hover:underline font-medium">
              Volver al inicio de sesión
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPasswordComponent;
