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
import { LuUserCog } from "react-icons/lu";
import { RxDashboard } from "react-icons/rx";
import { GoProjectRoadmap } from "react-icons/go";
import { IoMenuSharp } from "react-icons/io5";
import { FaQrcode } from "react-icons/fa";
import { useState } from "react";
import ResponsiveMenu from "./ResponsiveMenu";

// motion animaciones
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "motion/react";
import UserAccount from "./UserAccount";

function Header(props) {
  const userData = {
    email: "sebaszapata2022@gmail.com",
    photo: "",
  };

  const [displayMenu, setDisplayMenu] = useState(false);
  const closeMenu = () => setDisplayMenu(false);

  const handleResponsiveMenu = () => {
    setDisplayMenu(true);
  };

  const getIconForPageTitle = (title) => {
    switch (title) {
      case "Dashboard":
        return <RxDashboard className="text-black-100" />;
      case "Lista de proyectos":
        return <GoProjectRoadmap className="text-black-100" />;
      case "Lista de empleados":
        return <FiUsers className="text-black-100" />;
      case "Lista de coordinadores":
        return <LuUserCog className="text-black-100" />;
      case "Escaner":
        return <FaQrcode className="text-black-100" />;
      default:
        return null;
    }
  };

  return (
    <>
      <header className="sticky top-0 bg-white z-10 border-b-1  w-full m-0 h-15 block pl-9 pr-11 sm:hidden right-0 flex items-center justify-between">
        <h1 className="text-md font-semibold flex items-center gap-2">
          <button
            className="w-[40px] h-[40px]  cursor-pointer bg-white flex items-center justify-center text-2xl border-1 rounded-md"
            onClick={handleResponsiveMenu}
          >
            <IoMenuSharp />
          </button>
          <img
            src="/fundesoemco-logo.png"
            alt="fundesoemco-logo"
            className="w-10 absolute right-[40px]"
          />
          {props.pageTitle}
          {getIconForPageTitle(props.pageTitle)}
        </h1>
      </header>
      <AnimatePresence>
        {displayMenu && (
          <motion.div
            className="fixed inset-0 bg-black/40 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={closeMenu}
          >
            <motion.div
              className="absolute top-0 left-0 bg-red-200 w-[300px] h-screen z-50"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.1, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <ResponsiveMenu
                pageTitle={props.pageTitle}
                email={userData.email}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <header
        className=" sticky hidden sm:block sm:h-15 sm:flex sm:items-center sm:gap-5 sm:font-[Noto sans]  sm:px-4  top-0 z-10 
     left-0 right-0 
     bg-white w-full border
   
     "
      >
        <img
          src="/fundesoemco-logo.png"
          alt="fundesoemco-logo"
          className="w-10"
        />
        <h2 className="font-semibold w-[250px] flex items-center gap-2">
          {props.pageTitle}
          {getIconForPageTitle(props.pageTitle)}
        </h2>
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
                      to="/coordinator-list"
                      className="flex flex-wrap gap-2 font-semibold justify-between"
                    >
                      Lista de coordinadores
                      <LuUserCog className="text-black-100" />
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
              <NavigationMenuTrigger>Herramientas</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-[200px] flex flex-col gap-3 font-[Noto sans]">
                  <NavigationMenuLink>
                    <Link
                      to="/escaner"
                      className="flex flex-wrap gap-2 font-semibold justify-between"
                    >
                      Escáner QR
                      <FaQrcode className="text-black-100" />
                    </Link>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="ml-auto flex items-center gap-4">
          <UserAccount email={userData.email} />
        </div>
      </header>
    </>
  );
}
export default Header;
