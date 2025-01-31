import axios, { AxiosError } from 'axios';
import z from 'zod';

export const api = axios.create({
  baseURL: 'https://test.vmarmysh.com/',
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!axios.isAxiosError(error)) {
      return Promise.reject(error);
    }

    return Promise.reject(handleGenericError(error));
  },
);

function handleGenericError(error: AxiosError) {
  const validation = GenericErrorSchema.safeParse(error.response?.data);

  if (validation.error) {
    return error;
  }

  const message = validation.data.data.message;

  return new AxiosError(
    message,
    error.code,
    error.config,
    error.request,
    error.response,
  );
}

const GenericErrorSchema = z.object({
  id: z.string(),
  type: z.string(),
  data: z.object({
    message: z.string(),
  })
});