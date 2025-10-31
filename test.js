// Test script for Synergia Event Booking API
// Usage: node test.js <deployed-url>
// Example: node test.js https://your-app.vercel.app

const BASE_URL = process.argv[2] || 'http://localhost:3000';

console.log(`\n🧪 Testing API at: ${BASE_URL}\n`);

// Test 1: GET / (Welcome message)
async function testWelcome() {
    console.log('Test 1: GET / (Welcome message)');
    try {
        const response = await fetch(BASE_URL);
        const text = await response.text();
        console.log('✅ Status:', response.status);
        console.log('✅ Response:', text);
    } catch (error) {
        console.log('❌ Error:', error.message);
    }
    console.log('---\n');
}

// Test 2: GET /api/bookings (Get all bookings)
async function testGetBookings() {
    console.log('Test 2: GET /api/bookings (Get all bookings)');
    try {
        const response = await fetch(`${BASE_URL}/api/bookings`);
        const data = await response.json();
        console.log('✅ Status:', response.status);
        console.log('✅ Response:', JSON.stringify(data, null, 2));
    } catch (error) {
        console.log('❌ Error:', error.message);
    }
    console.log('---\n');
}

// Test 3: POST /api/bookings (Create new booking)
async function testCreateBooking() {
    console.log('Test 3: POST /api/bookings (Create new booking)');
    
    const bookingData = {
        name: "Test User " + Date.now(),
        email: `test${Date.now()}@example.com`,
        event: "Synergia 2024",
        ticketType: "VIP"
    };
    
    console.log('📤 Sending:', JSON.stringify(bookingData, null, 2));
    
    try {
        const response = await fetch(`${BASE_URL}/api/bookings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookingData)
        });
        
        const data = await response.json();
        console.log('✅ Status:', response.status);
        console.log('✅ Response:', JSON.stringify(data, null, 2));
        
        return data.data?._id; // Return ID for next tests
    } catch (error) {
        console.log('❌ Error:', error.message);
        return null;
    }
    console.log('---\n');
}

// Test 4: GET /api/bookings/:id (Get booking by ID)
async function testGetBookingById(id) {
    if (!id) {
        console.log('Test 4: Skipped (no booking ID from previous test)\n---\n');
        return;
    }
    
    console.log(`Test 4: GET /api/bookings/${id} (Get booking by ID)`);
    try {
        const response = await fetch(`${BASE_URL}/api/bookings/${id}`);
        const data = await response.json();
        console.log('✅ Status:', response.status);
        console.log('✅ Response:', JSON.stringify(data, null, 2));
    } catch (error) {
        console.log('❌ Error:', error.message);
    }
    console.log('---\n');
}

// Test 5: PUT /api/bookings/:id (Update booking)
async function testUpdateBooking(id) {
    if (!id) {
        console.log('Test 5: Skipped (no booking ID from previous test)\n---\n');
        return;
    }
    
    console.log(`Test 5: PUT /api/bookings/${id} (Update booking)`);
    
    const updateData = {
        ticketType: "General"
    };
    
    console.log('📤 Sending:', JSON.stringify(updateData, null, 2));
    
    try {
        const response = await fetch(`${BASE_URL}/api/bookings/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateData)
        });
        
        const data = await response.json();
        console.log('✅ Status:', response.status);
        console.log('✅ Response:', JSON.stringify(data, null, 2));
    } catch (error) {
        console.log('❌ Error:', error.message);
    }
    console.log('---\n');
}

// Run all tests
async function runAllTests() {
    await testWelcome();
    await testGetBookings();
    const bookingId = await testCreateBooking();
    await testGetBookingById(bookingId);
    await testUpdateBooking(bookingId);
    
    console.log('\n🎉 All tests completed!\n');
}

runAllTests();
