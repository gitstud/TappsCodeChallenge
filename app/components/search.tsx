import * as React from 'react';
import axios from 'axios';
import { Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { NavigationScreenProp } from 'react-navigation';
import { ApiKey } from '../constants';

type Props = {
    navigation: NavigationScreenProp<any>
}

const Search = ({ navigation: { navigate } }: Props) => {
    return (
        <SafeAreaView style={styles.container}>
            <GooglePlacesAutocomplete
                placeholder='Search'
                minLength={2} // minimum length of text to search
                autoFocus={false}
                returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
                listViewDisplayed='true'    // true/false/undefined
                fetchDetails={true}
                renderDescription={row => row.description} // custom description render
                onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                    const { description, structured_formatting: { main_text, secondary_text } } = data;
                    const { id, name, photos: [photo], rating, geometry, address_components } = details;
                    const city = address_components.find(value => value.types.includes('locality')).long_name;
                    const state = address_components.find(value => value.types.includes('administrative_area_level_1')).long_name;
                    axios.get(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${ApiKey}`).then(({ config: { url } }) => {
                        navigate('Preview', {
                            data: {
                                id,
                                name,
                                city,
                                state,
                                rating,
                                geometry,
                                photo: url,
                                loading: false,
                                main_text,
                                secondary_text,
                                description,
                            }
                        });
                    });
                }}
                getDefaultValue={() => ''}
                query={{
                    // available options: https://developers.google.com/places/web-service/autocomplete
                    key: ApiKey,
                    language: 'en', // language of the results
                    types: 'establishment' // default: 'geocode'
                }}
                styles={{
                    textInputContainer: {
                        width: '100%'
                    },
                    description: {
                        fontWeight: 'bold'
                    },
                }}
                nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                GooglePlacesSearchQuery={{
                    // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                    rankby: 'distance',
                    type: 'cafe'
                }}
                GooglePlacesDetailsQuery={{
                    // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
                    fields: 'formatted_address',
                }}
                filterReverseGeocodingByTypes={['establishment']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                // renderLeftButton={() => <Image source={require('path/custom/left-icon')} />}
                renderRightButton={() => (
                    <TouchableOpacity onPress={() => navigate('Home')} style={styles.cancelContainer}>
                        <Text style={{ color: '#007AFF', fontSize: 17 }}>Cancel</Text>
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    );
}

Search.navigationOptions = {
    header: null,
};

export default Search;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cancelContainer: {
        width: '20%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    }
})