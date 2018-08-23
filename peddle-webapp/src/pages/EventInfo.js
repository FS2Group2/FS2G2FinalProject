import React, { Component } from 'react';
import '../styles/EventInfos.css';

class EventInfo extends Component {
    render() {
        return (
            <div className="Event-bg">
                <div className="Event-header">
                    <div className="Event-info-ph">
                    <img className="Event-info-photo" src="images/ces19.jpg"/>
                        </div>
                    <div className="Event-info">
                        <div><p className="Event-info-name">CES International</p></div>
                        <div> <p className="Event-info-location">Las Vegas,NV,USA</p></div>
                        <div><p className="Event-info-company">@CESInternational</p></div>
                    </div>
                    <div className="Event-info-date">
                        <p>8-11.01.19</p>
                    </div>
                    <div className="Event-info-rating">
                        <img className="Event-info-rating-photo"
                             src="images/stock-vector--star-rating-icon-vector-illustration-eps-isolated-badge-for-website-or-app-stock-infographics-519705664.jpg"/>
                    </div>
                </div>
            </div>
        );
    }
};

export default EventInfo;