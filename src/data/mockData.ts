import { TrainingCourse, UserProfile, ParticipantEnrollment, CertificateData, TrainingMaterial, DiscussionThread } from '../types';

export const initialUser: UserProfile = {
  id: 'usr-bpmjp-001',
  email: 'padika.satia@kemendag.go.id',
  fullName: 'Padika Satia Gunawan',
  titlePrefix: '',
  titleSuffix: 'S.T.',
  nik: '3201012908950003',
  nip: '199508292020121004',
  phone: '081289345671',
  agency: 'Dinas Perindustrian dan Perdagangan Provinsi Jawa Barat',
  agencyType: 'Dinas Perdagangan',
  position: 'Penera Pertama - Pengawas Kemetrologian',
  birthPlace: 'Bandung',
  birthDate: '1995-08-29',
  gender: 'Laki-laki',
  address: 'Jl. Diponegoro No. 22, Citarum, Kec. Bandung Wetan, Kota Bandung, Jawa Barat',
  photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  isEmailVerified: true,
  isProfileComplete: true,
  registeredAt: '2026-06-15T09:00:00Z',
};

export const sampleCourses: TrainingCourse[] = [
  {
    id: 'tr-001',
    code: 'MET-MA-2026-08A',
    title: 'Pengujian Pelatihan Meter Air Refreshment',
    category: 'Metrologi',
    subCategory: 'Metrologi Legal',
    instructor: 'Dr. Irwan Setiawan, M.T.',
    instructorTitle: 'Widyaiswara Ahli Utama Kemetrologian BPMJP',
    dateStart: '2026-08-05',
    dateEnd: '2026-08-08',
    durationHours: 32,
    location: 'Laboratorium Meter Air BPMJP Citeureup, Bogor',
    quota: 25,
    enrolledCount: 22,
    rating: 4.0,
    reviewCount: 16,
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    description: 'Pelatihan penyegaran teknis pengujian dan tera/tera ulang meter air untuk petugas penera metrologi legal sesuai Syarat Teknis Meter Air Keputusan Direktur Jenderal PKTN.',
    curriculum: [
      'Prinsip Kerja & Klasifikasi Meter Air (Mekanik & Ultrasonik)',
      'Standar Instalasi Uji dan Bejana Ukur Standar (BUS)',
      'Penentuan Batas Kesalahan yang Diizinkan (BKD)',
      'Praktikum Pengujian Laju Alir Minimum (Q1), Transisi (Q2), dan Nominal (Q3)',
      'Penyusunan Berita Acara & Pembubuhan Cap Tanda Tera (CTT)'
    ],
    requirements: [
      'ASN / Petugas Unit Metrologi Legal (UML) Daerah atau Industri Meter Air',
      'Membawa pakaian lab / safety shoes untuk sesi praktikum',
      'Surat Tugas resmi dari instansi pengirim'
    ],
    status: 'Selesai'
  },
  {
    id: 'tr-002',
    code: 'MET-MA-2026-08B',
    title: 'Pengujian Pelatihan Meter Air',
    category: 'Metrologi',
    subCategory: 'Metrologi Legal',
    instructor: 'Dr. Irwan Setiawan, M.T.',
    instructorTitle: 'Widyaiswara Ahli Utama Kemetrologian BPMJP',
    dateStart: '2026-08-12',
    dateEnd: '2026-08-15',
    durationHours: 36,
    location: 'Lab Flow Meter BPMJP & Workshop Uji Presisi',
    quota: 30,
    enrolledCount: 30,
    rating: 4.5,
    reviewCount: 26,
    imageUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    description: 'Pelatihan komprehensif bagi calon penera dan teknisi uji industri mengenai verifikasi dan pengujian akurasi instalasi meter air industri serta perumahan.',
    curriculum: [
      'Regulasi & Kebijakan Kemetrologian Nasional',
      'Ketidakpastian Pengukuran Pada Pengujian Meter Air',
      'Verifikasi Test Bench dan Manometer Tekanan',
      'Uji Lapangan Menggunakan Mobile Prover Unit',
      'Evaluasi Hasil Uji & Studi Kasus Anomali Pembacaan'
    ],
    requirements: [
      'Memahami dasar-dasar fisika fluida dan mekanika',
      'Memiliki akun SIPENERA / SIMETROL aktif (jika ASN)',
      'Pas foto resmi berseragam'
    ],
    status: 'Selesai'
  },
  {
    id: 'tr-003',
    code: 'MET-TUT-2026-08C',
    title: 'Pengujian TUTSIT Refreshment',
    category: 'Metrologi',
    subCategory: 'Tangki Ukur & Volume',
    instructor: 'Lafin Hari Prayudhi, S.T., M.Eng.',
    instructorTitle: 'Spesialis Pengukuran Tangki Ukur BPMJP',
    dateStart: '2026-08-23',
    dateEnd: '2026-08-27',
    durationHours: 40,
    location: 'Fasilitas Kalibrasi Tangki Ukur BPMJP Citeureup',
    quota: 20,
    enrolledCount: 19,
    rating: 4.9,
    reviewCount: 27,
    imageUrl: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&w=800&q=80',
    description: 'Refreshment kalibrasi dan pengujian Tangki Ukur Tetap Silinder Tegak (TUTSIT) metode strapping (pengukuran geometris lingkar) dan metode optik elektro-optik EODR.',
    curriculum: [
      'Tinjauan SNI dan Standar OIML R71 tentang Fixed Storage Tanks',
      'Metode Pengukuran Lingkar (Manual Strapping Method)',
      'Koreksi Suhu Dinding Tangki dan Tekanan Hidrostatis Cairan',
      'Perhitungan Tabel Volume Tangki (Ullage & Innage Table)',
      'Inspeksi Lapangan Tangki Depot Terminal BBM / Minyak Nabati'
    ],
    requirements: [
      'Pernah mengikuti pelatihan TUTSIT tingkat dasar atau bertugas minimal 1 tahun di bidang kalibrasi tangki',
      'Kondisi fisik prima untuk praktik pengukuran tangki outdoor'
    ],
    status: 'Selesai'
  },
  {
    id: 'tr-004',
    code: 'MET-MA-2026-08D',
    title: 'Pengujian Pelatihan Meter Air Refreshment',
    category: 'Metrologi',
    subCategory: 'Metrologi Legal',
    instructor: 'Dr. Irwan Setiawan, M.T.',
    instructorTitle: 'Widyaiswara Ahli Utama Kemetrologian BPMJP',
    dateStart: '2026-08-28',
    dateEnd: '2026-08-31',
    durationHours: 32,
    location: 'Laboratorium Uji Aliran Fluida BPMJP',
    quota: 25,
    enrolledCount: 24,
    rating: 4.4,
    reviewCount: 20,
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    description: 'Angkatan ke-4 pelatihan lanjutan tera dan tera ulang meter air dengan fokus pada integrasi sistem IoT dan AMR (Automatic Meter Reading) smart water meter.',
    curriculum: [
      'Pengenalan Smart Metering & Protokol Komunikasi Data Meter',
      'Pengujian Ketahanan Suhu, Tekanan Impuls & Aliran Balik',
      'Validasi Perangkat Lunak Tertanam (Software Verification)',
      'Audit Fasilitas Pengujian Meter Air Menurut ISO 17025'
    ],
    requirements: [
      'Peserta membawa laptop untuk pemrosesan spreadsheet kalkulasi hasil uji',
      'Surat sehat dari dokter'
    ],
    status: 'Selesai'
  },
  {
    id: 'tr-005',
    code: 'MET-MA-2026-09A',
    title: 'Pengujian Meter Air Refreshment',
    category: 'Metrologi',
    subCategory: 'Metrologi Legal Lanjutan',
    instructor: 'Idha Kurniawati, S. T., M.I.L.',
    instructorTitle: 'Widyaiswara Ahli Madya Pengendalian Mutu & Metrologi',
    dateStart: '2026-09-21',
    dateEnd: '2026-09-24',
    durationHours: 32,
    location: 'Kampus Balai Pelatihan SDM Metrologi Kemendag Citeureup',
    quota: 25,
    enrolledCount: 18,
    rating: 4.8,
    reviewCount: 12,
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    description: 'Pelatihan penyegaran intensif penjaminan mutu kalibrasi meter air bagi petugas daerah untuk persiapan akreditasi laboratorium pengujian kemetrologian.',
    curriculum: [
      'Evaluasi Kinerja Peralatan Uji & Ketertelusuran SI',
      'Teknik Sampling Meter Air Baru dan Lama',
      'Pencegahan Kecurangan (Tampering Detection) pada Meter Air',
      'Simulasi Sidang Pengujian dan Ujian Kompetensi Praktek'
    ],
    requirements: [
      'Pejabat Fungsional Penera / Calon Penera / Pranata Lab',
      'Dokumen biodata lengkap terverifikasi di portal BPMJP'
    ],
    status: 'Buka Pendaftaran'
  },
  {
    id: 'tr-006',
    code: 'MUT-ISO-2026-10A',
    title: 'Manajemen Mutu Laboratorium SNI ISO/IEC 17025:2017',
    category: 'Mutu',
    subCategory: 'Standar Mutu Pengujian',
    instructor: 'Ir. Bambang Haryadi, M.Sc.',
    instructorTitle: 'Lead Assessor KAN & Asesor Mutu BPMJP',
    dateStart: '2026-10-14',
    dateEnd: '2026-10-18',
    durationHours: 40,
    location: 'Auditorium Gd. A BPMJP Kemendag',
    quota: 30,
    enrolledCount: 26,
    rating: 4.7,
    reviewCount: 34,
    imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
    description: 'Pemahaman klausul SNI ISO/IEC 17025:2017, audit internal laboratorium, estimasi ketidakpastian pengujian, dan jaminan keabsahan hasil evaluasi mutu perdagangan.',
    curriculum: [
      'Persyaratan Umum & Struktural Laboratorium',
      'Persyaratan Sumber Daya (Personel, Fasilitas, Ketertelusuran)',
      'Persyaratan Proses: Evaluasi Ketidakpastian & Validasi Metode',
      'Audit Internal & Kaji Ulang Manajemen'
    ],
    requirements: [
      'Manajer Mutu, Manajer Teknis, atau Analis Laboratorium',
      'Menyelesaikan Pre-test daring sebelum sesi tatap muka'
    ],
    status: 'Buka Pendaftaran'
  },
  {
    id: 'tr-007',
    code: 'JAS-EXP-2026-11A',
    title: 'Pengawasan Mutu Produk Ekspor dan Verifikasi Jasa Perdagangan',
    category: 'Jasa Perdagangan',
    subCategory: 'Pengawasan Perdagangan',
    instructor: 'Dra. Sri Wahyuni, M.M.',
    instructorTitle: 'Analis Perdagangan Ahli Utama Ditjen PKTN',
    dateStart: '2026-11-04',
    dateEnd: '2026-11-07',
    durationHours: 32,
    location: 'Ruang Workshop BPMJP & Kunjungan Lapangan Pelabuhan',
    quota: 25,
    enrolledCount: 15,
    rating: 4.6,
    reviewCount: 19,
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    description: 'Peningkatan kapasitas aparatur dan pelaku usaha dalam verifikasi standar mutu komoditas ekspor, sertifikasi asal barang, dan kepatuhan jasa pergudangan.',
    curriculum: [
      'Regulasi Perdagangan Luar Negeri & Standar Ekspor',
      'Prosedur Sertifikasi Mutu & Certificate of Inspection (CoI)',
      'Verifikasi Teknis Jasa Logistik, Pergudangan & Cold Chain',
      'Penyelesaian Sengketa Mutu Dagang Internasional'
    ],
    requirements: [
      'Petugas Pengawas Perdagangan / Eksportir / Surveyor Komoditas',
      'Dokumen legalitas instansi/perusahaan'
    ],
    status: 'Buka Pendaftaran'
  }
];

