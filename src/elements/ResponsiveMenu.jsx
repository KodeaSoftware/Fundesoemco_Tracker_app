import { Link } from "react-router-dom";
import { FiUsers } from "react-icons/fi";
import { FiUserPlus } from "react-icons/fi";
import { LuUserCog } from "react-icons/lu";
import { RxDashboard } from "react-icons/rx";
import { GoProjectRoadmap } from "react-icons/go";

function ResponsiveMenu(props) {
  return (
    <div className="bg-white w-[300px] h-[100vh] top-0 left-0 absolute shadow-lg p-6">
      <div className="flex flex-row items-center gap-2 h-15 w-full mb-5 border-b-1 p-2">
        <img
          src="fundesoemco-logo.png"
          alt="fundesoemco-logo"
          className="w-10 h-9"
        />
        <h2 className=" font-bold text-md ">{props.pageTitle}</h2>
      </div>
      <nav className="flex flex-col space-y-4">
        <Link
          to="/"
          className=" p-2 flex items-center justify-start gap-2 rounded-sm text-gray-700 hover:bg-gray-100 font-semibold hover:transition-transform duration-300 ease-in-out "
        >
          Dashboard
          <RxDashboard className="text-black-100" />
        </Link>
        <Link
          to="/project-list"
          className=" p-2 flex items-center justify-start gap-2 rounded-sm text-gray-700 hover:bg-gray-100 font-semibold hover:transition-transform duration-300 ease-in-out "
        >
          Lista de Proyectos
          <GoProjectRoadmap className="text-black-100" />
        </Link>
        <Link
          to="/employee-list"
          className=" p-2 flex items-center justify-start gap-2 rounded-sm text-gray-700 hover:bg-gray-100 font-semibold hover:transition-transform duration-300 ease-in-out "
        >
          Lista de Empleados
          <FiUsers className="text-black-100" />
        </Link>
        <Link
          to="/coordinator-list"
          className=" p-2 flex items-center justify-start gap-2 rounded-sm text-gray-700 hover:bg-gray-100 font-semibold hover:transition-transform duration-300 ease-in-out "
        >
          Lista de Coordinadores
          <LuUserCog className="text-black-100" />
        </Link>
      </nav>
    </div>
  );
}

export default ResponsiveMenu;
