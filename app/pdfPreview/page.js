"use client";

import Image from "next/image";
import styles from "./pdfPreview.module.css";
import Router, { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import html2pdf from 'html2pdf.js';

export default function PdfForm() {
  const [allPdfData, setAllPdfData] = useState("");

  useEffect(() => {
    const localStoragePdfData = JSON.parse(localStorage.getItem("pdfData"));
    setAllPdfData(localStoragePdfData);
    console.log("allPdf data", localStoragePdfData);
  }, []);
  const router = useRouter();
  const downloadPDF = () => {
    const element = document.getElementById('content-to-pdf');
    const opt = {
        margin: 0.5,
        filename: 'myfile.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
        pagebreak: { mode: 'avoid-all' },
        pagebreak: { mode: 'css', before: '#page1', after: '#page2' }
      };
    html2pdf().from(element).save();
    localStorage.removeItem("pdfData")
    router.push("/pdfForm")
  };

  return (
    <>
      {allPdfData ? (
        <div>
<div className="row justify-content-center m-5" id="content-to-pdf" >
          <div className="col-md-12 m-3" >
            <div className={styles.header}>
              <h3>MINESTONE INFRADEV</h3>
              <p className={styles.heading}>
                Bapu Bazar,Bijainagar,Ajmer,Rajasthan,305624
              </p>
              <p>
                <span className={styles.heading}>PAN:</span> ANNPC6983E
              </p>
              <p>
                <span className={styles.heading}>GSTIN:</span> 08ANNPC6983E1ZP
              </p>
              <h4>GOODS CONSIGNMENT NOTE</h4>
              <p>
                <span className={styles.heading}>No.</span> :[{allPdfData.no}]
                <span className={styles.heading}>Date:</span>[{allPdfData.date}]
              </p>
              <p>
                <span className={styles.heading}>From:</span> :{" "}
                {allPdfData.from}
                <span className={styles.heading}>To:</span> {allPdfData.to}
              </p>
            </div>

            <div className={styles.section}>
              <table className={styles.forTable}>
                <thead>
                  <tr className={styles.tableRow}>
                    <th className={styles.tableheading}>TRUCK NO</th>
                    <td className={styles.tabledata}>[{allPdfData.truckNo}]</td>
                    <th className={styles.tableheading}>Driver</th>
                    <td className={styles.tabledata}>[{allPdfData.driver}]</td>
                  </tr>
                  <tr>
                    <th className={styles.tableheading}>TRUCK TYPE</th>
                    <td className={styles.tabledata}>
                      [{allPdfData.truckType}]
                    </td>
                    <th className={styles.tableheading}>MOBILE</th>
                    <td className={styles.tabledata}>
                      [{allPdfData.mobileNumber}]
                    </td>
                  </tr>
                </thead>

                {/* <!-- Add more rows as needed --> */}
              </table>
            </div>
            <div className={styles.main}>
              <div className={styles.section}>
                <table className={styles.forTable}>
                  <thead>
                    <tr aria-rowspan={1}>
                      <th className={styles.tableheading}>Consignor</th>
                      <td className={styles.tabledata} colspan="3">[{allPdfData.driver}]</td>
                    </tr>
                    <tr>
                    <th className={styles.tableheading}>Consignee Name</th>
                      <td className={styles.tabledata}>[{allPdfData.consigneeName}]</td>
                      <th className={styles.tableheading}>Consignee GSITN</th>
                      <td className={styles.tabledata}>[{allPdfData.consigneeGSTIN}]</td>
                    </tr>
                  </thead>
                  {/* <!-- Add more rows as needed --> */}
                </table>
              </div>
            </div>
            <div className={styles.section}>
              <table className={styles.forTable}>
                <thead>
                  <tr>
                    <th className={styles.tableheading}>Description</th>

                    <th className={styles.tableheading}>No. of Articles</th>

                    <th className={styles.tableheading}>Weight - MT</th>

                    <th className={styles.tableheading}>Freight Rate / MT</th>
                    <th className={styles.tableheading}>Freight Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td  className={styles.tabledataForDesc}>
                     <p>{allPdfData.description}</p> 
                      <p><span className={styles.heading}>GSTIN:</span><span>[
                      {allPdfData.truckNo}]</span></p>
                      <span className={styles.heading}>Payment No.:</span><span> [{allPdfData.payment}]</span>
                     
                    </td>
                    <td className={styles.tabledata}>
                      [{allPdfData.numberOfArticles}]
                    </td>
                    <td className={styles.tabledata}>
                      [{allPdfData.weightMt}]
                    </td>
                    <td className={styles.tabledata}>
                      [{allPdfData.freightRateMt}]
                    </td>
                    <td className={styles.tabledata}>
                      [{allPdfData.freightAmount}]
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="3" className={styles.tabledata}></td>

                    <td className={styles.tabledata}>Total</td>

                    <td className={styles.tabledata}>[Total Amount]</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className={styles.footer}>
              <div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p>
                    <span className={styles.heading}>Invoice No:</span>
                    {allPdfData.invoiceNo}
                  </p>
                  <p>
                    <span className={styles.heading}>Royalty:</span>
                    {allPdfData.royalty}
                  </p>
                  <p>
                    <span className={styles.heading}>Venue:</span>{" "}
                    {allPdfData.venue}
                  </p>
                </div>
                <hr />
                <p style={{ textAlign: "center", marginBottom: "20px" }}>
                  WE ARE NOT RESPONSIBLE FOR ANY LEAKAGE AND BREAKAGE
                </p>
                <hr style={{ width: "50%", float: "right" }} />
                <p
                  className={styles.heading}
                  style={{ textAlign: "right", clear: "both" }}
                >
                  For, MINESTONE INFRADEV
                </p>
              </div>
            </div>
            
          </div>
         
        </div>
        <div className={styles.btn}>
          <button
                type="button"
                className="btn btn-primary"
                onClick={downloadPDF}
              >
                Submit
              </button>
          </div>
        </div>
        
      ) : null}
    </>
  );
}
