import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Login() {
  const navigate  = useNavigate();
  const [loginState,setLoginState] = useState(); 
  const api = import.meta.env.VITE_REACT_APP_API_URL;
  const [data, setData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const submit = async (e) => {

    e.preventDefault();
    try {
      const res = await axios.post(`${api}/v2/admin/signin`, data);
      //解構token與有限時間
      const { token , expired } = res.data;
      //把解構的token 跟expired 存到自己的cookie裡面 加上 path=/，讓 cookie 對整個網域有效
      document.cookie = `hexToken=${token};  expires=${new Date(expired)} path=/`;
      
      //取得token 
      const Nowtoken = document.cookie
       .split('; ')
       .find((row) => row.startsWith('hexToken='))
       ?.split('=')[1];
       console.log(Nowtoken);
      //把 Nowtoken 這個變數的值（你的登入 token）設定成 axios 預設的全域 HTTP 請求標頭中的 Authorization 欄位
      axios.defaults.headers.common['Authorization'] = Nowtoken;

      if(res.data.success){
        navigate('/admin/products');
      }
      
    } catch (error) {
      console.error(error);
      setLoginState(error.response.data);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B1120]">
      <div className="w-full max-w-sm flex flex-col items-center">
        {/* Logo (波浪 SVG) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 h-10 text-indigo-400 mb-8"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 3c-2.4 0-4.5 1.4-5.5 3.5a1 1 0 1 0 1.8.9C8.9 6 10.3 5 12 5s3.1 1 3.7 2.4a1 1 0 1 0 1.8-.9C16.5 4.4 14.4 3 12 3zM6.5 13.5a1 1 0 0 0-1.8.9c1 2.1 3.1 3.5 5.5 3.5s4.5-1.4 5.5-3.5a1 1 0 1 0-1.8-.9c-.6 1.4-2 2.4-3.7 2.4s-3.1-1-3.7-2.4z" />
        </svg>

        {/* Title */}
        <h2 className="text-center text-white text-lg font-semibold mb-6">
         請登入
        </h2>
        {loginState && (
            <h2 className="mt-4 text-red-600 bg-white px-4 py-2 rounded">
              登入失敗
            </h2>
          )}
        {/* Form */}
        <form onSubmit={submit} className="w-full space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Email address
            </label>
            <input
              onChange={handleChange}
              type="email"
              name="username"
              value={data.username}
              className="w-full px-4 py-2 rounded-md bg-[#1E293B] text-white placeholder-gray-400 border-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm text-gray-300">
                Password
              </label>
              <a href="#" className="text-sm text-indigo-400 hover:underline">
                Forgot password?
              </a>
            </div>
            <input
              style={{padding:"10px"}}
              onChange={handleChange}
              type="password"
              name="password"
              value={data.password}
              className="w-full px-4 py-2 rounded-md bg-[#1E293B] text-white placeholder-gray-400 border-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your password"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full mt-5 py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-md transition"
          >
            Sign in
          </button>
        </form>

        {/* Sign up */}
        <p className="mt-6 text-center text-sm text-gray-400">
          Not a member?{' '}
          <a href="#" className="text-indigo-400 hover:underline">
            Start a 14 day free trial
          </a>
        </p>
      </div>
    </div>
  );
}
