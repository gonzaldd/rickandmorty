
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList, MainTabParamList } from './types';
import { Ionicons } from '@expo/vector-icons';

import CharacterListScreen from '@/features/characters/CharacterListScreen';
import CharacterDetailScreen from '@/features/characters/CharacterDetailScreen';
import FavoritesScreen from '@/features/favorites/FavoritesScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Personajes"
        component={CharacterListScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'people' : 'people-outline'}
              size={size}
              color={color}
            />
          ),
        }} />
      <Tab.Screen
        name="Favoritos"
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'heart' : 'heart-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="MainTabs" component={MainTabs} options={{ title: 'Home' }} />
        <Stack.Screen name="CharacterDetail" component={CharacterDetailScreen} options={({ route }) => ({ title: route.params.character.name })} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}