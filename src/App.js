import React, { Component } from 'react';
import './App.css';
import WeatherSubmit from './WeatherSubmit';
import WeatherSaved from './WeatherSaved';
import WeatherCurrent from './WeatherCurrent';

// API key from https://openweathermap.org/
var OPEN_WEATHER_KEY = '7b174bd94932d1f1ce784662a42e69cb';
var STORAGE_KEY = 'weatherData';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        };
    }

    componentDidMount() {
        var list = localStorage.getItem(STORAGE_KEY);
        var listArray = JSON.parse(list) || [];
        this.setState({
            list: listArray
        });

        if (listArray.length > 0) {
            var url = generateUrl(listArray[0]);
            var element = document.getElementById('error-message');
            var currentData = document.getElementById('current-data');
            fetch(url)
                .then((response) => {
                    return response.json();
                })
                .then((json) => {
                    element.classList.remove('active');
                    currentData.classList.add('active');
                    var name = json.name;
                    var temperature = Math.round(json.main.temp);
                    var maxTemp = json.main.temp_max;
                    var minTemp = json.main.temp_min;
                    var humidity = json.main.humidity;
                    var weather = json.weather[0];
                    var weatherName = weather.main;
                    var weatherDesc = weather.description;
                    var icon = weather.icon;
                    var iconLink = 'http://openweathermap.org/img/w/' + icon + '.png';
                    this.setState({
                        weatherName: weatherName,
                        weatherDesc: weatherDesc,
                        icon: iconLink,
                        city: name,
                        temperature: temperature,
                        minTemp: minTemp,
                        maxTemp: maxTemp,
                        humidity: humidity
                    });
                })
                .catch((error) => {
                    currentData.classList.remove('active');
                    element.classList.add('active');
                });
        }
    }

    render() {
        return (
            <div className="App">
                <div className="container">
                    <h1>React Weather</h1>
                    <hr id="heading-separator" />
                    <div className="row">
                        <div className="col-sm-6">
                            <WeatherSubmit
                                onFormSubmit={(item) => {
                                    this.fetchWeather(item);
                                }}
                            />
                            <WeatherCurrent
                                zip = {this.state.zip}
                                weatherName = {this.state.weatherName}
                                weatherDesc = {this.state.weatherDesc}
                                icon = {this.state.icon}
                                city = {this.state.city}
                                temperature = {this.state.temperature}
                                minTemp = {this.state.minTemp}
                                maxTemp = {this.state.maxTemp}
                                humidity = {this.state.humidity}
                                onSaveData={(data) => {
                                    this.handleFormSubmit(data);
                                }}
                            />
                        </div>
                        <div className="col-sm-6">
                            <WeatherSaved
                                list={this.state.list}
                                weatherName = {this.state.weatherName}
                                weatherDesc = {this.state.weatherDesc}
                                icon = {this.state.icon}
                                city = {this.state.city}
                                temperature = {this.state.temperature}
                                url = {this.state.url}
                                onItemRemoved={(item) => {
                                    this.handleItemRemoved(item);
                                }}
                                onItemChange={(item) => {
                                    this.fetchWeather(item);
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    handleItemRemoved(itemToRemove) {
        var existingList = this.state.list;

        var newList = existingList.filter((item) => {
            return item !== itemToRemove;
        });

        this.setState({
            list: newList
        });

        localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
    }

    handleFormSubmit(itemToAdd) {
        var existingList = this.state.list;
        var newList = existingList.concat([ itemToAdd ]);
        this.setState({
            list: newList
        });

        localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));

    }

    fetchWeather(query) {
        var url = generateUrl(query);

        var element = document.getElementById('error-message');
        var currentData = document.getElementById('current-data');

        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                element.classList.remove('active');
                currentData.classList.add('active');

                var name = json.name;
                var temperature = Math.round(json.main.temp);
                var maxTemp = json.main.temp_max;
                var minTemp = json.main.temp_min;
                var humidity = json.main.humidity;

                var weather = json.weather[0];
                var weatherName = weather.main;
                var weatherDesc = weather.description;
                var icon = weather.icon;

                var iconLink = 'http://openweathermap.org/img/w/' + icon + '.png';

                this.setState({
                    zip: query,
                    weatherName: weatherName,
                    weatherDesc: weatherDesc,
                    icon: iconLink,
                    city: name,
                    temperature: temperature,
                    minTemp: minTemp,
                    maxTemp: maxTemp,
                    humidity: humidity
                });
            })
            .catch((error) => {
                currentData.classList.remove('active');
                element.classList.add('active');
            });
    }
}

function generateUrl(search) {
    var url = '';
    if (parseInt(search, 10)) {
        url = 'https://api.openweathermap.org/data/2.5/weather?zip=' + search + '&units=imperial&appid=' + OPEN_WEATHER_KEY;
    } else {
        url = 'https://api.openweathermap.org/data/2.5/weather?q=' + search + '&units=imperial&appid=' + OPEN_WEATHER_KEY;
    }
    return url;
}

export default App;
