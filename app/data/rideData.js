const rideData = {
  rides: [
    {
      date: "2025-01-12",
      fare: 27.12,
      driver: "Rahul",
      location: "Mumbai",
    },
    {
      date: "2025-02-11",
      fare: 31.49,
      driver: "Priya",
      location: "Pune",
    },
    {
      date: "2025-02-14",
      fare: 68.45,
      driver: "Anil",
      location: "Mumbai",
    },
    {
      date: "2025-01-08",
      fare: 89.32,
      driver: "Sanjay",
      location: "Pune",
    },
  ],
  user: {
    rideCount: 50,
    totalSpent: 350.71,
  },
  paymentMethods: [
    { id: 1, card: "**** **** **** 4242" },
    { id: 2, card: "**** **** **** 1234" },
  ],
  testimonials: [
    { id: 1, rating: 5, review: "Great ride, very comfortable!" },
    { id: 2, rating: 4, review: "Good service but could be faster." },
    { id: 3, rating: 3, review: "Average experience overall." },
  ],
};

export default rideData;