export const userEnrollments: ParticipantEnrollment[] = [
  {
    id: 'enr-001',
    trainingId: 'tr-005',
    trainingTitle: 'Pengujian Meter Air Refreshment',
    instructor: 'Idha Kurniawati, S. T., M.I.L.',
    dateRange: '21 - 24 September 2026',
    status: 'Menunggu Verifikasi',
    attendanceRate: 0,
    registeredDate: '2026-09-01',
    thumbnailUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'enr-002',
    trainingId: 'tr-003',
    trainingTitle: 'Pengujian TUTSIT Refreshment',
    instructor: 'Lafin Hari Prayudhi, S.T., M.Eng.',
    dateRange: '23 - 27 Agustus 2026',
    status: 'Lulus',
    attendanceRate: 100,
    preTestScore: 82,
    postTestScore: 94,
    certificateId: 'cert-001',
    registeredDate: '2026-08-01',
    thumbnailUrl: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'enr-003',
    trainingId: 'tr-002',
    trainingTitle: 'Pengujian Pelatihan Meter Air',
    instructor: 'Dr. Irwan Setiawan, M.T.',
    dateRange: '12 - 15 Agustus 2026',
    status: 'Lulus',
    attendanceRate: 98,
    preTestScore: 78,
    postTestScore: 92,
    certificateId: 'cert-002',
    registeredDate: '2026-07-20',
    thumbnailUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'enr-004',
    trainingId: 'tr-001',
    trainingTitle: 'Pengujian Pelatihan Meter Air Refreshment',
    instructor: 'Dr. Irwan Setiawan, M.T.',
    dateRange: '05 - 08 Agustus 2026',
    status: 'Lulus',
    attendanceRate: 100,
    preTestScore: 85,
    postTestScore: 96,
    certificateId: 'cert-003',
    registeredDate: '2026-07-15',
    thumbnailUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
  }
];

