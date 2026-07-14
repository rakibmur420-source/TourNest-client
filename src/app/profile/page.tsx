"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { FiCamera, FiLoader, FiShield, FiUser, FiMail, FiLock, FiPackage } from "react-icons/fi";
import api from "@/lib/api";
import { uploadImageToImgBB } from "@/lib/uploadImage";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { useAuth } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

function ProfileContent() {
  const { user, updateUser } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState(user?.name || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);

  const [packageCount, setPackageCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      if (user?.role !== "admin") return;
      try {
        const res = await api.get("/packages/manage/my");
        setPackageCount(res.data.data.length);
      } catch {
        setPackageCount(null);
      }
    };
    fetchStats();
  }, [user?.role]);

  const handlePhotoClick = () => fileInputRef.current?.click();

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      return;
    }

    setUploadingPhoto(true);
    try {
      const url = await uploadImageToImgBB(file);
      setPhotoURL(url);
      toast.success("Photo uploaded! Don't forget to save.");
    } catch (err: unknown) {
      toast.error(getErrorMessage(err, "Photo upload failed."));
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Name cannot be empty.");
      return;
    }
    setSavingProfile(true);
    try {
      const res = await api.put("/auth/profile", { name, photoURL });
      updateUser(res.data.user);
      toast.success("Profile updated!");
    } catch (err: unknown) {
      toast.error(getErrorMessage(err, "Failed to update profile."));
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all password fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New password and confirmation do not match.");
      return;
    }
    setChangingPassword(true);
    try {
      await api.put("/auth/password", { currentPassword, newPassword });
      toast.success("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: unknown) {
      toast.error(getErrorMessage(err, "Failed to change password."));
    } finally {
      setChangingPassword(false);
    }
  };

  if (!user) return null;

  return (
    <section className="mx-auto max-w-4xl px-5 py-12 lg:px-8">
      <div className="mb-8 flex flex-col items-center gap-4 rounded-2xl border border-lagoon/10 bg-surface p-8 text-center sm:flex-row sm:text-left">
        <div className="relative">
          <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-lagoon-light bg-lagoon-light">
            {photoURL ? (
              <Image src={photoURL} alt={user.name} fill className="object-cover" unoptimized />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-2xl font-semibold text-lagoon">
                {user.name.charAt(0).toUpperCase()}
              </div>
            )}
            {uploadingPhoto && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <FiLoader className="animate-spin text-white" />
              </div>
            )}
          </div>
          <button
            onClick={handlePhotoClick}
            className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-amber text-white shadow-md hover:bg-amber-dark"
            title="Change photo"
            type="button"
          >
            <FiCamera size={14} />
          </button>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
        </div>

        <div>
          <h1 className="font-display text-2xl font-semibold text-charcoal">{user.name}</h1>
          <p className="mt-1 flex items-center justify-center gap-1 text-sm text-charcoal/60 sm:justify-start">
            <FiMail size={14} /> {user.email}
          </p>
          <span
            className={`mt-2 inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
              user.role === "admin" ? "bg-amber/15 text-amber-dark" : "bg-lagoon-light text-lagoon"
            }`}
          >
            <FiShield size={12} /> {user.role === "admin" ? "Administrator" : "Traveler"}
          </span>
        </div>
      </div>

      {user.role === "admin" && (
        <div className="mb-8 flex items-center gap-4 rounded-2xl border border-lagoon/10 bg-surface p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-lagoon-light text-lagoon">
            <FiPackage size={22} />
          </div>
          <div>
            <p className="font-display text-2xl font-semibold text-charcoal">
              {packageCount === null ? "—" : packageCount}
            </p>
            <p className="text-sm text-charcoal/60">Travel packages published</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Edit Profile */}
        <form onSubmit={handleProfileSave} className="space-y-4 rounded-2xl border border-lagoon/10 bg-surface p-6">
          <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-charcoal">
            <FiUser className="text-amber" /> Edit Profile
          </h2>
          <div>
            <label className="mb-1 block text-sm font-medium text-charcoal">Full Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-lagoon/20 px-3 py-2.5 text-sm outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-charcoal">Email</label>
            <input
              value={user.email}
              disabled
              className="w-full rounded-lg border border-lagoon/10 bg-lagoon-light/40 px-3 py-2.5 text-sm text-charcoal/50 outline-none"
            />
            <p className="mt-1 text-xs text-charcoal/40">Email cannot be changed.</p>
          </div>
          <button
            type="submit"
            disabled={savingProfile || uploadingPhoto}
            className="w-full rounded-full bg-lagoon py-2.5 text-sm font-semibold text-sand transition hover:bg-lagoon-dark disabled:opacity-60"
          >
            {savingProfile ? "Saving..." : "Save Changes"}
          </button>
        </form>

        {/* Change Password */}
        <form onSubmit={handlePasswordChange} className="space-y-4 rounded-2xl border border-lagoon/10 bg-surface p-6">
          <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-charcoal">
            <FiLock className="text-amber" /> Change Password
          </h2>
          <div>
            <label className="mb-1 block text-sm font-medium text-charcoal">Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full rounded-lg border border-lagoon/20 px-3 py-2.5 text-sm outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-charcoal">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="At least 6 characters"
              className="w-full rounded-lg border border-lagoon/20 px-3 py-2.5 text-sm outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-charcoal">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-lg border border-lagoon/20 px-3 py-2.5 text-sm outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={changingPassword}
            className="w-full rounded-full bg-amber py-2.5 text-sm font-semibold text-white transition hover:bg-amber-dark disabled:opacity-60"
          >
            {changingPassword ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  );
}
