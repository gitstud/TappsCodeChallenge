import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import axios from 'axios';
import { ApiKey, WeatherAPIKey } from '../constants';

export const PIN_LOCATION = 'pins/PIN_LOCATION';
export const UNPIN_LOCATION = 'pins/UNPIN_LOCATION';
export const GET_WEATHER = 'pins/GET_WEATHER';

export const pinLocation = (pin) => (dispatch, getState) => {
    const { pins } = getState();
    const payload = { ...pins, [pin.id]: pins[pin.id] ? null : pin };
    dispatch({ type: pins[pin.id] ? PIN_LOCATION : UNPIN_LOCATION, payload });
}

export const getLocation = async ({ dispatch }) => {
    // Check for device location permissions
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
        console.log('NO LOCATION');
    } else {
        // Get device coordinates
        const { coords } = await Location.getCurrentPositionAsync({});
        // Get google places results for coordinates
        const { data: { results } } = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.latitude},${coords.longitude}&key=${ApiKey}`);
        // Grab city and state from Google Place Search results
        const { place_id } = results[0];
        const city = results[0].address_components.find(value => value.types.includes('locality' || 'political')).long_name;
        const state = results[0].address_components.find(value => value.types.includes('administrative_area_level_1')).long_name;
        // Get weather data from coordinates
        const { data: { main, weather} } = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&APPID=${WeatherAPIKey}`);
        const temperature = ((main.temp - 273.15) * 9 / 5 + 32).toFixed(2);
        const weatherType = weather[0].description;
        // Get photo from google places api
        const { data: { result: { photos: [photoData] } } } = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${place_id}&fields=photo&key=${ApiKey}`);
        const { config: { url: photo } } = await axios.get(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoData.photo_reference}&key=${ApiKey}`);
        const backgroundImage = 'https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';
        dispatch({
            type: GET_WEATHER,
            payload: {
                temperature,
                weatherType,
                city,
                state,
                backgroundImage: photo || backgroundImage
            }
        });
    }
}