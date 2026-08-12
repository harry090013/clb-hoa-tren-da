"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { UploadCloud, Loader2, Image as ImageIcon, CheckCircle } from "lucide-react";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUpload({ value, onChange, label = "Tải lên ảnh bìa" }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setStatus("idle");
      const files = e.target.files;
      if (!files || files.length === 0) return;

      setUploading(true);
      const file = files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      // Upload file to Supabase Storage bucket 'public-images'
      const { error: uploadError } = await supabase.storage
        .from("public-images")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from("public-images")
        .getPublicUrl(filePath);

      onChange(publicUrl);
      setStatus("success");
    } catch (err) {
      console.error("Upload error:", err);
      setStatus("error");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-bold text-gray-700 block">{label}</label>
      
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-2xl border border-gray-200">
        <div className="relative w-32 h-20 bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center border border-gray-200">
          {value ? (
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <ImageIcon className="w-8 h-8 text-gray-400" />
          )}
        </div>

        <div className="flex-1 space-y-2 text-center sm:text-left w-full">
          <label className="inline-flex items-center justify-center px-4 py-2.5 rounded-full border border-gray-300 shadow-sm bg-white hover:bg-gray-50 text-sm font-bold text-gray-700 cursor-pointer w-full sm:w-auto">
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin text-accent" />
                Đang tải lên...
              </>
            ) : (
              <>
                <UploadCloud className="w-4 h-4 mr-2 text-primary" />
                Chọn ảnh tải lên
              </>
            )}
            <input
              type="file"
              accept="image/*"
              disabled={uploading}
              onChange={handleUpload}
              className="hidden"
            />
          </label>

          {status === "success" && (
            <p className="text-xs text-primary font-bold flex items-center justify-center sm:justify-start gap-1">
              <CheckCircle className="w-3.5 h-3.5 text-accent" /> Tải lên thành công!
            </p>
          )}

          {status === "error" && (
            <p className="text-xs text-red-600 font-bold">
              Thất bại. Đảm bảo bạn đã tạo bucket public tên 'public-images' trên Supabase.
            </p>
          )}

          <p className="text-xs text-gray-400">Hỗ trợ JPG, PNG, GIF. Tối đa 2MB.</p>
        </div>
      </div>
    </div>
  );
}
