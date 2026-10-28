import React from 'react';
import { TrainingCourse, ParticipantEnrollment } from '../types';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  CheckCircle2, 
  Star, 
  BookOpen, 
  ShieldCheck, 
  FileText,
  ArrowRight
} from 'lucide-react';

interface CourseDetailModalProps {
  course: TrainingCourse | null;
  onClose: () => void;
  isEnrolled: boolean;
  onEnroll: (course: TrainingCourse) => void;
}

export const CourseDetailModal: React.FC<CourseDetailModalProps> = ({
  course,
  onClose,
  isEnrolled,
  onEnroll,
}) => {
  if (!course) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto animate-fade-in">
        {/* Banner with course thumbnail */}
        <div className="relative h-48 sm:h-56 bg-slate-900">
          <img
            src={course.imageUrl}
            alt={course.title}
            className="w-full h-full object-cover opacity-85"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white flex items-center justify-center transition-colors text-sm"
          >
            ✕
          </button>
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <span className="px-2.5 py-1 bg-[#0f1d40] text-white text-[10px] font-bold rounded-md uppercase tracking-wider">
              {course.category} • {course.subCategory}
            </span>
            <div className="px-2.5 py-1 bg-amber-400 text-slate-950 text-xs font-bold rounded-md flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-slate-950" />
              <span>{course.rating.toFixed(1).replace('.', ',')} ({course.reviewCount} ulasan)</span>
            </div>
          </div>
        </div>

        {/* Modal body */}
        <div className="p-6 space-y-6 max-h-[65vh] overflow-y-auto">
          <div>
            <h2 className="text-xl font-bold text-slate-900 leading-snug">
              {course.title}
            </h2>
            <p className="text-xs text-slate-500 mt-1 font-mono">Kode Pelatihan: {course.code}</p>
          </div>

          {/* Quick info grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
            <div>
              <span className="text-[10px] text-slate-400 font-semibold block">WAKTU PELAKSANAAN</span>
              <span className="font-bold text-slate-800">
                {new Date(course.dateStart).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' })} - {new Date(course.dateEnd).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-semibold block">BEBAN BELAJAR</span>
              <span className="font-bold text-slate-800">{course.durationHours} Jam Pelajaran (JP)</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-semibold block">INSTRUKTUR UTAMA</span>
              <span className="font-bold text-slate-800 truncate block">{course.instructor}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-semibold block">LOKASI PELATIHAN</span>
              <span className="font-bold text-slate-800 truncate block">{course.location}</span>
            </div>
          </div>

          {/* Deskripsi */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              Deskripsi Program
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {course.description}
            </p>
          </div>

          {/* Silabus Kurikulum */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-blue-600" />
              <span>Materi & Kurikulum Pembelajaran</span>
            </h4>
            <div className="space-y-2">
              {course.curriculum.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 p-2 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-[10px] shrink-0">
                    {idx + 1}
                  </span>
                  <span className="pt-0.5">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Persyaratan Peserta */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Persyaratan Peserta Resmi</span>
            </h4>
            <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4">
              {course.requirements.map((req, idx) => (
                <li key={idx}>{req}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
          >
            Tutup
          </button>

          {isEnrolled ? (
            <div className="px-4 py-2 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-xl flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Anda Telah Terdaftar pada Pelatihan Ini</span>
            </div>
          ) : (
            <button
              onClick={() => {
                onEnroll(course);
                onClose();
              }}
              className="px-6 py-2.5 bg-[#16a34a] hover:bg-[#15803d] text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Daftar Pelatihan Sekarang</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