export const userCertificates: CertificateData[] = [
  {
    id: 'cert-001',
    certificateNumber: 'SERT-BPMJP/MET/2026/08/0412',
    trainingTitle: 'Pengujian TUTSIT Refreshment',
    participantName: 'Padika Satia Gunawan, S.T.',
    participantNik: '3201012908950003',
    participantAgency: 'Dinas Perindustrian dan Perdagangan Provinsi Jawa Barat',
    participantPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    completionDate: '27 Agustus 2026',
    grade: 'Sangat Memuaskan',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=VERIF-BPMJP-KEMENDAG-SERT-2026-08-0412-PADIKA-SATIA-GUNAWAN',
    headOfBalai: 'Dr. Ir. Hendro Kusumo, M.Si.',
    headNip: '196804151994031002',
    hours: 40
  },
  {
    id: 'cert-002',
    certificateNumber: 'SERT-BPMJP/MET/2026/08/0388',
    trainingTitle: 'Pengujian Pelatihan Meter Air',
    participantName: 'Padika Satia Gunawan, S.T.',
    participantNik: '3201012908950003',
    participantAgency: 'Dinas Perindustrian dan Perdagangan Provinsi Jawa Barat',
    participantPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    completionDate: '15 Agustus 2026',
    grade: 'Sangat Memuaskan',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=VERIF-BPMJP-KEMENDAG-SERT-2026-08-0388-PADIKA-SATIA-GUNAWAN',
    headOfBalai: 'Dr. Ir. Hendro Kusumo, M.Si.',
    headNip: '196804151994031002',
    hours: 36
  },
  {
    id: 'cert-003',
    certificateNumber: 'SERT-BPMJP/MET/2026/08/0345',
    trainingTitle: 'Pengujian Pelatihan Meter Air Refreshment',
    participantName: 'Padika Satia Gunawan, S.T.',
    participantNik: '3201012908950003',
    participantAgency: 'Dinas Perindustrian dan Perdagangan Provinsi Jawa Barat',
    participantPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    completionDate: '08 Agustus 2026',
    grade: 'Sangat Memuaskan',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=VERIF-BPMJP-KEMENDAG-SERT-2026-08-0345-PADIKA-SATIA-GUNAWAN',
    headOfBalai: 'Dr. Ir. Hendro Kusumo, M.Si.',
    headNip: '196804151994031002',
    hours: 32
  }
];

