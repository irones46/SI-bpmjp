import React, { useState } from 'react';
import { BpmjpLogo } from './BpmjpLogo';
import { TrainingCourse } from '../types';
import { 
  Award, 
  GraduationCap, 
  Handshake, 
  User, 
  Star, 
  ChevronRight, 
  Globe, 
  Search,
  Filter,
  ArrowRight,
  Database,
  Calendar,
  CheckCircle2
} from 'lucide-react';

interface LandingPageProps {
  courses: TrainingCourse[];
  onOpenAuth: (mode: 'login' | 'register') => void;
  onSelectCourse: (course: TrainingCourse) => void;
  onOpenSync: () => void;
  isLoggedIn: boolean;
  onGoToDashboard: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  courses,
  onOpenAuth,
  onSelectCourse,
  onOpenSync,
  isLoggedIn,
  onGoToDashboard,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'Semua' | 'Metrologi' | 'Mutu' | 'Jasa Perdagangan'>('Metrologi');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [lang, setLang] = useState<'ID' | 'EN'>('ID');

  const filteredCourses = courses.filter((c) => {
    const matchesCategory = selectedCategory === 'Semua' || c.category === selectedCategory;
    const matchesKeyword = c.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      c.instructor.toLowerCase().includes(searchKeyword.toLowerCase());
    return matchesCategory && matchesKeyword;
  });

