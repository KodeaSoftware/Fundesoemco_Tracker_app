// Componentes
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { login } from "../utils/auth";
import { FiMail, FiLock, FiEye, FiEyeOff, FiShield } from "react-icons/fi";

function LoginComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!role) {
      setErrorMsg("Por favor selecciona un rol");
      return;
    }

    try {
      setLoading(true);
      const loginData = {
        correo: email.trim(),
        password: password,
        role: role
      };

      const auth = await login(loginData);

      if (auth && auth.token) {
        localStorage.setItem("token", auth.token);
        localStorage.setItem("role", auth.role);
        localStorage.setItem("correo", auth.correo);
        if (auth.nombre) {
          localStorage.setItem("nombre", auth.nombre);
        }
        // Redirigir al dashboard
        window.location.href = "/";
      } else {
        setErrorMsg("Correo o contraseña incorrectos");
      }
    } catch (err) {
      console.error("Error en submit login:", err);
      const rawMsg = err.message || "";
      if (
        rawMsg.includes("500") ||
        rawMsg.toLowerCase().includes("internal") ||
        rawMsg.toLowerCase().includes("failed auth") ||
        rawMsg.toLowerCase().includes("no encontrado") ||
        rawMsg.toLowerCase().includes("contrase") ||
        rawMsg.toLowerCase().includes("incorrect") ||
        rawMsg.toLowerCase().includes("credenciales")
      ) {
        setErrorMsg("Correo o contraseña incorrectos");
      } else {
        setErrorMsg(rawMsg || "Correo o contraseña incorrectos");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute w-full left-0 top-0 bottom-0 h-full sm:relative sm:w-100 sm:min-h-140 sm:h-auto py-8 sm:py-6 border rounded-md flex flex-col justify-center items-center bg-white shadow-lg shadow-gray-200 font-[Noto sans] overflow-y-auto">
      <form
        onSubmit={handleSubmit}
        className="flex p-[30px] sm:p-0 flex-col gap-5 sm:gap-4 relative w-80 h-auto justify-center items-center w-full sm:w-auto"
      >
        <img
          src="fundesoemco-logo.png"
          alt="fundesoemco-logo"
          className="w-15"
        />
        <h1 className="text-2xl font-bold">Fundesoemco Attendance</h1>
        <p className="font-light text-sm text-stone-500 text-center">
          Ingresa tus credenciales para acceder al sistema
        </p>

        {errorMsg && (
          <div className="w-full px-3.5 py-2.5 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md flex items-center gap-2.5 text-left shadow-xs animate-in fade-in duration-150">
            <svg
              className="w-4 h-4 text-red-500 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="leading-snug">{errorMsg}</span>
          </div>
        )}

        <label htmlFor="email" className="font-medium text-start w-full mt-2 flex items-center gap-2">
          <FiMail className="text-[#00BF40]" />
          Email
        </label>
        <Input
          id="email"
          className="h-12 sm:h-auto text-[17px]"
          placeholder="example@fundesoemco.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errorMsg) setErrorMsg("");
          }}
          required
        />

        <label htmlFor="password" className="font-medium text-start w-full flex items-center gap-2">
          <FiLock className="text-[#00BF40]" />
          Contraseña
        </label>
        <div className="relative w-full flex items-center">
          <Input
            id="password"
            className="h-12 sm:h-auto text-[17px] pr-10"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errorMsg) setErrorMsg("");
            }}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
            aria-label={showPassword ? "Ocultar contraseña" : "Ver contraseña"}
            className="absolute right-3 text-stone-400 hover:text-stone-600 focus:outline-none cursor-pointer transition-colors"
          >
            {showPassword ? (
              <FiEyeOff className="w-4 h-4" />
            ) : (
              <FiEye className="w-4 h-4" />
            )}
          </button>
        </div>

        <div className="w-full flex justify-end">
          <Link
            className="text-[14px] text-[#00BF40] hover:underline"
            to="/forgot-password"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        <label htmlFor="role" className="font-medium text-start w-full flex items-center gap-2">
          <FiShield className="text-[#00BF40]" />
          Rol
        </label>
        <Select
          value={role}
          onValueChange={(val) => {
            setRole(val);
            if (errorMsg) setErrorMsg("");
          }}
        >
          <SelectTrigger id="role" className="h-12 sm:h-auto text-[17px] w-full sm:text-[13px]">
            <SelectValue placeholder="Seleccione uno" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rrhh">RRHH</SelectItem>
            <SelectItem value="coordinador">Coordinador</SelectItem>
          </SelectContent>
        </Select>

        <Button
          type="submit"
          disabled={loading}
          className="w-full mt-4 bg-[#00BF40] hover:bg-[#00a636] cursor-pointer text-white h-11"
        >
          {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
        </Button>
      </form>
    </div>
  );
}

export default LoginComponent;