export const sampleMaterials: TrainingMaterial[] = [
  {
    id: 'mat-001',
    trainingId: 'tr-005',
    trainingTitle: 'Pengujian Meter Air Refreshment',
    title: 'Modul 01: Regulasi Teknis & Persyaratan Uji Meter Air (Kepdirjen PKTN)',
    type: 'pdf',
    fileSize: '4.8 MB',
    isCompleted: true,
  },
  {
    id: 'mat-002',
    trainingId: 'tr-005',
    trainingTitle: 'Pengujian Meter Air Refreshment',
    title: 'Slide Presentasi: Evaluasi Ketidakpastian Pengukuran Flow Meter',
    type: 'slides',
    fileSize: '12.4 MB',
    isCompleted: true,
  },
  {
    id: 'mat-003',
    trainingId: 'tr-005',
    trainingTitle: 'Pengujian Meter Air Refreshment',
    title: 'Video Praktik: Prosedur Pengujian Aliran Transisi & Laju Alir Q3',
    type: 'video',
    duration: '28 Menit',
    isCompleted: false,
  },
  {
    id: 'mat-004',
    trainingId: 'tr-003',
    trainingTitle: 'Pengujian TUTSIT Refreshment',
    title: 'Pedoman Perhitungan Geometris Tangki Silinder Tegak & Formula Koreksi Suhu',
    type: 'pdf',
    fileSize: '7.2 MB',
    isCompleted: true,
  },
  {
    id: 'mat-005',
    trainingId: 'tr-003',
    trainingTitle: 'Pengujian TUTSIT Refreshment',
    title: 'Pre-Test & Post-Test Evaluasi Pemahaman Praktik Lapangan',
    type: 'quiz',
    duration: '45 Menit',
    isCompleted: true,
  }
];

