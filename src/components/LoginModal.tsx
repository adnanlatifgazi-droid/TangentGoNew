import React, { useState } from 'react';
import { Eye, EyeOff, X, Compass } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (email: string) => void;
  onSwitchToRegister: () => void;
}

export default function LoginModal({
  isOpen,
  onClose,
  onLoginSuccess,
  onSwitchToRegister
}: LoginModalProps) {
  if (!isOpen) return null;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    // Successful login simulation
    onLoginSuccess(email);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity" id="login-modal-overlay">
      {/* Container matching screenshot styling */}
      <div className="relative w-full max-w-md bg-white rounded-lg shadow-2xl overflow-hidden border border-zinc-200 py-8 px-6 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-zinc-400 hover:text-black hover:bg-zinc-100 rounded-full transition cursor-pointer"
          aria-label="Close modal"
          id="close-login-modal-btn"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="flex items-center space-x-2 mb-2">
          <Compass className="w-6 h-6 text-black rotate-12" />
          <span className="font-display text-xl font-bold text-black">TangentGo</span>
        </div>

        {/* Title & Prompt */}
        <h2 className="font-display text-2xl font-bold text-black mb-1">
          Welcome Back
        </h2>
        <p className="text-sm text-zinc-600 mb-6">
          Sign in to your account to continue discovering community activities and local events.
        </p>

        {error && (
          <div className="mb-4 text-xs font-semibold text-rose-600 bg-rose-50 p-2.5 rounded border border-rose-100">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Email Address */}
          <div>
            <label className="block text-xs font-bold text-zinc-800 uppercase tracking-wider mb-1">
              Email Address
            </label>
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. name@example.com"
              className="w-full px-3.5 py-2.5 text-sm bg-white border border-zinc-300 rounded focus:border-black focus:ring-1 focus:ring-black outline-none transition"
              required
              id="login-email-input"
            />
            <span className="block text-[11px] text-zinc-500 mt-1">
              We'll never share your email.
            </span>
          </div>

          {/* Password with Eye slider */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-zinc-800 uppercase tracking-wider">
                Password
              </label>
              <button 
                type="button" 
                className="text-xs font-bold text-gradient text-teal-700 hover:text-teal-900 transition"
                onClick={() => alert("Password reset link sent to your simulated email!")}
              >
                Forgot Password?
              </button>
            </div>
            
            <div className="relative">
              <input 
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full pl-3.5 pr-10 py-2.5 text-sm bg-white border border-zinc-300 rounded focus:border-black focus:ring-1 focus:ring-black outline-none transition"
                required
                id="login-password-input"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-400 hover:text-black cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember me select */}
          <div className="flex items-center space-x-2 py-1 select-none">
            <input 
              type="checkbox"
              id="remember-me-checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-zinc-300 text-black focus:ring-black cursor-pointer"
            />
            <label htmlFor="remember-me-checkbox" className="text-xs font-medium text-zinc-700 cursor-pointer">
              Stay logged in for 30 days
            </label>
          </div>

          {/* Login Trigger */}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded font-bold text-sm tracking-wide transition flex items-center justify-center space-x-2 hover:bg-zinc-800 cursor-pointer shadow-xs active:scale-98"
            id="login-submit-btn"
          >
            <span>Login</span>
            <span className="font-sans">→</span>
          </button>
        </form>

        {/* OR Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-zinc-200"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-3 text-zinc-500 font-bold tracking-wider">OR</span>
          </div>
        </div>

        {/* Google Authentication mock */}
        <button
          onClick={() => onLoginSuccess('google.user@example.com')}
          className="w-full py-2.5 border border-zinc-300 rounded text-sm font-semibold hover:bg-zinc-50 transition flex items-center justify-center space-x-2 select-none cursor-pointer"
          id="login-google-btn"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          <span className="text-zinc-800">Sign in with Google</span>
        </button>

        {/* Alternate link */}
        <div className="mt-6 text-center text-xs">
          <span className="text-zinc-600">Don't have an account? </span>
          <button 
            onClick={onSwitchToRegister}
            className="font-bold text-teal-700 hover:text-teal-900 cursor-pointer"
            id="switch-to-register-trigger"
          >
            Sign Up
          </button>
        </div>
        
      </div>
    </div>
  );
}
