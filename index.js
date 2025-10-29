// Synergia Event Booking API

import express from "express";

const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// In-memory storage for bookings
let bookings = [];
let nextId = 1;

// GET /api/bookings - Get all event bookings
app.get("/api/bookings", (req, res) => {
    res.status(200).json({
        success: true,
        count: bookings.length,
        data: bookings
    });
});

// POST /api/bookings - Create a new booking
app.post("/api/bookings", (req, res) => {
    const { name, email, phone, eventName } = req.body;

    // Validate required fields
    if (!name || !email || !phone) {
        return res.status(400).json({
            success: false,
            message: "Please provide name, email, and phone"
        });
    }

    // Create new booking
    const newBooking = {
        id: nextId++,
        name,
        email,
        phone,
        eventName: eventName || "Synergia 2025",
        bookingDate: new Date().toISOString(),
        status: "confirmed"
    };

    bookings.push(newBooking);

    res.status(201).json({
        success: true,
        message: "Booking created successfully",
        data: newBooking
    });
});

// GET /api/bookings/:id - Get booking by ID
app.get("/api/bookings/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const booking = bookings.find(b => b.id === id);

    if (!booking) {
        return res.status(404).json({
            success: false,
            message: `Booking with ID ${id} not found`
        });
    }

    res.status(200).json({
        success: true,
        data: booking
    });
});

// PUT /api/bookings/:id - Update participant details
app.put("/api/bookings/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const bookingIndex = bookings.findIndex(b => b.id === id);

    if (bookingIndex === -1) {
        return res.status(404).json({
            success: false,
            message: `Booking with ID ${id} not found`
        });
    }

    const { name, email, phone, eventName, status } = req.body;

    // Update only provided fields
    if (name) bookings[bookingIndex].name = name;
    if (email) bookings[bookingIndex].email = email;
    if (phone) bookings[bookingIndex].phone = phone;
    if (eventName) bookings[bookingIndex].eventName = eventName;
    if (status) bookings[bookingIndex].status = status;

    bookings[bookingIndex].updatedAt = new Date().toISOString();

    res.status(200).json({
        success: true,
        message: "Booking updated successfully",
        data: bookings[bookingIndex]
    });
});

// DELETE /api/bookings/:id - Cancel a booking
app.delete("/api/bookings/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const bookingIndex = bookings.findIndex(b => b.id === id);

    if (bookingIndex === -1) {
        return res.status(404).json({
            success: false,
            message: `Booking with ID ${id} not found`
        });
    }

    const deletedBooking = bookings.splice(bookingIndex, 1)[0];

    res.status(200).json({
        success: true,
        message: "Booking cancelled successfully",
        data: deletedBooking
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});