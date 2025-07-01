import axios from 'axios';
import { Character } from '../features/characters/types';

interface ApiResponse {
  info: {
    next: string | null;
  };
  results: Character[];
}

export const apiClient = axios.create({
  baseURL: 'https://rickandmortyapi.com/api',
  headers: { 'Content-Type': 'application/json' },
});

export const getCharacters = async (page: number, name?: string): Promise<ApiResponse> => {
  try {
    const response = await apiClient.get<ApiResponse>('/character', {
      params: { page, name },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return { info: { next: null }, results: [] };
    }
    throw error;
  }
};