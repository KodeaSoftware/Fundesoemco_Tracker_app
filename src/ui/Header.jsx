import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import { FiUsers } from "react-icons/fi";
import { FiUserPlus } from "react-icons/fi";
import { LuUserCog } from "react-icons/lu";
import { RxDashboard } from "react-icons/rx";
import { GoProjectRoadmap } from "react-icons/go";

function Header(props) {
  return (
    <>
      <header
        className=" h-15 flex items-center gap-5 font-[Noto sans]  px-4 absolute top-0 z-10 
     left-0 right-0 
     bg-white w-full border"
      >
        <img
          src="fundesoemco-logo.png"
          alt="fundesoemco-logo"
          className="w-10"
        />
        <h2 className="font-semibold w-[150px] ">{props.pageTitle}</h2>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Inicio</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-[120px] flex flex-col gap-3 font-[Noto sans]">
                  <NavigationMenuLink>
                    <Link
                      to="/"
                      className="flex flex-wrap gap-2 font-semibold justify-between"
                    >
                      Dashboard
                      <RxDashboard className="text-black-100" />
                    </Link>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Proyectos</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-[200px] flex flex-col gap-3 font-[Noto sans]">
                  <NavigationMenuLink>
                    <Link
                      to="/project-list"
                      className="flex flex-wrap gap-2 font-semibold justify-between"
                    >
                      Lista de proyectos
                      <GoProjectRoadmap className="text-black-100" />
                    </Link>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>RRHH</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-[200px] flex flex-col gap-3 font-[Noto sans]">
                  <NavigationMenuLink>
                    <Link
                      to="/employee-list"
                      className="flex flex-wrap gap-2 font-semibold justify-between "
                    >
                      Lista de empleados
                      <FiUsers className="text-black-100" />
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink>
                    <Link
                      to="/employee-list"
                      className="flex flex-wrap gap-2 font-semibold justify-between"
                    >
                      Lista de coordinadores
                      <LuUserCog className="text-black-100" />
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink>
                    <Link
                      to="employee-list"
                      className="flex flex-wrap gap-2 font-semibold justify-between"
                    >
                      Crear empleado
                      <FiUserPlus className="text-back-100" />
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink>
                    <Link
                      to="employee-list"
                      className="flex flex-wrap gap-2 justify-between font-semibold"
                    >
                      Crear coordinador
                      <FiUserPlus className="text-black-100" />
                    </Link>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="ml-auto flex items-center gap-4">
          <Link
            to="/login"
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Cerrar sesión
          </Link>
        </div>
      </header>
    </>
  );
}
export default Header;
