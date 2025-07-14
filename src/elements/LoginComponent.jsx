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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginData = {
      correo: email,
      password: password,
      role: role
    }
    const auth = await login(loginData)
    localStorage.setItem("token", auth.token)
    localStorage.setItem("role", auth.role)
    localStorage.setItem("correo", auth.correo)
  };
  return (
    <div className="w-100 h-140 border rounded-md flex flex-col justify-center items-center bg-white shadow-lg shadow-gray-200 font-[Noto sans]">
      <form
        action=""
        className="flex flex-col gap-4 flex relative  w-80 h-full justify-center items-center"
      >
        <img
          src="fundesoemco-logo.png"
          alt="fundesoemco-logo"
          className="w-15 "
        />
        <h1 className=" text-2xl font-bold">Fundesoemco Attendance</h1>
        <p className="font-light text-sm color-stone-500 text-center">
          Ingresa tus credenciales para acceder al sistema
        </p>
        <label htmlFor="email" className="font-medium text-start w-full mt-6">
          Email
        </label>
        <Input
          placeholder="example@fundesoemco.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password" className="font-medium start w-full ">
          Contraseña
        </label>
        <Input
          placeholder=""
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Link
          className="text-sm text-[#00BF40] absolute right-0 bottom-60"
          to="/forgot-password"
        >
          ¿Olvidaste tu contraseña?
        </Link>
        <label htmlFor="password" className="font-medium start w-full ">
          Rol
        </label>
        <Select value={role} onValueChange={setRole}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione uno" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rrhh">RRHH</SelectItem>
            <SelectItem value="coordinador">Coordinador</SelectItem>
          </SelectContent>
        </Select>
        <Button
          type="submit"
          className="w-full mt-4 bg-[#00BF40] hover:bg-[#00a636] cursor-pointer "
          onClick={handleSubmit}
        >
          Iniciar Sesión
        </Button>
      </form>
    </div>
  );
}

export default LoginComponent;
