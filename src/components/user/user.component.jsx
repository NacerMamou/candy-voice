import { useContext } from "react";
import { UserContext } from "../../context/user.context";

const User = () => {
  const { userAccountInfos } = useContext(UserContext);
  return (
    <div className="user-container">
      <h2 className="user-title">User informations:</h2>
      <div className="user-email">Email : {userAccountInfos.email}</div>
      <div className="user-id">Id : {userAccountInfos.id}</div>
      <div className="user-tickets">
        Number of tickets : {userAccountInfos.tickets}
      </div>
      <div className="user-language">
        Language : {userAccountInfos.language}
      </div>
    </div>
  );
};

export default User;
