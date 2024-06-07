import { API_ROUTES } from '@/constants';
import { apiUploadClient } from '@/lib';

export const uploadService = {
  uploadSingle: async (file: File, signal?: AbortSignal) => {
    const formData = new FormData();
    formData.append('image', file);
    return await apiUploadClient.post<{
      image: string;
    }>(API_ROUTES.UPLOAD.SINGLE, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      signal,
    });
  },
};
