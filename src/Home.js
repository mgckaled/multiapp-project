import React from 'react';
import {TouchableOpacity, StyleSheet, View, Text, Button, StatusBar} from 'react-native';

export default function Home({ navigation }) {
  return(
	<View style={styles.container}>
		<StatusBar style= "auto"/>
    <TouchableOpacity
      style={styles.title}
      onPress={() => navigation.navigate('Calc')}
    >
      <Text style={styles.texto}>Calculadora</Text> 
    </TouchableOpacity>

		<TouchableOpacity
      style={styles.title}
      onPress={() => navigation.navigate('IMC')}
    >
      <Text style={styles.texto}>Calcule seu IMC</Text> 
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.title}
    	onPress={() => navigation.navigate('Previsao')}
  	>
      <Text style={styles.texto}>Previsao do tempo</Text> 
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.title}
    	onPress={() => navigation.navigate('Temperatura')}
  	>
      <Text style={styles.texto}>Temperatura</Text> 
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.title}
    	onPress={() => navigation.navigate('Tarefas')}
  	>
      <Text style={styles.texto}>Tarefas</Text> 
    </TouchableOpacity>
	</View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#444"
  },
  title: {
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#f50',
    height: 50,
    borderColor: '#f50',
    borderWidth: 1,
    borderRadius:10,
    marginTop:10,
  },
  texto: {
    color: 'white',
    fontSize:20,
    fontWeight:'bold',
  },
});