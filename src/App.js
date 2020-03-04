import React, { Component } from "react";
import "./libs";
import "antd/dist/antd.css";
import "./css.css"; 

import { Provider } from "react-redux";
import store from "./reducers/store";

// import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Header from "./components/Header/Header.js";
import Body from "./components/Body/Body.js";


// const Overflow = props => {
// 	const Body = props.children;
// 	return (
// 		<BrowserRouter>
// 			<Provider store={store}> {<Body />} </Provider>
// 		</BrowserRouter>
// 	);
// };

const App = () => {
	return (
		<Provider store={store}>
			<div className="app-wrapper">
				<Header />
				<Body />
			</div>
		</Provider>

	);
};


export default App;
