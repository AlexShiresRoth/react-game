import React from 'react';
import PropTypes from 'prop-types';
import LevelOne from './pages/levelOne';
import { Provider } from 'react-redux';
import store from './store';
import './style/main.css';
const App = () => {
	return (
		<Provider store={store}>
			<LevelOne />
		</Provider>
	);
};

App.propTypes = {};

export default App;
