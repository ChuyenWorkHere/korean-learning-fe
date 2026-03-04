import axios from 'axios';
import axiosClient from '../api/axiosClient';


export const aiService = {
  generateWritingPrompt: async (topic) => {
    const response = await axiosClient.post('/ai/generate-writing', { topic });
    return response.data;
  }
};