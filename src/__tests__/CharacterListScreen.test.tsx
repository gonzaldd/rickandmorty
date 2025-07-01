import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import MockAdapter from 'axios-mock-adapter';

import { apiClient } from '@/api/rickAndMortyAPI';
import CharacterListScreen from '@/features/characters/CharacterListScreen';

const mock = new MockAdapter(apiClient);

const mockNavigator = {
  navigate: jest.fn(),
  push: jest.fn(),
  goBack: jest.fn(),
} as any;

describe('CharacterListScreen - Error Handling', () => {
  afterEach(() => {
    mock.reset();
  });

  it('debe mostrar un mensaje de error cuando la API falla', async () => {
    mock.onGet('/character').reply(500);

    // RENDER: Renderizamos el componente
    const { getByText } = render(<CharacterListScreen navigation={mockNavigator} />);

    // ASSERT: Verificamos que el mensaje de error aparece
    await waitFor(() => {
      const errorMessage = getByText('Error al obtener los datos.');
      expect(errorMessage).toBeTruthy();
    });
  });
});