export const sampleDiscussions: DiscussionThread[] = [
  {
    id: 'disc-001',
    trainingId: 'tr-005',
    authorName: 'Padika Satia Gunawan, S.T.',
    authorRole: 'Peserta',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    timestamp: 'Kemarin, 14:20 WIB',
    message: 'Izin bertanya kepada Ibu Idha Kurniawati terkait pengujian meter air magnetik/ultrasonik, apakah batas kesalahan yang diizinkan (BKD) tetap mengacu pada kelas 2 atau ada toleransi khusus pada debit sangat rendah?',
    likes: 5,
    replies: [
      {
        id: 'rep-001',
        authorName: 'Idha Kurniawati, S. T., M.I.L.',
        authorRole: 'Widyaiswara',
        timestamp: 'Kemarin, 16:05 WIB',
        message: 'Halo Mas Padika. Sesuai ketentuan OIML R49 dan adopsi SK Dirjen PKTN, meter air ultrasonik tetap harus memenuhi toleransi ±5% untuk Q1 ke Q2, dan ±2% untuk Q2 ke Q4 pada suhu air dingin (0,1 s.d 30°C). Kita akan ulas tuntas demonstrasi uji lab-nya di hari ke-2!'
      }
    ]
  },
  {
    id: 'disc-002',
    trainingId: 'tr-003',
    authorName: 'Rahmat Hidayat, S.Si.',
    authorRole: 'Peserta',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    timestamp: '25 Agustus 2026, 09:15 WIB',
    message: 'Untuk koreksi pemuaian pita ukur baja (dip tape) pada pengujian TUTSIT dengan suhu permukaan di atas 45°C, koefisien muai panjang standar yang dipakai apakah 0,0000115 /°C?',
    likes: 8,
    replies: [
      {
        id: 'rep-002',
        authorName: 'Lafin Hari Prayudhi, S.T., M.Eng.',
        authorRole: 'Widyaiswara',
        timestamp: '25 Agustus 2026, 10:30 WIB',
        message: 'Tepat sekali Mas Rahmat. Nilai alfa standar baja karbon adalah 1,15 x 10^-5 per °C dengan suhu referensi 20°C. Jangan lupa catat juga pembacaan suhu dinding tangki di minimal 3 ketinggian berbeda.'
      }
    ]
  }
];

