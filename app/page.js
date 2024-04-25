"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";
import Router, { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
export default function Home() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

 function generateRandomString(length) {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simulate a login process (Replace this with your actual login logic)
    if (username === 'admin' && password === '12345') {
      const randomString = generateRandomString(200); 
      sessionStorage.setItem("token",randomString)
      // Redirect to dashboard or any other page after successful login
      router.push('/dashboard');
    } else {
      toast.error('Invalid username or password. Please try again.');
    }
  };
  return (
    <main className={styles.main}>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="card p-4">
          <h1 className="text-center mb-4">Log in</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label required">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label required">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
