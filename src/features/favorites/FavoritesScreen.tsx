import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFavoritesStore } from '@/store/favoriteStore';
import { RootStackParamList } from '@/navigation/types';
import CharacterCard from '@/components/CharacterCard';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'MainTabs'>;
};

const FavoritesScreen: React.FC<Props> = ({ navigation }) => {
  const { favorites } = useFavoritesStore();

  if (favorites.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No tienes favoritos</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={favorites}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <CharacterCard
          character={item}
          onPress={() => navigation.navigate('CharacterDetail', { character: item })}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FavoritesScreen;