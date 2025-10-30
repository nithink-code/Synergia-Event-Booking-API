import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide name"]
    },
    email: {
        type: String,
        required: [true, "Please provide email"]
    },
    event: {
        type: String,
        required: [true, "Please provide event name"]
    },
    ticketType: {
        type: String,
        default: "General"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
