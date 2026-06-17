import React from 'react';
import { X, AlertTriangle } from 'lucide-react';

interface CancelSubscriptionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function CancelSubscriptionDialog({
  isOpen,
  onClose,
  onConfirm
}: CancelSubscriptionDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs" id="cancel-subscription-overlay">
      <div className="relative w-full max-w-sm bg-white rounded-lg shadow-2xl border border-zinc-200 p-6 text-center animate-in fade-in zoom-in-95 duration-200">

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-zinc-400 hover:text-black hover:bg-zinc-100 rounded-full transition cursor-pointer"
          aria-label="Close dialog"
          id="close-cancel-subscription-btn"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Warning icon */}
        <div className="mx-auto w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center mb-4">
          <AlertTriangle className="w-6 h-6 text-rose-500" />
        </div>

        {/* Message */}
        <h2 className="font-display text-xl font-bold text-black mb-2">
          Cancel your subscription?
        </h2>
        <p className="text-sm text-zinc-600 leading-relaxed mb-6">
          You'll lose your <span className="font-semibold text-zinc-800">TangentGo Verified</span> badge and access to advanced matching filters at the end of your billing period.
        </p>

        {/* Actions (Netflix style: keep is primary, cancel is secondary) */}
        <div className="space-y-2.5">
          <button
            onClick={onClose}
            className="w-full bg-black hover:bg-zinc-800 text-white py-3 rounded font-bold text-sm transition cursor-pointer select-none"
            id="keep-membership-btn"
          >
            Keep Membership
          </button>
          <button
            onClick={onConfirm}
            className="w-full bg-white border border-zinc-300 hover:border-rose-400 text-rose-600 hover:bg-rose-50 py-3 rounded font-bold text-sm transition cursor-pointer select-none"
            id="confirm-cancel-subscription-btn"
          >
            Cancel Subscription
          </button>
        </div>
      </div>
    </div>
  );
}
