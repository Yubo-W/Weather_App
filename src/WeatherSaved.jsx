import React, { Component } from 'react';

class WeatherSaved extends Component {
    render() {
        var arrayIsNotEmpty = this.props.list.length > 0;
        return (
            <div>
                {arrayIsNotEmpty ? (
                    <div>
                        <hr id="small-screen" />
                        <h3>My Locations</h3>
                        <ul className="list-group">
                            {this.props.list.map((item, index) => {
                                return (
                                    <li className="list-group-item" key={index}>
                                        <a
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                document.getElementById('details').classList.remove('active');
                                                document.getElementById('details-link').classList.remove('active');
                                                this.handleItemChange(item);
                                            }}
                                        >{item}</a>
                                        <a
                                            className="remove-item"
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                this.handleItemRemoved(item);
                                            }}
                                        >Remove</a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ) : (
                    <div>
                        {/* empty list */}
                    </div>
                )}
            </div>
        );
    }

    handleItemRemoved(item) {
        this.props.onItemRemoved(item);
    }

    handleItemChange(item) {
        this.props.onItemChange(item);
    }
}

export default WeatherSaved;
