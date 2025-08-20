import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ListaProdutosScreen from './screens/ListaProdutosScreen';
import AddProdutoScreen from './screens/AddProdutoScreen';
import EditProdutoScreen from './screens/EditProdutoScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="ListaProdutos" component={ListaProdutosScreen} options={{ title: 'Produtos' }} />
        <Stack.Screen name="AddProduto" component={AddProdutoScreen} options={{ title: 'Adicionar Produto' }} />
        <Stack.Screen name="EditProduto" component={EditProdutoScreen} options={{ title: 'Editar Produto' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
