"use client"

import Image from "next/image";
 import styles from "./page.module.css";
import Router, { useRouter } from "next/navigation";


export default function Home() {
const router=useRouter()
  const submitForm=()=>{
    console.log("function called")
      router.push("/pdfForm")
  }
  return (
    <main className={styles.main}>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="card p-4">
          <h1 className="text-center mb-4">Wel come to PDF Generate</h1>
          <form>
            {/* <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input type="email" className="form-control" id="email" aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" />
            </div> */}
            <div className="d-grid">
              <button type="button" className="btn btn-primary" onClick={submitForm}>Submit</button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
