"use client";

import Image from "next/image";
import styles from "./pdfPreview.module.css";
import Router, { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import html2pdf from "html2pdf.js";
import { API_BASE_URL } from "@/utils/config";
import Link from "next/link";
export default function PdfForm(params) {
  console.log("params", params);
  const [previewPdfData, setPreviewPdfData] = useState("");
  const [totalamount, setTotalamount] = useState("");
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${API_BASE_URL}/getPDFById/${params.params.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("GEt all pdf Data for pdf", data);
        setPreviewPdfData(data);
      } else {
        const data = await response.json();
        toast.error(data.error, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    };
    fetchData();
  }, [params]);

  useEffect(() => {
    // Calculate the total freightAmount when the component mounts or when data changes
    if(previewPdfData){
      const sum = previewPdfData.detail.reduce(
        (acc, item) => acc + item.freightAmount,
        0
      );
      setTotalamount(sum);
    }
  
  }, [previewPdfData]);

  const downloadPDF = () => {
    const element = document.getElementById("content-to-pdf");
    // const opt = {
    //     margin: 0.5,
    //     filename: 'myfile.pdf',
    //     image: { type: 'jpeg', quality: 0.98 },
    //     html2canvas: { scale: 2 },
    //     jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    //     pagebreak: { mode: 'avoid-all' },
    //     pagebreak: { mode: 'css', before: '#page1', after: '#page2' }
    //   };
    html2pdf().from(element).save();
    localStorage.removeItem("pdfData");
    router.push("/pdfForm");
  };

  return (
    <>
      {previewPdfData ? (
        <div>
          <div
            className={`${styles.donationButtons} d-flex justify-content-between mb-3  `}
          >
            <Link href="/dashboard">
              {" "}
              <button className={`btn addDonarBtn ${styles.button}`}>
                Back
              </button>
            </Link>
            <div className={styles.btn}>
            <button
              type="button"
              className={`btn ${styles.button}`}
              onClick={downloadPDF}
            >
              Download PDF
            </button>
          </div>
          </div>
          <div
            className="row justify-content-center m-5 mt-1"
            id="content-to-pdf"
          >
            <div className="col-md-12 m-3">
              <div className={styles.header}>
                <h4>MINESTONE INFRADEV</h4>
                <p className={styles.heading}>
                  Bapu Bazar,Bijainagar,Ajmer,Rajasthan,305624
                </p>
                <p>
                  <span className={styles.heading}>PAN:</span> ANNPC6983E
                </p>
                <p>
                  <span className={styles.heading}>GSTIN:</span> 08ANNPC6983E1ZP
                </p>
                <h5>GOODS CONSIGNMENT NOTE</h5>
                <p>
                  <span className={styles.heading}>No.</span> :[
                  {previewPdfData.no}]
                  <span className={styles.heading}>Date:</span>[
                  {previewPdfData.date.slice(0, 10)}]
                </p>
                <p>
                  <span className={styles.heading}>From:</span> :{" "}
                  {previewPdfData.from}
                  <span className={styles.heading}>To:</span>{" "}
                  {previewPdfData.to}
                </p>
              </div>

              <div className={styles.section}>
                <table className={styles.forTable}>
                  <thead>
                    <tr className={styles.tableRow}>
                      <th className={styles.tableheading}>TRUCK NO</th>
                      <td className={styles.tabledata}>
                        [{previewPdfData.truckNo}]
                      </td>
                      <th className={styles.tableheading}>Driver</th>
                      <td className={styles.tabledata}>
                        [{previewPdfData.driver}]
                      </td>
                    </tr>
                    <tr>
                      <th className={styles.tableheading}>TRUCK TYPE</th>
                      <td className={styles.tabledata}>
                        [{previewPdfData.truckType}]
                      </td>
                      <th className={styles.tableheading}>MOBILE</th>
                      <td className={styles.tabledata}>
                        [{previewPdfData.mobileNumber}]
                      </td>
                    </tr>
                  </thead>

                  {/* <!-- Add more rows as needed --> */}
                </table>
              </div>
              <div className={styles.section}>
                <table className={styles.forTable}>
                  <thead>
                    <tr className={styles.tableRow}>
                      <th className={styles.tableheading}>Consignor Name</th>
                      <td className={styles.tabledata}>
                      [{previewPdfData.consigner}]
                      </td>
                      <th className={styles.tableheading}>Consigner GSITN</th>
                      <td className={styles.tabledata}>
                      [{previewPdfData.consignerGSTIN}]
                      </td>
                    </tr>
                    <tr>
                      <th className={styles.tableheading}>Consignee Name</th>
                      <td className={styles.tabledata}>
                      [MINESTONE EXPORTS VIJAYNAGAR]
                      </td>
                      <th className={styles.tableheading}>Consignee GSITN</th>
                      <td className={styles.tabledata}>
                      [08AJYPC8136A1Z5]
                      </td>
                    </tr>
                  </thead>

                  {/* <!-- Add more rows as needed --> */}
                </table>
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
                    {previewPdfData.detail.map((item, index) => (
                      <tr key={index}>
                        <td className={styles.tabledataForDesc}>
                          <p>{item.description}</p>
                         
                         
                        </td>
                        <td className={styles.tabledata}>
                          [{item.noOfArticles}]
                        </td>
                        <td className={styles.tabledata}>[{item.weight}]</td>
                        <td className={styles.tabledata}>
                          [{item.freightRate}]
                        </td>
                        <td className={styles.tabledata}>
                          [{item.freightAmount}]
                        </td>
                      </tr>
                    ))}

                    <tr>
                      <td colSpan="3" className={styles.tabledata}>
                      <span className={styles.heading}>Payment Method:</span>
                          <span> [{previewPdfData.paymentMethod}]</span>
                      </td>

                      <td className={styles.tabledatatotal}>Total</td>
                      {totalamount ? (
                        <td className={styles.tabledatatotal}>{[totalamount]}</td>
                      ) : (
                        <td className={styles.tabledata}>[Total Amount]</td>
                      )}
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
                      {previewPdfData.invoiceNo}
                    </p>
                    <p>
                      <span className={styles.heading}>Royalti:</span>
                      {previewPdfData.royalty}
                    </p>
                    <p>
                      <span className={styles.heading}>Value:</span>{" "}
                      {previewPdfData.venue}
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
         
        </div>
      ) : null}
    </>
  );
}
