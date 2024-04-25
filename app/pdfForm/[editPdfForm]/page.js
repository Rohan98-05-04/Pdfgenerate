"use client";

import Image from "next/image";
import styles from "../../page.module.css";
import Router, { useRouter } from "next/navigation";
import { useState ,useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { API_BASE_URL } from "@/utils/config";
import Link from "next/link";
export default function EditPdfForm(params) {
    console.log("params",params)
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
  const [consigneeGSTIN, setConsigneeGSTIN] = useState("");
  const [invoiceNo, setInvoiceNo] = useState("");
  const [royalty, setRoyalty] = useState("");
  const [venue, setVenue] = useState("");
  const [consigner, setConsigner] = useState("");
  const [fields, setFields] = useState([
    // {
    //   description: "",
    //   descriptionGSTIN: "",
    //   payment: "",
    //   noOfArticles: "",
    //   weight: "",
    //   freightRate: "",
    //   freightAmount: "",
    // },
  ]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${API_BASE_URL}/getPDFById/${params.params.editPdfForm}`,
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
        console.log("GEt all pdf Data for Update", data);
       
         setNumber(data?.no || "")
        setDate(data?.date.slice(0,10) || "")
         setFrom(data?.from || "")
         setTo(data?.to || "")
       setTruckType(data?.truckType || "")
         setDriver(data?.driver || "")
         setTruckNo(data?.truckNo || "")
         setMobileNumber(data?.mobileNumber || "")
        setConsigneeName(data?.consigneeName || "")
         setConsigneeGSTIN(data?.consigneeGSTIN || "")
         setInvoiceNo(data?.invoiceNo || "")
        setRoyalty(data?.royalty || "")
         setVenue(data?.venue || "")
         setConsigner(data?.consigner || "")
         setFields(data?.detail || "")
      } else {
        const data = await response.json();
        toast.error(data.error, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    };
    fetchData();
  }, [params]);


  const handleChange = (index, event) => {
    const values = [...fields];
    values[index][event.target.id] = event.target.value;
    setFields(values);
  };

  const handleAddField = () => {
    const lastField = fields[fields.length - 1];
    const requiredFields = [
      "description",
      "descriptionGSTIN",
      "payment",
      "noOfArticles",
      "weight",
      "freightRate",
      "freightAmount",
    ];
    const isValid = requiredFields.every((field) => lastField[field] !== "");

    if (isValid) {
      const newField = {
        description: "",
        descriptionGSTIN: "",
        payment: "",
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
    if (!consigneeName) {
      toast.error("Consignee Name is required");
      return false;
    }
    if (!consigneeGSTIN) {
      toast.error("Consignee GSTIN is required");
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
        consigneeName: consigneeName,
        consigneeGSTIN: consigneeGSTIN,
        invoiceNo: invoiceNo,
        royalty: royalty,
        venue: venue,
        detail: fields,
      };
      console.log("allPdfData", allPdfData);
      const fetchData = async () => {
        const response = await fetch(`${API_BASE_URL}/updatePDF/${params.params.editPdfForm}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(allPdfData),
        });

        if (response.ok) {
          const data = await response.json();
          console.log("After Updated pdf Data",data)
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

    // if (allPdfData) {
    //   localStorage.setItem("pdfData", JSON.stringify(allPdfData));
    //   router.push("/pdfPreview");
    // }
  };

  return (
    <main className={styles.main}>
      <div className="container">
      <div
            className={`${styles.donationButtons} d-flex justify-content-between mb-3  `}
          >
            <Link href="/dashboard">
              {" "}
              <button className={`btn addDonarBtn ${styles.button}`}>
                Back
              </button>
            </Link>
          </div>
        <form>
          <div className="row justify-content-center">
            <div className="col-md-12">
              <h1 className="font-weight-bold text-decoration-underline">
                {" "}
                Minestone Infradev
              </h1>
              <h4 className="font-weight-bold text-decoration-underline">
                {" "}
                Update your details
              </h4>
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
                    Consigner
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="consigner"
                    value={consigner}
                    onChange={(e) => setConsigner(e.target.value)}
                    placeholder="Consignee GSTIN"
                  />
                </div>
              </div>
              <div className="row-inputfields">
                {" "}
               
                <div className="mb-3">
                  <label
                    htmlFor="consigneeName"
                    className="form-label required"
                  >
                    Consignee Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="consigneeName"
                    value={consigneeName}
                    onChange={(e) => setConsigneeName(e.target.value)}
                    placeholder="Consignee Name"
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="consigneeGSTIN"
                    className="form-label required"
                  >
                    Consignee GSTIN
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="consigneeGSTIN"
                    value={consigneeGSTIN}
                    onChange={(e) => setConsigneeGSTIN(e.target.value)}
                    placeholder="Consignee GSTIN"
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
              </div>

              {/* <div className="mb-3">
                <label htmlFor="description" className="form-label required">
                  Description
                </label>
                <textarea
                  type="text"
                  className="form-control"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description"
                />
              </div>
              <div className="mb-3">
                  <label
                    htmlFor="descriptionGSTIN"
                    className="form-label required"
                  >
                    Description GSTIN
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="descriptionGSTIN"
                    value={descriptionGSTIN}
                    onChange={(e) => setDescriptionGSTIN(e.target.value)}
                    placeholder="Description GSTIN"
                  />
                </div> */}

              {/* <div className="row-inputfields">
                {" "}
                <div className="mb-3">
                  <label htmlFor="payment" className="form-label required">
                    Payment
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="payment"
                    value={payment}
                    onChange={(e) => setPayment(e.target.value)}
                    placeholder="Payment"
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="noOfArticles"
                    className="form-label required"
                  >
                    No. of Articles
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="noOfArticles"
                    value={noOfArticles}
                    onChange={(e) => setNumOfArticles(e.target.value)}
                    placeholder="No. of Articles"
                  />
                </div>
              </div> */}

              {/* <div className="row-inputfields">
                {" "}
                <div className="mb-3">
                  <label htmlFor="weight" className="form-labelrequired ">
                    Weight (Mt)
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="weight"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="Weight (Mt)"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="freightRate" className="form-label required">
                    Freight Rate/MT
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="freightRate"
                    value={freightRate}
                    onChange={(e) => setFreightRate(e.target.value)}
                    placeholder="Freight Rate/MT"
                  />
                </div> */}
              {/* </div> */}

              {/* <div className="mb-3">
                  <label
                    htmlFor="freightAmount"
                    className="form-label required"
                  >
                    Freight Amount
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="freightAmount"
                    value={freightAmount}
                    onChange={(e) => setFreightAmount(e.target.value)}
                    placeholder="Freight Amount"
                  />
                </div> */}

              <div className="row-inputfields">
               
                <div className="mb-3">
                  <label htmlFor="royalty" className="form-label required">
                    Royalty
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="royalty"
                    value={royalty}
                    onChange={(e) => setRoyalty(e.target.value)}
                    placeholder="Royalty"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="venue" className="form-label required">
                    Venue
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="venue"
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                    placeholder="Venue"
                  />
                </div>
                <div className="hidden mb-3">
                  <label htmlFor="venue" className="form-label required">
                    Venue
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="venue"
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                    placeholder="Venue"
                  />
                </div>
              </div>
              <div>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Description</th>
                      <th>Description GSTIN</th>
                      <th>Payment</th>
                      <th>No. of Articles</th>
                      <th>Weight (Mt)</th>
                      <th>Freight Rate/MT</th>
                      <th>Freight Amount</th>
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
                            type="text"
                            className="form-control"
                            id="descriptionGSTIN"
                            value={field.descriptionGSTIN}
                            onChange={(e) => handleChange(index, e)}
                            placeholder="Description GSTIN"
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            className="form-control"
                            id="payment"
                            value={field.payment}
                            onChange={(e) => handleChange(index, e)}
                            placeholder="Payment"
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
