# Premium Subscription App

A modern Next.js PWA with Razorpay payment integration and push notifications.

## Features

- 🎨 Premium UI with animations and gradients
- 💳 Razorpay payment integration (UPI, Cards, Net Banking)
- 📱 Progressive Web App (PWA) - Install to home screen
- 🔔 Push notifications (works when app is closed)
- ⚡ Fast and responsive
- 🔒 Secure payment processing
- 📲 Native app-like experience on mobile

## Quick Start

### Prerequisites
- Node.js 18+ installed
- Razorpay account ([Sign up here](https://dashboard.razorpay.com/signup))

### Installation

```bash
# Clone the repository
git clone https://github.com/jaswinder4232/payment_getway.git
cd payment_getway

# Install dependencies
npm install

# Copy environment variables
cp .env.local.example .env.local

# Add your Razorpay keys to .env.local
# Get keys from: https://dashboard.razorpay.com/app/keys
```

### Development

```bash
# Run development server
npm run dev

# Open http://localhost:3000
```

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## Environment Variables

Create a `.env.local` file with:

```bash
# Razorpay API Keys
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_SECRET=your_secret_key

# VAPID Keys for Push Notifications
NEXT_PUBLIC_VAPID_PUBLIC_KEY=your_public_key
VAPID_PRIVATE_KEY=your_private_key

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables
5. Deploy!

## Mobile App Installation

### Android
1. Open the app in Chrome
2. Tap menu (⋮) → "Install app"
3. Open from home screen
4. Enable notifications

### iOS
1. Open in Safari
2. Tap Share → "Add to Home Screen"
3. Limited notification support

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS + Custom CSS
- **Payments**: Razorpay
- **PWA**: next-pwa
- **Notifications**: Web Push API + web-push
- **Language**: JavaScript (JSX)

## Features in Detail

### Payment Integration
- Razorpay checkout modal
- Support for UPI, Cards, Net Banking, Wallets
- EMI and Pay Later disabled
- Secure payment verification
- Success/Cancel page redirects

### Push Notifications
- Request notification permission
- Subscribe to push notifications
- Send notifications via API
- Works when app is closed
- Native notification style on mobile

### PWA Features
- Install to home screen
- Offline support
- App-like experience
- Custom splash screen
- Service worker caching

## API Endpoints

- `POST /api/create-order` - Create Razorpay order
- `POST /api/verify-payment` - Verify payment signature
- `POST /api/subscribe` - Save push subscription
- `POST /api/send-notification` - Send push notification

## Testing

### Test Payment
Use Razorpay test cards:
- Card: `4111 1111 1111 1111`
- Expiry: Any future date
- CVV: Any 3 digits

### Test Notifications
1. Enable notifications
2. Click "Test" button
3. Check notification tray

## Browser Support

| Feature | Chrome | Edge | Firefox | Safari |
|---------|--------|------|---------|--------|
| PWA | ✅ | ✅ | ✅ | ⚠️ |
| Push Notifications | ✅ | ✅ | ✅ | ❌ |
| Payment | ✅ | ✅ | ✅ | ✅ |

## License

MIT

## Support

For issues or questions, please open an issue on GitHub.
