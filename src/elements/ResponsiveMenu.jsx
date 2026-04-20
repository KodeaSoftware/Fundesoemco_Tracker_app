import { Link } from "react-router-dom";
import { FiUsers } from "react-icons/fi";
import { FiUserPlus } from "react-icons/fi";
import { LuUserCog } from "react-icons/lu";
import { RxDashboard } from "react-icons/rx";
import { GoProjectRoadmap } from "react-icons/go";
import { FaQrcode } from "react-icons/fa";
import UserAccount from "./UserAccount";

function ResponsiveMenu(props) {
  return (
    <div className="bg-white w-[300px] h-[100vh] top-0 left-0 absolute shadow-lg p-6 ">
      <div className="flex flex-row items-center gap-2 h-15 w-full mb-5 w-[100%] border-b-1 ">
        <UserAccount email={props.email} />
      </div>
      <nav className="flex flex-col space-y-4 text-sm ">
        <Link
          to="/"
          className=" p-2 flex  items-center justify-start gap-2 rounded-sm text-gray-700 hover:bg-gray-100 font-semibold hover:transition-transform duration-300 ease-in-out "
        >
          <RxDashboard className="text-black-100" />
          Dashboard
        </Link>
        <hr className="border-gray-200" />
        <Link
          to="/project-list"
          className=" p-2 flex items-center justify-start gap-2 rounded-sm text-gray-700 hover:bg-gray-100 font-semibold hover:transition-transform duration-300 ease-in-out "
        >
          <GoProjectRoadmap className="text-black-100" />
          Lista de Proyectos
        </Link>
        <hr className="border-gray-200" />
        <Link
          to="/employee-list"
          className=" p-2 flex items-center justify-start gap-2 rounded-sm text-gray-700 hover:bg-gray-100 font-semibold hover:transition-transform duration-300 ease-in-out "
        >
          <FiUsers className="text-black-100" />
          Lista de Empleados
        </Link>
        {localStorage.getItem("role") === "rrhh" && (
          <>
            <hr className="border-gray-200" />
            <Link
              to="/coordinator-list"
              className=" p-2 flex items-center justify-start gap-2 rounded-sm text-gray-700 hover:bg-gray-100 font-semibold hover:transition-transform duration-300 ease-in-out "
            >
              <LuUserCog className="text-black-100" />
              Lista de Coordinadores
            </Link>
          </>
        )}
        <hr className="border-gray-200" />
        <Link
          to="/escaner"
          className=" p-2 flex items-center justify-start gap-2 rounded-sm text-gray-700 hover:bg-gray-100 font-semibold hover:transition-transform duration-300 ease-in-out "
        >
          <FaQrcode className="text-black-100" />
          Escáner QR
        </Link>
      </nav>
    </div>
  );
}

export default ResponsiveMenu;
