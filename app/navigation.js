import * as React from 'react';
import { createStackNavigator } from 'react-navigation';
import Home from './components/home';
import Search from './components/search';
import Preview from './components/preview';

export default createStackNavigator({
    Home,
    Search,
    Preview
});