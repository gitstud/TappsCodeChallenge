import * as React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import MapView, { Marker } from 'react-native-maps';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { pinLocation } from '../actions/pins';


type Props = {
    navigation: NavigationScreenProp<any>
    pins: {},
    _pinLocation: ({}) => void
}

type State = {
    loading: boolean,
    id: string,
    name: string,
    description: string,
    rating: string,
    geometry: {
        viewport: {
            northeast: {
                lat: number,
                lng: number,
            }
        }
    },
    city: string,
    state: string,
    photo: string,
    main_text: string,
    secondary_text: string,
}

class PreviewScreen extends React.Component<Props, State> {
    static navigationOptions = {
        header: null,
    }

    state = {
        loading: true,
        id: '',
        name: '',
        description: '',
        rating: '',
        geometry: {
            viewport: {
                northeast: {
                    lat: 0,
                    lng: 0,
                }
            }
        },
        city: '',
        state: '',
        photo: '',
        main_text: '',
        secondary_text: '',
    }

    componentDidMount() {
        const { navigation } = this.props;
        const data = navigation.getParam('data', {});
        this.setState({ ...data, loading: false });
    }

    render() {
        const { id, description, name, rating, geometry, city, state, photo, loading, main_text, secondary_text } = this.state;
        const { _pinLocation, pins, navigation } = this.props;
        if (loading) {
            return null;
        }
        const coords = {
            latitude: geometry.viewport.northeast.lat,
            longitude: geometry.viewport.northeast.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        };
        return (
            <SafeAreaView style={styles.container}>
                <ImageBackground source={{ uri: photo }} style={styles.imageContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={require('../../assets/goIcon.png')} style={{ transform: [{ rotate: '180deg' }]}} />
                    </TouchableOpacity>
                    <View style={styles.ratingRow}>
                        <View>
                            <Text style={styles.cityText}>{`${city}, ${state}`}</Text>
                            <Text style={styles.name}>{name}</Text>
                        </View>
                        <View style={styles.heartContainer}>
                            <Image source={require('../../assets/heartIcon.png')} />
                            <Text style={styles.rating}>{rating}</Text>
                        </View>
                    </View>
                </ImageBackground>
                <View style={styles.detailsContainer}>
                    <View style={styles.divider} />
                    <View style={styles.buttonBox}>
                        <TouchableOpacity style={[styles.button, !!pins[id] && { backgroundColor: 'lime' }]} onPress={() => {
                            _pinLocation({
                                id,
                                description,
                                name,
                                rating,
                                geometry,
                                city,
                                state,
                                photo,
                                main_text,
                                secondary_text
                            })
                        }}
                    >
                            {!!pins[id] ? (
                                <View style={styles.tripPinnedText}>
                                    <Image source={require('../../assets/checkmarkIcon.png')} />
                                    <Text style={{ paddingLeft: 5, fontWeight: '600' }}>Pinned to Trip</Text>
                                </View>
                            ) : (
                                <Text style={styles.buttonText}>Pin to Trip</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                    <View style={styles.addressBox}>
                        <View style={styles.addressIconContainer}>
                            <Image source={require('../../assets/townPinIcon.png')} />
                            <Text style={styles.addressName}>
                                {main_text}
                            </Text>
                        </View>
                        <Text style={styles.addressFormatted}>
                            {secondary_text}
                    </Text>
                    </View>
                    <View style={styles.mapBox}>
                        <MapView
                            style={styles.mapBox}
                            region={coords}
                        >
                            <Marker
                                title={name}
                                description={description}
                                coordinate={coords}
                            />
                        </MapView>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = ({ pins }) => ({
    pins,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    _pinLocation: pinLocation,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PreviewScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageContainer: {
        flex: 6,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        padding: 20,
        paddingBottom: 30,
    },
    detailsContainer: {
        flex: 4,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 20,
    },
    divider: {
        position: 'absolute',
        top: -13,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        height: 30
    },
    ratingRow: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },
    cityText: {
        color: 'white',
        fontSize: 13,
    },
    name: {
        color: 'white',
        fontSize: 24,
    },
    rating: {
        color: '#1313AF',
        fontSize: 13,
        paddingLeft: 4,
        fontWeight: '600'
    },
    buttonBox: {
        flex: 1,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    button: {
        width: '90%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'blue',
        paddingVertical: 15,
        borderRadius: 25,
    },
    buttonText: {
        color: 'white',
        fontSize: 15,
    },
    addressBox: {
        flex: 1,
        width: '100%',
    },
    mapBox: {
        width: '100%',
        flex: 3,
        backgroundColor: 'lime',
    },
    heartContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: 5,
        borderRadius: 15,
        width: 57,
    },
    tripPinnedText: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center', 
    },
    addressIconContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start', 
    },
    addressName: {
        fontSize: 10,
        color: '#030303',
        fontWeight: '700',
        paddingLeft: 5,
    },
    addressFormatted: {
        fontSize: 10,
        color: '#030303',     
    },
});