# Synergia-Event-Booking-API
Synergia Event Booking API - NodeJS and Express

## Issues Fixed

The internal server error when posting data was caused by:

1. **Missing CORS headers** - Vercel was blocking cross-origin requests
2. **Missing serverless export** - Vercel needs `export default app`
3. **Missing environment variables** - MONGODB_URL not configured on Vercel

## Deployment Steps for Vercel

### 1. Create `.env` file locally
Create a `.env` file in the project root with your MongoDB connection string:
```
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/synergia?retryWrites=true&w=majority
```

### 2. Configure Environment Variables on Vercel
1. Go to your Vercel project dashboard
2. Click on **Settings** → **Environment Variables**
3. Add the following variable:
   - **Name**: `MONGODB_URL`
   - **Value**: Your MongoDB connection string
   - Select all environments (Production, Preview, Development)
4. Click **Save**

### 3. Redeploy the Project
After adding environment variables, redeploy:
```bash
git add .
git commit -m "Fix CORS and serverless configuration"
git push
```

Or use Vercel CLI:
```bash
vercel --prod
```

## Testing the API

### Using cURL:
```bash
curl -X POST https://your-project.vercel.app/api/bookings \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"John Doe\",\"email\":\"john@example.com\",\"event\":\"Synergia 2024\",\"ticketType\":\"VIP\"}"
```

### Using Postman:
1. Method: POST
2. URL: `https://your-project.vercel.app/api/bookings`
3. Headers: `Content-Type: application/json`
4. Body (raw JSON):
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "event": "Synergia 2024",
  "ticketType": "VIP"
}
```

## API Endpoints

- `GET /` - Welcome message
- `GET /api/bookings` - Get all bookings
- `POST /api/bookings` - Create new booking
- `GET /api/bookings/:id` - Get booking by ID
- `PUT /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Delete booking
- `GET /api/bookings/search?email=xyz` - Search by email
- `GET /api/bookings/filter?event=xyz` - Filter by event
