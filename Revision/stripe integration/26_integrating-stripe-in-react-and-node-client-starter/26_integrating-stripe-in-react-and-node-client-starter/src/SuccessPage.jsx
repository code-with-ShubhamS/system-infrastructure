// src/pages/SuccessPage.jsx
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
export default function SuccessPage() {
  const [searchParams] = useSearchParams();
  const [sessionData, setSessionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);
  const sessionId = searchParams.get("session_id");
  console.log(sessionId);
  useEffect(() => {
    if (!sessionId) return;

    const fetchSession = async () => {
      try {
        const res = await fetch(
          `http://localhost:4000/checkout-session?session_id=${sessionId}`
        );
        const data = await res.json();
        setStatus(data.status);
        setSessionData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [sessionId]);

  // if (!sessionId) return <p>Invalid session ID.</p>;
  if (loading) return <p>Loading...</p>;
  if (status === "open") {
    return <Navigate to="/web/checkout" />;
  }
  if (status === "paid") {
    return (
      <section id="success">
        <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow rounded">
          <h1 className="text-2xl font-bold mb-4">Payment Successful!</h1>
          <p className="mb-2">Thank you for your purchase.</p>
          {sessionData && (
            <>
              <p>
                <strong>Customer Email:</strong> {sessionData?.customer_email}
              </p>
              <p>
                <strong>Amount Paid:</strong> $
                {(sessionData?.amount_total / 100).toFixed(2)}
              </p>
              <p>
                <strong>Payment Status:</strong> {sessionData?.payment_status}
              </p>
            </>
          )}
        </div>
      </section>
    );
  }

  return null;
}
