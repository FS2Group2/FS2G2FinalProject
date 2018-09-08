import React, {Component} from 'react';
import '../css/profile.css'
import {connect} from "react-redux";
import {Link} from "react-router-dom";

class Wishlist extends Component {

    render() {
        const {wishListState} = this.props;
        return (
            <div>
                {wishListState[0] && wishListState.map(w =>
                    <div>
                        <Link to={'event/' + w.id}>
                            <p>{w.name}</p>
                            <p>{w.cityName}</p>
                            <p>{w.date}</p>
                            <p>  ___ </p>
                        </Link>
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
