import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Calendar, 
  BookOpen, 
  FileEdit, 
  Award, 
  MessageSquare, 
  LogOut, 
  Menu, 
  User as UserIcon,
  Check, 
  Clock, 
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Sparkles,
  ShieldAlert,
  Database
} from 'lucide-react';
import { BpmjpLogo } from './BpmjpLogo';
import { UserProfile, ParticipantEnrollment, CertificateData, TrainingMaterial } from '../types';

interface DashboardViewProps {
  user: UserProfile;
  enrollments: ParticipantEnrollment[];
  certificates: CertificateData[];
  materials: TrainingMaterial[];
  currentTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
  onOpenBiodataModal: () => void;
  onOpenSyncModal: () => void;
  onSelectEnrollment: (enrollment: ParticipantEnrollment) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  enrollments,
  certificates,
  materials,
  currentTab,
  onTabChange,
  onLogout,
  onOpenBiodataModal,
  onOpenSyncModal,
  onSelectEnrollment,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Short display name as in screenshot 2: "Padika Satia G!"
  const getShortName = () => {
    if (!user.fullName) return 'Peserta';
    const parts = user.fullName.split(' ');
    if (parts.length <= 2) return user.fullName;
    return `${parts[0]} ${parts[1]} ${parts[2] ? parts[2][0] + '.' : ''}`;
  };

