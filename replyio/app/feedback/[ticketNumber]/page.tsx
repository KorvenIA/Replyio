'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase';
import { useParams } from 'next/navigation';

export default function FeedbackPage() {
  const params = useParams();
  const ticketNumber = params.ticketNumber as string;
  const supabase = createClient();
  
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTicket = async () => {
      if (!ticketNumber) return;
      
      const { data, error } = await supabase
        .from('tickets')
        .select('id')
        .eq('ticket_number', ticketNumber)
        .single();
        
      if (error || !data) {
        setError('Ticket not found');
      } else {
        setTicketId(data.id);
      }
      setLoading(false);
    };
    
    fetchTicket();
  }, [ticketNumber, supabase]);

  const handleSubmit = async () => {
    if (rating === 0) return;
    
    setSubmitted(true);
    
    try {
      await fetch('/api/ratings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rating,
          comment,
          ticketId,
          ratingType: 'email_response'
        })
      });
    } catch (e) {
      console.error('Failed to submit rating', e);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-4">
        <p className="text-gray-500 text-sm animate-pulse">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-[#E5E5E5] text-center max-w-md w-full">
          <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-gray-900 mb-1">Invalid Ticket</h2>
          <p className="text-sm text-gray-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-4 font-sans text-[#1A1A1A]">
      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-sm border border-[#E5E5E5] text-center">
        {!submitted ? (
          <>
            <h1 className="text-xl font-semibold mb-2">How was our response?</h1>
            <p className="text-sm text-gray-500 mb-8">Let us know how we did for ticket <span className="font-medium text-gray-700">#{ticketNumber}</span></p>
            
            <div className="flex justify-center gap-2 mb-8 cursor-pointer">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  className={`text-4xl transition-colors ${
                    star <= (hoverRating || rating) ? 'text-amber-400' : 'text-gray-200'
                  }`}
                >
                  ★
                </span>
              ))}
            </div>

            {rating > 0 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <textarea
                  placeholder="Add a comment (optional)..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full p-3 border border-[#E5E5E5] rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all min-h-[100px] resize-y"
                />
                
                <button
                  onClick={handleSubmit}
                  className="w-full bg-[#2563EB] hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors"
                >
                  Submit Feedback
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="py-6 animate-in zoom-in duration-300">
            <div className="w-16 h-16 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-5">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2 text-gray-900">Thank you for your feedback!</h2>
            <p className="text-sm text-gray-500">Your input has been recorded.</p>
          </div>
        )}
      </div>
    </div>
  );
}
