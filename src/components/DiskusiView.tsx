import React, { useState } from 'react';
import { DiscussionThread, UserProfile } from '../types';
import { MessageSquare, ThumbsUp, Send, User, Sparkles } from 'lucide-react';

interface DiskusiViewProps {
  discussions: DiscussionThread[];
  user: UserProfile;
  onPostQuestion: (message: string) => void;
}

export const DiskusiView: React.FC<DiskusiViewProps> = ({ discussions, user, onPostQuestion }) => {
  const [newQuestion, setNewQuestion] = useState('');
  const [likesMap, setLikesMap] = useState<Record<string, number>>({});

  const handleLike = (id: string, initialLikes: number) => {
    setLikesMap(prev => ({
      ...prev,
      [id]: (prev[id] ?? initialLikes) + 1
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;
    onPostQuestion(newQuestion);
    setNewQuestion('');
  };

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-4xl">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Forum Tanya Jawab & Diskusi Teknis</h2>
        <p className="text-xs text-slate-500 mt-1">
          Konsultasi langsung dengan Widyaiswara BPMJP Kemendag dan saling bertukar pengalaman dengan sesama peserta pelatihan metrologi se-Indonesia.
        </p>
      </div>

      {/* New Question Box */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-3">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-full overflow-hidden bg-slate-200 shrink-0 border border-slate-300">
            {user.photoUrl ? (
              <img src={user.photoUrl} alt="User" className="w-full h-full object-cover" />
            ) : (
              <User className="w-5 h-5 text-slate-500 m-2" />
            )}
          </div>
          <div className="flex-1">
            <textarea
              rows={3}
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              placeholder="Tuliskan pertanyaan teknis mengenai pengujian, rumus ketidakpastian, atau kendala tera..."
              className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
            />
          </div>
        </div>

        <div className="flex justify-between items-center pt-1 border-t border-slate-100">
          <span className="text-[11px] text-slate-400">Pertanyaan akan dijawab oleh Widyaiswara BPMJP</span>
          <button
            type="submit"
            className="px-4 py-2 bg-[#0f1d40] hover:bg-[#1b2f5c] text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Kirim Pertanyaan</span>
          </button>
        </div>
      </form>

      {/* Thread list */}
      <div className="space-y-4">
        {discussions.map(disc => {
          const currentLikes = likesMap[disc.id] ?? disc.likes;
          return (
            <div
              key={disc.id}
              className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                  <img src={disc.authorAvatar} alt={disc.authorName} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{disc.authorName}</span>
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">
                      {disc.authorRole}
                    </span>
                    <span className="text-[10px] text-slate-400">• {disc.timestamp}</span>
                  </div>
                  <p className="text-xs text-slate-700 mt-2 leading-relaxed">
                    {disc.message}
                  </p>
                </div>
              </div>

              {/* Likes & replies count */}
              <div className="flex items-center gap-4 text-xs text-slate-500 pt-2 border-t border-slate-100">
                <button
                  onClick={() => handleLike(disc.id, disc.likes)}
                  className="flex items-center gap-1.5 hover:text-blue-600 transition-colors cursor-pointer"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>{currentLikes} Terbantu</span>
                </button>
                <span className="flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{disc.replies.length} Tanggapan Resmi</span>
                </span>
              </div>

              {/* Replies from Widyaiswara */}
              {disc.replies.length > 0 && (
                <div className="pl-4 sm:pl-8 space-y-3 pt-2">
                  {disc.replies.map(reply => (
                    <div key={reply.id} className="p-3 bg-blue-50/70 rounded-xl border border-blue-100 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-blue-950">{reply.authorName}</span>
                        <span className="text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded-full font-bold">
                          {reply.authorRole}
                        </span>
                        <span className="text-[10px] text-slate-400">{reply.timestamp}</span>
                      </div>
                      <p className="text-xs text-slate-800 leading-relaxed pt-1">
                        {reply.message}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
