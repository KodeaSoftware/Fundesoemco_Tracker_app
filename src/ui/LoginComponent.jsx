import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function LoginComponent() {
  return (
    <div className="w-100 h-120 border rounded-md flex flex-col justify-center items-center bg-white shadow-lg shadow-gray-200 font-[Noto sans]">
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
        <Input placeholder="example@fundesoemco.com" />
        <label htmlFor="password" className="font-medium start w-full ">
          Contraseña
        </label>

        <Input placeholder="" />

        <Link
          className="text-sm text-[#00BF40] absolute right-0 bottom-40"
          to="/forgot-password"
        >
          ¿Olvidaste tu contraseña?
        </Link>
        <Button
          type="submit"
          className="w-full mt-4 bg-[#00BF40] hover:bg-[#00a636] cursor-pointer "
          onClick={(e) => {
            e.preventDefault();
            location.href = "/";
          }}
        >
          Iniciar Sesión
        </Button>
      </form>
    </div>
  );
}

export default LoginComponent;
