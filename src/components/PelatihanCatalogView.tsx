import React, { useState } from 'react';
import { TrainingCourse, UserProfile, ParticipantEnrollment } from '../types';
import { Search, Star, User, Calendar, MapPin, CheckCircle2, Clock, Users, ArrowRight, ShieldCheck } from 'lucide-react';

interface PelatihanCatalogViewProps {
  courses: TrainingCourse[];
  user: UserProfile;
  enrollments: ParticipantEnrollment[];
  onEnroll: (course: TrainingCourse) => void;
  onSelectCourse: (course: TrainingCourse) => void;
}

export const PelatihanCatalogView: React.FC<PelatihanCatalogViewProps> = ({
  courses,
  user,
  enrollments,
  onEnroll,
  onSelectCourse,
}) => {
  const [activeCategory, setActiveCategory] = useState<'Semua' | 'Metrologi' | 'Mutu' | 'Jasa Perdagangan'>('Semua');
  const [search, setSearch] = useState('');

  const enrolledCourseIds = new Set(enrollments.map(e => e.trainingId));

  const filtered = courses.filter(c => {
    const matchesCategory = activeCategory === 'Semua' || c.category === activeCategory;
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.instructor.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Katalog Program Pelatihan BPMJP</h2>
          <p className="text-xs text-slate-500 mt-1">
            Program peningkatan kompetensi SDM di bidang metrologi legal, kalibrasi, penjaminan mutu, dan pengawasan jasa perdagangan.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Cari judul atau instruktur..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-white rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 shadow-2xs"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {(['Semua', 'Metrologi', 'Mutu', 'Jasa Perdagangan'] as const).map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
              activeCategory === cat
                ? 'bg-[#0f1d40] text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(course => {
          const isEnrolled = enrolledCourseIds.has(course.id);
          return (
            <div
              key={course.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-44 overflow-hidden bg-slate-100">
                  <img
                    src={course.imageUrl}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2 py-0.5 bg-[#0f1d40]/90 backdrop-blur-xs text-white text-[10px] font-semibold rounded-md">
                    {course.category}
                  </div>
                  <div className="absolute top-3 right-3 px-2.5 py-1 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-semibold rounded-md">
                    {course.durationHours} Jam Pelajaran
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="font-bold text-slate-900 text-sm leading-snug line-clamp-2">
                    {course.title}
                  </h3>

                  <div className="space-y-1.5 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{course.instructor}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{new Date(course.dateStart).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' })} - {new Date(course.dateEnd).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{course.location}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed pt-1">
                    {course.description}
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="p-5 pt-0">
                <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                  <button
                    onClick={() => onSelectCourse(course)}
                    className="flex-1 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors cursor-pointer text-center"
                  >
                    Silabus & Kurikulum
                  </button>

                  {isEnrolled ? (
                    <span className="py-2 px-3 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-xl border border-emerald-200 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Terdaftar</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => onEnroll(course)}
                      className="py-2 px-4 bg-[#16a34a] hover:bg-[#15803d] text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer flex items-center gap-1"
                    >
                      <span>Daftar</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
