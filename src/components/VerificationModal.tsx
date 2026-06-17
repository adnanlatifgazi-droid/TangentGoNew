import React, { useState } from 'react';
import { X, Shield, CreditCard, Lock } from 'lucide-react';

interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  processing: boolean;
}

export default function VerificationModal({
  isOpen,
  onClose,
  onComplete,
  processing
}: VerificationModalProps) {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardNumber.trim() || !expiry.trim() || !cvv.trim()) {
      setError('Please complete all payment fields.');
      return;
    }
    setError('');
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity" id="verification-modal-overlay">
      {/* Container */}
      <div className="relative w-full max-w-md bg-white rounded-lg shadow-2xl overflow-hidden border border-zinc-200 py-7 px-6 animate-in fade-in zoom-in-95 duration-200">

        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display text-xl font-bold text-black">
            Verification Upgrade
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-black hover:bg-zinc-100 rounded-full transition cursor-pointer"
            aria-label="Close modal"
            id="close-verification-modal-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selected Plan summary */}
        <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-4 flex items-center space-x-3.5 mb-6 select-none">
          <div className="bg-black rounded-md w-11 h-11 flex items-center justify-center shrink-0">
            <Shield className="w-5 h-5 text-teal-400" />
          </div>
          <div>
            <p className="text-sm font-bold text-black leading-tight">
              TangentGo Verified
            </p>
            <p className="text-xs text-zinc-500 mt-0.5">
              $4.99 / month
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-4 text-xs font-semibold text-rose-600 bg-rose-50 p-2.5 rounded border border-rose-100">
            {error}
          </div>
        )}

        {/* Payment Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Card Information */}
          <div>
            <label className="block text-xs font-bold text-zinc-800 uppercase tracking-wider mb-1">
              Card Information
            </label>
            <div className="relative">
              <input
                type="text"
                inputMode="numeric"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="4242 4242 4242 4242"
                className="w-full pl-3.5 pr-10 py-2.5 text-sm bg-white border border-zinc-300 rounded focus:border-black focus:ring-1 focus:ring-black outline-none transition"
                maxLength={19}
                id="verification-card-input"
              />
              <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-400 pointer-events-none">
                <CreditCard className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Expiry + CVV */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-800 uppercase tracking-wider mb-1">
                Expiry
              </label>
              <input
                type="text"
                inputMode="numeric"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                placeholder="MM / YY"
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-zinc-300 rounded focus:border-black focus:ring-1 focus:ring-black outline-none transition"
                maxLength={7}
                id="verification-expiry-input"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-800 uppercase tracking-wider mb-1">
                CVV
              </label>
              <input
                type="text"
                inputMode="numeric"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                placeholder="•••"
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-zinc-300 rounded focus:border-black focus:ring-1 focus:ring-black outline-none transition"
                maxLength={4}
                id="verification-cvv-input"
              />
            </div>
          </div>

          {/* Complete Subscription */}
          <button
            type="submit"
            disabled={processing}
            className="w-full bg-black text-white py-3 rounded font-bold text-sm tracking-wide transition flex items-center justify-center space-x-2 hover:bg-zinc-800 cursor-pointer shadow-xs active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed"
            id="verification-complete-btn"
          >
            <span>{processing ? 'Processing...' : 'Complete Subscription'}</span>
          </button>
        </form>

        {/* Secure footer */}
        <p className="flex items-center justify-center space-x-1.5 text-center text-[10px] text-zinc-400 font-bold tracking-wider uppercase mt-4 select-none">
          <Lock className="w-3 h-3" />
          <span>Secure transaction powered by TangentGo</span>
        </p>

      </div>
    </div>
  );
}
