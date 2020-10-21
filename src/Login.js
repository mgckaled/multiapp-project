import React from 'react';
import { 
  Alert, Text, View, TextInput, StyleSheet, Button, ActivityIndicator, TouchableOpacity, StatusBar
} from 'react-native';

import firebase from '@firebase/app';
import '@firebase/auth';

import Home from './Home';

export default class LoginPage extends  React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isLoading: false,
      message: ''
    }
  }


  componentDidMount() {
    const firebaseConfig = {
      apiKey: "AIzaSyD4rKgrC9bHGpGqvTQPvWvFLhuxzErlFtE",
      authDomain: "teste-2c78c.firebaseapp.com",
      databaseURL: "https://teste-2c78c.firebaseio.com",
      projectId: "teste-2c78c",
      storageBucket: "teste-2c78c.appspot.com",
      messagingSenderId: "855236792555",
      appId: "1:855236792555:web:13768e873fabf969adaeae"
    };
  try {
    firebase.initializeApp(firebaseConfig)
  } catch (err) {
    if (!/already exists/.test(err.message)) {
      console.error("erro")
      }
    }    
  }
  renderButton() {
    if (this.state.isLoading)
      return <ActivityIndicator size='large' color= 'black'/>;
    return (
      <TouchableOpacity
      style={styles.botao}
      onPress={() => this.login()} >
      <Text style={styles.textobotao}>ENTRAR</Text>
      </TouchableOpacity>
    );
  }

  renderMessage() {
    const { message } = this.state;
    if (!message)
      return null;
    return (
      <View>
        <Text>
        {message}
        </Text>
      </View>
    );
  }

  mudaTextInput(campo, valor) {
    this.setState({[campo]: valor});
  }


  login() {
    this.setState({ isLoading: true });
    const {email, password} = this.state;

    const loginSucesso = user => {
      this.props.navigation.navigate('Home');
    }

    firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(loginSucesso)
    .catch(error => {
      if (error.code == 'auth/user-not-found') {
        Alert.alert(
          'Usuário não encontrado',
          'Criar novo usuário?',
          [{
            text: 'Não',
          }, {
            text: 'Sim',
            onPress: () => {
              firebase.auth()
                .createUserWithEmailAndPassword(email, password)
                .then(loginSucesso)
                .catch(error => {
                  this.setState({
                    message: this.erroLoginMessage(error.code)
                  })
                })
            }
          }],
          { cancelable: false}
        )
      } else {
        Alert.alert(
          'Erro na auntenticação',
          this.erroLoginMessage(error.code)
        )
      }
    })
    .then(() => this.setState({ isLoading: false}));
  }

  erroLoginMessage(errorCode) {
    switch (errorCode) {
      case 'auth/wrong-password':
        return 'Senha incorreta'
      case 'auth/user-not-found':
        return 'Usuário não encontrado'
      case 'auth/invalid-email':
        return 'E-mail incorreto'
      default :
        return 'Erro não documentado, contate o suporte ao usuário.'
    }
  }

  render() {
    return (
      <View style={styles.container}>
      <StatusBar style= "auto"/>
        <TextInput style={styles.textInput} 
          placeholder="email@email.com"
          placeholderTextColor= "#ccc"
          value={this.state.email}
          onChangeText={value => this.mudaTextInput('email', value)}
        />
        <TextInput style={styles.textInput} 
          placeholder="senha" secureTextEntry
          placeholderTextColor= "#ccc"
          value={this.state.password}
          onChangeText={value => this.mudaTextInput('password', value)}
        />
        { this.renderButton() }
        { this.renderMessage() }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#444',

  },
  textInput: {
    width: 310,
    height: 50,
    padding: 5,
    fontWeight: 'bold',
    backgroundColor: 'black',
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 5,
    borderColor:'#f50',
    borderWidth:4,
    fontSize:20,
    color:'white',
  },

  botao: {
    width: 150,
    height: 50,
    marginTop: 10,
    backgroundColor: '#f50',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent:'center',
  },

  textobotao: {
    fontWeight: 'bold',
    color: 'white',
    fontSize:25,    
  },
});