import * as React from 'react';
import axios from 'axios';
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity, ScrollView, ImageBackground, Image } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import PinnedItem from './pinnedItem';

export type Pin = {
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

type Weather = {
    city: string,
    state: string,
    temperature: number,
    weatherType: string,
    backgroundImage: string,
}

type Props = {
    navigation: NavigationScreenProp<any>
    pins: Pin[]
    weather: Weather
}

class HomeScreen extends React.Component<Props, {}> {
    static navigationOptions = {
        header: null,
    }
    render() {
        const { navigation, navigation: { navigate }, pins = [], weather } = this.props;
        return (
            <SafeAreaView style={styles.container}>
                <ImageBackground source={{ uri: weather.backgroundImage }} style={styles.container}>
                    <View style={styles.row}>
                        <View style={styles.column}>
                            <Text style={styles.header}>Good morning</Text>
                            <Text style={styles.subHeader}>{`Today is ${weather.temperature}° and ${weather.weatherType}`}</Text>
                        </View>
                        <TouchableOpacity onPress={() => navigate('Search')} style={styles.button}>
                            <Image source={require('../../assets/addBookmarkButton.png')} />
                        </TouchableOpacity>
                    </View>
                    {pins.length ? (
                        <View style={styles.content}>
                            <ScrollView horizontal style={{ width: '100%' }}>
                                {pins.map(pin => (
                                    <PinnedItem key={pin.id} pin={pin} navigation={navigation} />
                                ))}
                            </ScrollView>
                        </View>
                    ) : (
                            <View style={styles.content}>
                                <Text style={styles.emptyText1}>This trip is empty</Text>
                                <Text style={styles.emptyText2}>Click the blue plus to pin a place</Text>
                            </View>
                        )}
                    <View>
                        <Text style={styles.title}>
                            Exploring
                    </Text>
                        <Text style={styles.subTitle}>
                            {`${weather.city}, ${weather.state}`}
                        </Text>
                    </View>
                </ImageBackground>
            </SafeAreaView>
        );
    }
};

const mapStateToProps = ({ pins, weather }) => ({
    pins: Object.values(pins).filter(v => v),
    weather,
});

export default connect(mapStateToProps)(HomeScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        padding: 20,
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    center: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    row: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    column: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    header: {
        fontSize: 32,
        fontWeight: '300',
        color: 'black',
    },
    subHeader: {
        fontSize: 13,
        color: 'black',
    },
    content: {
        flex: 5,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor: 'blue',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyText1: {
        fontSize: 18,
        color: '#808080',
        paddingBottom: 7,
    },
    emptyText2: {
        fontSize: 13,
        color: '#ACB7B9'
    },
    title: {
        fontSize: 23,
        color: 'white',
    },
    subTitle: {
        fontSize: 16,
        color: 'white',
    },
});