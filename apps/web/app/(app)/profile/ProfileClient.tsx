"use client";

import { useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { logout } from "@/app/auth/actions";
import { Toast } from "@/components/ui/Toast";
import { LandingScene3DWrapper } from "@/components/shelf/LandingScene3DWrapper";

// ━━━ 10 avatar options via DiceBear "lorelei" style ━━━
// lorelei = illustrated storybook characters, similar to artage.io style
const AVATARS = [
  { id: "a1", url: "https://api.dicebear.com/9.x/lorelei/svg?seed=Aria&backgroundColor=1a1525"    },
  { id: "a2", url: "https://api.dicebear.com/9.x/lorelei/svg?seed=Basil&backgroundColor=1a1525"   },
  { id: "a3", url: "https://api.dicebear.com/9.x/lorelei/svg?seed=Cleo&backgroundColor=1a1525"    },
  { id: "a4", url: "https://api.dicebear.com/9.x/lorelei/svg?seed=Dorian&backgroundColor=1a1525"  },
  { id: "a5", url: "https://api.dicebear.com/9.x/lorelei/svg?seed=Elowen&backgroundColor=1a1525"  },
  { id: "a6", url: "https://api.dicebear.com/9.x/lorelei/svg?seed=Felix&backgroundColor=1a1525"   },
  { id: "a7", url: "https://api.dicebear.com/9.x/lorelei/svg?seed=Gwyneth&backgroundColor=1a1525" },
  { id: "a8", url: "https://api.dicebear.com/9.x/lorelei/svg?seed=Hadley&backgroundColor=1a1525"  },
  { id: "a9", url: "https://api.dicebear.com/9.x/lorelei/svg?seed=Isolde&backgroundColor=1a1525"  },
  { id: "a10", url: "https://api.dicebear.com/9.x/lorelei/svg?seed=Jules&backgroundColor=1a1525"  },
];

interface Props {
  user: { id: string; email: string; name: string };
  avatarUrl: string | null;
  stats: { total: number; read: number; reading: number; to_read: number };
}

export function ProfileClient({ user, avatarUrl, stats }: Props) {
  const supabase = createClient();
  const [name, setName] = useState(user.name);
  const [saving, setSaving] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [currentAvatar, setCurrentAvatar] = useState(avatarUrl ?? AVATARS[0]!.url);
  const [pendingAvatar, setPendingAvatar] = useState(avatarUrl ?? AVATARS[0]!.url);
  const [savingAvatar, setSavingAvatar] = useState(false);
  const [toast, setToast] = useState<{ visible: boolean; message: string; type: "success" | "error" }>({
    visible: false, message: "", type: "success",
  });

  const handleSaveName = async () => {
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .upsert({ id: user.id, full_name: name, updated_at: new Date().toISOString() });
    setSaving(false);
    if (error) {
      setToast({ visible: true, message: "Failed to save name.", type: "error" });
    } else {
      setToast({ visible: true, message: "Name updated!", type: "success" });
    }
  };

  const handleSaveAvatar = async () => {
    setSavingAvatar(true);
    const { error } = await supabase
      .from("profiles")
      .upsert({ id: user.id, avatar_url: pendingAvatar, updated_at: new Date().toISOString() });
    setSavingAvatar(false);
    if (error) {
      setToast({ visible: true, message: "Failed to save avatar.", type: "error" });
    } else {
      setCurrentAvatar(pendingAvatar);
      setPickerOpen(false);
      setToast({ visible: true, message: "Avatar updated!", type: "success" });
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* 3D background */}
      <LandingScene3DWrapper />

      {/* Vignette */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{ background: "radial-gradient(ellipse at center, transparent 30%, #0B0A0F 78%)" }}
      />

      {/* Content */}
    <div className="relative z-10 mx-auto max-w-md space-y-8 px-4 pb-28 pt-8 md:pb-8">

      {/* Avatar */}
      <div className="flex flex-col items-center gap-3">
        <button
          onClick={() => { setPendingAvatar(currentAvatar); setPickerOpen(true); }}
          className="group relative"
        >
          <div
            className="relative h-24 w-24 overflow-hidden rounded-full transition-transform group-hover:scale-105"
            style={{ border: "2px solid rgba(163,130,74,0.35)", backgroundColor: "#15131B" }}
          >
            <Image
              src={currentAvatar}
              alt="Profile avatar"
              fill
              unoptimized
              className="object-cover"
              sizes="96px"
            />
          </div>
          {/* Edit badge */}
          <div
            className="absolute -bottom-1 -right-1 rounded-full p-1.5"
            style={{ border: "1px solid rgba(163,130,74,0.25)", backgroundColor: "#15131B" }}
          >
            <svg className="h-3.5 w-3.5" style={{ color: "#A3824A" }} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </div>
        </button>
        <p className="font-sans text-xs text-muted opacity-50">Tap to change avatar</p>
      </div>

      {/* Avatar picker */}
      {pickerOpen && (
        <div
          className="space-y-4 rounded-2xl p-4"
          style={{ border: "1px solid rgba(163,130,74,0.15)", backgroundColor: "rgba(21,19,27,0.8)" }}
        >
          <p className="font-serif text-sm font-semibold" style={{ color: "#E8DDD0" }}>
            Choose your avatar
          </p>

          {/* Grid */}
          <div className="grid grid-cols-5 gap-2">
            {AVATARS.map((av) => {
              const isSelected = pendingAvatar === av.url;
              return (
                <button
                  key={av.id}
                  onClick={() => setPendingAvatar(av.url)}
                  className="group relative overflow-hidden rounded-xl transition-transform hover:scale-105"
                  style={{
                    border: isSelected
                      ? "2px solid #A3824A"
                      : "2px solid rgba(163,130,74,0.12)",
                    backgroundColor: "#15131B",
                    aspectRatio: "1",
                  }}
                >
                  <Image
                    src={av.url}
                    alt={`Avatar ${av.id}`}
                    fill
                    unoptimized
                    className="object-cover"
                    sizes="64px"
                  />
                  {isSelected && (
                    <div className="absolute inset-0 flex items-center justify-center"
                      style={{ backgroundColor: "rgba(163,130,74,0.15)" }}
                    >
                      <svg className="h-5 w-5" style={{ color: "#A3824A" }} fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-1">
            <button
              onClick={handleSaveAvatar}
              disabled={savingAvatar}
              className="flex-1 rounded-xl py-2.5 font-sans text-sm font-medium transition-opacity disabled:opacity-50"
              style={{ backgroundColor: "#A3824A", color: "#0B0A0F" }}
            >
              {savingAvatar ? "Saving…" : "Save avatar"}
            </button>
            <button
              onClick={() => setPickerOpen(false)}
              className="rounded-xl px-4 py-2.5 font-sans text-sm transition-opacity"
              style={{ border: "1px solid rgba(163,130,74,0.15)", color: "#7A7060" }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Total",   value: stats.total   },
          { label: "Read",    value: stats.read     },
          { label: "Reading", value: stats.reading  },
        ].map((stat) => (
          <div key={stat.label} className="card-wl rounded-xl p-4 text-center">
            <p className="font-serif text-2xl font-bold text-gold">{stat.value}</p>
            <p className="font-sans text-xs text-muted">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Name */}
      <div className="space-y-2">
        <label className="label-wl">Name</label>
        <div className="flex gap-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-wl flex-1"
            placeholder="Your name"
          />
          <button
            onClick={handleSaveName}
            disabled={saving}
            className="btn-gold-solid rounded-xl px-4 py-2.5 text-sm disabled:opacity-50"
          >
            Save
          </button>
        </div>
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label className="label-wl">Email</label>
        <p
          className="rounded-xl px-4 py-2.5 font-sans text-sm text-muted"
          style={{ border: "1px solid rgba(163,130,74,0.1)", backgroundColor: "rgba(21,19,27,0.5)" }}
        >
          {user.email}
        </p>
      </div>

      {/* Sign out */}
      <form action={logout} className="pt-4">
        <button
          type="submit"
          className="w-full rounded-xl py-2.5 font-sans text-sm font-medium text-muted transition-all"
          style={{ border: "1px solid rgba(163,130,74,0.12)" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(107,31,51,0.4)";
            e.currentTarget.style.backgroundColor = "rgba(107,31,51,0.08)";
            e.currentTarget.style.color = "#C88C9A";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(163,130,74,0.12)";
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "#C9C1B4";
          }}
        >
          Sign out
        </button>
      </form>

      <Toast
        message={toast.message}
        type={toast.type}
        visible={toast.visible}
        onHide={() => setToast((t) => ({ ...t, visible: false }))}
      />
    </div>
    </div>
  );
}
