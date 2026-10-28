export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  titlePrefix?: string;
  titleSuffix?: string;
  nik: string;
  nip?: string;
  phone: string;
  agency: string; // Instansi / Lembaga
  agencyType: 'Dinas Perdagangan' | 'BSML' | 'BUMN/BUMD' | 'Perusahaan Swasta' | 'Universitas/Pendidikan' | 'Lainnya';
  position: string; // Jabatan
  birthPlace: string;
  birthDate: string;
  gender: 'Laki-laki' | 'Perempuan';
  address: string;
  photoUrl: string;
  isEmailVerified: boolean;
  isProfileComplete: boolean;
  registeredAt: string;
}

export interface TrainingCourse {
  id: string;
  code: string;
  title: string;
  category: 'Metrologi' | 'Mutu' | 'Jasa Perdagangan';
  subCategory?: string;
  instructor: string;
  instructorTitle: string;
  instructorAvatar?: string;
  dateStart: string;
  dateEnd: string;
  durationHours: number;
  location: string;
  quota: number;
  enrolledCount: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  description: string;
  curriculum: string[];
  requirements: string[];
  status: 'Buka Pendaftaran' | 'Segera' | 'Selesai';
}

export interface ParticipantEnrollment {
  id: string;
  trainingId: string;
  trainingTitle: string;
  instructor: string;
  dateRange: string;
  status: 'Menunggu Verifikasi' | 'Diterima' | 'Sedang Berlangsung' | 'Lulus' | 'Tidak Lulus';
  attendanceRate: number; // percentage
  preTestScore?: number;
  postTestScore?: number;
  certificateId?: string;
  registeredDate: string;
  thumbnailUrl: string;
}

export interface CertificateData {
  id: string;
  certificateNumber: string;
  trainingTitle: string;
  participantName: string;
  participantNik: string;
  participantAgency: string;
  participantPhoto: string;
  completionDate: string;
  grade: 'Sangat Memuaskan' | 'Memuaskan' | 'Baik';
  qrCodeUrl: string;
  headOfBalai: string;
  headNip: string;
  hours: number;
}

export interface TrainingMaterial {
  id: string;
  trainingId: string;
  trainingTitle: string;
  title: string;
  type: 'pdf' | 'video' | 'slides' | 'quiz';
  fileSize?: string;
  duration?: string;
  downloadUrl?: string;
  isCompleted?: boolean;
}

export interface DiscussionThread {
  id: string;
  trainingId: string;
  authorName: string;
  authorRole: 'Peserta' | 'Widyaiswara' | 'Admin BPMJP';
  authorAvatar: string;
  timestamp: string;
  message: string;
  likes: number;
  replies: {
    id: string;
    authorName: string;
    authorRole: 'Peserta' | 'Widyaiswara' | 'Admin BPMJP';
    timestamp: string;
    message: string;
  }[];
}

export interface GoogleSheetsConfig {
  sheetUrl: string;
  appsScriptWebAppUrl: string;
  lastSyncedAt?: string;
  autoSync: boolean;
}
