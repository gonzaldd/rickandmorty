import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Character } from '../features/characters/types';

interface FavoritesState {
  favorites: Character[];
  addFavorite: (character: Character) => void;
  removeFavorite: (characterId: number) => void;
  isFavorite: (characterId: number) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (character) => {
        if (!get().favorites.find(fav => fav.id === character.id)) {
          set((state) => ({ favorites: [...state.favorites, character] }));
        }
      },
      removeFavorite: (characterId) => {
        set((state) => ({
          favorites: state.favorites.filter((character) => character.id !== characterId),
        }));
      },
      isFavorite: (characterId) => {
        return get().favorites.some((character) => character.id === characterId);
      },
    }),
    {
      name: 'favorites-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);