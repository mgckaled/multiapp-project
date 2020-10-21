import React from 'react';
import { StyleSheet, Text, View, Alert, Button, TouchableOpacity, TextInput, StatusBar, ImageBackground } from 'react-native';

export default class Temperatura extends React.Component {
  constructor(props) {
    super(props);
    this.state = { temp: '', tempc: '', tempk: '', tempf: '', info: 'Informações' };
    this.calculac = this.calculac.bind(this);
    this.calculak = this.calculak.bind(this);
    this.calculaf = this.calculaf.bind(this);
  }
  
  calculac() {
    let conversao = this.state
    conversao.tempc = conversao.temp;
    conversao.tempk = conversao.tempc - 0 + 273.15;
    conversao.tempf = ((conversao.tempc * 9/5) + 32).toFixed(2) 
    

    if (conversao.tempc < 35.5) {
      conversao.info = conversao.tempf +' ºF\r\n' + conversao.tempc + ' ºC\r\n' + conversao.tempk + ' K' 
    } else if (conversao.tempc >= 37.1 && conversao.tempc <= 37.5) {
      conversao.info = conversao.tempf +' ºF\r\n' + conversao.tempc + ' ºC\r\n' + conversao.tempk + ' K' 
      }else if (conversao.tempc >= 36 && conversao.tempc <= 37) {
        conversao.info = conversao.tempf +' ºF\r\n' + conversao.tempc + ' ºC\r\n' + conversao.tempk + ' K' 
      }else if (conversao.tempc >= 37.8 && conversao.tempc < 38) {
        conversao.info = conversao.tempf +' ºF\r\n' + conversao.tempc + ' ºC\r\n' + conversao.tempk + ' K'
      }else if (conversao.tempc >= 38) {
        conversao.info = conversao.tempf +' ºF\r\n' + conversao.tempc + ' ºC\r\n' + conversao.tempk + ' K'
      }
      this.setState(conversao);
  }
  calculak() {
    let conversao = this.state
    conversao.tempk = conversao.temp
    conversao.tempc = (conversao.tempk - 273.15).toFixed(2)
    conversao.tempf = ((conversao.tempk - 273.15) * 9/5 + 32).toFixed(2) 

    if (conversao.tempc < 35.5) {
      conversao.info = conversao.tempf +' ºF\r\n' + conversao.tempc + ' ºC\r\n' + conversao.tempk + ' K' 
    } else if (conversao.tempc >= 37.1 && conversao.tempc <= 37.5) {
      conversao.info = conversao.tempf +' ºF\r\n' + conversao.tempc + ' ºC\r\n' + conversao.tempk + ' K' 
      }else if (conversao.tempc >= 36 && conversao.tempc <= 37) {
        conversao.info = conversao.tempf +' ºF\r\n' + conversao.tempc + ' ºC\r\n' + conversao.tempk + ' K' 
      }else if (conversao.tempc >= 37.8 && conversao.tempc < 38) {
        conversao.info = conversao.tempf +' ºF\r\n' + conversao.tempc + ' ºC\r\n' + conversao.tempk + ' K'
      }else if (conversao.tempc >= 38) {
        conversao.info = conversao.tempf +' ºF\r\n' + conversao.tempc + ' ºC\r\n' + conversao.tempk + ' K'
      }
      this.setState(conversao);
  }
  calculaf() {
    let conversao = this.state
    conversao.tempf = conversao.temp
    conversao.tempc = ((conversao.tempf - 32) * 5/9).toFixed(2)
    conversao.tempk = ((conversao.tempf - 32) * 5/9 + 273.15).toFixed(2) 

    if (conversao.tempc < 35.5) {
      conversao.info = conversao.tempf +' ºF\r\n' + conversao.tempc + ' ºC\r\n' + conversao.tempk + ' K' 
    } else if (conversao.tempc >= 37.1 && conversao.tempc <= 37.5) {
      conversao.info = conversao.tempf +' ºF\r\n' + conversao.tempc + ' ºC\r\n' + conversao.tempk + ' K' 
      }else if (conversao.tempc >= 36 && conversao.tempc <= 37) {
        conversao.info = conversao.tempf +' ºF\r\n' + conversao.tempc + ' ºC\r\n' + conversao.tempk + ' K' 
      }else if (conversao.tempc >= 37.8 && conversao.tempc < 38) {
        conversao.info = conversao.tempf +' ºF\r\n' + conversao.tempc + ' ºC\r\n' + conversao.tempk + ' K'
      }else if (conversao.tempc >= 38) {
        conversao.info = conversao.tempf +' ºF\r\n' + conversao.tempc + ' ºC\r\n' + conversao.tempk + ' K'
      }
      this.setState(conversao);
  }
  clear = () => {
    this.setState({
      temp: '',
      tempc: '',
      tempk: '',
      tempf: '',
      info: 'Informações'
    });
  };
  render() {
    return (
      <View style={styles.container}>
      <Separador />
        <StatusBar style= "auto"/>
        <Text style={styles.title}
        >Digite a temperatura a ser convertida</Text>
        <TextInput
        style={styles.textInput}
        onChangeText={(temp) => this.setState({ temp })}
        value={this.state.temp}
        placeholder="Exemplo: 37.5"
        placeholderTextColor= "white"
        keyboardType='phone-pad'
        />
      
        <Text style= {styles.text}>Escolha o tipo de Temperatura</Text>

        <TouchableOpacity
          style={[styles.button]}
          onPress = {this.calculac}
          > 
          <Text style={styles.text2}>Celsius</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button]}
          onPress = {this.calculak}
          >
          <Text style={styles.text2}>Kelvin</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button]}
          onPress = {this.calculaf}
          >
          <Text style={styles.text2}>Fahrenheit</Text>
        </TouchableOpacity>
        <Separador />
        
        <Text style={[styles.info]}>{this.state.info}</Text>
        <Separador />
        
        <TouchableOpacity
          style={styles.button2}
          onPress={this.clear}
        >
        <Text style={styles.text2}>Limpar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const Separador = () => <View style={styles.separador} />;
const styles = StyleSheet.create ({
  container : {
    flex: 1,
    backgroundColor: '#444',
    alignContent: 'center',
  },  
  button: {
    backgroundColor: '#f50',
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  button2: {
    backgroundColor: 'grey',
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  textInput: {
    height:60,
    borderWidth: 4,
    paddingHorizontal:10,
    borderRadius:10,
    color: '#fff',
    fontWeight:'bold',
    fontSize: 25,
    borderColor: 'white',
    margin: 10,
    textAlign: 'center',
    
  },
  text: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    justifyContent: 'center',
    fontWeight: 'bold'
  },
  info: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    borderWidth: 4,
    borderColor: 'white',
    borderRadius:10,
    padding: 5,
    margin: 10,
  },
  title: {
    fontSize: 20,
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    margin:10,
  },
  text2: {
    fontSize: 20,
    color: 'white',
    justifyContent: 'center',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  separador: {
    padding:10,
  },
});