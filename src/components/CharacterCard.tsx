import React from 'react';
import { Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Character } from '../features/characters/types';
import { useFavoritesStore } from '@/store/favoriteStore';

interface Props {
  character: Character;
  onPress: () => void;
}

const CharacterCard: React.FC<Props> = ({ character, onPress }) => {
  const isCharacterFavorite = useFavoritesStore((state) =>
    state.isFavorite(character.id)
  );

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image source={{ uri: character.image }} style={styles.image} />
      <Text style={styles.name}>{character.name}</Text>
      {isCharacterFavorite && (
        <Ionicons name="heart" size={24} color="#E53935" />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  name: {
    fontSize: 18,
    flex: 1,
  },
});

export default CharacterCard;