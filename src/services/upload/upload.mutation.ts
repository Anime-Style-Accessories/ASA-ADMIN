import { useMutation } from '@tanstack/react-query';
import { uploadService } from './upload.service';

export const useUploadSingleMutation = () => {
  return useMutation({
    mutationFn: async (file: File) => {
      const res = await uploadService.uploadSingle(file);
      return res.data;
    },
  });
};
