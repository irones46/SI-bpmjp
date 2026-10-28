import React, { useState } from 'react';
import { CertificateData, UserProfile } from '../types';
import { Award, Download, Printer, CheckCircle, ShieldCheck, QrCode, Search, Calendar, User } from 'lucide-react';
import { BpmjpLogo } from './BpmjpLogo';

interface SertifikatViewProps {
  certificates: CertificateData[];
  user: UserProfile;
}

export const SertifikatView: React.FC<SertifikatViewProps> = ({ certificates, user }) => {
  const [selectedCert, setSelectedCert] = useState<CertificateData | null>(certificates[0] || null);
  const [showVerifyModal, setShowVerifyModal] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-6 sm:p-8 space-y-8 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Sertifikat Kelulusan Resmi</h2>
          <p className="text-xs text-slate-500 mt-1">
            Sertifikat resmi kompetensi kemetrologian terdaftar di database BPMJP Kementerian Perdagangan RI.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowVerifyModal(true)}
            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <QrCode className="w-4 h-4 text-slate-600" />
            <span>Validasi Keaslian QR</span>
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-[#0f1d40] hover:bg-[#1b2f5c] text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak / Simpan PDF</span>
          </button>
        </div>
      </div>

      {/* Certificate selector buttons if multiple */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {certificates.map((cert) => (
          <button
            key={cert.id}
            onClick={() => setSelectedCert(cert)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-2 ${
              selectedCert?.id === cert.id
                ? 'bg-[#eab308] text-slate-950 shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>{cert.trainingTitle}</span>
          </button>
        ))}
      </div>

      {/* Certificate Printable Canvas / Frame */}
      {selectedCert ? (
        <div className="bg-white rounded-3xl p-6 sm:p-12 shadow-xl border-8 border-double border-amber-300/80 relative overflow-hidden">
          {/* Subtle Guilloche / Watermark Pattern */}
          <div className="absolute inset-0 pointer-events-none opacity-5 bg-[radial-gradient(#0f1d40_1px,transparent_1px)] [background-size:16px_16px]"></div>

          <div className="relative z-10 text-center space-y-6">
            {/* Top Emblem & Header */}
            <div className="flex flex-col items-center justify-center">
              <div className="w-16 h-16 mb-2">
                <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
                  <circle cx="50" cy="50" r="46" stroke="#0f1d40" strokeWidth="3" strokeDasharray="4 2" />
                  <circle cx="50" cy="50" r="40" stroke="#0f1d40" strokeWidth="1.5" />
                  <path d="M50 18 L50 82" stroke="#0f1d40" strokeWidth="2.5" />
                  <path d="M26 36 L74 36" stroke="#0f1d40" strokeWidth="2.5" />
                  <circle cx="50" cy="36" r="3.5" fill="#eab308" />
                  <polygon points="50,14 52,20 58,20 53,24 55,30 50,26 45,30 47,24 42,20 48,20" fill="#eab308" />
                </svg>
              </div>

              <span className="text-xs font-bold uppercase tracking-widest text-slate-600">
                KEMENTERIAN PERDAGANGAN REPUBLIK INDONESIA
              </span>
              <span className="text-[11px] font-semibold text-slate-500 tracking-wider">
                BADAN KEBIJAKAN PERDAGANGAN • BALAI PELATIHAN SDM METROLOGI, MUTU DAN JASA PERDAGANGAN
              </span>
              <div className="w-24 h-0.5 bg-amber-400 my-2"></div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#0f1d40] tracking-wider uppercase mt-1">
                SERTIFIKAT KELULUSAN
              </h1>
              <p className="text-xs font-mono text-slate-500 mt-1 font-semibold">
                Nomor: {selectedCert.certificateNumber}
              </p>
            </div>

            {/* Recipient Statement */}
            <div className="space-y-2 py-4">
              <p className="text-xs text-slate-600 italic">Diberikan secara resmi kepada:</p>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-serif">
                {user.fullName || selectedCert.participantName}
                {user.titleSuffix ? `, ${user.titleSuffix}` : ''}
              </h3>
              <p className="text-xs text-slate-600 font-mono">
                NIK: {user.nik || selectedCert.participantNik} {user.nip ? `• NIP: ${user.nip}` : ''}
              </p>
              <p className="text-xs font-semibold text-slate-800">
                {user.agency || selectedCert.participantAgency}
              </p>
            </div>

            {/* Course accomplishment */}
            <div className="max-w-2xl mx-auto space-y-2 py-2">
              <p className="text-xs text-slate-700 leading-relaxed">
                Telah mengikuti dan dinyatakan <strong className="text-emerald-700 uppercase font-bold">LULUS</strong> dengan predikat <strong className="text-slate-900">{selectedCert.grade}</strong> pada program pelatihan teknis:
              </p>
              <h4 className="text-lg sm:text-xl font-bold text-[#0f1d40]">
                &ldquo;{selectedCert.trainingTitle}&rdquo;
              </h4>
              <p className="text-xs text-slate-500">
                Beban Belajar: {selectedCert.hours} Jam Pelajaran (JP) • Diselenggarakan di BPMJP Citeureup, Bogor.
              </p>
            </div>

            {/* Bottom Signatures & QR Code */}
            <div className="pt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 items-center border-t border-slate-200/80">
              {/* Photo of participant as required */}
              <div className="flex flex-col items-center">
                <div className="w-24 h-32 rounded-lg border-2 border-slate-300 p-1 bg-white shadow-sm overflow-hidden">
                  <img
                    src={user.photoUrl || selectedCert.participantPhoto}
                    alt={user.fullName}
                    className="w-full h-full object-cover rounded"
                  />
                </div>
                <span className="text-[10px] text-slate-400 mt-1">Pas Foto Resmi Peserta</span>
              </div>

              {/* QR Code Verification */}
              <div className="flex flex-col items-center">
                <div className="p-2 bg-white rounded-xl border border-slate-200 shadow-2xs">
                  <img
                    src={selectedCert.qrCodeUrl}
                    alt="QR Verifikasi"
                    className="w-24 h-24"
                  />
                </div>
                <span className="text-[10px] font-mono text-slate-500 mt-1">Scan untuk Validasi BSrE</span>
              </div>

              {/* Head of Balai Signature */}
              <div className="flex flex-col items-center sm:items-end text-center sm:text-right">
                <p className="text-xs text-slate-600">Bogor, {selectedCert.completionDate}</p>
                <p className="text-xs font-bold text-slate-900 mt-0.5">Kepala Balai Pelatihan SDM Metrologi, Mutu dan Jasa Perdagangan</p>
                <div className="my-2 py-1 px-3 bg-emerald-50 text-emerald-800 text-[9px] font-mono font-semibold rounded border border-emerald-200 inline-block">
                  ✓ Ditandatangani secara elektronik (BSrE BSSN)
                </div>
                <p className="text-xs font-bold text-slate-900 underline">{selectedCert.headOfBalai}</p>
                <p className="text-[10px] font-mono text-slate-500">NIP. {selectedCert.headNip}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-12 text-center text-slate-400">
          Belum ada sertifikat yang diterbitkan.
        </div>
      )}

      {/* QR Validation Modal */}
      {showVerifyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <h4 className="font-bold text-sm text-slate-900">Hasil Verifikasi Keaslian Sertifikat</h4>
              </div>
              <button
                onClick={() => setShowVerifyModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm"
              >
                ✕
              </button>
            </div>

            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 space-y-2">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>STATUS: SERTIFIKAT ASLI & TERVERIFIKASI</span>
              </div>
              <p className="text-xs text-slate-700">
                Sertifikat dengan nomor <strong>{selectedCert?.certificateNumber}</strong> tercatat sah di Pangkalan Data Pelatihan Kemendag RI atas nama <strong>{user.fullName}</strong>.
              </p>
            </div>

            <div className="text-xs space-y-1 text-slate-600">
              <p><strong>Penyelenggara:</strong> BPMJP Kemendag RI (Citeureup, Bogor)</p>
              <p><strong>Tanggal Kelulusan:</strong> {selectedCert?.completionDate}</p>
              <p><strong>Otoritas:</strong> Kepala Balai Pelatihan SDM Metrologi, Mutu dan Jasa Perdagangan</p>
            </div>

            <button
              onClick={() => setShowVerifyModal(false)}
              className="w-full py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
