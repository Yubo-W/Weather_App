import React, { Component } from 'react';

class WeatherSubmit extends Component {
    render() {
        return (
            <form
                onSubmit={(e) => {
                    document.getElementById('details').classList.remove('active');
                    document.getElementById('details-link').classList.remove('active');
                    this.handleFormSubmit(e);
                }}
            >
                <h3>Search:</h3>
                <input
                    className="form-control"
                    type="text"
                    id="input-box"
                    ref="inputBox"
                    placeholder="City name or ZIP code..."
                />
                <button id="submit-button" type="submit" className="btn btn-primary search">Search</button>
                <div id="error-message" className="alert alert-danger" role="alert">
                    Invalid location.
                </div>
            </form>
        );
    }

    handleFormSubmit(e) {
        e.preventDefault();
        var input = document.getElementById('input-box');
        input.placeholder = "City name or ZIP code...";
        var item = this.refs.inputBox.value;
        input.value = "";
        this.props.onFormSubmit(item);
    }
}

export default WeatherSubmit;
