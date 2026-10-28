import React, { useState, useRef } from 'react';
import { UserProfile } from '../types';
import { Camera, Upload, Check, AlertCircle, Award, IdCard, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BiodataCompletionModalProps {
  isOpen: boolean;
  user: UserProfile;
  onSave: (updatedProfile: UserProfile) => void;
  onClose?: () => void;
  isMandatory?: boolean;
}

export const BiodataCompletionModal: React.FC<BiodataCompletionModalProps> = ({
  isOpen,
  user,
  onSave,
  onClose,
  isMandatory = false
}) => {
  const [formData, setFormData] = useState<UserProfile>({ ...user });
  const [previewPhoto, setPreviewPhoto] = useState<string>(user.photoUrl || '');
  const [activeTab, setActiveTab] = useState<'form' | 'preview'>('form');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage('Ukuran file foto maksimal 5 MB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setPreviewPhoto(result);
        setFormData((prev) => ({ ...prev, photoUrl: result }));
        setErrorMessage('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectSamplePhoto = (url: string) => {
    setPreviewPhoto(url);
    setFormData((prev) => ({ ...prev, photoUrl: url }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.nik || !formData.phone || !formData.agency) {
      setErrorMessage('Harap lengkapi kolom bertanda bintang (*) sebelum menyimpan.');
      return;
    }

    if (formData.nik.length !== 16) {
      setErrorMessage('NIK harus terdiri dari 16 digit angka.');
      return;
    }

    if (!previewPhoto) {
      setErrorMessage('Mohon unggah pas foto resmi untuk keperluan ID Card dan Sertifikat.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // ignore if confetti unavailable
      }
      onSave({
        ...formData,
        photoUrl: previewPhoto,
        isProfileComplete: true
      });
      if (onClose) onClose();
    }, 700);
  };

  const samplePhotos = [
    { label: 'Pria Formal', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80' },
    { label: 'Pria Jas / Kemeja', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' },
    { label: 'Wanita Hijab', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80' },
    { label: 'Wanita Formal', url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/75 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 my-auto">
        {/* Top Header */}
        <div className="bg-[#0f1d40] text-white px-6 py-4 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Verifikasi Berkas Resmi</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                Wajib untuk Sertifikat
              </span>
            </div>
            <h2 className="text-lg font-bold text-white mt-0.5">Kelengkapan Biodata & Foto Peserta Pelatihan</h2>
          </div>
          {!isMandatory && onClose && (
            <button
              onClick={onClose}
              className="text-slate-300 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
            >
              ✕
            </button>
          )}
        </div>

        {/* Info Banner */}
        <div className="bg-amber-50 border-b border-amber-200 px-6 py-3 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            Data identitas (Nama Lengkap, Gelar, NIK, dan Pas Foto) akan langsung digunakan sebagai rujukan pencetakan <strong>ID Card Peserta</strong> serta <strong>Sertifikat Pelatihan Resmi Kemendag RI</strong> yang memiliki barcode verifikasi.
          </p>
        </div>

        {/* Tab switch for live preview */}
        <div className="px-6 pt-4 flex gap-4 border-b border-slate-200">
          <button
            type="button"
            onClick={() => setActiveTab('form')}
            className={`pb-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer ${
              activeTab === 'form' ? 'border-[#0f1d40] text-[#0f1d40]' : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            1. Formulir Biodata & Pas Foto
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`pb-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'preview' ? 'border-[#0f1d40] text-[#0f1d40]' : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            2. Pratinjau di ID Card & Sertifikat
          </button>
        </div>

        {errorMessage && (
          <div className="mx-6 mt-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs font-medium text-rose-700">
            {errorMessage}
          </div>
        )}

        {activeTab === 'form' ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
            {/* Section 1: Pas Foto Upload */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <label className="block text-xs font-bold text-slate-800 mb-2 uppercase tracking-wider">
                Upload Pas Foto Resmi Peserta <span className="text-rose-500">*</span>
              </label>

              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="relative group shrink-0">
                  <div className="w-28 h-36 rounded-lg overflow-hidden border-2 border-dashed border-slate-300 bg-white flex items-center justify-center shadow-inner">
                    {previewPhoto ? (
                      <img src={previewPhoto} alt="Pas Foto" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center p-2 text-slate-400">
                        <Camera className="w-8 h-8 mx-auto mb-1 opacity-50" />
                        <span className="text-[10px] block font-medium">Ukuran 3x4 / 4x6</span>
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-full shadow-md hover:bg-blue-700 transition-colors cursor-pointer"
                    title="Ganti Foto"
                  >
                    <Upload className="w-3.5 h-3.5" />
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </div>

                <div className="flex-1 space-y-2 text-left">
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Unggah pas foto formal berpakaian rapi (Kemeja/Batik/Jas). Latar belakang polos, merah, atau biru disarankan untuk sertifikat resmi.
                  </p>
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3 py-1.5 bg-white border border-slate-300 hover:border-slate-400 rounded-lg text-xs font-medium text-slate-700 shadow-xs hover:bg-slate-100 flex items-center gap-1.5 cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5 text-slate-500" />
                      Pilih dari Komputer / HP
                    </button>
                    <span className="text-[11px] text-slate-400">atau gunakan sampel:</span>
                  </div>

                  {/* Quick sample pickers */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {samplePhotos.map((item, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSelectSamplePhoto(item.url)}
                        className={`text-[11px] px-2.5 py-1 rounded-md border transition-colors cursor-pointer ${
                          previewPhoto === item.url
                            ? 'bg-blue-50 border-blue-500 text-blue-700 font-semibold'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Data Diri & Sertifikat */}
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                1. Identitas Pokok Peserta
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                <div className="sm:col-span-8">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nama Lengkap (tanpa gelar) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none"
                    placeholder="Contoh: Padika Satia Gunawan"
                  />
                </div>
                <div className="sm:col-span-4">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Gelar Belakang</label>
                  <input
                    type="text"
                    value={formData.titleSuffix || ''}
                    onChange={(e) => setFormData({ ...formData, titleSuffix: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none"
                    placeholder="Contoh: S.T., M.T."
                  />
                </div>

                <div className="sm:col-span-6">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    NIK (16 Digit KTP) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={16}
                    value={formData.nik}
                    onChange={(e) => setFormData({ ...formData, nik: e.target.value.replace(/\D/g, '') })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none font-mono"
                    placeholder="3201012908950003"
                  />
                </div>
                <div className="sm:col-span-6">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">NIP (bagi ASN/PNS)</label>
                  <input
                    type="text"
                    value={formData.nip || ''}
                    onChange={(e) => setFormData({ ...formData, nip: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none font-mono"
                    placeholder="199508292020121004"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Instansi & Unit Kerja */}
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                2. Data Instansi & Unit Kerja
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                <div className="sm:col-span-5">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Jenis Instansi <span className="text-rose-500">*</span></label>
                  <select
                    value={formData.agencyType}
                    onChange={(e) => setFormData({ ...formData, agencyType: e.target.value as any })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none bg-white"
                  >
                    <option value="Dinas Perdagangan">Dinas Perdagangan Kab/Kota/Provinsi</option>
                    <option value="BSML">Balai Standarisasi Metrologi Legal (BSML)</option>
                    <option value="BUMN/BUMD">BUMN / BUMD</option>
                    <option value="Perusahaan Swasta">Perusahaan Swasta / Industri</option>
                    <option value="Universitas/Pendidikan">Universitas / Akademisi</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>
                <div className="sm:col-span-7">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nama Instansi / Perusahaan <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.agency}
                    onChange={(e) => setFormData({ ...formData, agency: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none"
                    placeholder="Dinas Perindustrian dan Perdagangan Prov..."
                  />
                </div>

                <div className="sm:col-span-6">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Jabatan / Posisi <span className="text-rose-500">*</span></label>
                  <input
                    type="text"
                    required
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none"
                    placeholder="Penera Ahli Pertama / Staf Lab"
                  />
                </div>
                <div className="sm:col-span-6">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nomor WhatsApp / HP Aktif <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none"
                    placeholder="081234567890"
                  />
                </div>
              </div>
            </div>

            {/* Section 4: Kelahiran & Alamat */}
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                3. Tempat & Tanggal Lahir
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                <div className="sm:col-span-4">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Tempat Lahir</label>
                  <input
                    type="text"
                    value={formData.birthPlace}
                    onChange={(e) => setFormData({ ...formData, birthPlace: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none"
                    placeholder="Bandung"
                  />
                </div>
                <div className="sm:col-span-4">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Tanggal Lahir</label>
                  <input
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none"
                  />
                </div>
                <div className="sm:col-span-4">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Jenis Kelamin</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none bg-white"
                  >
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>

                <div className="sm:col-span-12">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Alamat Korespondensi</label>
                  <textarea
                    rows={2}
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none"
                    placeholder="Alamat lengkap instansi atau domisili"
                  />
                </div>
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
              {!isMandatory && onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-800"
                >
                  Batal
                </button>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 bg-[#16a34a] hover:bg-[#15803d] text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Menyimpan ke Sistem...</span>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Simpan Biodata & Pas Foto Resmi</span>
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          /* Live Preview Tab of ID Card & Certificate */
          <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto bg-slate-50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card 1: ID Card Peserta Pelatihan */}
              <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden flex flex-col">
                <div className="bg-[#0f1d40] text-white p-3 text-center">
                  <p className="text-[10px] uppercase tracking-wider text-slate-300">Kementerian Perdagangan RI</p>
                  <p className="text-xs font-bold">KARTU TANDA PESERTA PELATIHAN</p>
                  <p className="text-[9px] text-emerald-400">BPMJP CITEUREUP BOGOR</p>
                </div>
                <div className="p-4 flex flex-col items-center text-center">
                  <div className="w-24 h-32 rounded-lg border-2 border-slate-200 overflow-hidden bg-slate-100 mb-3 shadow-inner">
                    {previewPhoto ? (
                      <img src={previewPhoto} alt="Foto Peserta" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-300 text-xs">Foto</div>
                    )}
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    {formData.fullName} {formData.titleSuffix && `, ${formData.titleSuffix}`}
                  </h4>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">NIK: {formData.nik || '320101XXXXXXXXXX'}</p>
                  <p className="text-xs font-medium text-slate-700 mt-1 max-w-[240px] truncate">{formData.agency || 'Nama Instansi'}</p>
                  <div className="mt-3 px-3 py-1 bg-emerald-50 text-emerald-700 text-[11px] font-semibold rounded-full border border-emerald-200">
                    PESERTA RESMI METROLOGI
                  </div>
                </div>
              </div>

              {/* Card 2: Preview Sertifikat Kelulusan */}
              <div className="bg-white rounded-xl shadow-md border-4 border-amber-300 p-4 relative overflow-hidden flex flex-col justify-between">
                <div className="text-center">
                  <span className="text-[9px] font-bold text-slate-500 tracking-wider uppercase block">Kementerian Perdagangan RI</span>
                  <h4 className="text-xs font-extrabold text-[#0f1d40] tracking-wider uppercase">SERTIFIKAT KOMPETENSI</h4>
                  <p className="text-[8px] text-slate-400">NO: SERT-BPMJP/MET/2026/09/XXXX</p>
                </div>

                <div className="my-3 text-center">
                  <span className="text-[9px] text-slate-500 block">Diberikan kepada:</span>
                  <p className="text-xs font-bold text-slate-900">
                    {formData.fullName} {formData.titleSuffix && `, ${formData.titleSuffix}`}
                  </p>
                  <p className="text-[9px] text-slate-600">{formData.agency || 'Dinas Perindustrian & Perdagangan'}</p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-[8px] text-slate-500">
                  <div className="w-12 h-14 rounded border border-slate-200 overflow-hidden shrink-0">
                    {previewPhoto && <img src={previewPhoto} alt="Foto" className="w-full h-full object-cover" />}
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-slate-800">Kepala BPMJP Kemendag</p>
                    <p className="text-slate-400 mt-3 font-mono">Tanda Tangan Elektronik BSrE</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setActiveTab('form')}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-lg cursor-pointer"
              >
                Kembali ke Edit Formulir
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
