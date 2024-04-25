"use client";

import Image from "next/image";
import styles from "./dashboard.module.css";
import Router, { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { API_BASE_URL } from "@/utils/config";
import Section from "@/components/Section";
import Link from "next/link";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { GrView } from "react-icons/gr";
import { MdDeleteForever } from 'react-icons/md';
import PdfModal from "@/components/Modal/pdfModal";



export default function PdfForm() {
  const [allPdfData, setAllPdfData] = useState("");
  const [isModalOpen,setIsModalOpen]=useState(false)
  const[inVoiceId,setInvoiceId]=useState("")
  const [reRender,setReRender]=useState(false)
const router=useRouter()
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${API_BASE_URL}/getAllPDF`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("GEt all pdf Data", data);
        setAllPdfData(data.data);
        setReRender(false)
      } else {
        const data = await response.json();
        toast.error(data.error, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    };
    fetchData();
  }, [reRender]);
const  deleteInvoice=(id)=>{
    setIsModalOpen(true)
    setInvoiceId(id)
}

  const closeModal = () => {
    setIsModalOpen(false);
    //router.push("/customer")
  }
  const handleModalSubmit = () => {

    const fetchProductData = async () => {
      const response = await fetch(`${API_BASE_URL}/deletePDF/${inVoiceId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        //    'Authorization': `Bearer ${parseToken}`,
          
        },
        body: JSON.stringify(),
      });
      
      if (response.ok) {   
        const data = await response.json(); 
        
        setIsModalOpen(false);
        toast.success("Invoice successFully deleted")
        setReRender(true)
       
      } else {
        const data = await response.json();
        toast.error(data.error, {
          position: toast.POSITION.TOP_RIGHT,
        });
      
        setIsLoading(false);
  }
 
  }
  fetchProductData();
     
  }
  
  // Function to handle canceling the modal
  const handleModalCancel = () => {
    setIsModalOpen(false);
  }
const logOut=()=>{
  sessionStorage.removeItem("token")
  router.push("/")
}
  return (
    <>
      <PdfModal
        isOpen={isModalOpen}
        onClose={closeModal}
        heading="Please Confirm to Delete the Invoice "
        positiveText="Confirm"
        negativeText="Cancel"
        onSubmit={handleModalSubmit}
        onCancel={handleModalCancel}/>
      <div className={`${styles.donarPage} `}>
        <div className="donarDetailMainPage">
          <Section>
            <div>
              <h2 className={`${styles.formHeaderext}`}>Bill Details</h2>
            </div>
            <div
              className={`${styles.donationButtons} d-flex justify-content-between mb-3  `}
            >
              {/* <div className={`${styles.addDonarsearchMain} input-group `}>
                <input
                  type="text"
                  className={`${styles.addDonarSearch} form-control  `}
                  placeholder="Search"
                  onChange={(e) => setSearch(e.target.value)}
                  aria-label="Search"
                />
                <div className="input-group-append">
                  <button
                    className={`btn btn-outline-secondary searchBtn ${styles.button}`}
                    type="button"
                  >
                    Search
                  </button>
                </div>
              </div> */}
              <Link href="/pdfForm">
                {" "}
                <button className={`btn addDonarBtn ${styles.button}`}>
                  Add Bill
                </button>
              </Link>
            
                {" "}
                <button 
                onClick={logOut}
                className={`btn addDonarBtn ${styles.button}`}>
                  Log Out
                </button>
            
              {/* <Link href='/event/add-event-category'> <button className={`btn  addDonarBtn ${styles.button}`}>Add Event Category</button></Link> */}
            </div>
          </Section>
          <Section>
            {allPdfData.length !== 0 ? (
              <div className="table-responsive w-100">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Invoice No.</th>
                      <th scope="col">Consigner Name</th>
                      <th scope="col">Date</th>
                      <th scope="col">From</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allPdfData.map((item, index) => (
                      <tr key={index}>
                        <td>{item.invoiceNo}</td>
                        <td>{item.consigner}</td>
                        <td>{item.date.slice(0,10)}</td>
                        <td>{item.from}</td>
                        <td>
                          <Link href={`/pdfForm/${item._id}`}>
                            <AiFillEdit className="red" />
                          </Link>
                          <Link href={`/pdfPreview/${item._id}`}>
                            <GrView className={`red ${styles.previewbutton}`} />
                          </Link>
                          {/* <Switch 
                    className={`red ${styles.dltbutton}`} 
                    onChange={(checked) => handleSwitchChange(checked, index)}
                    checked={isActive[index]}
                /> */}
                           <MdDeleteForever className={`red ${styles.dltbutton}`} onClick={()=>deleteInvoice(item._id)}/> 
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : //   <div className='errorImage'>
            //         <Image className='noDataFoundImg'
            //         src={"/no_data_found.png"} width={"400"} height={"400"} alt="logo"
            //         />
            //   </div>
            null}
          </Section>
          <Section>
            {/* {cusmtomerData.length !==0 ? ( */}
            <div></div>
            {/* ) : (
       <p></p>
      )} */}
          </Section>
        </div>
      </div>
    </>
  );
}
