import React from 'react';
import { StyleSheet, Text, View, Animated, ActivityIndicator } from 'react-native';

import { DangerZone } from 'expo';
const { Lottie } = DangerZone;

import { API_KEY } from '../utils/WeatherAPIKey';

import Weather from '../components/Weather';

export default class Previsao extends React.Component {
  
    constructor(props) {
    super(props);
  }
  // Variáveis principais
  state = {
    isLoading: true,
    temperature: 0,
    temp_max: 0,
    temp_min: 0,
    weatherCondition: null,
    description: null,
    humidity: 0,
    feels_like: 0,
    pressure: 0,
    error: null
  };

  
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.fetchWeather(position.coords.latitude, position.coords.longitude);
      },
      error => {
        this.setState({
          error: 'Erro ao carregar as condições do tempo.'
        });
      }
    );
  }

  // adição de &lang=pt_br - para nome de cidade e descrição das cond. climáticas
  fetchWeather(lat, lon) {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric&lang=pt_br`
    )
      .then(res => res.json())
      .then(json => {
        // console.log(json);
        this.setState({
          name: json.name,
          temperature: json.main.temp,
          temp_max: json.main.temp_max,
          temp_min: json.main.temp_min,
          weatherCondition: json.weather[0].main,
          description: json.weather[0].description,
          humidity: json.main.humidity,
          feels_like: json.main.feels_like,
          pressure: json.main.pressure,
          isLoading: false
        });
      });
  }

  render() {
    // inclusão do navigation para paradigma de classe
    const { navigation } = this.props;
    const { 
      isLoading, 
      name,
      weatherCondition, 
      description,
      temperature, 
      temp_max,
      temp_min,
      humidity, 
      feels_like, 
      pressure } = this.state;
    return (
      <View style={styles.container}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Carregando dados...</Text>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={styles.sourceText}>Fonte: OpenWeather</Text>
          </View>
        ) : (
          <Weather 
          name={name}
          description={description}
          weather={weatherCondition} 
          temperature={temperature}
          temp_max={temp_max}
          temp_min={temp_min}
          humidity={humidity}
          feels_like={feels_like}
          pressure={pressure}
            />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFDE4'
  },
  loadingText: {
    fontSize: 28,
    margin:10
  },
  sourceText: {
    fontSize: 12,
    margin: 10
  }
});