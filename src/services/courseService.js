import axiosClient from "../api/axiosClient";

export const courseService = {
  getAllCourses: async () => {
    try {
      const response = await axiosClient.get('/courses');
      return response.data;
    } catch (error) {
      console.error("Lỗi khi tải danh sách khóa học:", error.response?.data || error.message);
      throw error;
    }
  },

  // Tạo khóa học mới
  createCourse: async (courseData) => {
    try {
      const response = await axiosClient.post('/courses', courseData);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi tạo khóa học:", error.response?.data || error.message);
      throw error;
    }
  },
  getUserCourses: async () => {
    const response = await axiosClient.get('/courses/my-courses');
    return response.data;
  },

  getUserCourseDetail: async (courseId) => {
    const response = await axiosClient.get(`/courses/my-courses/${courseId}`);
    return response.data;
  },

  updateStatus: async (courseId) => {
    const response = await axiosClient.put(`/courses/${courseId}/status`);
    return response.data;
  },

  // deleteCourse: async (courseId) => {
  //   const response = await axiosClient.delete(`/courses/${courseId}`);
  //   return response.data;
  // }
};