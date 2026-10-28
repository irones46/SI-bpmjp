import React, { useState } from 'react';
import { ParticipantEnrollment, TrainingCourse } from '../types';
import { Calendar, Clock, MapPin, Video, User, CheckCircle2, AlertCircle, ExternalLink } from 'lucide-react';

interface JadwalViewProps {
  enrollments: ParticipantEnrollment[];
  courses: TrainingCourse[];
  onOpenTraining: (trainingId: string) => void;
}

export const JadwalView: React.FC<JadwalViewProps> = ({ enrollments, courses, onOpenTraining }) => {
  const [filter, setFilter] = useState<'Semua' | 'Mendatang' | 'Selesai'>('Semua');

  const scheduleList = [
    {
      id: 'sch-1',
      title: 'Pengujian Meter Air Refreshment',
      sessionType: 'Praktikum Laboratorium',
      date: '21 - 24 September 2026',
      time: '08:00 - 16:00 WIB',
      location: 'Lab Uji Flow Meter & Bejana Ukur Standar BPMJP Citeureup',
      instructor: 'Idha Kurniawati, S. T., M.I.L.',
      status: 'Mendatang',
      zoomLink: 'https://zoom.us/j/bpmjp-kemendag-flowmeter-2026',
      isOnline: false,
      notes: 'Peserta wajib membawa APD (Jas Lab, Safety Shoes, dan Kacamata Pelindung)'
    },
    {
      id: 'sch-2',
      title: 'Pengujian TUTSIT Refreshment',
      sessionType: 'Pengukuran Lapangan & Strapping Tangki',
      date: '23 - 27 Agustus 2026',
      time: '08:30 - 16:30 WIB',
      location: 'Fasilitas Uji Tangki Ukur BPMJP',
      instructor: 'Lafin Hari Prayudhi, S.T., M.Eng.',
      status: 'Selesai',
      isOnline: false,
      notes: 'Selesai - Evaluasi Ujian Praktik Lulus'
    },
    {
      id: 'sch-3',
      title: 'Pengujian Pelatihan Meter Air',
      sessionType: 'Teori Daring & Pre-Test',
      date: '12 - 15 Agustus 2026',
      time: '09:00 - 15:00 WIB',
      location: 'Ruang Kuliah Smart Class BPMJP & Zoom Meeting',
      instructor: 'Dr. Irwan Setiawan, M.T.',
      status: 'Selesai',
      isOnline: true,
      notes: 'Selesai - Post-Test 92'
    }
  ];

  const filtered = scheduleList.filter(item => {
    if (filter === 'Semua') return true;
    return item.status === filter;
  });

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Jadwal Sesi & Agenda Pelatihan</h2>
          <p className="text-xs text-slate-500 mt-1">
            Jadwal kegiatan kelas daring, praktikum laboratorium di BPMJP Citeureup, serta sesi evaluasi kemetrologian.
          </p>
        </div>

        {/* Filter */}
        <div className="flex p-1 bg-slate-100 rounded-xl">
          {(['Semua', 'Mendatang', 'Selesai'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                filter === tab ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Schedule cards */}
      <div className="space-y-4">
        {filtered.map(item => (
          <div
            key={item.id}
            className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    item.status === 'Mendatang'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {item.status}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">{item.sessionType}</span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  {item.title}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 pt-1">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{item.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>{item.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>Instruktur: {item.instructor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
                    <span className="truncate">{item.location}</span>
                  </div>
                </div>

                {item.notes && (
                  <div className="mt-2 p-2 bg-slate-50 rounded-lg border border-slate-100 text-[11px] text-slate-600">
                    <span className="font-semibold text-slate-800">Catatan:</span> {item.notes}
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="flex md:flex-col gap-2 shrink-0">
                {item.isOnline && (
                  <a
                    href={item.zoomLink}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Gabung Zoom</span>
                  </a>
                )}
                <button
                  onClick={() => onOpenTraining('tr-005')}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer text-center"
                >
                  Detail Pelatihan
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
