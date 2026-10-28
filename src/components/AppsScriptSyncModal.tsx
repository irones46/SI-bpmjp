import React, { useState } from 'react';
import { googleAppsScriptTemplate } from '../data/mockData';
import { UserProfile, ParticipantEnrollment } from '../types';
import { 
  Database, 
  Copy, 
  Check, 
  ExternalLink, 
  UploadCloud, 
  RefreshCw, 
  FileSpreadsheet, 
  Sparkles,
  HelpCircle,
  AlertTriangle,
  Download
} from 'lucide-react';

interface AppsScriptSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  enrollments: ParticipantEnrollment[];
}

export const AppsScriptSyncModal: React.FC<AppsScriptSyncModalProps> = ({
  isOpen,
  onClose,
  user,
  enrollments,
}) => {
  const [copied, setCopied] = useState(false);
  const [webAppUrl, setWebAppUrl] = useState(() => localStorage.getItem('bpmjp_gas_url') || '');
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<{ type: 'success' | 'error' | 'idle'; message: string }>({
    type: 'idle',
    message: ''
  });
  const [activeTab, setActiveTab] = useState<'guide' | 'code' | 'export'>('guide');

  if (!isOpen) return null;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(googleAppsScriptTemplate);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSaveUrl = () => {
    localStorage.setItem('bpmjp_gas_url', webAppUrl);
    setSyncStatus({
      type: 'success',
      message: 'URL Google Apps Script Web App berhasil disimpan!'
    });
  };

  const handleTestSync = async () => {
    setIsSyncing(true);
    setSyncStatus({ type: 'idle', message: '' });

    if (!webAppUrl.trim()) {
      // Simulate successful local payload export & demo sync
      setTimeout(() => {
        setIsSyncing(false);
        setSyncStatus({
          type: 'success',
          message: 'Berhasil menguji struktur data! (Mode Simulasi - Masukkan Web App URL dari Google Apps Script untuk sinkronisasi live ke Google Sheets).'
        });
      }, 900);
      return;
    }

    try {
      // Attempt live POST to user's Google Apps Script Web App
      const payload = {
        action: 'updateBiodata',
        payload: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          titlePrefix: user.titlePrefix || '',
          titleSuffix: user.titleSuffix || '',
          nik: user.nik,
          nip: user.nip || '-',
          phone: user.phone,
          agency: user.agency,
          agencyType: user.agencyType,
          position: user.position,
          birthPlace: user.birthPlace,
          birthDate: user.birthDate,
          gender: user.gender,
          address: user.address,
          photoUrl: user.photoUrl,
          isProfileComplete: user.isProfileComplete,
          syncedAt: new Date().toISOString()
        }
      };

      await fetch(webAppUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      setIsSyncing(false);
      setSyncStatus({
        type: 'success',
        message: 'Data biodata dan foto peserta berhasil dikirim ke Google Sheets Anda via Google Apps Script!'
      });
    } catch (err: any) {
      setIsSyncing(false);
      setSyncStatus({
        type: 'error',
        message: 'Gagal menghubungi Web App: ' + (err.message || 'Periksa izin publik (Anyone) pada deployment script.')
      });
    }
  };

  const handleExportCsv = () => {
    const headers = ['ID', 'Email', 'Nama Lengkap', 'Gelar Belakang', 'NIK', 'NIP', 'No WhatsApp', 'Instansi', 'Jabatan', 'Status Profil'];
    const rows = [
      [
        user.id,
        user.email,
        `"${user.fullName}"`,
        `"${user.titleSuffix || ''}"`,
        `'${user.nik}`,
        `'${user.nip || '-'}`,
        `'${user.phone}`,
        `"${user.agency}"`,
        `"${user.position}"`,
        user.isProfileComplete ? 'LENGKAP' : 'BELUM_LENGKAP'
      ]
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' + 
      [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `peserta_bpmjp_${user.nik || 'kemendag'}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto">
        {/* Header */}
        <div className="bg-[#0f1d40] text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold">Integrasi Google Sheets & Google Apps Script</h3>
              <p className="text-xs text-slate-300">
                Penyimpanan Database Cloud Tanpa Server untuk BPMJP Kemendag
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg"
          >
            ✕
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-slate-200 px-6 pt-3 gap-6 bg-slate-50">
          <button
            onClick={() => setActiveTab('guide')}
            className={`pb-3 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'guide'
                ? 'border-[#0f1d40] text-[#0f1d40]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            1. Panduan & Sambungan Webhook
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`pb-3 text-xs font-bold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'code'
                ? 'border-[#0f1d40] text-[#0f1d40]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>2. Kode Apps Script (Code.gs)</span>
            <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 rounded font-mono">Siap Pakai</span>
          </button>
          <button
            onClick={() => setActiveTab('export')}
            className={`pb-3 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'export'
                ? 'border-[#0f1d40] text-[#0f1d40]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            3. Unduh CSV / Spreadsheet
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-5">
          {activeTab === 'guide' && (
            <div className="space-y-5">
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 space-y-2">
                <p className="font-bold flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  Arsitektur Cloud Spreadsheet BPMJP Kemendag
                </p>
                <p className="leading-relaxed">
                  Sesuai rencana Anda, sistem ini dapat langsung menyambungkan input pendaftaran akun, konfirmasi email, kelengkapan biodata resmi (NIK, Instansi, WhatsApp), dan link pas foto peserta ke file Google Spreadsheet Anda melalui <strong>Google Apps Script Web App</strong>.
                </p>
              </div>

              {/* Step by step */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Cara Mengaktifkan di Google Drive / Spreadsheet Anda:
                </h4>
                <ol className="text-xs text-slate-700 space-y-2.5 list-decimal pl-4 leading-relaxed">
                  <li>
                    Buka <strong>Google Sheets</strong> baru (beri nama misalnya: <code>Database Pelatihan BPMJP Kemendag 2026</code>).
                  </li>
                  <li>
                    Klik menu <strong>Extensions (Ekstensi) &gt; Apps Script</strong>.
                  </li>
                  <li>
                    Salin seluruh kode dari tab <strong>&ldquo;2. Kode Apps Script&rdquo;</strong> di atas dan tempelkan ke file <code>Code.gs</code>.
                  </li>
                  <li>
                    Klik tombol biru <strong>Deploy &gt; New deployment (Penerapan baru)</strong>.
                  </li>
                  <li>
                    Pilih tipe <strong>Web app</strong>, atur:
                    <ul className="list-disc pl-4 mt-1 text-slate-600 space-y-0.5">
                      <li><strong>Execute as:</strong> Me (email Google Anda)</li>
                      <li><strong>Who has access:</strong> Anyone (Siapa saja, agar portal web dapat mengirim data)</li>
                    </ul>
                  </li>
                  <li>
                    Salin <strong>Web app URL</strong> yang dihasilkan (awalan: <code>https://script.google.com/macros/s/.../exec</code>) dan masukkan ke kolom di bawah ini:
                  </li>
                </ol>
              </div>

              {/* Web App URL input */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <label className="block text-xs font-bold text-slate-800">
                  Google Apps Script Web App URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={webAppUrl}
                    onChange={(e) => setWebAppUrl(e.target.value)}
                    placeholder="https://script.google.com/macros/s/AKfycb.../exec"
                    className="flex-1 px-3 py-2 text-xs font-mono rounded-lg border border-slate-300 focus:outline-none focus:border-blue-500 bg-white"
                  />
                  <button
                    onClick={handleSaveUrl}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-lg cursor-pointer shrink-0"
                  >
                    Simpan URL
                  </button>
                </div>

                {/* Test button */}
                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] text-slate-500">
                    Status saat ini: {user.isProfileComplete ? 'Biodata Lengkap' : 'Biodata Belum Lengkap'}
                  </span>
                  <button
                    onClick={handleTestSync}
                    disabled={isSyncing}
                    className="px-4 py-2 bg-[#16a34a] hover:bg-[#15803d] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                    <span>{isSyncing ? 'Mengirim ke Sheets...' : 'Uji Kirim Data Peserta ke Sheets'}</span>
                  </button>
                </div>

                {syncStatus.message && (
                  <div className={`p-3 rounded-lg text-xs font-medium border ${
                    syncStatus.type === 'success'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : 'bg-rose-50 text-rose-800 border-rose-200'
                  }`}>
                    {syncStatus.message}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'code' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Script Otomatisasi Google Sheets (Code.gs)</h4>
                  <p className="text-[11px] text-slate-500">
                    Mencakup fungsi pembuatan header otomatis, notifikasi email, dan penyimpanan biodata + pas foto peserta.
                  </p>
                </div>
                <button
                  onClick={handleCopyCode}
                  className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Tersalin ke Clipboard!' : 'Salin Kode Script'}</span>
                </button>
              </div>

              <div className="relative rounded-xl overflow-hidden border border-slate-700 bg-slate-900">
                <pre className="p-4 text-[11px] font-mono text-emerald-400 overflow-x-auto max-h-[50vh] leading-relaxed">
                  {googleAppsScriptTemplate}
                </pre>
              </div>
            </div>
          )}

          {activeTab === 'export' && (
            <div className="space-y-4">
              <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 text-center space-y-3">
                <FileSpreadsheet className="w-12 h-12 text-emerald-600 mx-auto" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Ekspor Data Peserta Saat Ini</h4>
                  <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
                    Unduh file CSV data pendaftaran dan biodata resmi yang dapat langsung diimpor ke Microsoft Excel atau Google Spreadsheet.
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleExportCsv}
                    className="px-6 py-2.5 bg-[#16a34a] hover:bg-[#15803d] text-white text-xs font-bold rounded-xl shadow-md transition-colors inline-flex items-center gap-2 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Unduh CSV Data Peserta ({user.fullName})</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
