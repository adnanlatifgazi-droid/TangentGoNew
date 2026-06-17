import React, { useState } from 'react';
import { X, CheckCircle, Check } from 'lucide-react';
import { MatchProfile } from '../types';

interface MatchesDialogProps {
  isOpen: boolean;
  onClose: () => void;
  matches: MatchProfile[];
  eventTitle: string;
}

export default function MatchesDialog({
  isOpen,
  onClose,
  matches,
  eventTitle
}: MatchesDialogProps) {
  const [invitedIds, setInvitedIds] = useState<string[]>([]);

  if (!isOpen) return null;

  const toggleInvite = (id: string) => {
    setInvitedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs" id="matches-dialog-overlay">
      <div className="relative w-full max-w-md bg-white rounded-lg shadow-2xl border border-zinc-200 max-h-[85vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">

        {/* Header */}
        <div className="relative flex items-start justify-between p-5 border-b border-zinc-100">
          <div className="pr-8">
            <h2 className="font-display text-lg font-bold text-black">
              Invite your matches
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5 leading-relaxed">
              You're attending <span className="font-semibold text-zinc-700">{eventTitle}</span>. Invite vetted companions to come along.
            </p>
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 text-zinc-400 hover:text-black hover:bg-zinc-100 rounded-full transition cursor-pointer"
            aria-label="Close dialog"
            id="close-matches-dialog-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable match list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {matches.map((m) => {
            const invited = invitedIds.includes(m.id);
            return (
              <div
                key={m.id}
                className="bg-white border border-zinc-150 rounded-lg p-4 flex items-center space-x-3.5 shadow-3xs"
                id={`dialog-match-${m.id}`}
              >
                <img
                  src={m.avatar}
                  alt={m.name}
                  className="w-12 h-12 rounded-full object-cover border border-zinc-200 filter brightness-95 shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-sm font-bold text-black flex items-center space-x-1">
                    <span className="truncate">{m.name}</span>
                    <CheckCircle className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  </h3>
                  <p className="text-[11px] font-semibold text-zinc-500">
                    Reliability: <span className="text-teal-700 font-bold">{m.reliability}%</span>
                  </p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {m.skills.slice(0, 3).map((sk) => (
                      <span
                        key={sk}
                        className="bg-zinc-100 text-zinc-700 font-medium text-[9px] px-2 py-0.5 rounded-full uppercase"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => toggleInvite(m.id)}
                  className={`shrink-0 px-3.5 py-2 rounded font-bold text-[11px] uppercase tracking-wide transition cursor-pointer select-none flex items-center space-x-1 ${
                    invited
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      : 'bg-black hover:bg-zinc-800 text-white'
                  }`}
                  id={`dialog-invite-${m.id}`}
                >
                  {invited ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Invited</span>
                    </>
                  ) : (
                    <span>Invite</span>
                  )}
                </button>
              </div>
            );
          })}

          {matches.length === 0 && (
            <div className="text-center py-10">
              <p className="text-xs text-zinc-500">
                No matches available to invite yet.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-zinc-100 p-4">
          <button
            onClick={onClose}
            className="w-full bg-black hover:bg-zinc-800 text-white py-2.5 rounded font-bold text-sm transition cursor-pointer select-none"
            id="matches-dialog-done-btn"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
}
