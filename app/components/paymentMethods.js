"use client";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function PaymentMethods() {
  const [methods, setMethods] = useState([]);

  useEffect(() => {
    // Fake JSON data representing stored payment methods
    const fakeData = {
      methods: [
        { id: 1, card: "**** **** **** 1234" },
        { id: 2, card: "**** **** **** 5678" },
      ],
    };

    // Simulate an API call delay
    const timer = setTimeout(() => {
      setMethods(fakeData.methods);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const addPaymentMethod = () => {
    // Dummy logic to add a payment method
    const newMethod = { id: Date.now(), card: "**** **** **** 4242" };
    setMethods([...methods, newMethod]);
    toast.success("Payment method added.");
  };

  const removePaymentMethod = (id) => {
    setMethods(methods.filter((m) => m.id !== id));
    toast.success("Payment method removed.");
  };

  return (
    <div className="border p-4 rounded shadow-md">
      <button onClick={addPaymentMethod} className="btn btn-secondary mb-4">
        Add Payment Method
      </button>
      <ul>
        {methods.map((method) => (
          <li
            key={method.id}
            className="flex justify-between items-center border-b py-2"
          >
            <span>{method.card}</span>
            <button
              onClick={() => removePaymentMethod(method.id)}
              className="btn btn-danger"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
