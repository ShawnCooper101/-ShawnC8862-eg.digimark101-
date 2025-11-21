import { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

export default function PayPalCheckout({ amount = "9.99", payeeEmail = "earndaily101@mail.com", onSuccess, onError }) {
  const [notification, setNotification] = useState(null);
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  
  if (!clientId) {
    return (
      <div style={{ padding: '20px', background: '#fff3cd', borderRadius: '10px', color: '#856404' }}>
        <p><strong>⚠️ PayPal Configuration Missing</strong></p>
        <p>Please set NEXT_PUBLIC_PAYPAL_CLIENT_ID environment variable to enable checkout.</p>
      </div>
    );
  }

  const initialOptions = {
    "client-id": clientId,
    currency: "USD",
    intent: "capture"
  };

  return (
    <div style={{
      background: '#f8f9fa',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      {notification && (
        <div style={{
          padding: '12px 16px',
          marginBottom: '15px',
          borderRadius: '8px',
          background: notification.type === 'success' ? '#d4edda' : '#f8d7da',
          color: notification.type === 'success' ? '#155724' : '#721c24',
          border: `1px solid ${notification.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span>{notification.message}</span>
          <button
            onClick={() => setNotification(null)}
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: '18px',
              cursor: 'pointer',
              padding: '0 8px'
            }}
          >
            ×
          </button>
        </div>
      )}
      <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>Premium Access</h3>
      <p style={{ margin: '0 0 15px 0', color: '#666' }}>
        Get unlimited AI conversations for just ${amount}/month
      </p>
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          style={{
            layout: "vertical",
            color: "gold",
            shape: "rect",
            label: "paypal"
          }}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [{
                amount: {
                  value: amount,
                  currency_code: "USD"
                },
                payee: {
                  email_address: payeeEmail
                },
                description: "AI Assistant Premium Subscription"
              }]
            });
          }}
          onApprove={async (data, actions) => {
            try {
              const details = await actions.order.capture();
              setNotification({
                type: 'success',
                message: `Transaction completed by ${details.payer.name.given_name}! Thank you for your purchase.`
              });
              if (onSuccess) onSuccess(details);
              return details;
            } catch (error) {
              console.error('Error capturing order:', error);
              setNotification({
                type: 'error',
                message: 'Payment processing failed. Please contact support.'
              });
              if (onError) onError(error);
            }
          }}
          onError={(err) => {
            console.error('PayPal error:', err);
            setNotification({
              type: 'error',
              message: 'Payment error occurred. Please try again or contact support.'
            });
            if (onError) onError(err);
          }}
          onCancel={(data) => {
            console.log('Payment cancelled:', data);
          }}
        />
      </PayPalScriptProvider>
      <p style={{ 
        fontSize: '12px', 
        color: '#999', 
        marginTop: '15px',
        textAlign: 'center'
      }}>
        Secure payment powered by PayPal
      </p>
    </div>
  );
}
