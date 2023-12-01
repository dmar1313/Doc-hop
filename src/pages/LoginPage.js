// src/pages/LoginPage.js
import React from 'react';

const LoginPage = () => {
   return (
    <div className="flex flex-col min-h-screen bg-[#121212] items-center justify-center p-4 text-white">
      <h1 className="font-epilogue mb-8 text-4xl">Doc-Hopper</h1>
      <p className="font-barlow mb-4 text-lg">Sign in to continue</p>
      <form className="w-full max-w-xs">
        <label htmlFor="email" className="block mb-2 text-sm">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="mb-4 w-full p-3 rounded bg-[#262626] text-white"
          placeholder="you@example.com"
        />
        <label htmlFor="password" className="block mb-2 text-sm">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className="mb-4 w-full p-3 rounded bg-[#262626] text-white"
          placeholder="Your Password"
        />
        <button
          type="submit"
          className="w-full p-3 mb-4 rounded bg-blue-500 hover:bg-blue-700 transition-colors"
        >
          Sign In
        </button>
        <div className="flex items-center justify-between mb-6">
          <label className="inline-flex items-center">
            <input type="checkbox" className="form-checkbox text-blue-600" />
            <span className="ml-2 text-sm">Remember me</span>
          </label>
          <a href="#" className="text-sm text-blue-400 hover:text-blue-200">
            Forgot your password?
          </a>
        </div>
        <div className="flex items-center justify-center">
          <button
            type="button"
            className="w-52 p-3 rounded flex justify-center items-center bg-[#db4437] hover:bg-[#c1351d] transition-colors"
          >
            <i className="fab fa-google mr-3"></i>
            Sign in with Google
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
