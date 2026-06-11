import React from 'react';
import { resizeImageToBase64 } from '../../lib/imageUpload';

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onUploadSuccess?: () => void;
  onUploadError?: (message: string) => void;
  maxWidth?: number;
}

export default function ImageUploadField({
  label,
  value,
  onChange,
  onUploadSuccess,
  onUploadError,
  maxWidth = 800,
}: ImageUploadFieldProps) {
  const handleFile = async (file: File) => {
    try {
      const base64 = await resizeImageToBase64(file, maxWidth);
      onChange(base64);
      onUploadSuccess?.();
    } catch (err) {
      onUploadError?.(err instanceof Error ? err.message : 'Gagal mengunggah gambar');
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-left text-[11px] font-black uppercase text-brand-gray-1 tracking-wider">
        {label}
      </label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <span className="block text-left text-[10px] font-semibold text-brand-gray-2 mb-1">
            Opsi A: Tulis Link / URL Gambar
          </span>
          <input
            type="text"
            placeholder="https://... atau kosongkan"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-brand-gray-5 border border-brand-gray-4 p-3 text-xs rounded-lg focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red font-semibold text-brand-black"
          />
        </div>
        <div>
          <span className="block text-left text-[10px] font-semibold text-brand-gray-2 mb-1">
            Opsi B: Unggah dari Perangkat
          </span>
          <div className="relative flex items-center justify-center border border-dashed border-brand-gray-3 hover:border-brand-red rounded-lg p-2 bg-brand-gray-5 h-[46px] transition-colors overflow-hidden">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files?.[0]) handleFile(e.target.files[0]);
              }}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
            />
            <div className="text-[11px] font-bold text-brand-gray-1">
              Pilih / Tarik Gambar Ke Sini
            </div>
          </div>
        </div>
      </div>
      {value && (
        <div className="mt-2 text-left flex items-center gap-3">
          <div className="w-14 h-14 rounded-lg overflow-hidden border border-brand-gray-4 bg-brand-gray-5">
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
          </div>
          <div className="text-xs">
            <span className="text-[10px] font-black text-brand-gray-2 uppercase block">Preview Aktif</span>
            <button
              type="button"
              onClick={() => onChange('')}
              className="text-brand-red hover:underline font-extrabold text-[10px] uppercase cursor-pointer"
            >
              Hapus Foto
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
