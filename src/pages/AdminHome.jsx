import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import {
  AiOutlineDashboard,
} from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { Button, Layout, Menu, theme } from "antd";
import { MdPermDeviceInformation } from "react-icons/md";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import logo from '../assets/image/logo.jpeg'

const AdminHome = () => {
  const { Header, Sider, Content } = Layout;
 
  
  let iconStyles = { color: "white" };
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        localStorage.clear();
        navigate("/");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
        // Optionally show an error message to the user
      });
  };

  return (
    <>
      <Layout className="h-[100vh]">
        <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="flex flex-col justify-center items-center mx-auto mt-5">
              <img src={logo} alt="logo"  width={50} height={50}/>
              <span className="text-sm md:text-xl text-white capitalize fontFamily">TheftGuard</span>
              </div>
          <Menu
            className="mt-5 h-[100vh]"
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[""]}
            onClick={({ key }) => {
              if (key === "signout") {
              } else {
                navigate(key);
              }
            }}
            items={[
              {
                key: "",
                icon: <AiOutlineDashboard className="fs-5 " />,
                label: "Dashboard",
              },
              {
                key: "editdevice",
                icon: <MdPermDeviceInformation className="fs-5 " />,
                label: "Edit Device",
              },
              {
                key: "userdetails",
                icon: <FaUser className="fs-5" style={{ iconStyles }} />,
                label: "Users",
              },
            ]}
          />
        </Sider>
        <Layout>
          <Header
            className="flex justify-start items-start px-2  h-50"
           
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
                background: "#fff",
              }}
            />
              <button className="bg-indigo-300 rounded ms-5 w-20" onClick={handleLogout}>Logout</button>     
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default AdminHome;