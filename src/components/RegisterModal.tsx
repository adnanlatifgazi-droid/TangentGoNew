import React, { useState } from 'react';
import { X, Compass, Info } from 'lucide-react';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegisterSuccess: (fullName: string, email: string) => void;
  onSwitchToLogin: () => void;
}

export default function RegisterModal({
  isOpen,
  onClose,
  onRegisterSuccess,
  onSwitchToLogin
}: RegisterModalProps) {
  if (!isOpen) return null;

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }
    if (!agree) {
      setError('Please agree to the Terms of Service and Privacy Policy.');
      return;
    }

    setError('');
    onRegisterSuccess(fullName, email);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity" id="register-modal-overlay">
      {/* Container */}
      <div className="relative w-full max-w-md bg-white rounded-lg shadow-2xl overflow-hidden border border-zinc-200 py-8 px-6 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-zinc-400 hover:text-black hover:bg-zinc-100 rounded-full transition cursor-pointer"
          aria-label="Close modal"
          id="close-register-modal-btn"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="flex items-center space-x-2 mb-2">
          <Compass className="w-6 h-6 text-black rotate-12" />
          <span className="font-display text-xl font-bold text-black">TangentGo</span>
        </div>

        {/* Title */}
        <h2 className="font-display text-2xl font-bold text-black mb-1">
          Join TangentGo
        </h2>
        <p className="text-sm text-zinc-600 mb-6 font-sans">
          Create your account to start discovering activities near you.
        </p>

        {error && (
          <div className="mb-4 text-xs font-semibold text-rose-600 bg-rose-50 p-2.5 rounded border border-rose-100">
            {error}
          </div>
        )}

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Full Name */}
          <div>
            <label className="block text-xs font-bold text-zinc-800 uppercase tracking-wider mb-1">
              Full Name
            </label>
            <input 
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Alex Johnson"
              className="w-full px-3.5 py-2.5 text-sm bg-white border border-zinc-300 rounded focus:border-black focus:ring-1 focus:ring-black outline-none transition"
              required
              id="register-name-input"
            />
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-xs font-bold text-zinc-800 uppercase tracking-wider mb-1">
              Email Address
            </label>
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex@example.com"
              className="w-full px-3.5 py-2.5 text-sm bg-white border border-zinc-300 rounded focus:border-black focus:ring-1 focus:ring-black outline-none transition"
              required
              id="register-email-input"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-bold text-zinc-800 uppercase tracking-wider mb-1">
              Password
            </label>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 text-sm bg-white border border-zinc-300 rounded focus:border-black focus:ring-1 focus:ring-black outline-none transition"
              required
              id="register-password-input"
            />
            
            {/* Info warning matching Image 5 */}
            <div className="mt-3 flex items-start space-x-2 bg-slate-50 border border-slate-100 rounded p-2.5">
              <Info className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <p className="text-[11px] text-zinc-600 leading-normal">
                Must be at least 8 characters long and include a mix of letters, numbers, and symbols.
              </p>
            </div>
          </div>

          {/* Terms Agreement checkbox */}
          <div className="flex items-start space-x-3 py-1 select-none">
            <input 
              type="checkbox"
              id="terms-agreement-checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="w-4 h-4 mt-0.5 rounded border-zinc-300 text-black focus:ring-black cursor-pointer"
            />
            <label htmlFor="terms-agreement-checkbox" className="text-xs text-zinc-700 cursor-pointer leading-tight">
              I agree to the <span className="text-teal-700 hover:underline font-semibold cursor-pointer">Terms of Service</span> and <span className="text-teal-700 hover:underline font-semibold cursor-pointer">Privacy Policy</span>.
            </label>
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded font-bold text-sm tracking-wide transition flex items-center justify-center space-x-2 hover:bg-zinc-800 cursor-pointer shadow-xs active:scale-98"
            id="register-submit-btn"
          >
            <span>Create Account</span>
            <span className="font-sans">→</span>
          </button>
        </form>

        <div className="mt-8 border-t border-zinc-100 pt-4 text-center text-xs">
          <span className="text-zinc-600">Already have an account? </span>
          <button 
            onClick={onSwitchToLogin}
            className="font-bold text-teal-700 hover:text-teal-900 cursor-pointer"
            id="switch-to-login-trigger"
          >
            Log In <span className="font-sans">→]</span>
          </button>
        </div>

      </div>
    </div>
  );
}
