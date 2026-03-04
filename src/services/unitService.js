import axiosClient from "../api/axiosClient";

export const unitService = {
  getAllUnitsByCourseId: async (courseId) => (await axiosClient.get(`/courses/${courseId}/units`)).data,
  getUnitsForUser: async (courseId) => (await axiosClient.get(`/my-courses/${courseId}/units`)).data,
  createUnit: async (courseId, payload) => (await axiosClient.post(`/units`, payload)).data,
  updateUnitTitle: async (unitId, title) => (await axiosClient.put(`/units/${unitId}/title`, title, { headers: { 'Content-Type': 'text/plain' } })).data,
  deleteUnit: async (unitId) => (await axiosClient.delete(`/units/${unitId}`)).data,
  reorderUnits: async (courseId, unitIds) => (await axiosClient.put(`/courses/${courseId}/units/reorder`, unitIds)).data,
};