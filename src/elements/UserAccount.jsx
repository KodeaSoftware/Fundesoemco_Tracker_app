import { FaUserCircle } from "react-icons/fa";

function UserAccount(props) {
  return (
    <div className="bg-red-200 p-2 flex flex-wrap gap-2 items-center justify-center">
      <h2>{props.userName}</h2>
      <FaUserCircle className="" />
    </div>
  );
}

export default UserAccount;
