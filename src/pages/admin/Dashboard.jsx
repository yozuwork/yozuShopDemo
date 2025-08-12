import { Outlet , useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import AdminProducts from "./AdminProducts";

export default function Dashboard() {
    const navigate = useNavigate();
    const api = import.meta.env.VITE_REACT_APP_API_URL;
     const logout = () => {
         console.log("hi");
         document.cookie = 'hexToken=;';
         navigate("/login");
     }
     //取得token 
    const Nowtoken = document.cookie
    .split('; ')
    .find((row) => row.startsWith('hexToken='))
    ?.split('=')[1];

     axios.defaults.headers['Authorization'] = Nowtoken;
     useEffect(()=>{
        if(!Nowtoken){
            navigate('/login');
        }
        (async () => {
           try {
             await axios.post(`${api}/v2/api/user/check`);
           } catch(error) {
             if(!error.response.data.success){
                 navigate('/login');
             }
           }
        })();


     },[navigate,Nowtoken])

  return (
    <>
      {/* Navbar */}
      <nav className="bg-gray-800">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 py-3">
          <p className="text-white font-semibold">HEX EATS 後台管理系統</p>
          <button
            className="text-white md:hidden focus:outline-none"
            aria-label="Toggle navigation"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="hidden md:flex items-center space-x-2">
            <button onClick={logout}  className="bg-white text-gray-800 text-sm px-3 py-1 rounded hover:bg-gray-200">
              登出
            </button>
          </div>
        </div>
      </nav>

      <div className="flex min-h-[calc(100vh-56px)]">
        {/* Sidebar */}
        <div className="bg-gray-100 w-48 border-r">
          <ul className="flex flex-col">
            <a className="px-4 py-3 hover:bg-gray-200 flex items-center" href="/admin/products">
              <i className="bi bi-cup-fill mr-2" />
              產品列表
            </a>
            <a className="px-4 py-3 hover:bg-gray-200 flex items-center" href="/admin/coupons">
              <i className="bi bi-ticket-perforated-fill mr-2" />
              優惠卷列表
            </a>
            <a className="px-4 py-3 hover:bg-gray-200 flex items-center" href="/admin/orders">
              <i className="bi bi-receipt mr-2" />
              訂單列表
            </a>
          </ul>
        </div>

        {/* Main Content */}
          { Nowtoken && <Outlet/>  }
      </div>
    </>
  );
}
