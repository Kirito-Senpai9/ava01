import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

const API_URL = 'http://192.168.1.129:3000';

export default function ListaProdutosScreen({ navigation }) {
  const [produtos, setProdutos] = useState([]);

  const carregar = () => {
    axios
      .get(`${API_URL}/produtos`)
      .then(res => setProdutos(res.data))
      .catch(console.error);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', carregar);
    return unsubscribe;
  }, [navigation]);

  const remover = id => {
    axios
      .delete(`${API_URL}/produtos/${id}`)
      .then(carregar)
      .catch(console.error);
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.nome}>{item.nome}</Text>
      <Text>Qtd: {item.quantidade}</Text>
      <Text>Preço: {item.preco}</Text>
      <View style={styles.botoes}>
        <Button title="Editar" onPress={() => navigation.navigate('EditProduto', { id: item.id })} />
        <Button title="Excluir" onPress={() => remover(item.id)} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={produtos}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
      />
      <Button title="Adicionar Produto" onPress={() => navigation.navigate('AddProduto')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  item: { marginBottom: 16, padding: 8, borderWidth: 1, borderColor: '#ccc' },
  nome: { fontWeight: 'bold' },
  botoes: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }
});
