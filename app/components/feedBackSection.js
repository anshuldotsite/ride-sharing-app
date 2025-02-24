"use client";
import { motion } from "framer-motion";
import { useMemo } from "react";

// Helpers
function getAverageRating(testimonials) {
  if (!testimonials.length) return 0;
  const sum = testimonials.reduce((acc, t) => acc + t.rating, 0);
  return sum / testimonials.length;
}

function getRatingDistribution(testimonials) {
  const dist = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  testimonials.forEach((t) => {
    if (dist[t.rating] !== undefined) {
      dist[t.rating]++;
    }
  });
  return dist;
}

// A small star-display utility
function renderStars(count) {
  // You can replace this with real icons if you prefer
  return "⭐".repeat(count);
}

export default function FeedbackSection({ testimonials }) {
  // Compute rating stats
  const avgRating = useMemo(
    () => getAverageRating(testimonials),
    [testimonials]
  );
  const dist = useMemo(
    () => getRatingDistribution(testimonials),
    [testimonials]
  );
  const totalCount = testimonials.length;

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="p-6 rounded-lg shadow-lg bg-white dark:bg-black text-black dark:text-white"
    >
      {testimonials.length === 0 ? (
        <p>No feedback submitted yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Column: Comments */}
          <div className="space-y-4">
            {testimonials.map((testimonial, i) => (
              <div
                key={testimonial.id}
                className="p-4 rounded border bg-white dark:bg-black text-black dark:text-white"
              >
                <p className="text-yellow-500 mb-1">
                  {renderStars(testimonial.rating)}
                </p>
                <p>{testimonial.review}</p>
              </div>
            ))}
          </div>

          {/* Right Column: Rating Distribution */}
          <div className="bg-white dark:bg-black text-black dark:text-white rounded p-4 flex flex-col space-y-4">
            {/* Average rating and star row */}
            <div className="flex items-center space-x-2">
              <p className="text-yellow-500 text-xl">
                {renderStars(Math.round(avgRating))}
              </p>
              <p className="text-2xl font-bold">{avgRating.toFixed(1)}</p>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                ({totalCount} reviews)
              </span>
            </div>

            {/* Distribution bars (5 to 1) */}
            {[5, 4, 3, 2, 1].map((star) => {
              const count = dist[star];
              const percent = totalCount > 0 ? (count / totalCount) * 100 : 0;
              return (
                <div key={star} className="flex items-center space-x-2 text-sm">
                  <span className="w-6 text-yellow-500">{star}⭐</span>
                  <div className="flex-1 h-2 bg-white dark:bg-black text-black dark:text-white rounded">
                    <div
                      className="h-2 bg-yellow-500 rounded"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <span className="w-6 text-right">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </motion.section>
  );
}
