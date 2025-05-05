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
import { CiUser } from "react-icons/ci";

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
        <h2 className="font-semibold">{props.pageTitle}</h2>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Inicio</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink>
                  <Link to="/">Dashboard</Link>
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Proyectos</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink>
                  <Link to="new-employee">Crear empleado</Link>
                </NavigationMenuLink>
                <NavigationMenuLink>
                  <Link to="new-coordinator">Crear coordinador</Link>
                </NavigationMenuLink>

                <NavigationMenuLink>
                  <Link to="project-list">Lista de proyectos</Link>
                </NavigationMenuLink>
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
