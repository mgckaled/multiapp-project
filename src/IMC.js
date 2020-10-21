import React from 'react';
import {Alert, Button, ImageBackground, TextInput, Text, View, StyleSheet, TouchableOpacity, StatusBar} from 'react-native';

export default class IMC extends React.Component {

  constructor(props){
    super(props)
    
    this.state = {peso: '', altura:'', info: '-', resultado: 0.0}
    this. calculaIMC = this.calculaIMC.bind(this)
  }


  calculaIMC(){
    
    let imc = this.state.peso / (this.state.altura * this.state.altura)
    let s = this.state
    s.resultado = imc
    if(s.resultado < 18.5){
      s.info = '\nMenor que 18.5\nseu quadro é de:\nMagreza'
    } else if (s.resultado < 24.9){
      s.info = ' \nEntre 18.5 e 24.9\nseu quadro é Normal'
    } else if (s.resultado < 29.9){
      s.info = ' \nEntre 25.0 e 29.9\nvocê está com:\nSobrepeso'
    }else if (s.resultado <39.9){
      s.info = ' \nEntre 30.0 e 39.9 \nvocê está com: \nObesidade, tome cuidado'
    }else if (s.resultado > 40){
      s.info = ' \nMaior que 40.0\nvocê está com:\nObesidade grave'
    }
    this.setState(s)
  
  }

  clear = () => {
    this.setState({
      peso: '',
      altura: '',
      resultado: 0.0,
      info: '-'
    })
  }


  render(){
      return (
        <View style={styles.Container}>
        <StatusBar style= "auto"/>
        
          <Separator />

          <Text style={styles.text}>Altura (m)</Text>
          <TextInput
            style={styles.textInput}
            keyboardType='phone-pad'
            onChangeText= {altura => this.setState({altura})}
            value = {this.state.altura}
            placeholder='Exemplo: 1.75'
            placeholderTextColor= "white"
          />

          <Text style={styles.text} >Peso (kg)</Text>
          <TextInput
            style={styles.textInput}
            keyboardType='phone-pad'
            onChangeText ={peso => this.setState({peso})}
            value = {this.state.peso}
            placeholder='Exemplo: 68.8'
            placeholderTextColor= "white"
          />
          
          <TouchableOpacity
          style={styles.button1}
          onPress={this.calculaIMC}
          >
            <Text style={styles.text2}>Calcular</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
          style={styles.button2}
          onPress={this.clear}
          >
            <Text style={styles.text2}>Limpar</Text>
          </TouchableOpacity>
          <View style={styles.resultado}>
          <Text style={styles.input}>
            Seu IMC é: {this.state.resultado.toFixed(2)}
            {this.state.info}
          </Text>
          </View>
    </View>
    );
  }
}

const Separator = () => (
  <View style={styles.separator}/>
);

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#444',    
  },
  button1: {
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

  input: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 5,
    fontSize: 20,
    color:'white',
    fontWeight:'bold',
    margin: 5,
  },

  resultado:{
    flex:1,
    borderColor:'white',
    borderWidth:4,
    borderRadius:10,
    margin:10,
  },

  separator: {
    padding:10,
  },

  text: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    marginHorizontal:10,
  },

  textInput: {
    height: 50,
    borderWidth: 4,
    borderColor: 'white',
    color: 'white',
    margin: 10,
    borderRadius: 10,
    fontWeight:'bold',
    fontSize:20,
    textAlign: 'center',
  },

  text2: {
    fontSize: 20,
    color: 'white',
    justifyContent: 'center',
    textAlign: 'center',
    fontWeight: 'bold'
  },
});