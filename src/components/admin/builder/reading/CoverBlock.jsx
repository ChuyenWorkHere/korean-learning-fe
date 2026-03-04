import React, { useRef, useState } from 'react';
import { Image as ImageIcon, Camera, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { fileService } from '../../../../services/fileService'; // Đảm bảo đường dẫn đúng

const CoverBlock = ({ data, onChange }) => {
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 1. Tạo URL ảo để hiển thị Preview ngay lập tức trên giao diện
    const objectUrl = URL.createObjectURL(file);
    onChange('imageUrl', objectUrl);

    // 2. Bắt đầu quá trình tải lên Server / Cloudinary
    setIsUploading(true);
    const toastId = toast.loading("Đang tải ảnh lên mây...");

    try {
      const uploadedData = await fileService.uploadFile(file); 
      
      // 3. Thay thế URL ảo bằng URL thật (Cloudinary) trả về từ Server
      onChange('imageUrl', uploadedData.url);
      
      toast.success("Tải ảnh bìa thành công!", { id: toastId });
    } catch (error) {
      console.error(error);
      toast.error("Lỗi khi tải ảnh lên.", { id: toastId });
      // Xóa ảnh preview nếu upload thất bại
      onChange('imageUrl', '');
    } finally {
      setIsUploading(false);
      // Reset input để có thể chọn lại cùng 1 file nếu cần
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="p-6">
      {/* Input file ẩn */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/*" 
        className="hidden" 
      />

      <div 
        className="w-full aspect-[21/9] rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-800 relative border-2 border-dashed border-[#eecd2b]/40 group/img cursor-pointer"
        onClick={() => !isUploading && !data.imageUrl && fileInputRef.current?.click()} // Chỉ cho click vào vùng trống nếu chưa có ảnh
      >
        
        {/* Render Ảnh Preview hoặc Icon rỗng */}
        {data.imageUrl ? (
          <img className="w-full h-full object-cover opacity-90" src={data.imageUrl} alt="Cover" />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center opacity-40 hover:opacity-70 transition-opacity">
            <ImageIcon className="w-12 h-12 mb-2 text-[#eecd2b]" />
            <span className="text-sm font-medium">Click to upload cover image</span>
          </div>
        )}

        {/* Overlay Hover để Đổi ảnh (Chỉ hiện khi ĐÃ CÓ ảnh và KHÔNG phải đang upload) */}
        {data.imageUrl && !isUploading && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity">
            <button 
              onClick={(e) => {
                e.stopPropagation(); // Ngăn sự kiện click lan ra thẻ div cha
                fileInputRef.current?.click();
              }}
              className="px-4 py-2 bg-white/20 backdrop-blur-md text-white rounded-lg border border-white/30 hover:bg-white/30 transition-all flex items-center gap-2"
            >
              <Camera className="w-4 h-4" /> Change Cover Image
            </button>
          </div>
        )}

        {/* Overlay Mờ khi đang Upload */}
        {isUploading && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center text-white z-10">
            <Loader2 className="w-8 h-8 animate-spin text-[#eecd2b] mb-2" />
            <span className="text-sm font-semibold tracking-wide">Uploading...</span>
          </div>
        )}

      </div>
    </div>
  );
};

export default CoverBlock;