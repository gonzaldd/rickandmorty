import { useFavoritesStore } from '@/store/favoriteStore';
import { Character } from '@/features/characters/types';
import { act } from '@testing-library/react-native';

const mockCharacter: Character = {
  id: 1, name: 'Rick Sanchez', status: 'Alive', species: 'Human',
  image: 'url', origin: { name: 'Earth', url: '' }
};

describe('favoritesStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    act(() => {
      useFavoritesStore.setState({ favorites: [] });
    });
  });

  it('should add a character to favorites', () => {
    act(() => {
      useFavoritesStore.getState().addFavorite(mockCharacter);
    });
    expect(useFavoritesStore.getState().favorites).toHaveLength(1);
    expect(useFavoritesStore.getState().favorites[0].id).toBe(1);
  });

  it('should remove a character from favorites', () => {
    act(() => {
      useFavoritesStore.getState().addFavorite(mockCharacter);
    });
    expect(useFavoritesStore.getState().favorites).toHaveLength(1);

    act(() => {
      useFavoritesStore.getState().removeFavorite(1);
    });
    expect(useFavoritesStore.getState().favorites).toHaveLength(0);
  });

  it('should correctly report if a character is a favorite', () => {
    act(() => {
      useFavoritesStore.getState().addFavorite(mockCharacter);
    });
    expect(useFavoritesStore.getState().isFavorite(1)).toBe(true);
    expect(useFavoritesStore.getState().isFavorite(2)).toBe(false);
  });
});