# Deployment Checklist for Vercel

## ✅ Pre-Deployment Steps

### 1. MongoDB Atlas Configuration
- [ ] Go to MongoDB Atlas → Network Access
- [ ] Click "Add IP Address"
- [ ] Select "Allow Access from Anywhere" (0.0.0.0/0)
- [ ] Or add Vercel's IP ranges
- [ ] Click "Confirm"

### 2. Vercel Environment Variables
- [ ] Go to Vercel Dashboard → Your Project → Settings → Environment Variables
- [ ] Add `MONGODB_URL` with your MongoDB connection string
- [ ] Make sure to select all environments (Production, Preview, Development)
- [ ] Click "Save"

### 3. Code Changes
- [x] Updated `config/db.js` with connection caching and proper timeouts
- [x] Updated `index.js` with database connection middleware
- [x] Updated `vercel.json` with proper routing configuration

## 🚀 Deployment Steps

### Option 1: Deploy via GitHub (Recommended)
```bash
# Commit and push changes
git add .
git commit -m "Fix MongoDB timeout and serverless configuration"
git push origin main
```
Vercel will auto-deploy if connected to GitHub.

### Option 2: Deploy via Vercel CLI
```bash
# Install Vercel CLI if not installed
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

## 🧪 Testing After Deployment

### Test 1: Check if API is running
```bash
curl https://your-deployed-url.vercel.app/
```
Expected: "Welcome to Synergia Event Booking API"

### Test 2: Get all bookings
```bash
curl https://your-deployed-url.vercel.app/api/bookings
```

### Test 3: Create a booking (POST)
```bash
curl -X POST https://your-deployed-url.vercel.app/api/bookings \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Test User\",\"email\":\"test@example.com\",\"event\":\"Synergia 2024\",\"ticketType\":\"General\"}"
```

Expected Response:
```json
{
  "success": true,
  "message": "Booking created successfully",
  "data": { ... }
}
```

## 🐛 Troubleshooting

### Error: "Database connection failed"
- Check if `MONGODB_URL` environment variable is set on Vercel
- Verify MongoDB Atlas allows connections from anywhere (0.0.0.0/0)

### Error: "buffering timed out"
- This should be fixed with the updated code
- If still occurring, check MongoDB Atlas connectivity

### Error: "MongooseServerSelectionError"
- MongoDB Atlas IP whitelist issue
- Add 0.0.0.0/0 to Network Access in MongoDB Atlas

### How to Check Vercel Logs
1. Go to Vercel Dashboard
2. Select your project
3. Click on the latest deployment
4. Click "Functions" tab
5. Click on your function to see logs

## 📝 Important Notes

1. **Environment Variables**: Must be set on Vercel dashboard, not just in local .env
2. **MongoDB Atlas**: Must allow Vercel's IP addresses (use 0.0.0.0/0 for simplicity)
3. **Deployment**: Changes won't take effect until you redeploy
4. **Cold Starts**: First request may be slow (serverless function warming up)

## 🔗 Useful Links

- MongoDB Atlas: https://cloud.mongodb.com/
- Vercel Dashboard: https://vercel.com/dashboard
- Vercel Logs: Check in deployment → Functions tab
