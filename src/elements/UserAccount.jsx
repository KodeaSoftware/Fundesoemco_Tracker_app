import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

function UserAccount({ email, photo }) {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={modalRef}>
      <button
        onClick={handleToggle}
        className="flex items-center h-12 cursor-pointer gap-3 hover:bg-gray-100 p-4 rounded-lg transition-colors"
      >
        <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-200">
          {photo ? (
            <img
              src={photo}
              alt="Foto de perfil"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-600">
              {email?.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <span className="text-md font-medium text-gray-700 max-w-[120px] sm:max-w-[200px] truncate">
          {email}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed sm:absolute right-0 mt-2 w-[50vw] sm:w-full bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50
            sm:right-0 sm:left-auto
            left-1/2 -translate-x-1/2 sm:translate-x-0
            top-[60px] sm:top-auto flex flex-col"
          >
            <div className="px-4 py-3 border-b border-gray-100 ">
              <p className="text-sm font-medium text-gray-900 truncate">
                {email}
              </p>
            </div>
            <div className="px-2 py-2 flex flex-col gap-3">
              <button
                className=" cursor-pointer w-full text-left text-sm text-red-600 hover:bg-red-50 px-3 py-2 rounded-md transition-colors"
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.href = "/login";
                }}
              >
                Cerrar sesión
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default UserAccount;
