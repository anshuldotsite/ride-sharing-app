"use client";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import rideData from "../data/rideData";

export default function FeedbackForm() {
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    // Simulate fetching fake testimonial data from rideData with a slight delay
    const timer = setTimeout(() => {
      setTestimonials(rideData.testimonials || []);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const submitFeedback = (e) => {
    e.preventDefault();
    // Create a new feedback object
    const newFeedback = {
      id: Date.now(), // Using timestamp as a unique id
      rating,
      review,
    };

    // Add new feedback to the top of the list
    setTestimonials([newFeedback, ...testimonials]);
    toast.success("Feedback submitted!");

    // Reset form fields
    setRating(5);
    setReview("");
  };

  return (
    <div className="space-y-4">
      <form
        onSubmit={submitFeedback}
        className="space-y-4 border p-4 rounded shadow-md"
      >
        <div className="border p-4 rounded shadow-md">
          <label className="block mb-1">Rating:</label>
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(parseInt(e.target.value))}
            className="input bg-white dark:bg-black text-black dark:text-white w-full"
          />
        </div>
        <div className="border p-4 rounded shadow-md">
          <label className="block mb-1">Review:</label>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="input w-full bg-white dark:bg-black text-black dark:text-white"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit Feedback
        </button>
      </form>
      <div className="border p-4 rounded shadow-md">
        <h3 className="text-xl font-bold mb-2">Testimonials</h3>
        {testimonials.length === 0 ? (
          <p>No testimonials yet.</p>
        ) : (
          <ul className="space-y-2">
            {testimonials.map((feedback) => (
              <li key={feedback.id} className="border p-2 rounded">
                <p>
                  <strong>Rating:</strong> {feedback.rating}
                </p>
                <p>
                  <strong>Review:</strong> {feedback.review}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
