"use client";
import { useState, useEffect } from "react";

// Utility functions to load and save payment methods in localStorage
function loadPaymentMethods() {
  const methods = localStorage.getItem("paymentMethods");
  return methods ? JSON.parse(methods) : [];
}

function savePaymentMethods(methods) {
  localStorage.setItem("paymentMethods", JSON.stringify(methods));
}

// Helper function to mask a card number
function maskCard(cardNumber) {
  // Remove any spaces if present.
  const clean = cardNumber.replace(/\s+/g, "");
  if (clean.length <= 4) return clean;
  const lastFour = clean.slice(-4);
  return "**** **** **** " + lastFour;
}

export default function PaymentMethodsManager() {
  const [methods, setMethods] = useState([]);

  useEffect(() => {
    setMethods(loadPaymentMethods());
  }, []);

  const addPaymentMethod = () => {
    const card = prompt("Enter card number (full):", "4242424242424242");
    if (card) {
      // Mask the card before storing it.
      const masked = maskCard(card);
      const newMethod = { id: Date.now(), card: masked };
      const updated = [...methods, newMethod];
      setMethods(updated);
      savePaymentMethods(updated);
    }
  };

  const updatePaymentMethod = (id) => {
    // Show the currently masked card and allow updating it
    const currentMethod = methods.find((m) => m.id === id);
    const newCard = prompt("Enter new card number (full):", currentMethod.card);
    if (newCard) {
      const masked = maskCard(newCard);
      const updated = methods.map((m) =>
        m.id === id ? { ...m, card: masked } : m
      );
      setMethods(updated);
      savePaymentMethods(updated);
    }
  };

  const removePaymentMethod = (id) => {
    const updated = methods.filter((m) => m.id !== id);
    setMethods(updated);
    savePaymentMethods(updated);
  };

  return (
    <div className="border p-4 rounded">
      <h2 className="text-2xl font-bold mb-2">Payment Methods</h2>
      {methods.length > 0 ? (
        <ul className="space-y-2">
          {methods.map((method) => (
            <li
              key={method.id}
              className="border p-2 rounded flex justify-between items-center"
            >
              <span>{method.card}</span>
              <div className="space-x-2">
                <button
                  className="text-blue-500"
                  onClick={() => updatePaymentMethod(method.id)}
                >
                  Update
                </button>
                <button
                  className="text-red-500"
                  onClick={() => removePaymentMethod(method.id)}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No payment methods available.</p>
      )}
      <button
        onClick={addPaymentMethod}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
      >
        Add Payment Method
      </button>
    </div>
  );
}
