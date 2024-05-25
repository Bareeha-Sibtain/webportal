import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { AiFillProfile } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { Button, Layout, Menu } from "antd";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { BiSolidHome } from "react-icons/bi";
import { getAuth, signOut } from "firebase/auth";
const HomePage = () => {
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
          <div className="bg-[#001529] py-4">
            <h2 className="text-white fs-5 text-center mb-0">
              <span className="text-bold text-xl capitalize">TheftGuard</span>
            </h2>
          </div>
          <Menu
            className="mt-5 h-[100vh]"
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[""]}
            onClick={({ key }) => {
              if (key === "signout") {
                handleLogout();
              } else {
                navigate(key);
              }
            }}
            items={[
              {
                key: "",
                icon: <BiSolidHome className="fs-5 " />,
                label: "Home",
              },
              {
                key: "neighbour",
                icon: <FaUser className="fs-5" style={iconStyles} />,
                label: "Neighbour's Contact",
              },
              {
                key: "profile",
                icon: <AiFillProfile className="fs-5" style={iconStyles} />,
                label: "Profile",
              },
            ]}
          />
        </Sider>
        <Layout>
          <Header
            className="flex flex-row gap-3 items-start justify-start "
            style={{
              padding: 0,
            }}
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
            <div className="flex flex-row gap-3 items-start justify-start">
              <div>
                <button className="bg-indigo-300 w-20 rounded" onClick={handleLogout}>
                  Logout
                </button>
              </div>

             
            </div>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: "100%",
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default HomePage;
