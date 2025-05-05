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

function Header(props) {
  return (
    <>
      <header
        className=" h-13 flex items-center gap-5 font-[Noto sans]  px-4 shadow-md absolute top-0 z-10 
     left-0 right-0 
     bg-white w-full border-solid"
      >
        <img
          src="fundesoemco-logo.png"
          alt="fundesoemco-logo"
          className="w-10"
        />
        <h2 className="text-xl font-semibold">{props.pageTitle}</h2>
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
      </header>
    </>
  );
}
export default Header;
