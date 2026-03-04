import axios from 'axios';
import axiosClient from '../api/axiosClient';

export const fileService = {
  uploadFile: async (file) => {
    
    const formData = new FormData();
    formData.append('file', file);

    const response = await axiosClient.post('/files/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
    return response.data;
  },
  autoTranscribe: async (audioUrl) => {
    const response = await axiosClient.post('/files/transcribe', { audioUrl });
    return response.data;
  }
};