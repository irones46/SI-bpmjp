import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight, CheckCircle2, ShieldCheck, Sparkles, ExternalLink } from 'lucide-react';
import { BpmjpLogo } from './BpmjpLogo';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
  onSuccess: (userData: { email: string; fullName: string; isNewUser: boolean }) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
  onSuccess
}) => {
  const [mode, setMode] = useState<'login' | 'register' | 'email-verify'>(initialMode);
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [showSimulatedInbox, setShowSimulatedInbox] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  // Handle Google Login / Register
  const handleGoogleAuth = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onSuccess({
        email: 'padika.satia@kemendag.go.id',
        fullName: 'Padika Satia Gunawan',
        isNewUser: false
      });
      onClose();
    }, 600);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !fullName || !password) {
      setErrorMsg('Mohon lengkapi semua kolom pendaftaran.');
      return;
    }
    setErrorMsg('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Move to email verification stage as required
      setMode('email-verify');
      setShowSimulatedInbox(true);
    }, 500);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Masukkan email dan kata sandi Anda.');
      return;
    }
    setErrorMsg('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onSuccess({
        email,
        fullName: email.split('@')[0].replace('.', ' ').toUpperCase(),
        isNewUser: false
      });
      onClose();
    }, 500);
  };

  const handleVerifyOtp = (codeString?: string) => {
    const fullCode = codeString || otpCode.join('');
    if (fullCode.length !== 6) {
      setErrorMsg('Silakan masukkan 6 digit kode verifikasi.');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onSuccess({
        email,
        fullName,
        isNewUser: true // triggers profile biodata completion modal!
      });
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100">
        {/* Top brand header */}
        <div className="p-6 pb-4 border-b border-slate-100 flex items-center justify-between">
          <BpmjpLogo size="sm" showSubtitle={false} />
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Content according to mode */}
        {mode === 'email-verify' ? (
          <div className="p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 border border-emerald-100">
              <Mail className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-bold text-slate-800">Verifikasi Email Anda</h3>
            <p className="text-sm text-slate-600 mt-2 mb-6">
              Kami telah mengirimkan tautan konfirmasi dan kode keamanan ke:
              <br />
              <span className="font-semibold text-slate-900">{email || 'email-peserta@kemendag.go.id'}</span>
            </p>

            {errorMsg && (
              <div className="mb-4 text-xs font-medium text-rose-600 bg-rose-50 p-2.5 rounded-lg border border-rose-200">
                {errorMsg}
              </div>
            )}

            {/* OTP 6-digits input */}
            <div className="flex justify-center gap-2 mb-6">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  className="w-11 h-12 text-center text-lg font-bold rounded-lg border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                  value={otpCode[index] || ''}
                  onChange={(e) => {
                    const newOtp = [...otpCode];
                    newOtp[index] = e.target.value;
                    setOtpCode(newOtp);
                    if (e.target.value && e.target.nextElementSibling) {
                      (e.target.nextElementSibling as HTMLInputElement).focus();
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Backspace' && !otpCode[index] && e.currentTarget.previousElementSibling) {
                      (e.currentTarget.previousElementSibling as HTMLInputElement).focus();
                    }
                  }}
                />
              ))}
            </div>

            <button
              onClick={() => handleVerifyOtp()}
              disabled={isLoading}
              className="w-full py-3 bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <span>Memverifikasi...</span>
              ) : (
                <>
                  <span>Verifikasi & Lanjut ke Biodata</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Simulated email inbox launcher */}
            <div className="mt-5 p-3.5 bg-sky-50 rounded-xl border border-sky-100 text-left">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold text-sky-900 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                    Simulasi Kotak Masuk Email
                  </p>
                  <p className="text-[11px] text-sky-700 mt-0.5">
                    Anda dapat melihat notifikasi email resmi BPMJP atau mengklik verifikasi instan.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowSimulatedInbox(true)}
                  className="px-2.5 py-1 text-xs font-medium bg-white text-sky-700 border border-sky-200 rounded-lg shadow-xs hover:bg-sky-100 transition-colors shrink-0"
                >
                  Buka Email
                </button>
              </div>
            </div>

            <div className="mt-4 text-xs text-slate-500">
              Tidak menerima email?{' '}
              <button
                type="button"
                onClick={() => {
                  setOtpCode(['7', '2', '9', '4', '1', '0']);
                  handleVerifyOtp('729410');
                }}
                className="text-emerald-600 font-semibold hover:underline"
              >
                Gunakan Kode Instan (729410)
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6">
            {/* Tab switch */}
            <div className="flex p-1 bg-slate-100 rounded-xl mb-6">
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setErrorMsg('');
                }}
                className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                  mode === 'login'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Masuk
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('register');
                  setErrorMsg('');
                }}
                className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                  mode === 'register'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Daftar Akun Baru
              </button>
            </div>

            {/* Google Sign In Button */}
            <button
              onClick={handleGoogleAuth}
              disabled={isLoading}
              type="button"
              className="w-full py-2.5 px-4 mb-5 border border-slate-200 hover:border-slate-300 rounded-xl flex items-center justify-center gap-3 bg-white text-slate-700 font-medium text-sm transition-all shadow-xs hover:shadow-sm hover:bg-slate-50 cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.4 7.33 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.16 0 9.98 0 12c0 2.02.45 3.84 1.24 5.42l4.04-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.6 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>{mode === 'login' ? 'Masuk dengan Google' : 'Daftar dengan Akun Google'}</span>
            </button>

            <div className="relative flex items-center justify-center my-4">
              <div className="border-t border-slate-200 w-full"></div>
              <span className="bg-white px-3 text-xs text-slate-400 font-medium">atau via email</span>
            </div>

            {errorMsg && (
              <div className="mb-4 text-xs font-medium text-rose-600 bg-rose-50 p-2.5 rounded-lg border border-rose-200">
                {errorMsg}
              </div>
            )}

            <form onSubmit={mode === 'login' ? handleLoginSubmit : handleRegisterSubmit} className="space-y-4">
              {mode === 'register' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Lengkap Peserta</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Padika Satia Gunawan"
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Alamat Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="nama@instansi.go.id atau gmail.com"
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Kata Sandi</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    placeholder="Minimal 6 karakter"
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              {mode === 'login' && (
                <div className="flex items-center justify-between text-xs">
                  <label className="flex items-center gap-1.5 text-slate-600">
                    <input type="checkbox" defaultChecked className="rounded text-blue-600" />
                    <span>Ingat saya</span>
                  </label>
                  <button type="button" className="text-blue-600 hover:underline">
                    Lupa sandi?
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-2.5 rounded-xl font-semibold text-white shadow-md transition-all cursor-pointer ${
                  mode === 'register'
                    ? 'bg-[#16a34a] hover:bg-[#15803d]'
                    : 'bg-[#0f1d40] hover:bg-[#1b2e5c]'
                }`}
              >
                {isLoading
                  ? 'Memproses...'
                  : mode === 'register'
                  ? 'Daftar & Kirim Konfirmasi Email'
                  : 'Masuk ke Portal BPMJP'}
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Simulated Email Inbox Modal */}
      {showSimulatedInbox && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-semibold uppercase tracking-wider">Kotak Masuk Email Peserta</span>
              </div>
              <button
                onClick={() => setShowSimulatedInbox(false)}
                className="text-slate-400 hover:text-white text-xs px-2 py-1 rounded bg-slate-800"
              >
                Tutup
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-start gap-3 pb-4 border-b border-slate-100">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm shrink-0">
                  BP
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">Sistem Informasi BPMJP Kemendag</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded font-medium">Resmi</span>
                  </div>
                  <p className="text-xs text-slate-500">Kepada: {email || 'peserta@kemendag.go.id'}</p>
                  <p className="text-xs font-medium text-slate-800 mt-1">Konfirmasi Registrasi & Tautan Masuk Portal Pelatihan</p>
                </div>
              </div>

              <div className="py-5 text-sm text-slate-700 space-y-3">
                <p>Yth. Calon Peserta Pelatihan <strong>{fullName || 'Bapak/Ibu Peserta'}</strong>,</p>
                <p className="text-xs leading-relaxed text-slate-600">
                  Terima kasih telah mendaftar di <strong>Balai Pelatihan SDM Metrologi, Mutu dan Jasa Perdagangan (BPMJP) - Kementerian Perdagangan RI</strong>.
                  Untuk keamanan dan validitas data peserta, silakan klik tombol aktivasi di bawah atau gunakan kode OTP 6-digit:
                </p>

                <div className="my-4 p-4 bg-slate-50 rounded-xl border border-dashed border-slate-300 text-center">
                  <span className="text-xs text-slate-500 block mb-1">Kode Konfirmasi Email Anda:</span>
                  <span className="text-2xl font-mono font-extrabold tracking-widest text-slate-900">849201</span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setShowSimulatedInbox(false);
                    setOtpCode(['8', '4', '9', '2', '0', '1']);
                    handleVerifyOtp('849201');
                  }}
                  className="w-full py-3 bg-[#16a34a] hover:bg-[#15803d] text-white font-bold rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Aktivasi Akun & Masuk Sekarang</span>
                </button>
              </div>

              <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-400 text-center">
                Balai Pelatihan SDM Metrologi, Mutu dan Jasa Perdagangan • Kemendag RI
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
