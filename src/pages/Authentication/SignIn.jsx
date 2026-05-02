import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye } from "react-icons/fa";
import { Link } from 'react-router-dom';

const SignIn = () => {
   const [showPassword, setShowPassword] = useState(false);
   const {register, handleSubmit } = useForm();

   const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (data) => {
    const userInfo = {
      email: data.email,
    }
    console.log(userInfo);
  }


  
  return (
    <div className='border-2 border-gray-200 rounded-2xl mt-10 w-1/3 mx-auto' >
      <div className='px-10 py-4'>
        <div>
        <h1 className='text-gray-700 text-2xl font-semibold text-center'>Application Login</h1>
      </div>
       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-5">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", { required: true })}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-xl font-semibold hover:bg-blue-600 transition-colors"
        >
          Login
        </button>
      </form>
      <p className="text-center text-gray-600 mt-2">
        No account yet?
        <Link
          to="/signUp"
  
        
          className="text-blue-500 font-semibold hover:underline"
        >
          Register
        </Link>
        
      </p>
      </div>
    </div>
  );
};

export default SignIn;