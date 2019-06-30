import {
    PIN_LOCATION,
    UNPIN_LOCATION,
    GET_WEATHER
} from '../actions/pins';

const initialState = {
    pins: {},
    weather: {
        backgroundImage: 'https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        temperature: 77,
        city: 'San Francisco',
        state: 'California',
        weatherType: 'Sunny',
    },
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_WEATHER:
            return {
                ...state,
                weather: { ...action.payload },
            }
        case PIN_LOCATION:
            return {
                ...state,
                pins: { ...action.payload },
            };

        case UNPIN_LOCATION:
            return {
                ...state,
                pins: { ...action.payload }
            }
        default:
            return state;
    }
}
