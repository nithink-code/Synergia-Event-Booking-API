// Synergia Event Booking API

import express from "express";
import connectDB from "./config/db.js";
import Booking from "./models/booking.js";

const app = express();
const PORT = 3000;

// Connect to MongoDB
connectDB();

// CORS Middleware - Allow all origins (for development/testing)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    next();
});

// Middleware to parse JSON
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Welcome to Synergia Event Booking API");
});

// GET /api/bookings - Get all event bookings
app.get("/api/bookings", async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.status(200).json({
            success: true,
            count: bookings.length,
            data: bookings
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
});

// POST /api/bookings - Create a new booking
app.post("/api/bookings", async (req, res) => {
    try {
        console.log("POST /api/bookings - Request body:", req.body);
        
        const { name, email, event, ticketType } = req.body;

        // Validate required fields
        if (!name || !email || !event) {
            return res.status(400).json({
                success: false,
                message: "Please provide name, email, and event"
            });
        }

        // Create new booking
        const newBooking = await Booking.create({
            name,
            email,
            event,
            ticketType
        });

        res.status(201).json({
            success: true,
            message: "Booking created successfully",
            data: newBooking
        });
    } catch (error) {
        console.error("Error creating booking:", error);
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
});

// GET /api/bookings/:id - Get booking by ID
app.get("/api/bookings/:id", async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: `Booking with ID ${req.params.id} not found`
            });
        }

        res.status(200).json({
            success: true,
            data: booking
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
});

// PUT /api/bookings/:id - Update participant details
app.put("/api/bookings/:id", async (req, res) => {
    try {
        const { name, email, event, ticketType } = req.body;

        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: `Booking with ID ${req.params.id} not found`
            });
        }

        // Update only provided fields
        if (name) booking.name = name;
        if (email) booking.email = email;
        if (event) booking.event = event;
        if (ticketType) booking.ticketType = ticketType;

        await booking.save();

        res.status(200).json({
            success: true,
            message: "Booking updated successfully",
            data: booking
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
});

// DELETE /api/bookings/:id - Cancel a booking
app.delete("/api/bookings/:id", async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: `Booking with ID ${req.params.id} not found`
            });
        }

        await Booking.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Booking cancelled successfully",
            data: booking
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
});

// GET /api/bookings/search?email=xyz - Search booking by email
app.get("/api/bookings/search", async (req, res) => {
    try {
        const { email } = req.query;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Please provide email query parameter"
            });
        }

        const bookings = await Booking.find({ 
            email: { $regex: email, $options: 'i' } 
        });

        res.status(200).json({
            success: true,
            count: bookings.length,
            data: bookings
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
});

// GET /api/bookings/filter?event=Synergia - Filter bookings by event
app.get("/api/bookings/filter", async (req, res) => {
    try {
        const { event } = req.query;

        if (!event) {
            return res.status(400).json({
                success: false,
                message: "Please provide event query parameter"
            });
        }

        const bookings = await Booking.find({ 
            event: { $regex: event, $options: 'i' } 
        });

        res.status(200).json({
            success: true,
            count: bookings.length,
            data: bookings
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Export for Vercel serverless function
export default app;