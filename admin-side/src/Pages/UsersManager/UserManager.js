import Background from "../../Components/Background/Backrgound.js";
import MySidebar from "../../Components/Sidebar/MySidebar.js";
import ManagerCard from "../../Components/Cards/ManagerCard/ManagerCard.js"
import './UserManager.css'
import UsersTable from "../../Components/UsersTable/UsersTable.js";



function UserManager() {
    return (
      <div className="user-manage">
        <Background/>
        
        <MySidebar/>
        <ManagerCard/>
        <UsersTable/>
      </div>
    );
  }
  
export default UserManager;
  