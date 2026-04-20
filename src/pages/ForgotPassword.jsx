// Componentes
import ForgotPasswordComponent from "../elements/ForgotPasswordComponent";

// Motion animaciones
import { motion } from "motion/react";

function ForgotPassword() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <div className="bg-gray-50 w-screen h-screen flex relative items-center justify-center sm:p-20 overflow-hidden ">
        <ForgotPasswordComponent />
      </div>
    </motion.div>
  );
}

export default ForgotPassword;
