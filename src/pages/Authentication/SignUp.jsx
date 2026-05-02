import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye,FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import useAxios from '../../hooks/useAxios';
import useAuth from '../../hooks/useAuth';

const SignUp = () => {
  const {createUser} = useAuth();

  //const [profilePic, setProfilePic] = useState('');
  const axiosBasic = useAxios();
   
  const {register, handleSubmit, formState:{errors} } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => {
    setShowPassword(!showPassword);
  }

  const onSubmit = (data) => {
    createUser(data.email, data.password).then(async() => {
      const userInfo = {
        email: data.email,
        role: 'student',
        created_at: new Date().toISOString(),
        last_log_in: new Date().toISOString(),
      }

      await axiosBasic.post('/users', userInfo);

    })
  }

  const handleImageUpload = async(e) => {
  
    const image = e.target.files[0];

    const formData = new FormData();
    formData.append('image', image);
    const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`
    console.log(imageUploadUrl);

    // const res = await axios.post(imageUploadUrl, formData);
    // setProfilePic(res.data.data.url)

  }

  return (
     <div className='border-2 border-gray-200 rounded-2xl mt-10 w-1/3 mx-auto' >
          <div className='px-10 py-4'>
            <div>
            <h1 className='text-gray-700 text-2xl font-semibold text-center'>Application Login</h1>
          </div>
           <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        
        <div>
          <label className="block text-gray-700 font-medium mb-1">Name</label>
          <input
            type="text"           
            {...register('name', {required: true})}
            placeholder="Enter your name"
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
        {
          errors.name && <span className="text-red-600">Name is required</span>
        }

        <div>
          <label className="block text-gray-700 font-medium mb-1">Application Id</label>
          <input
            type="text"           
            {...register('applicationId', {required: true})}
            placeholder="Enter your Application Id"
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
        {
          errors.appicationId && <span className="text-red-600">Application Id is required</span>
        }

        {/* Profile Image */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Profile Image
          </label>
          <input
            type="file"
            onChange={handleImageUpload}
            className="w-full text-gray-600 border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
        {
          errors.name && <span className="text-red-600">It accept only Image</span>
        }

        {/* Email */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            {...register('email', {required: true})}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
        {
          errors.email && <span className="text-red-600">Name is required</span>
        }

        {/* Password */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register('password', {required: true})}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 "
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

        </div>
        {
          errors.password && <span className="text-red-600">Name is required</span>
        }

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-xl font-semibold hover:bg-blue-600 transition-colors mt-3"
        >
          Register
        </button>
      </form>
          <p className="text-center text-gray-600 mt-2">
            Already have an account?
            <Link
              to="/"
      
            
              className="text-blue-500 font-semibold hover:underline"
            >
              Login
            </Link>
            
          </p>
          </div>
        </div>
  );
};

export default SignUp;
