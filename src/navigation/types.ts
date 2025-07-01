import { Character } from '@/features/characters/types';

export type RootStackParamList = {
  MainTabs: undefined;
  CharacterDetail: { character: Character };
};

export type MainTabParamList = {
  Personajes: undefined;
  Favoritos: undefined;
};