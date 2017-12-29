import React, { Component } from 'react';

class WeatherCurrent extends Component {

    render() {
        return (
            <div id="current-data"
                onLoad={(e) => {
                    document.getElementById('save').classList.add('active');
                }}
            >
                <form
                    onSubmit={(e) => {
                        this.saveData(e);
                    }}
                >
                    <h2 ref="cityName">{this.props.city}</h2>
                    <img src={this.props.icon} alt="" />
                    <span id="temperature">{this.props.temperature}&deg;</span>
                    <span id="weather-name">{this.props.weatherName}</span>
                    <span id="weather-description">{this.props.weatherDesc}</span>
                    <a
                        id="details-link"
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById('details').classList.add('active');
                            document.getElementById('details-link').classList.add('active');
                        }}
                    >more</a>
                    <div id="details">
                        <ul>
                            <li>Highest Temperature: {this.props.maxTemp}&deg;</li>
                            <li>Lowest Temperature: {this.props.minTemp}&deg;</li>
                            <li>Humidity: {this.props.humidity}%</li>
                        </ul>
                        <a
                            href="#"
                            onClick={(e) => {
                                document.getElementById('details').classList.remove('active');
                                document.getElementById('details-link').classList.remove('active');
                            }}
                        >Hide</a>
                    </div>
                    <button id="save" type="submit" className="btn save-button">Save</button>
                </form>
            </div>
        );
    }

    saveData(e) {
        e.preventDefault();
        var item = '';
        if (parseInt(this.props.zip, 10)) {
            item = this.props.zip;
        } else {
            item = this.props.city;
        }
        this.props.onSaveData(item);
    }
}

export default WeatherCurrent;
