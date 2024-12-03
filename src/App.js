
import { Routes, Route } from "react-router-dom";
import Protected from "./Protected/Protected";
import UserManagement from './components/SuperAdmin/UserManagement';
import Login from './components/Login/Login';
import Login1 from './components/Login/Login1';
import Login2 from './components/Login/Login2';
import Login3 from './components/Login/Login';
import QmsLibrary from "./components/SuperAdmin/QMSLibrary";
import ForgotPassword from "./components/Login/ForgotPassword";
import FolderCards from "./components/SuperAdmin/QMSLibrary/Card/FolderCards";
import ListFiles from "./components/SuperAdmin/QMSLibrary/Card/FolderCards/ListFiles";
import AdminQmsLibrary from "./components/Admin/QmsLibraryAdmin";
import AdminFolderCards from "./components/Admin/QmsLibraryAdmin/Card/FolderCards";
import AdminListFiles from "./components/Admin/QmsLibraryAdmin/Card/FolderCards/ListFiles";
import SuperAdminSubDirListFiles from "./components/SuperAdmin/QMSLibrary/Card/FolderCards/addFoldertoDir/SubDirListFiles";
import AdminSubDirListFiles from "./components/Admin/QmsLibraryAdmin/Card/FolderCards/addFoldertoDir/SubDirListFiles";
 import UserSubDirListFiles from "./components/User/QmsLibraryUser/Card/FolderCards/addFoldertoDir/SubDirListFiles";
import UserQmsLibrary from "./components/User/QmsLibraryUser";
import UserFolderCards from "./components/User/QmsLibraryUser/Card/FolderCards";
import UserListFiles from "./components/User/QmsLibraryUser/Card/FolderCards/ListFiles";
import Helpdesk from "./components/SuperAdmin/Helpdesk/Helpdesk";
import UserHelpdesk from "./components/User/Helpdesk/Helpdesk";
import  AdminHelpdesk from "./components/Admin/Helpdesk/Helpdesk";
import AdminUserList from "./components/Admin/UserList/UserList";
import AdminDownloadLogs from "./components/Admin/DownloadLogsAdmin/DownloadLogs";
import DownloadLogs from "./components/SuperAdmin/DownloadLogs/DownloadLogs";
import UserDownloadLogs from "./components/User/DownloadLogs/DownloadLogs";

function App() {
  return (
    
      <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/login1" element={<Login1 />} />
              <Route path="/login2" element={<Login2 />} />
              <Route path="/login3" element={<Login3 />} />
              <Route path="/forgotPassword" element={<ForgotPassword />} />
              
             <>

{/* SuperAdmin */}

          {/* <Route exact path="/user" element={<Protected cmp={UserManagement} role="SUPER_ADMIN"/>} ></Route>
          <Route exact path="/qmsLibrary" element={<Protected cmp={QmsLibrary} role="SUPER_ADMIN"/>} ></Route>
          <Route exact path="/fCards" element={<Protected cmp={FolderCards} role="SUPER_ADMIN"/>} ></Route>
          <Route exact path="/fLists" element={<Protected cmp={ListFiles} role="SUPER_ADMIN"/>} ></Route> */}


      <Route path="/user" element={<UserManagement role="SUPER_ADMIN"/>} />
      <Route path="/qmsLibrary" element={<QmsLibrary role="SUPER_ADMIN"/>} />
      <Route path="/fCards" element={<FolderCards role="SUPER_ADMIN"/>} />
      <Route path="/fLists" element={<ListFiles role="SUPER_ADMIN"/>} />
      <Route path="/helpdesk" element={<Helpdesk role="SUPER_ADMIN"/>} />
      <Route path="/subfLists" element={<SuperAdminSubDirListFiles role="SUPER_ADMIN"/>} />
      <Route path="/downloadlogs"element={<DownloadLogs role="SUPER_ADMIN"/>}/>
{/* Admin */}

          {/* <Route exact path="/aQmsLibrary" element={<Protected cmp={AdminQmsLibrary} role="ADMIN"/>} ></Route>
          <Route exact path="/afCards" element={<Protected cmp={AdminFolderCards} role="ADMIN"/>} ></Route>
          <Route exact path="/afLists" element={<Protected cmp={AdminListFiles} role="ADMIN"/>} ></Route> */}
     
          <Route path="/aQmsLibrary" element={<AdminQmsLibrary role="ADMIN"/>} />
          <Route path="/afCards" element={<AdminFolderCards role="ADMIN"/>} />
          <Route path="/afLists" element={<AdminListFiles role="ADMIN"/>} />
          <Route path="/ahelpdesk" element={<AdminHelpdesk role="ADMIN"/>} />
          <Route path="/auserlist" element={<AdminUserList role="ADMIN"/>} />
          <Route path="/aSubfLists" element={<AdminSubDirListFiles role="ADMIN"/>} />
          <Route path="/adownloadlogs"element={<AdminDownloadLogs role="ADMIN"/>}/>
{/* User */}
          {/* <Route exact path="/uQmsLibrary" element={<Protected cmp={UserQmsLibrary} role="USER"/>} ></Route>
          <Route exact path="/ufCards" element={<Protected cmp={UserFolderCards} role="USER"/>} ></Route>
          <Route exact path="/ufLists" element={<Protected cmp={UserListFiles} role="USER"/>} ></Route> */}

          <Route path="/uQmsLibrary" element={<UserQmsLibrary role="USER"/>} />
          <Route path="/ufCards" element={<UserFolderCards role="USER"/>} />
          <Route path="/ufLists" element={<UserListFiles role="USER"/>} />   
          <Route path="/uhelpdesk" element={<UserHelpdesk role="USER"/>} />  
          <Route path="/uSubfLists" element={<UserSubDirListFiles role="USER"/>} />
          <Route path="/udownloadlogs"element={<UserDownloadLogs role="USER"/>}/>
              </>
     </Routes>
   
  );
}

export default App;
