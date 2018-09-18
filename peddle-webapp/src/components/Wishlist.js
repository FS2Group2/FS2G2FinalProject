import React, {Component} from 'react';
import '../css/Wishlist.css'
import {connect} from "react-redux";
import {Link} from "react-router-dom";

class Wishlist extends Component {

    render() {
        const {wishListState} = this.props;
        return (
            <div className="wishlist-list">
                <div className="wishlist-list-titles">

                    <div className="element-title-name">
                        <span >Name</span>
                    </div>

                    <div className="element-title-city">
                        <span >City</span>
                    </div>

                    <div className="element-title-price">
                        <span >$</span>
                    </div>

                    <div className="element-title-link">
                        <span >Link</span>
                    </div>

                </div>
                {wishListState[0] && wishListState.map(w =>
                    <div className="wishlist-list-element">

                        <div className="element-name">
                            <span >{w.name}</span>
                        </div>

                        <div className="element-city">
                            <span >{w.cityName}</span>
                        </div>

                        <div className="element-sum">
                            <span >{w.price}</span>
                        </div>

                        <div className="element-sum">
                            <Link to={'event/' + w.id}><span>View Event</span></Link>
                        </div>

                    </div>
                )}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        wishListState: state.wishListReducer
    }
};

export default connect(mapStateToProps)(Wishlist);
