import React, { useState } from 'react';

interface ImageUploadProps {
    onChange: (file: File) => void;
    error?: string;
    label?: string;
    preview?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
    onChange,
    error,
    label = 'صورة المنتج',
    preview: initialPreview = null,
}) => {
    const [preview, setPreview] = useState<string | null>(initialPreview);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
            onChange(file);
        }
    };

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}
            </label>
            <div className="flex items-center space-x-4">
                <div className="relative h-32 w-32 border-2 border-dashed rounded-lg overflow-hidden hover:border-primary-500 transition-colors">
                    {preview ? (
                        <img src={preview} alt="Preview" className="h-full w-full object-cover" />
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <span className="text-gray-400">{label}</span>
                        </div>
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                </div>
            </div>
            {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
};
