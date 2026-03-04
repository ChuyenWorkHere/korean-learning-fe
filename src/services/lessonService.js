import axiosClient from '../api/axiosClient';

export const lessonService = {
  getLessonById: async (lessonId) => (await axiosClient.get(`/lessons/${lessonId}`)).data,
  createLesson: async (payload) => (await axiosClient.post(`/lessons`, payload)).data,
  updateLesson: async (lessonId, payload) => (await axiosClient.put(`/lessons/${lessonId}`, payload)).data,
  updateLessonStatus: async (lessonId) => (await axiosClient.put(`/lessons/${lessonId}/status`)).data,
  deleteLesson: async (lessonId) => (await axiosClient.delete(`/lessons/${lessonId}`)).data,
  reorderLessons: async (unitId, lessonIds) => (await axiosClient.put(`/units/${unitId}/lessons/reorder`, lessonIds)).data,
  completeLesson: async (lessonId) => (await axiosClient.put(`/lessons/${lessonId}/complete`)).data,
};