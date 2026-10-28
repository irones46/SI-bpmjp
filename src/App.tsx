/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  initialUser, 
  sampleCourses, 
  userEnrollments as initialEnrollments, 
  userCertificates as initialCertificates, 
  sampleMaterials, 
  sampleDiscussions 
} from './data/mockData';
import { UserProfile, TrainingCourse, ParticipantEnrollment, CertificateData, TrainingMaterial, DiscussionThread } from './types';
import { LandingPage } from './components/LandingPage';
import { DashboardView } from './components/DashboardView';
import { AuthModal } from './components/AuthModal';
import { BiodataCompletionModal } from './components/BiodataCompletionModal';
import { AppsScriptSyncModal } from './components/AppsScriptSyncModal';
import { CourseDetailModal } from './components/CourseDetailModal';
import { JadwalView } from './components/JadwalView';
import { PelatihanCatalogView } from './components/PelatihanCatalogView';
import { MateriEvaluasiView } from './components/MateriEvaluasiView';
import { SertifikatView } from './components/SertifikatView';
import { DiskusiView } from './components/DiskusiView';

export default function App() {
  // App views: 'landing' or 'dashboard'
  const [view, setView] = useState<'landing' | 'dashboard'>('landing');

  // Current logged in user (loaded from localStorage or initial mock data)
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('bpmjp_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return initialUser;
  });

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  // Active dashboard tab
  const [dashboardTab, setDashboardTab] = useState<string>('Dashboard');

  // Data states
  const [courses] = useState<TrainingCourse[]>(sampleCourses);
  const [enrollments, setEnrollments] = useState<ParticipantEnrollment[]>(() => {
    const saved = localStorage.getItem('bpmjp_enrollments');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return initialEnrollments;
  });
  const [certificates, setCertificates] = useState<CertificateData[]>(initialCertificates);
  const [materials] = useState<TrainingMaterial[]>(sampleMaterials);
  const [discussions, setDiscussions] = useState<DiscussionThread[]>(sampleDiscussions);

  // Modals state
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [biodataModalOpen, setBiodataModalOpen] = useState(false);
  const [isBiodataMandatory, setIsBiodataMandatory] = useState(false);
  const [syncModalOpen, setSyncModalOpen] = useState(false);
  const [selectedCourseDetail, setSelectedCourseDetail] = useState<TrainingCourse | null>(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('bpmjp_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('bpmjp_enrollments', JSON.stringify(enrollments));
  }, [enrollments]);

  // Auth success handler
  const handleAuthSuccess = (data: { email: string; fullName: string; isNewUser: boolean }) => {
    setIsLoggedIn(true);

    if (data.isNewUser) {
      // Create new profile and prompt mandatory biodata completion
      const newUser: UserProfile = {
        id: 'usr-' + Date.now(),
        email: data.email,
        fullName: data.fullName,
        nik: '',
        phone: '',
        agency: '',
        agencyType: 'Dinas Perdagangan',
        position: '',
        birthPlace: '',
        birthDate: '',
        gender: 'Laki-laki',
        address: '',
        photoUrl: '',
        isEmailVerified: true,
        isProfileComplete: false,
        registeredAt: new Date().toISOString()
      };
      setUser(newUser);
      setView('dashboard');
      setIsBiodataMandatory(true);
      setBiodataModalOpen(true);
    } else {
      setView('dashboard');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setView('landing');
  };

  const handleSaveBiodata = (updatedProfile: UserProfile) => {
    setUser(updatedProfile);
    setIsBiodataMandatory(false);

    // Update certificates with new name & photo
    setCertificates(prev => prev.map(cert => ({
      ...cert,
      participantName: updatedProfile.fullName + (updatedProfile.titleSuffix ? `, ${updatedProfile.titleSuffix}` : ''),
      participantNik: updatedProfile.nik,
      participantAgency: updatedProfile.agency,
      participantPhoto: updatedProfile.photoUrl
    })));
  };

  const handleEnrollCourse = (course: TrainingCourse) => {
    // Check if already enrolled
    if (enrollments.some(e => e.trainingId === course.id)) {
      alert('Anda sudah terdaftar pada pelatihan ini.');
      return;
    }

    const newEnrollment: ParticipantEnrollment = {
      id: 'enr-' + Date.now(),
      trainingId: course.id,
      trainingTitle: course.title,
      instructor: course.instructor,
      dateRange: `${new Date(course.dateStart).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' })} - ${new Date(course.dateEnd).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}`,
      status: 'Menunggu Verifikasi',
      attendanceRate: 0,
      registeredDate: new Date().toISOString().split('T')[0],
      thumbnailUrl: course.imageUrl,
    };

    setEnrollments(prev => [newEnrollment, ...prev]);
    alert(`Pendaftaran pelatihan "${course.title}" berhasil diajukan! Status saat ini: Menunggu Verifikasi Berkas.`);
  };

  const handlePostDiscussion = (message: string) => {
    const newThread: DiscussionThread = {
      id: 'disc-' + Date.now(),
      trainingId: 'tr-005',
      authorName: user.fullName || 'Peserta Pelatihan',
      authorRole: 'Peserta',
      authorAvatar: user.photoUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      timestamp: 'Baru saja',
      message,
      likes: 0,
      replies: []
    };
    setDiscussions(prev => [newThread, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#fafbfc] text-slate-800 font-sans">
      {/* Top Floating View Switcher (Allows seamless preview between Landing Page & Dashboard) */}
      <div className="fixed bottom-4 right-4 z-50 bg-[#0f1d40] text-white px-3 py-1.5 rounded-full shadow-2xl border border-white/20 flex items-center gap-2 text-xs backdrop-blur-md opacity-90 hover:opacity-100 transition-opacity">
        <span className="text-[10px] text-slate-300 font-medium">Beralih Tampilan:</span>
        <button
          onClick={() => setView('landing')}
          className={`px-2.5 py-1 rounded-full font-bold transition-colors cursor-pointer ${
            view === 'landing' ? 'bg-amber-400 text-slate-950' : 'text-white hover:bg-white/10'
          }`}
        >
          Landing Page
        </button>
        <button
          onClick={() => {
            if (!isLoggedIn) setIsLoggedIn(true);
            setView('dashboard');
          }}
          className={`px-2.5 py-1 rounded-full font-bold transition-colors cursor-pointer ${
            view === 'dashboard' ? 'bg-emerald-500 text-white' : 'text-white hover:bg-white/10'
          }`}
        >
          Dashboard Peserta
        </button>
      </div>

      {/* Main View Router */}
      {view === 'landing' ? (
        <LandingPage
          courses={courses}
          onOpenAuth={(mode) => {
            setAuthMode(mode);
            setAuthModalOpen(true);
          }}
          onSelectCourse={(course) => setSelectedCourseDetail(course)}
          onOpenSync={() => setSyncModalOpen(true)}
          isLoggedIn={isLoggedIn}
          onGoToDashboard={() => setView('dashboard')}
        />
      ) : (
        /* Dashboard Container */
        <div>
          {dashboardTab === 'Dashboard' && (
            <DashboardView
              user={user}
              enrollments={enrollments}
              certificates={certificates}
              materials={materials}
              currentTab={dashboardTab}
              onTabChange={setDashboardTab}
              onLogout={handleLogout}
              onOpenBiodataModal={() => setBiodataModalOpen(true)}
              onOpenSyncModal={() => setSyncModalOpen(true)}
              onSelectEnrollment={(enr) => {
                const matched = courses.find(c => c.id === enr.trainingId);
                if (matched) setSelectedCourseDetail(matched);
              }}
            />
          )}

          {dashboardTab === 'Jadwal' && (
            <DashboardView
              user={user}
              enrollments={enrollments}
              certificates={certificates}
              materials={materials}
              currentTab={dashboardTab}
              onTabChange={setDashboardTab}
              onLogout={handleLogout}
              onOpenBiodataModal={() => setBiodataModalOpen(true)}
              onOpenSyncModal={() => setSyncModalOpen(true)}
              onSelectEnrollment={() => {}}
            >
              {/* Jadwal Subview is rendered within */}
            </DashboardView>
          )}

          {/* Render individual inner views when tab changes */}
          {dashboardTab !== 'Dashboard' && (
            <div className="flex h-screen bg-[#f8fafc] overflow-hidden font-sans">
              {/* We can re-use the Sidebar shell by rendering DashboardView wrapper or customized layout */}
              <div className="flex-1 flex flex-col h-screen overflow-hidden">
                <DashboardView
                  user={user}
                  enrollments={enrollments}
                  certificates={certificates}
                  materials={materials}
                  currentTab={dashboardTab}
                  onTabChange={setDashboardTab}
                  onLogout={handleLogout}
                  onOpenBiodataModal={() => setBiodataModalOpen(true)}
                  onOpenSyncModal={() => setSyncModalOpen(true)}
                  onSelectEnrollment={() => {}}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* When currentTab is Jadwal, Pelatihan, Materi, Sertifikat, Diskusi inside Dashboard */}
      {view === 'dashboard' && dashboardTab === 'Jadwal' && (
        <div className="fixed inset-0 lg:left-64 top-16 bg-[#f8fafc] overflow-y-auto z-20">
          <JadwalView
            enrollments={enrollments}
            courses={courses}
            onOpenTraining={(id) => {
              const matched = courses.find(c => c.id === id);
              if (matched) setSelectedCourseDetail(matched);
            }}
          />
        </div>
      )}

      {view === 'dashboard' && dashboardTab === 'Pelatihan' && (
        <div className="fixed inset-0 lg:left-64 top-16 bg-[#f8fafc] overflow-y-auto z-20">
          <PelatihanCatalogView
            courses={courses}
            user={user}
            enrollments={enrollments}
            onEnroll={handleEnrollCourse}
            onSelectCourse={(course) => setSelectedCourseDetail(course)}
          />
        </div>
      )}

      {view === 'dashboard' && dashboardTab === 'Materi dan Evaluasi' && (
        <div className="fixed inset-0 lg:left-64 top-16 bg-[#f8fafc] overflow-y-auto z-20">
          <MateriEvaluasiView materials={materials} />
        </div>
      )}

      {view === 'dashboard' && dashboardTab === 'Sertifikat' && (
        <div className="fixed inset-0 lg:left-64 top-16 bg-[#f8fafc] overflow-y-auto z-20">
          <SertifikatView certificates={certificates} user={user} />
        </div>
      )}

      {view === 'dashboard' && dashboardTab === 'Diskusi' && (
        <div className="fixed inset-0 lg:left-64 top-16 bg-[#f8fafc] overflow-y-auto z-20">
          <DiskusiView
            discussions={discussions}
            user={user}
            onPostQuestion={handlePostDiscussion}
          />
        </div>
      )}

      {/* Global Modals */}
      <AuthModal
        isOpen={authModalOpen}
        initialMode={authMode}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />

      <BiodataCompletionModal
        isOpen={biodataModalOpen}
        user={user}
        onClose={() => setBiodataModalOpen(false)}
        onSave={handleSaveBiodata}
        isMandatory={isBiodataMandatory}
      />

      <AppsScriptSyncModal
        isOpen={syncModalOpen}
        onClose={() => setSyncModalOpen(false)}
        user={user}
        enrollments={enrollments}
      />

      <CourseDetailModal
        course={selectedCourseDetail}
        onClose={() => setSelectedCourseDetail(null)}
        isEnrolled={Boolean(selectedCourseDetail && enrollments.some(e => e.trainingId === selectedCourseDetail.id))}
        onEnroll={handleEnrollCourse}
      />
    </div>
  );
}