  return (
    <div className="min-h-screen bg-[#fafbfc] text-slate-800 font-sans flex flex-col">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-40 px-4 sm:px-8 py-3 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-4">
          <BpmjpLogo size="md" variant="light" />
        </div>

        <div className="flex items-center gap-4">
          {/* Google Sheets / Cloud Sync Quick Access */}
          <button
            onClick={onOpenSync}
            title="Integrasi Google Sheets & Apps Script"
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg text-xs font-semibold border border-emerald-200 transition-colors"
          >
            <Database className="w-3.5 h-3.5 text-emerald-600" />
            <span>Google Sheets & Apps Script</span>
          </button>

          {/* Toggle language */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200 text-xs text-slate-600">
            <button
              onClick={() => setLang(lang === 'ID' ? 'EN' : 'ID')}
              className="flex items-center gap-1.5 hover:text-slate-900 transition-colors cursor-pointer py-1 px-2 rounded-md hover:bg-slate-100"
            >
              <Globe className="w-4 h-4 text-slate-500" />
              <span className="font-semibold">{lang === 'ID' ? 'ID (Indonesia)' : 'EN (English)'}</span>
            </button>
          </div>

          {/* User state button */}
          {isLoggedIn ? (
            <button
              onClick={onGoToDashboard}
              className="px-4 py-2 bg-[#0f1d40] text-white rounded-xl text-xs font-bold hover:bg-[#1b2f5c] transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <span>Buka Dashboard Saya</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => onOpenAuth('login')}
                className="px-4 py-2 border border-slate-300 hover:border-slate-400 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Masuk
              </button>
              <button
                onClick={() => onOpenAuth('register')}
                className="px-4 py-2 bg-[#16a34a] hover:bg-[#15803d] text-white rounded-xl text-xs font-bold transition-all shadow-xs hover:shadow cursor-pointer"
              >
                Daftar
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section - Matching screenshot 1 */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#0c2238] via-[#0e314f] to-[#124b59] text-white">
        {/* Soft decorative curved waves in background */}
        <div className="absolute inset-0 pointer-events-none opacity-25">
          <svg className="w-full h-full" viewBox="0 0 1440 600" fill="none" preserveAspectRatio="none">
            <path
              d="M0 450 C 350 400, 700 550, 1050 480 C 1200 450, 1350 520, 1440 500 L 1440 600 L 0 600 Z"
              fill="#2dd4bf"
            />
            <path
              d="M0 500 C 400 440, 800 560, 1200 490 L 1440 540 L 1440 600 L 0 600 Z"
              fill="#0ea5e9"
            />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 md:py-16 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left Text Column */}
          <div className="md:col-span-7 space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              <span className="text-[#facc15]">Happy</span> Learning
              <br />
              <span>For All</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-200 font-normal max-w-xl leading-relaxed">
              Bergabunglah dengan ribuan tenaga ahli untuk meningkatkan kompetensi di bidang metrologi, mutu, dan jasa perdagangan Indonesia.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onOpenAuth('register')}
                className="px-8 py-3 bg-[#16a34a] hover:bg-[#15803d] text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all text-sm cursor-pointer"
              >
                Daftar
              </button>
              <button
                onClick={() => onOpenAuth('login')}
                className="px-8 py-3 bg-white text-slate-900 font-bold rounded-xl shadow-md hover:bg-slate-100 hover:-translate-y-0.5 transition-all text-sm cursor-pointer"
              >
                Masuk
              </button>
            </div>
          </div>

          {/* Right Image Column - Real trainees with yellow safety hardhats */}
          <div className="md:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 group">
              <img
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80"
                alt="Peserta Pelatihan Metrologi Kemendag"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-5">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-yellow-500 text-slate-950 rounded-full text-[10px] font-bold mb-1.5 uppercase tracking-wider">
                    Kampus Pelatihan Metrologi
                  </div>
                  <p className="text-xs text-white font-semibold">Balai Pelatihan SDM Metrologi, Mutu dan Jasa Perdagangan</p>
                  <p className="text-[11px] text-slate-300">Citeureup, Bogor - Kementerian Perdagangan RI</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Main Feature Cards (matching screenshot 1) */}
      <section className="relative z-20 -mt-8 max-w-6xl mx-auto px-4 sm:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl p-7 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center group">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-900 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <Award className="w-9 h-9 stroke-[1.75]" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Sertifikasi Kompetensi</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Akses layanan pelatihan dan sertifikasi terpercaya untuk meningkatkan kompetensi profesional Anda.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl p-7 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center group">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 text-blue-900 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <GraduationCap className="w-9 h-9 stroke-[1.75]" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Program Pelatihan</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Tingkatkan kompetensi SDM melalui pelatihan dan pendampingan di bidang metrologi, mutu, dan jasa perdagangan.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl p-7 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center group">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-blue-900 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <Handshake className="w-9 h-9 stroke-[1.75]" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Kerja Sama</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Dapatkan pendampingan dan konsultasi pengembangan kompetensi bagi instansi, dunia usaha, dan masyarakat.
            </p>
          </div>
        </div>
      </section>

      {/* Main Training Catalog Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16 w-full flex-1">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f1d40] tracking-tight">
            Informasi Pelatihan
          </h2>
          <p className="text-sm text-slate-500 mt-1 max-w-lg mx-auto">
            Pilih dan ikuti jadwal pelatihan teknis kemetrologian, kalibrasi, pengujian mutu, dan sertifikasi resmi Kemendag.
          </p>
        </div>

        {/* Category bar and search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1">
            {(['Metrologi', 'Mutu', 'Jasa Perdagangan', 'Semua'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#0f1d40] text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Cari judul pelatihan..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-white rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
              />
            </div>

            <button
              onClick={() => setSelectedCategory('Semua')}
              className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 shrink-0 cursor-pointer"
            >
              <span>Lihat Semua</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Course Cards Grid - Exact match of screenshot 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Thumbnail with Date Badge */}
              <div className="relative h-44 overflow-hidden bg-slate-100">
                <img
                  src={course.imageUrl}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Date Badge on Top Right */}
                <div className="absolute top-3 right-3 px-2.5 py-1 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-semibold rounded-md shadow-xs flex items-center gap-1">
                  <span>{new Date(course.dateStart).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
                    {course.title}
                  </h4>

                  <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
                    <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{course.instructor}</span>
                  </div>

                  {/* Rating Stars */}
                  <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-600">
                    <span className="font-bold text-slate-800">{course.rating.toFixed(1).replace('.', ',')}</span>
                    <div className="flex items-center text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-slate-400 text-[11px]">({course.reviewCount})</span>
                  </div>
                </div>

                {/* Selengkapnya Button */}
                <div className="mt-5 pt-3 border-t border-slate-100">
                  <button
                    onClick={() => onSelectCourse(course)}
                    className="w-full py-2.5 px-3 bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-bold rounded-xl transition-all shadow-xs hover:shadow-md text-center cursor-pointer"
                  >
                    Selengkapnya
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0f1d40] text-slate-300 py-12 px-4 sm:px-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2 space-y-3">
            <BpmjpLogo variant="dark" size="md" />
            <p className="text-xs text-slate-400 leading-relaxed max-w-md pt-2">
              Balai Pelatihan Sumber Daya Manusia Metrologi, Mutu dan Jasa Perdagangan (BPMJP) adalah unit kerja di lingkungan Badan Pengawas Perdagangan Berjangka Komoditi & Ditjen PKTN Kementerian Perdagangan RI yang bertugas menyelenggarakan pelatihan kemetrologian, jaminan mutu, dan jasa perdagangan.
            </p>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Kontak & Lokasi</h5>
            <p className="text-xs text-slate-400 leading-relaxed">
              Jl. Raya Citeureup No. 1, Citeureup, Bogor, Jawa Barat 16810
              <br />
              Telp: (021) 8754123
              <br />
              Email: bpmjp@kemendag.go.id
            </p>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Tautan Terkait</h5>
            <ul className="text-xs space-y-1.5 text-slate-400">
              <li><a href="https://kemendag.go.id" target="_blank" rel="noreferrer" className="hover:text-white">Kementerian Perdagangan RI</a></li>
              <li><a href="https://ditjenpktn.kemendag.go.id" target="_blank" rel="noreferrer" className="hover:text-white">Ditjen PKTN</a></li>
              <li><a href="https://bsn.go.id" target="_blank" rel="noreferrer" className="hover:text-white">Badan Standardisasi Nasional</a></li>
              <li><button onClick={onOpenSync} className="text-emerald-400 hover:underline">Integrasi Google Sheets & Script</button></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
          <p>© {new Date().getFullYear()} BPMJP Kemendag RI. Hak Cipta Dilindungi Undang-Undang.</p>
          <p>Sistem Informasi Pelatihan SDM Metrologi, Mutu dan Jasa Perdagangan</p>
        </div>
      </footer>
    </div>
  );
};
