"use client";

import Image from "next/image";
import styles from "../page.module.css";
import Router, { useRouter } from "next/navigation";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { API_BASE_URL } from "@/utils/config";
import Link from "next/link";
export default function PdfForm() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [date, setDate] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [truckType, setTruckType] = useState("");
  const [driver, setDriver] = useState("");
  const [truckNo, setTruckNo] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [consigneeName, setConsigneeName] = useState("");
  const [consignerGSTIN, setConsignerGSTIN] = useState("");
  const [invoiceNo, setInvoiceNo] = useState("");
  const [royalty, setRoyalty] = useState("");
  const [venue, setVenue] = useState("");
  const [consigner, setConsigner] = useState("");
  const [payment, setPayment] = useState("");
  const [fields, setFields] = useState([
    {
      description: "",
      noOfArticles: "",
      weight: "",
      freightRate: "",
      freightAmount: "",
    },
  ]);

  const handleChange = (index, event) => {
    const values = [...fields];
    values[index][event.target.id] = event.target.value;
    setFields(values);
  };

  const handleAddField = () => {
    const lastField = fields[fields.length - 1];
    const requiredFields = [
      "description",
      "noOfArticles",
      "weight",
      "freightRate",
      "freightAmount",
    ];
    const isValid = requiredFields.every((field) => lastField[field] !== "");

    if (isValid) {
      const newField = {
        description: "",
        noOfArticles: "",
        weight: "",
        freightRate: "",
        freightAmount: "",
      };
      setFields([...fields, newField]);
    } else {
      toast.error(
        "Please fill in all required fields before adding another row."
      );
    }
  };
  const router = useRouter();
  const submitForm = () => {
    if (!number) {
      toast.error("Number is required");
      return false;
    }
    if (!date) {
      toast.error("Date is required");
      return false;
    }
    if (!from) {
      toast.error("");
      return false;
    }
    if (!to) {
      toast.error("To is required");
      return false;
    }
    if (!truckType) {
      toast.error("Truck Type is required");
      return false;
    }
    if (!driver) {
      toast.error("Driver is required");
      return false;
    }
    if (!truckNo) {
      toast.error("Truck No. is required");
      return false;
    }
    if (!mobileNumber) {
      toast.error("Mobile Number is required");
      return false;
    }
    if (!/^\d{10}$/.test(mobileNumber)) {
      toast.error("Mobile number must be 10 digits long");
      return false;
    }

    // Check if the number starts with 9, 8, or 7
    if (!/^[789]/.test(mobileNumber)) {
      toast.error("Mobile number must start with 9, 8, or 7");
      return false;
    }
    if (!consigner) {
      toast.error("Consigner is required");
      return false;
    }
    if (!consignerGSTIN) {
      toast.error("Consigner GSTIN is required");
      return false;
    }
    if (!invoiceNo) {
      toast.error("Invoice No. is required");
      return false;
    }
    if (!royalty) {
      toast.error("Royalty is required");
      return false;
    }
    if (!venue) {
      toast.error("Venue is required");
      return false;
    }
    if (!payment) {
      toast.error("Payment method is required");
      return false;
    }
    const isValid = fields.every((field) => {
      return Object.values(field).every((value) => value !== "");
    });

    if (isValid) {
      const allPdfData = {
        no: number,
        date: date,
        from: from,
        to: to,
        truckType: truckType,
        driver: driver,
        truckNo: truckNo,
        mobileNumber: mobileNumber,
        consigner: consigner,
        consignerGSTIN: consignerGSTIN,
        invoiceNo: invoiceNo,
        royalty: royalty,
        venue: venue,
        paymentMethod:payment,
        detail: fields,
      };
      console.log("allPdfData", allPdfData);
      const fetchData = async () => {
        const response = await fetch(`${API_BASE_URL}/addPDF`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(allPdfData),
        });

        if (response.ok) {
          const data = await response.json();
          console.log("After submit pdf Data", data);
          router.push("/dashboard");
        } else {
          const data = await response.json();
          toast.error(data.error);
        }
      };
      fetchData();
    } else {
      toast.error("Please fill in all required fields of table.");
      return false;
    }
  };

  return (
    <main className={styles.main}>
      <div className="container">
        <div
          className={`${styles.donationButtons} d-flex justify-content-between mb-3  `}
        >
          <Link href="/dashboard">
            {" "}
            <button className={`btn addDonarBtn ${styles.button}`}>Back</button>
          </Link>
        </div>
        <form>
          <div className="row justify-content-center">
            <div className="col-md-12">
              <h1 className="font-weight-bold text-decoration-underline">
                {" "}
                Minestone Infradev
              </h1>
              <div className="row-inputfields">
                <div className="mb-3">
                  <label htmlFor="number" className="form-label required">
                    Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="number"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    placeholder="Enter number"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="date" className="form-label required">
                    Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="from" className="form-label required">
                    From
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="from"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    placeholder="From"
                  />
                </div>
              </div>
              <div className="row-inputfields">
                {" "}
                <div className="mb-3">
                  <label htmlFor="to" className="form-label required">
                    To
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="to"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    placeholder="To"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="truckType" className="form-label required">
                    Truck Type
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="truckType"
                    value={truckType}
                    onChange={(e) => setTruckType(e.target.value)}
                    placeholder="Truck Type"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="driver" className="form-label required">
                    Driver
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="driver"
                    value={driver}
                    onChange={(e) => setDriver(e.target.value)}
                    placeholder="Driver"
                  />
                </div>
              </div>
              <div className="row-inputfields">
                {" "}
                <div className="mb-3">
                  <label htmlFor="truckNo" className="form-label required">
                    Truck No.
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="truckNo"
                    value={truckNo}
                    onChange={(e) => setTruckNo(e.target.value)}
                    placeholder="Truck No."
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="mobileNumber" className="form-label required">
                    Mobile Number
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="mobileNumber"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="Mobile Number"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="consigner" className="form-label required">
                    Consigner Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="consigner"
                    value={consigner}
                    onChange={(e) => setConsigner(e.target.value)}
                    placeholder="Consigner Name"
                  />
                </div>
              </div>
              <div className="row-inputfields">
                <div className="mb-3">
                  <label
                    htmlFor="consignerGSTIN"
                    className="form-label required"
                  >
                    Consigner GSTIN
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="consignerGSTIN"
                    value={consignerGSTIN}
                    onChange={(e) => setConsignerGSTIN(e.target.value)}
                    placeholder="Consigner GSTIN"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="invoiceNo" className="form-label required">
                    Invoice No
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="invoiceNo"
                    value={invoiceNo}
                    onChange={(e) => setInvoiceNo(e.target.value)}
                    placeholder="Invoice No"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="royalti" className="form-label required">
                    Royalti
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="royalti"
                    value={royalty}
                    onChange={(e) => setRoyalty(e.target.value)}
                    placeholder="Royalti"
                  />
                </div>
              </div>
              <div className="row-inputfields">
                <div className="mb-3">
                  <label htmlFor="value" className="form-label required">
                    Value
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="value"
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                    placeholder="value"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="payment" className="form-label required">
                    Payment Method
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="payment"
                    value={payment}
                    onChange={(e) => setPayment(e.target.value)}
                    placeholder="Payment Method"
                  />
                </div>
                {/* tbelow field for hidden  */}
                <div className="hidden mb-3">
                  <label htmlFor="venue" className="form-label required">
                    Venue
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="venue"
                    placeholder="Venue"
                  />
                </div>
              </div>
              <div>
                <table className="table">
                  <thead>
                    <tr>
                      <th className="required">Description</th>
                      <th className="required">No. of Articles</th>
                      <th className="required">Weight (Mt)</th>
                      <th className="required">Freight Rate/MT</th>
                      <th className="required">Freight Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fields.map((field, index) => (
                      <tr key={index}>
                        <td>
                          <textarea
                            type="text"
                            className="form-control"
                            id="description"
                            value={field.description}
                            onChange={(e) => handleChange(index, e)}
                            placeholder="Description"
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            className="form-control"
                            id="noOfArticles"
                            value={field.noOfArticles}
                            onChange={(e) => handleChange(index, e)}
                            placeholder="No. of Articles"
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            className="form-control"
                            id="weight"
                            value={field.weight}
                            onChange={(e) => handleChange(index, e)}
                            placeholder="Weight (Mt)"
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            className="form-control"
                            id="freightRate"
                            value={field.freightRate}
                            onChange={(e) => handleChange(index, e)}
                            placeholder="Freight Rate/MT"
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            className="form-control"
                            id="freightAmount"
                            value={field.freightAmount}
                            onChange={(e) => handleChange(index, e)}
                            placeholder="Freight Amount"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button
                  type="button"
                  onClick={handleAddField}
                  className="btn btn-primary"
                >
                  Add More Fields
                </button>
              </div>

              <button
                type="button"
                className="btn btn-primary m-2"
                onClick={submitForm}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
