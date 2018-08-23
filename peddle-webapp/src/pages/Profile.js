import React, { Component } from 'react';
import '../styles/Profiles.css';
class Profile extends Component {
    render() {
        return (
            <div className="Profile-bg">

                <div className="Profile-header">
                    <div className="Profile-info">
                        <div className="Profile-info-photo">
                            <img  className="Profile-photo" src="images/BA-profile-avatar-2.jpg"/>
                        </div>
                        <div className="Profile-info-section">
                            <p className="Profile-info-name">Bobby Axelrod</p>
                            <p className="Profile-info-username">@axe</p>
                        </div>
                    </div>
                    <div className="Profile-settings">
                        <div>
                            <img className="Profile-settings-photo" src="images/settings-icon.jpg"/>
                        </div>
                    </div>
                </div>
                <div className="Profile-fav-section">
                    <h2 className="Profile-fav-head">Favourite</h2>
                    <div>
                        <div className="Profile-fav-element">
                            <img className="Profile-fav-photo" src="images/ces19.jpg"/>
                        </div>
                        <div className="Profile-fav-element">
                            <img className="Profile-fav-photo" src="images/ces19-1.jpg"/>
                        </div>
                        <div className="Profile-fav-element">
                            <img className="Profile-fav-photo" src="images/ces19-2.jpg"/>
                        </div>
                        <div className="Profile-fav-element">
                            <img className="Profile-fav-photo" src="images/ces19-2.jpg"/>
                        </div>
                        <div className="Profile-fav-element">
                            <p>View All -></p>
                        </div>
                    </div>
                </div>
                <div className="Profile-cart-section">
                    <h2 className="Profile-cart-head">Cart</h2>
                    <div className="Profile-cart-content">
                        <div className="Profile-cart-event-element">
                            <div className="Profile-cart-event-element-info">
                            <div className="Profile-cart-element-photo">
                                <img  className="Profile-cart-event-photo" src="images/placeholder.png"/>
                            </div>
                            <div className="Profile-cart-event-info">
                                <p className="Profile-cart-event-name">Event</p>
                                <p className="Profile-cart-event-company">@comp_name</p>
                            </div>
                            </div>
                            <div className="Profile-cart-extended-event-info">
                                <div className="Profile-cart-event-rating">
                                    <img  className="Profile-event-rating-photo" src="images/stock-vector--star-rating-icon-vector-illustration-eps-isolated-badge-for-website-or-app-stock-infographics-519705664.jpg"/>
                                    <p className="Profile-cart-extended-info-price">From</p>
                                    <p className="Profile-cart-extended-info-price">$150</p>
                                    <p className="Profile-cart-extended-info-details">View details</p>
                                </div>
                            </div>
                        </div>
                        <div className="Profile-cart-event-element">
                            <div className="Profile-cart-event-element-info">
                                <div className="Profile-cart-element-photo">
                                    <img  className="Profile-cart-event-photo" src="images/placeholder.png"/>
                                </div>
                                <div className="Profile-cart-event-info">
                                    <p className="Profile-cart-event-name">Event</p>
                                    <p className="Profile-cart-event-company">@comp_name</p>
                                </div>
                            </div>
                            <div className="Profile-cart-extended-event-info">
                                <div className="Profile-cart-event-rating">
                                    <img  className="Profile-event-rating-photo" src="images/stock-vector--star-rating-icon-vector-illustration-eps-isolated-badge-for-website-or-app-stock-infographics-519705664.jpg"/>
                                    <p className="Profile-cart-extended-info-price">From</p>
                                    <p className="Profile-cart-extended-info-price">$150</p>
                                    <p className="Profile-cart-extended-info-details">View details</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
export default Profile;