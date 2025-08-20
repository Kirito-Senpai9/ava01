import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const API_URL = 'http://localhost:3000';

export default function EditProdutoScreen({ route, navigation }) {
  const { id } = route.params;
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [preco, setPreco] = useState('');

  useEffect(() => {
    axios.get(`${API_URL}/produtos/${id}`).then(res => {
      setNome(res.data.nome);
      setQuantidade(String(res.data.quantidade));
      setPreco(String(res.data.preco));
    });
  }, [id]);

  const salvar = () => {
    axios.put(`${API_URL}/produtos/${id}`, {
      nome,
      quantidade: Number(quantidade),
      preco: Number(preco)
    }).then(() => navigation.goBack());
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />
      <TextInput
        placeholder="Quantidade"
        value={quantidade}
        onChangeText={setQuantidade}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Preço"
        value={preco}
        onChangeText={setPreco}
        style={styles.input}
        keyboardType="numeric"
      />
      <Button title="Salvar" onPress={salvar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: { borderWidth: 1, marginBottom: 12, padding: 8 }
});
