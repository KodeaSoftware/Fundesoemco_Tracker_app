// Componentes
import LoginComponent from "../ui/login/LoginComponent";

// Motion animaciones
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

function Login() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <div className="bg-gray-50 w-screen h-screen flex relative items-center p-20 overflow-hidden ">
        <LoginComponent />

        <img
          src="img-login.webp"
          alt="trabajadores"
          className="absolute right-[-600px] "
        />
      </div>
    </motion.div>
  );
}

export default Login;