  const navItems = [
    { id: 'Dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'Jadwal', label: 'Jadwal', icon: Calendar },
    { id: 'Pelatihan', label: 'Pelatihan', icon: BookOpen },
    { id: 'Materi dan Evaluasi', label: 'Materi dan Evaluasi', icon: FileEdit },
    { id: 'Sertifikat', label: 'Sertifikat', icon: Award },
    { id: 'Diskusi', label: 'Diskusi', icon: MessageSquare },
  ];

  // Latest activities
  const latestActivity = enrollments[0];

  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden font-sans">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Dark Navy Sidebar - Exactly matching screenshot 2 */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#0f1d40] text-slate-300 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div>
          {/* Sidebar Top: BPMJP Logo + Hamburger icon */}
          <div className="p-5 flex items-center justify-between border-b border-white/10">
            <BpmjpLogo variant="dark" size="sm" />
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-white/70 hover:text-white"
            >
              ✕
            </button>
            <div className="hidden lg:block text-white/80">
              <Menu className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onTabChange(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-xs font-bold transition-all text-left cursor-pointer ${
                    isActive
                      ? 'bg-white text-[#0f1d40] shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#0f1d40]' : 'text-slate-300'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Bottom: Biodata status, Google Sheets sync, & Keluar */}
        <div className="p-4 space-y-2 border-t border-white/10">
          {/* Quick Biodata completion prompt if needed */}
          {!user.isProfileComplete ? (
            <button
              onClick={onOpenBiodataModal}
              className="w-full p-2.5 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 rounded-xl text-left text-amber-200 transition-colors"
            >
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-xs font-bold">Lengkapi Biodata</span>
              </div>
              <p className="text-[10px] text-amber-300/80 mt-1">Upload pas foto untuk sertifikat resmi.</p>
            </button>
          ) : (
            <button
              onClick={onOpenBiodataModal}
              className="w-full px-3 py-2 text-left rounded-xl bg-white/5 hover:bg-white/10 text-[11px] text-slate-300 transition-colors flex items-center justify-between"
            >
              <span className="truncate">Biodata: {user.fullName}</span>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/20 px-1.5 py-0.5 rounded">Lengkap</span>
            </button>
          )}

          {/* Google Sheets button */}
          <button
            onClick={onOpenSyncModal}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-emerald-300 hover:text-emerald-200 hover:bg-emerald-500/10 rounded-xl transition-colors"
          >
            <Database className="w-4 h-4 text-emerald-400" />
            <span>Google Sheets & Apps Script</span>
          </button>

          {/* Keluar Button */}
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-rose-300 hover:bg-rose-500/10 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Keluar</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-slate-200/80 px-6 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">{currentTab}</h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Participant Profile Button */}
            <button
              onClick={onOpenBiodataModal}
              className="flex items-center gap-2.5 p-1 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
              title="Profil & Pas Foto Peserta"
            >
              <div className="w-9 h-9 rounded-full overflow-hidden bg-slate-200 border-2 border-slate-300 flex items-center justify-center">
                {user.photoUrl ? (
                  <img src={user.photoUrl} alt={user.fullName} className="w-full h-full object-cover" />
                ) : (
                  <UserIcon className="w-5 h-5 text-slate-600" />
                )}
              </div>
            </button>
          </div>
        </header>

        {/* Dashboard Tab Content (matching screenshot 2) */}
        {currentTab === 'Dashboard' && (
          <main className="p-6 sm:p-8 space-y-8 max-w-6xl">
            {/* Green / Teal Greeting Banner */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#2f9774] via-[#2d8d6d] to-[#257c5f] text-white p-7 sm:p-9 shadow-md">
              {/* Soft wave graphics in background */}
              <div className="absolute inset-0 pointer-events-none opacity-20">
                <svg className="w-full h-full" viewBox="0 0 1000 300" fill="none" preserveAspectRatio="none">
                  <path d="M0,150 C300,80 600,220 1000,120 L1000,300 L0,300 Z" fill="#ffffff" />
                  <path d="M0,200 C400,140 700,260 1000,180 L1000,300 L0,300 Z" fill="#144f3c" />
                </svg>
              </div>

              <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* Left Text */}
                <div className="md:col-span-8 space-y-3">
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                    Hi, {getShortName()}!
                  </h2>
                  <p className="text-sm sm:text-base text-emerald-50 max-w-lg leading-relaxed font-medium">
                    Saatnya kamu mengembangkan potensi dan raih sertifikat resmi!
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => onTabChange('Pelatihan')}
                      className="px-6 py-2.5 bg-white text-slate-800 hover:text-slate-900 font-bold text-xs sm:text-sm rounded-xl shadow-xs hover:bg-slate-50 transition-all cursor-pointer"
                    >
                      Lihat Pelatihan
                    </button>
                  </div>
                </div>

                {/* Right Illustration: Inspector with yellow helmet & clipboard */}
                <div className="hidden md:flex md:col-span-4 justify-end">
                  <div className="relative w-44 h-44 flex items-center justify-center">
                    <svg viewBox="0 0 200 200" fill="none" className="w-full h-full drop-shadow-lg">
                      {/* Torso & Vest */}
                      <path d="M60 190 C60 140 75 125 100 125 C125 125 140 140 140 190 Z" fill="#ffffff" />
                      {/* Safety Blue Vest */}
                      <path d="M65 190 L75 130 L100 130 L100 190 Z" fill="#1e3a8a" />
                      <path d="M135 190 L125 130 L100 130 L100 190 Z" fill="#1e3a8a" />
                      {/* Head & Neck */}
                      <path d="M92 110 L92 130 L108 130 L108 110 Z" fill="#ffd1a9" />
                      <circle cx="100" cy="95" r="24" fill="#ffd1a9" />
                      {/* Smile & Eyes */}
                      <circle cx="92" cy="94" r="2.5" fill="#1e293b" />
                      <circle cx="108" cy="94" r="2.5" fill="#1e293b" />
                      <path d="M94 104 Q100 109 106 104" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
                      {/* Hair */}
                      <path d="M78 85 C80 70 120 70 122 85 C115 80 105 80 100 82 C95 80 85 80 78 85 Z" fill="#1e293b" />
                      {/* Yellow Hardhat */}
                      <ellipse cx="100" cy="74" rx="30" ry="18" fill="#eab308" />
                      <path d="M70 76 Q100 70 130 76 L134 78 Q100 72 66 78 Z" fill="#ca8a04" />
                      <rect x="96" y="56" width="8" height="18" rx="2" fill="#ca8a04" />
                      {/* Arms & Hands holding clipboard */}
                      <rect x="110" y="115" width="30" height="45" rx="3" fill="#92400e" transform="rotate(-15 110 115)" />
                      <rect x="112" y="118" width="26" height="38" rx="2" fill="#f8fafc" transform="rotate(-15 112 118)" />
                      <rect x="120" y="110" width="12" height="6" rx="1.5" fill="#cbd5e1" transform="rotate(-15 120 110)" />
                      {/* Hand holding pen */}
                      <circle cx="82" cy="125" r="7" fill="#ffd1a9" />
                      <line x1="82" y1="125" x2="90" y2="105" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* 3 Summary Stats Cards - Exact colors and icons from screenshot 2 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {/* Card 1: Pelatihan Diikuti -> 4 */}
              <div 
                onClick={() => onTabChange('Pelatihan')}
                className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-[#e6f7ef] text-[#22c55e] flex items-center justify-center shrink-0">
                    <Check className="w-6 h-6 stroke-[3]" />
                  </div>
                  <span className="font-bold text-slate-700 text-sm">Pelatihan Diikuti</span>
                </div>
                <span className="text-3xl font-extrabold text-slate-900">{enrollments.length}</span>
              </div>

              {/* Card 2: Sertifikat -> 3 */}
              <div 
                onClick={() => onTabChange('Sertifikat')}
                className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-[#fef8e7] text-[#eab308] flex items-center justify-center shrink-0">
                    <Award className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <span className="font-bold text-slate-700 text-sm">Sertifikat</span>
                </div>
                <span className="text-3xl font-extrabold text-slate-900">{certificates.length}</span>
              </div>

              {/* Card 3: Materi -> 3 */}
              <div 
                onClick={() => onTabChange('Materi dan Evaluasi')}
                className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-[#eaf4fd] text-[#38bdf8] flex items-center justify-center shrink-0">
                    <FileEdit className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <span className="font-bold text-slate-700 text-sm">Materi</span>
                </div>
                <span className="text-3xl font-extrabold text-slate-900">{materials.length}</span>
              </div>
            </div>

            {/* Aktivitas Terbaru Section - Matching screenshot 2 */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-700">Aktivitas Terbaru</h3>

              {latestActivity ? (
                <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                    {/* Thumbnail image */}
                    <div className="w-full sm:w-48 h-32 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                      <img
                        src={latestActivity.thumbnailUrl}
                        alt={latestActivity.trainingTitle}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Information */}
                    <div className="flex-1 space-y-2">
                      <h4 className="text-base sm:text-lg font-bold text-slate-900">
                        {latestActivity.trainingTitle}
                      </h4>

                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <UserIcon className="w-4 h-4 text-slate-400 shrink-0" />
                        <span>{latestActivity.instructor}</span>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                        <span>{latestActivity.dateRange}</span>
                      </div>

                      {/* Status Tag */}
                      <div className="flex items-center gap-2 pt-1">
                        <span className="text-xs font-semibold text-slate-700">Status:</span>
                        <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-md">
                          {latestActivity.status}
                        </span>
                      </div>
                    </div>

                    {/* Action button */}
                    <div className="self-end sm:self-center">
                      <button
                        onClick={() => onSelectEnrollment(latestActivity)}
                        className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>Lihat Detail</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center text-slate-400 text-sm">
                  Belum ada aktivitas pelatihan yang sedang diikuti.
                </div>
              )}
            </div>

            {/* Riwayat Pelatihan Lainnya */}
            <div className="space-y-4 pt-2">
              <h3 className="text-base font-bold text-slate-700">Pelatihan Telah Diselesaikan</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {enrollments.slice(1).map((enr) => (
                  <div key={enr.id} className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs space-y-2">
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded">
                      {enr.status}
                    </span>
                    <h5 className="font-bold text-slate-900 text-xs line-clamp-1">{enr.trainingTitle}</h5>
                    <p className="text-[11px] text-slate-500">{enr.dateRange}</p>
                    <div className="pt-2 flex items-center justify-between text-xs">
                      <span className="text-emerald-600 font-semibold">Kehadiran: {enr.attendanceRate}%</span>
                      <button
                        onClick={() => onTabChange('Sertifikat')}
                        className="text-blue-600 hover:underline font-bold text-[11px]"
                      >
                        Lihat Sertifikat
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        )}
      </div>
    </div>
  );
};
