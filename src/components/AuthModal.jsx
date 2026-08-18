import { useState, useEffect, useRef } from 'react';
import { X, Mail, Lock, User, Eye, EyeOff, ArrowRight, CheckCircle, Loader2 } from 'lucide-react';

function getPasswordStrength(password) {
    if (!password) return { score: 0, label: '', color: '' };
    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 10) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 1) return { score: 1, label: 'Weak', color: 'bg-red-500' };
    if (score <= 2) return { score: 2, label: 'Fair', color: 'bg-orange-500' };
    if (score <= 3) return { score: 3, label: 'Good', color: 'bg-amber-500' };
    if (score <= 4) return { score: 4, label: 'Strong', color: 'bg-emerald-500' };
    return { score: 5, label: 'Very Strong', color: 'bg-emerald-600' };
}

export default function AuthModal({ isOpen, onClose, initialMode = 'signin', onAuthSuccess }) {
    const [mode, setMode] = useState(initialMode);
    const [showPassword, setShowPassword] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [focusedField, setFocusedField] = useState(null);
    const [rememberMe, setRememberMe] = useState(false);
    const [closing, setClosing] = useState(false);
    const emailRef = useRef(null);

    // Sync mode when initialMode prop changes (fixes the stuck-mode bug)
    useEffect(() => {
        if (isOpen) {
            setMode(initialMode);
            setSubmitted(false);
            setLoading(false);
            setErrors({});
            setFormData({ name: '', email: '', password: '' });
            setShowPassword(false);
            setClosing(false);
            // Auto-focus email field after a short delay
            setTimeout(() => emailRef.current?.focus(), 150);
        }
    }, [isOpen, initialMode]);

    if (!isOpen && !closing) return null;

    const validate = () => {
        const errs = {};
        if (mode === 'signup' && !formData.name.trim()) errs.name = 'Name is required';
        if (!formData.email.trim()) errs.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Enter a valid email';
        if (!formData.password.trim()) errs.password = 'Password is required';
        else if (formData.password.length < 6) errs.password = 'At least 6 characters';
        return errs;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errs = validate();
        setErrors(errs);
        if (Object.keys(errs).length === 0) {
            setLoading(true);
            // Simulate API call
            setTimeout(() => {
                setLoading(false);
                setSubmitted(true);
            }, 1200);
        }
    };

    const switchMode = () => {
        setMode(mode === 'signin' ? 'signup' : 'signin');
        setErrors({});
        setSubmitted(false);
        setLoading(false);
        setFormData({ name: '', email: '', password: '' });
        setShowPassword(false);
    };

    const handleClose = () => {
        setClosing(true);
        setTimeout(() => {
            setClosing(false);
            setSubmitted(false);
            setLoading(false);
            setErrors({});
            setFormData({ name: '', email: '', password: '' });
            setMode(initialMode);
            onClose();
        }, 200);
    };

    const updateField = (field, value) => {
        setFormData({ ...formData, [field]: value });
        if (errors[field]) setErrors({ ...errors, [field]: '' });
    };

    const passwordStrength = getPasswordStrength(formData.password);

    return (
        <div
            className={`fixed inset-0 z-[100] flex items-center justify-center p-4 modal-overlay ${closing ? 'animate-fade-out' : 'animate-fade-in'}`}
            onClick={handleClose}
        >
            <div
                className={`w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden ${closing ? 'animate-scale-out' : 'animate-scale-in'}`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="relative px-8 pt-8 pb-2">
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all cursor-pointer hover:rotate-90 duration-200"
                        aria-label="Close"
                    >
                        <X size={20} />
                    </button>

                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary to-blue-700 rounded-lg flex items-center justify-center shadow-sm">
                            <span className="text-white text-sm font-bold">A</span>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-navy">
                        {submitted
                            ? (mode === 'signup' ? 'Account created!' : 'Welcome back!')
                            : (mode === 'signup' ? 'Create your account' : 'Welcome back')}
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                        {submitted
                            ? 'You\'re all set to start using ApplyAI.'
                            : (mode === 'signup'
                                ? 'Start your smarter job search today.'
                                : 'Sign in to continue your job search.')}
                    </p>
                </div>

                {/* Body */}
                <div className="px-8 pb-8 pt-4">
                    {submitted ? (
                        <div className="text-center py-6">
                            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5 animate-success-pop">
                                <CheckCircle size={40} className="text-emerald-600 animate-success-check" />
                            </div>
                            <p className="text-gray-600 mb-2 font-medium text-lg">
                                {mode === 'signup'
                                    ? `Welcome aboard, ${formData.name || 'there'}!`
                                    : 'Successfully signed in!'}
                            </p>
                            <p className="text-gray-500 text-sm mb-6">
                                {mode === 'signup'
                                    ? 'Your account is ready to go.'
                                    : `Logged in as ${formData.email}`}
                            </p>
                            <button
                                onClick={() => onAuthSuccess?.({ name: formData.name, email: formData.email })}
                                className="w-full bg-gradient-to-r from-primary to-blue-700 hover:from-primary-dark hover:to-blue-800 text-white font-semibold py-3.5 rounded-xl transition-all cursor-pointer shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
                            >
                                Go to Dashboard
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                            {mode === 'signup' && (
                                <div className="animate-field-in">
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                                    <div className="relative">
                                        <User size={18} className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-200 ${focusedField === 'name' ? 'text-primary' : 'text-gray-400'}`} />
                                        <input
                                            type="text"
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={(e) => updateField('name', e.target.value)}
                                            onFocus={() => setFocusedField('name')}
                                            onBlur={() => setFocusedField(null)}
                                            className={`w-full pl-11 pr-4 py-3 rounded-xl border ${errors.name ? 'border-red-400 bg-red-50/30' : 'border-gray-200'} bg-gray-50/50 text-sm transition-all focus:border-primary focus:bg-white`}
                                        />
                                    </div>
                                    {errors.name && <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1 animate-shake"><span>⚠</span> {errors.name}</p>}
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                                <div className="relative">
                                    <Mail size={18} className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-200 ${focusedField === 'email' ? 'text-primary' : 'text-gray-400'}`} />
                                    <input
                                        ref={emailRef}
                                        type="email"
                                        placeholder="you@example.com"
                                        value={formData.email}
                                        onChange={(e) => updateField('email', e.target.value)}
                                        onFocus={() => setFocusedField('email')}
                                        onBlur={() => setFocusedField(null)}
                                        className={`w-full pl-11 pr-4 py-3 rounded-xl border ${errors.email ? 'border-red-400 bg-red-50/30' : 'border-gray-200'} bg-gray-50/50 text-sm transition-all focus:border-primary focus:bg-white`}
                                    />
                                </div>
                                {errors.email && <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1 animate-shake"><span>⚠</span> {errors.email}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                                <div className="relative">
                                    <Lock size={18} className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-200 ${focusedField === 'password' ? 'text-primary' : 'text-gray-400'}`} />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={(e) => updateField('password', e.target.value)}
                                        onFocus={() => setFocusedField('password')}
                                        onBlur={() => setFocusedField(null)}
                                        className={`w-full pl-11 pr-12 py-3 rounded-xl border ${errors.password ? 'border-red-400 bg-red-50/30' : 'border-gray-200'} bg-gray-50/50 text-sm transition-all focus:border-primary focus:bg-white`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors"
                                        tabIndex={-1}
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                {errors.password && <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1 animate-shake"><span>⚠</span> {errors.password}</p>}

                                {/* Password strength meter - signup only */}
                                {mode === 'signup' && formData.password && (
                                    <div className="mt-2.5 animate-field-in">
                                        <div className="flex gap-1 mb-1">
                                            {[1, 2, 3, 4, 5].map((level) => (
                                                <div
                                                    key={level}
                                                    className={`h-1 flex-1 rounded-full transition-all duration-300 ${level <= passwordStrength.score
                                                        ? passwordStrength.color
                                                        : 'bg-gray-200'
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                        <p className={`text-xs font-medium transition-colors ${passwordStrength.score <= 1 ? 'text-red-500' :
                                            passwordStrength.score <= 2 ? 'text-orange-500' :
                                                passwordStrength.score <= 3 ? 'text-amber-500' :
                                                    'text-emerald-600'
                                            }`}>
                                            {passwordStrength.label}
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Remember me / Forgot password row */}
                            {mode === 'signin' && (
                                <div className="flex items-center justify-between">
                                    <label className="flex items-center gap-2 cursor-pointer select-none group">
                                        <div className="relative">
                                            <input
                                                type="checkbox"
                                                checked={rememberMe}
                                                onChange={(e) => setRememberMe(e.target.checked)}
                                                className="sr-only peer"
                                            />
                                            <div className="w-4 h-4 rounded border-2 border-gray-300 peer-checked:border-primary peer-checked:bg-primary transition-all flex items-center justify-center group-hover:border-gray-400">
                                                {rememberMe && (
                                                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                                        <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                )}
                                            </div>
                                        </div>
                                        <span className="text-xs text-gray-600 group-hover:text-gray-800 transition-colors">Remember me</span>
                                    </label>
                                    <button type="button" className="text-xs text-primary hover:text-primary-dark font-medium cursor-pointer transition-colors">
                                        Forgot password?
                                    </button>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-blue-700 hover:from-primary-dark hover:to-blue-800 text-white font-semibold py-3.5 rounded-xl transition-all cursor-pointer mt-2 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-lg"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 size={18} className="animate-spin" />
                                        {mode === 'signup' ? 'Creating account…' : 'Signing in…'}
                                    </>
                                ) : (
                                    <>
                                        {mode === 'signup' ? 'Create Account' : 'Sign In'}
                                        <ArrowRight size={16} />
                                    </>
                                )}
                            </button>

                            <div className="relative my-5">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-200" />
                                </div>
                                <div className="relative flex justify-center text-xs">
                                    <span className="bg-white px-3 text-gray-400">or continue with</span>
                                </div>
                            </div>

                            <button
                                type="button"
                                className="w-full flex items-center justify-center gap-3 border border-gray-200 hover:bg-gray-50 hover:border-gray-300 text-navy font-medium py-3 rounded-xl transition-all cursor-pointer text-sm hover:-translate-y-0.5"
                                onClick={() => {
                                    setLoading(true);
                                    setTimeout(() => {
                                        setLoading(false);
                                        onAuthSuccess?.({ name: 'Google User', email: 'user@gmail.com' });
                                    }, 1000);
                                }}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 001 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                                Continue with Google
                            </button>

                            <p className="text-center text-sm text-gray-500 mt-4">
                                {mode === 'signup' ? 'Already have an account?' : "Don't have an account?"}{' '}
                                <button type="button" onClick={switchMode} className="text-primary hover:text-primary-dark font-semibold cursor-pointer transition-colors">
                                    {mode === 'signup' ? 'Sign In' : 'Sign Up'}
                                </button>
                            </p>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
