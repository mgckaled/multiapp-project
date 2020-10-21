import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { weatherConditions } from '../utils/WeatherConditions';

const Weather = ({ 
weather,
name, 
temperature, 
description,
humidity, 
feels_like, 
pressure,
temp_min,
temp_max }) => {
  if (weather != null) {
    return (
      <View
        style={[
          styles.weatherContainer,
          { backgroundColor: weatherConditions[weather].color }
        ]}
      >
        <View style={styles.headerContainer}>
          <MaterialCommunityIcons
            size={72}
            name={weatherConditions[weather].icon}
            color={'#fff'}
          />
          <Text style={styles.tempText}>{temperature}˚</Text>
        </View >
        <View style={styles.cityContainer}>
          <Text style={styles.title}>{name}</Text>
        </View>
        <View style={styles.bodyContainer}>
          <Text style={styles.title}>{weatherConditions[weather].title}</Text>
          <Text style={styles.subtitle}>{description}</Text>
          <Text style={styles.minitext}>Sensação térmica: {feels_like}°</Text>
          <Text style={styles.minitext}>Humidade: {humidity}%</Text>
          <Text style={styles.sourceText}>Fonte: OpenWeather</Text>
        </View>
      </View>
    );
  } else {
    return (
      <View>
        <Text>Algo de errado não está certo...</Text>
      </View>
    )
  }
};

Weather.propTypes = {
  temperature: PropTypes.number.isRequired,
  temp_max: PropTypes.number.isRequired,
  temp_min: PropTypes.number.isRequired,
  name: PropTypes.string,
  weather: PropTypes.string,
  description: PropTypes.string,
  humidity: PropTypes.number.isRequired,
  feels_like: PropTypes.number.isRequired,
  pressure: PropTypes.number.isRequired,

};

const styles = StyleSheet.create({
  weatherContainer: {
    flex: 1
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  tempText: {
    fontSize: 72,
    color: '#fff'
  },
  cityContainer: {
    flex: 1,
    //flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  bodyContainer: {
    flex: 2,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingLeft: 25,
    marginBottom: 20
  },
  title: {
    fontSize: 50,
    color: '#fff'
  },
  subtitle: {
    fontSize: 24,
    color: '#fff'
  },
  minitext: {
    fontSize: 16,
    color: '#fff'
  },
  sourceText: {
    fontSize: 12,
    paddingVertical:10,
    marginVertical: 10,
    color: '#fff',
    textAlign: 'right',
    fontFamily: 'Roboto'
    
  }
});

export default Weather;