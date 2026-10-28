import React, { useState } from 'react';
import { TrainingMaterial } from '../types';
import { FileText, Video, Presentation, CheckCircle, Download, Play, HelpCircle, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface MateriEvaluasiViewProps {
  materials: TrainingMaterial[];
}

export const MateriEvaluasiView: React.FC<MateriEvaluasiViewProps> = ({ materials }) => {
  const [activeQuiz, setActiveQuiz] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});

  const quizQuestions = [
    {
      q: 'Batas Kesalahan yang Diizinkan (BKD) pada pengujian verifikasi awal meter air untuk laju alir nominal (Q3) adalah:',
      options: ['± 1%', '± 2%', '± 5%', '± 0,5%'],
      correct: 1
    },
    {
      q: 'Dokumen standar internasional yang menjadi acuan pengujian meter air untuk air minum dingin dan air panas adalah:',
      options: ['OIML R49', 'OIML R76', 'ISO 9001', 'OIML R71'],
      correct: 0
    },
    {
      q: 'Metode strapping pada pengujian Tangki Ukur Tetap Silinder Tegak (TUTSIT) bertujuan untuk:',
      options: ['Mengukur kadar air fluida', 'Mengukur keliling lingkar tangki setiap ring (course)', 'Menguji kebocoran katup', 'Menghitung massa jenis minyak'],
      correct: 1
    }
  ];

  const handleAnswer = (qIndex: number, optIndex: number) => {
    setSelectedAnswers(prev => ({ ...prev, [qIndex]: optIndex }));
  };

  const handleFinishQuiz = () => {
    let score = 0;
    quizQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correct) score++;
    });
    const finalScore = Math.round((score / quizQuestions.length) * 100);
    setQuizScore(finalScore);
    if (finalScore >= 70) {
      try {
        confetti({ particleCount: 60, spread: 60 });
      } catch (err) {}
    }
  };

  return (
    <div className="p-6 sm:p-8 space-y-8 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Materi Pelatihan & Evaluasi Pembelajaran</h2>
          <p className="text-xs text-slate-500 mt-1">
            Unduh modul resmi, slide presentasi widyaiswara, rekaman praktikum lab, dan kerjakan kuis evaluasi.
          </p>
        </div>

        <button
          onClick={() => {
            setActiveQuiz(true);
            setQuizScore(null);
            setSelectedAnswers({});
          }}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-2 cursor-pointer"
        >
          <HelpCircle className="w-4 h-4" />
          <span>Simulasi Evaluasi / Post-Test</span>
        </button>
      </div>

      {/* Materials List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {materials.map(mat => {
          const getIcon = () => {
            switch (mat.type) {
              case 'pdf': return <FileText className="w-6 h-6 text-rose-500" />;
              case 'video': return <Video className="w-6 h-6 text-blue-500" />;
              case 'slides': return <Presentation className="w-6 h-6 text-amber-500" />;
              case 'quiz': return <HelpCircle className="w-6 h-6 text-emerald-500" />;
            }
          };

          return (
            <div
              key={mat.id}
              className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                {getIcon()}
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {mat.trainingTitle}
                  </span>
                  {mat.isCompleted && (
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded font-semibold flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Selesai
                    </span>
                  )}
                </div>

                <h4 className="font-bold text-slate-900 text-sm leading-snug">
                  {mat.title}
                </h4>

                <p className="text-xs text-slate-500">
                  {mat.fileSize || mat.duration || 'Online'}
                </p>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      alert(`Memulai pengunduhan / pemutaran: ${mat.title}`);
                    }}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Akses Materi Resmi</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quiz / Post-Test Modal */}
      {activeQuiz && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 space-y-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Evaluasi Pemahaman Metrologi (Post-Test)</h3>
                <p className="text-xs text-slate-500">Standar Pengujian Meter Air & Kalibrasi Kemendag</p>
              </div>
              <button
                onClick={() => setActiveQuiz(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            {quizScore !== null ? (
              <div className="text-center py-6 space-y-4">
                <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center text-3xl font-extrabold ${
                  quizScore >= 70 ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                }`}>
                  {quizScore}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900">
                    {quizScore >= 70 ? 'Selamat! Anda Memenuhi Syarat Kelulusan' : 'Perlu Remedial / Ulangi Materi'}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 max-w-sm mx-auto">
                    {quizScore >= 70
                      ? 'Nilai evaluasi telah dicatat ke portal dan siap untuk penerbitan sertifikat resmi kompetensi.'
                      : 'Nilai minimum kelulusan sertifikasi adalah 70. Silakan tinjau kembali modul praktikum.'}
                  </p>
                </div>

                <button
                  onClick={() => setActiveQuiz(false)}
                  className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl cursor-pointer"
                >
                  Selesai & Simpan Nilai
                </button>
              </div>
            ) : (
              <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-1">
                {quizQuestions.map((item, qIdx) => (
                  <div key={qIdx} className="space-y-2 p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="text-xs font-bold text-slate-900">
                      {qIdx + 1}. {item.q}
                    </p>
                    <div className="space-y-1.5 pt-1">
                      {item.options.map((opt, oIdx) => (
                        <label
                          key={oIdx}
                          className={`flex items-center gap-2 p-2.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                            selectedAnswers[qIdx] === oIdx
                              ? 'bg-blue-50 border-blue-500 font-semibold text-blue-900'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <input
                            type="radio"
                            name={`q-${qIdx}`}
                            checked={selectedAnswers[qIdx] === oIdx}
                            onChange={() => handleAnswer(qIdx, oIdx)}
                            className="text-blue-600"
                          />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}

                <button
                  onClick={handleFinishQuiz}
                  disabled={Object.keys(selectedAnswers).length < quizQuestions.length}
                  className="w-full py-3 bg-[#16a34a] hover:bg-[#15803d] text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-40"
                >
                  Kirim Jawaban Evaluasi
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
