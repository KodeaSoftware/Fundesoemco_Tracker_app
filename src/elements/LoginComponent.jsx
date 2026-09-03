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

function LoginComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
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
        // Redirigir al dashboard
        window.location.href = "/";
      } else {
        setErrorMsg("Credenciales inválidas o error en la respuesta");
      }
    } catch (err) {
      console.error("Error en submit login:", err);
      setErrorMsg(err.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute w-full left-0 top-0 bottom-0 h-full sm:relative sm:w-100 sm:h-140 border rounded-md flex flex-col justify-center items-center bg-white shadow-lg shadow-gray-200 font-[Noto sans]">
      <form
        onSubmit={handleSubmit}
        className="flex p-[30px] sm:p-0 flex-col gap-5 sm:gap-4 relative w-80 h-full justify-center items-center w-full sm:w-auto"
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
          <div className="w-full p-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded text-center">
            {errorMsg}
          </div>
        )}

        <label htmlFor="email" className="font-medium text-start w-full mt-2">
          Email
        </label>
        <Input
          id="email"
          className="h-12 sm:h-auto text-[17px]"
          placeholder="example@fundesoemco.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password" className="font-medium text-start w-full">
          Contraseña
        </label>
        <Input
          id="password"
          className="h-12 sm:h-auto text-[17px]"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="w-full flex justify-end">
          <Link
            className="text-[14px] text-[#00BF40] hover:underline"
            to="/forgot-password"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        <label htmlFor="role" className="font-medium text-start w-full">
          Rol
        </label>
        <Select value={role} onValueChange={setRole}>
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
