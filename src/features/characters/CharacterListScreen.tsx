import React from 'react';
import { FlatList, TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';
import { useCharacters } from '@/hooks/useGetCharacters';
import { Character } from './types';
import CharacterCard from '@/components/CharacterCard';
import LoadingIndicator from '@/components/LoadingIndicator';
import ErrorMessage from '@/components/ErrorMessage';
import { Ionicons } from '@expo/vector-icons';
import { useScrollToTop } from '@/hooks/useScrollToTop';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'MainTabs'>;
};

const CharacterListScreen: React.FC<Props> = ({ navigation }) => {
  const {
    characters,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    loadMoreCharacters,
    retry
  } = useCharacters();
  const { listRef, showScrollToTopButton, handleScrollToTop, handleScroll } = useScrollToTop<Character>();

  if (loading && characters.length === 0) return <LoadingIndicator />;
  if (error && characters.length === 0) return <ErrorMessage message={error} onRetry={retry} />;

  const renderFooter = () => {
    if (loading && characters.length > 0) {
      return <LoadingIndicator />;
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar personaje por nombre..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        ref={listRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        data={characters}
        keyExtractor={(item, key) => item.id.toString() + key}
        renderItem={({ item }) => (
          <CharacterCard
            character={item}
            onPress={() => navigation.navigate('CharacterDetail', { character: item })}
          />
        )}
        onEndReached={loadMoreCharacters}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
      {showScrollToTopButton && (
        <TouchableOpacity style={styles.fab} onPress={handleScrollToTop}>
          <Ionicons name="arrow-up" size={24} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    margin: 10,
  },
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: '#007AFF',
    borderRadius: 28,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});

export default CharacterListScreen;
