import LoginComponent from "../ui/LoginComponent";

function Login() {
  return (
    <div className="bg-gray-50 w-screen h-screen flex relative items-center p-20 overflow-hidden ">
      <LoginComponent />
      <img
        src="img-login.webp"
        alt="trabajadores"
        className="absolute right-[-600px] "
      />
    </div>
  );
}

export default Login;