export const googleAppsScriptTemplate = `/**
 * ========================================================================
 * GOOGLE APPS SCRIPT - SISTEM INFORMASI PELATIHAN BPMJP KEMENDAG
 * Sambungkan Google Sheets sebagai database Cloud untuk:
 * 1. Pendaftaran Peserta Baru & Verifikasi Email
 * 2. Biodata Lengkap Peserta (NIK, Instansi, No HP, Pas Foto)
 * 3. Status Pelatihan, Kehadiran, Nilai & Penerbitan Sertifikat
 * ========================================================================
 */

// Ganti SHEET_ID jika tidak menggunakan container-bound script
var SPREADSHEET_ID = SpreadsheetApp.getActiveSpreadsheet().getId();

function doGet(e) {
  var action = e.parameter.action;
  
  if (action === "getTrainings") {
    return handleGetTrainings();
  } else if (action === "getParticipant") {
    return handleGetParticipant(e.parameter.email);
  }
  
  return ContentService.createTextOutput(JSON.stringify({
    status: "success",
    message: "BPMJP Kemendag Training Webhook Online",
    timestamp: new Date().toISOString()
  })).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    var rawData = e.postData.contents;
    var data = JSON.parse(rawData);
    var action = data.action;
    
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    
    if (action === "registerUser") {
      return handleRegisterUser(ss, data.payload);
    } else if (action === "updateBiodata") {
      return handleUpdateBiodata(ss, data.payload);
    } else if (action === "enrollTraining") {
      return handleEnrollTraining(ss, data.payload);
    } else if (action === "verifyEmail") {
      return handleVerifyEmail(ss, data.payload);
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: "Action tidak dikenali: " + action
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// 1. Simpan Registrasi Akun & Kirim Notifikasi Email
function handleRegisterUser(ss, user) {
  var sheet = getOrCreateSheet(ss, "Data_Akun_Peserta", [
    "Timestamp", "ID", "Email", "Nama Lengkap", "Status Verifikasi", "Waktu Verifikasi"
  ]);
  
  sheet.appendRow([
    new Date(),
    user.id,
    user.email,
    user.fullName,
    user.isEmailVerified ? "TERVERIFIKASI" : "MENUNGGU_VERIFIKASI",
    user.registeredAt
  ]);
  
  // Kirim email konfirmasi otomatis jika belum diverifikasi
  if (!user.isEmailVerified && MailApp.getRemainingDailyQuota() > 0) {
    try {
      MailApp.sendEmail({
        to: user.email,
        subject: "[BPMJP Kemendag] Konfirmasi Akun Sistem Informasi Pelatihan",
        htmlBody: "<p>Yth. <b>" + user.fullName + "</b>,</p>" +
          "<p>Terima kasih telah mendaftar di <b>Sistem Informasi Pelatihan BPMJP Kemendag</b>.</p>" +
          "<p>Gunakan tautan di bawah ini atau masukkan kode konfirmasi 6-digit pada portal untuk mengaktifkan akun Anda dan melengkapi biodata peserta resmi.</p>" +
          "<p>Salam hormat,<br><b>Balai Pelatihan SDM Metrologi, Mutu dan Jasa Perdagangan</b><br>Kementerian Perdagangan RI</p>"
      });
    } catch(mailErr) {
      Logger.log("Mail error: " + mailErr);
    }
  }
  
  return ContentService.createTextOutput(JSON.stringify({
    status: "success",
    message: "Akun berhasil disimpan ke Google Sheets",
    data: user
  })).setMimeType(ContentService.MimeType.JSON);
}

// 2. Simpan Biodata Lengkap Peserta & Pas Foto untuk Sertifikat
function handleUpdateBiodata(ss, profile) {
  var sheet = getOrCreateSheet(ss, "Biodata_Peserta_Pelatihan", [
    "Timestamp", "ID Peserta", "Email", "Nama Lengkap", "Gelar Depan", "Gelar Belakang",
    "NIK", "NIP", "No HP / WhatsApp", "Instansi / Lembaga", "Tipe Instansi", "Jabatan",
    "Tempat Lahir", "Tanggal Lahir", "Jenis Kelamin", "Alamat", "URL Pas Foto", "Status Profil"
  ]);
  
  // Cek apakah data sudah ada (update row) atau append baru
  var values = sheet.getDataRange().getValues();
  var rowIndex = -1;
  for (var i = 1; i < values.length; i++) {
    if (values[i][2] === profile.email || values[i][1] === profile.id) {
      rowIndex = i + 1;
      break;
    }
  }
  
  var rowData = [
    new Date(),
    profile.id,
    profile.email,
    profile.fullName,
    profile.titlePrefix || "",
    profile.titleSuffix || "",
    profile.nik,
    profile.nip || "-",
    profile.phone,
    profile.agency,
    profile.agencyType,
    profile.position,
    profile.birthPlace,
    profile.birthDate,
    profile.gender,
    profile.address,
    profile.photoUrl,
    "LENGKAP_VALID"
  ];
  
  if (rowIndex > 0) {
    sheet.getRange(rowIndex, 1, 1, rowData.length).setValues([rowData]);
  } else {
    sheet.appendRow(rowData);
  }
  
  return ContentService.createTextOutput(JSON.stringify({
    status: "success",
    message: "Biodata resmi berhasil disinkronkan ke Google Sheets",
    profile: profile
  })).setMimeType(ContentService.MimeType.JSON);
}

// Helper: dapatkan atau buat sheet dengan header otomatis
function getOrCreateSheet(ss, sheetName, headers) {
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground("#102a43").setFontColor("#ffffff");
    sheet.setFrozenRows(1);
  }
  return sheet;
}
`;
