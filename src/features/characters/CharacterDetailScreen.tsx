import React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@/navigation/types';
import { useFavoritesStore } from '@/store/favoriteStore';

type Props = {
  route: RouteProp<RootStackParamList, 'CharacterDetail'>;
};

const characterStatus = {
  Alive: 'Vivo',
  Dead: 'Muerto',
  unknown: 'Desconocido',
}

const CharacterDetailScreen: React.FC<Props> = ({ route }) => {
  const { character } = route.params;
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();
  const isCharFavorite = isFavorite(character.id);

  const handleToggleFavorite = () => {
    if (isCharFavorite) {
      removeFavorite(character.id);
    } else {
      addFavorite(character);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: character.image }} style={styles.image} />
      <Text style={styles.name}>{character.name}</Text>
      <Text>Estado: {characterStatus[character.status]}</Text>
      <Text>Especie: {character.species}</Text>
      <Text>Origen: {character.origin.name}</Text>
      <View style={styles.buttonContainer}>
        <Button
          title={isCharFavorite ? 'Quitar de Favoritos' : 'Agregar a Favoritos'}
          onPress={handleToggleFavorite}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 20 },
  image: { width: 200, height: 200, borderRadius: 100, marginBottom: 20 },
  name: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  buttonContainer: { marginTop: 20 },
});

export default CharacterDetailScreen;