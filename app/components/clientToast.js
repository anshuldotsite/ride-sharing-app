"use client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ClientToast() {
  return <ToastContainer position="top-right" autoClose={5000} />;
}
