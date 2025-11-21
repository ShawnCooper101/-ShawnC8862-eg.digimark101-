# DigiMark101 AI Assistant Web Application

A full-stack Next.js application featuring an intelligent AI chat interface powered by OpenAI's GPT-3.5-turbo model with integrated PayPal checkout for premium subscriptions.

## Multi-Domain Agency Platform

This application is part of a comprehensive digital marketing agency platform spanning multiple domains:

- **digimark101.com** - Main AI Assistant (this app)
- **digimark101.shop** - E-commerce platform for digital products
- **digimark101.info** - Resources, blog, and educational content
- **app.allinonemarketing.com** - WordPress-based marketing software

See [DOMAIN-STRATEGY.md](./DOMAIN-STRATEGY.md) for complete domain architecture and [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment instructions.

## Features

### Frontend
- 🤖 Beautiful, modern chat interface with avatar
- 💬 Real-time AI conversations
- 🎨 Gradient design with smooth animations
- 📱 Responsive layout
- ⌨️ Keyboard shortcuts (Enter to send)

### Backend
- 🔌 POST endpoint at `/api/ask` for submitting questions
- 🧠 OpenAI GPT-3.5-turbo integration
- ✅ Input validation for proper request handling
- 🛡️ Error handling for robust API responses
- 📝 System prompt configured for concise, polite, and helpful responses

### Payment Integration
- 💳 PayPal checkout integration
- 💰 Premium subscription support
- 🔒 Secure payment processing
- 📧 Configured for earndaily101@mail.com

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OpenAI API key
- PayPal Client ID (for payment processing)

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory and add your credentials:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_client_id_here
   ```
   
   - Get your OpenAI API key from [OpenAI Platform](https://platform.openai.com/account/api-keys)
   - Get your PayPal Client ID from [PayPal Developer](https://developer.paypal.com/)

## Usage

### Development

Run the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`
- Frontend chat interface: `http://localhost:3000`
- Backend API endpoint: `http://localhost:3000/api/ask`

### Production

Build and start the production server:

```bash
npm run build
npm start
```

## API Endpoint

### POST /api/ask

Submit a question to get an AI-generated answer.

**Request Body:**
```json
{
  "question": "What is the capital of France?"
}
```

**Success Response (200):**
```json
{
  "answer": "The capital of France is Paris."
}
```

**Error Responses:**

- 405 Method Not Allowed:
  ```json
  {
    "error": "Method not allowed. Use POST."
  }
  ```

- 400 Bad Request:
  ```json
  {
    "error": "A valid \"question\" must be provided."
  }
  ```

- 500 Internal Server Error:
  ```json
  {
    "error": "Failed to get answer from OpenAI."
  }
  ```

## Example Usage

Using cURL:

```bash
curl -X POST http://localhost:3000/api/ask \
  -H "Content-Type: application/json" \
  -d '{"question": "What is Next.js?"}'
```

Using JavaScript fetch:

```javascript
fetch('http://localhost:3000/api/ask', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    question: 'What is Next.js?'
  })
})
  .then(response => response.json())
  .then(data => console.log(data.answer))
  .catch(error => console.error('Error:', error));
```

## Configuration

The AI assistant is configured with the following parameters:

- **Model**: gpt-3.5-turbo
- **Max Tokens**: 250
- **Temperature**: 0.6
- **System Prompt**: Configured for concise, meaningful, and polite responses

## Security Notes

⚠️ **Important**: This project uses `openai@3.3.0` which has known security vulnerabilities in its axios dependency. For production use, consider upgrading to `openai@4.x` or later, which requires code changes to use the new API.

## License

ISC
