// src/hooks/useLessonData.js
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { lessonService } from '../services/lessonService'; // Nhớ trỏ đúng đường dẫn

export const useLessonData = (lessonId) => {
  // 1. Khởi tạo State
  const [lesson, setLesson] = useState({
    lessonId: '', title: '', status: 'DRAFT', 
    type: 'GRAMMAR', durationMinutes: 0, content: '', orderIndex: 0,
  });
  const [blocks, setBlocks] = useState([]);
  
  const [isFetching, setIsFetching] = useState(true); 

  useEffect(() => {
    const fetchLessonById = async () => {
      if (!lessonId) return;

      setIsFetching(true);
      try {
        const response = await lessonService.getLessonById(lessonId);
        setLesson(response);

        if (response.content && response.content !== '[]') {
          try {
            const parsedBlocks = JSON.parse(response.content);
            setBlocks(parsedBlocks);
          } catch (e) {
            console.error("Lỗi khi giải mã content JSON:", e);
            setBlocks([]);
          }
        } else {
          setBlocks([]);
        }
      } catch (error) {
        console.error("Failed to fetch lesson detail", error);
        toast.error("Thất bại khi lấy chi tiết bài học");
      } finally {
        setIsFetching(false);
      }
    };

    fetchLessonById();
  }, [lessonId]);

  return { 
    lesson, setLesson, 
    blocks, setBlocks, 
    isFetching 
  };
};