import * as React from 'react';
import { ImageBackground, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { Pin } from './home';

type Props = {
    pin: Pin,
    navigation: NavigationScreenProp<any>
}

class PinnedItem extends React.PureComponent<Props> {
    render() {
        const { pin, navigation } = this.props;
        return (
            <View key={pin.id}>
                <ImageBackground source={{ uri: pin.photo }} style={styles.imageContainer} imageStyle={{ borderRadius: 8 }}>
                    <View style={styles.row}>
                        <View>
                            <View style={styles.alignLeft}>
                                <Text style={styles.cityText}>{`${pin.city}, ${pin.state}`}</Text>
                                <View style={[styles.alignLeft, styles.heartContainer]}>
                                    <Image style={{ tintColor: '#51BCF9', height: 7, width: 7 }} source={require('../../assets/heartIcon.png')} />
                                    <Text style={styles.heartRating}>{pin.rating}</Text>
                                </View>
                            </View>
                            <Text style={styles.name}>{pin.name}</Text>
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate('Preview', { data: pin })}>
                            <Image source={require('../../assets/goIcon.png')} />
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

export default PinnedItem;

const styles = StyleSheet.create({
    imageContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        padding: 10,
        height: 265,
        width: 265,
        marginRight: 15,
        borderRadius: 25,
    },
    cityText: {
        color: '#ACB7B9',
        fontSize: 10,
        paddingRight: 5,
    },
    name: {
        color: 'white',
        fontSize: 18,
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    alignLeft: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    heartContainer: {
        backgroundColor: '#1313AF',
        opacity: 0.8,
        borderRadius: 5,
        padding: 2,
    },
    heartRating: {
        color: '#51BCF9',
        fontSize: 8,
        paddingLeft: 3,
    }
});
