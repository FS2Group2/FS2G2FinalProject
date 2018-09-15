import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {changeUser, setLoggedIn} from "../actions/userActions";
import {fetchDataFromApi} from "../actions/fetchDataActions";
import {categoriesList, citiesList, userData, wishList} from "../constants/queryTypes";

class LoadListsComponent extends Component {
  componentDidMount() {
    const {fetchDataFromApi, setLoggedIn} = this.props;

    fetchDataFromApi(citiesList, '');
    fetchDataFromApi(categoriesList, '');

    if (localStorage.getItem('logged') && localStorage.getItem('accessToken')) {
      setLoggedIn(true);
      let userQuery={name: localStorage.getItem('usr')};
      fetchDataFromApi(userData, userQuery);
      fetchDataFromApi(wishList, '');
    }

  }

  render() {
    return (<Fragment/>)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setLoggedIn: isLogged => {
      dispatch(setLoggedIn(isLogged))
    },
    changeUser: user => {
      dispatch(changeUser(user))
    },
    fetchDataFromApi: (queryType, query) => {
      dispatch(fetchDataFromApi(queryType, query))
    }
  }

};

const mapStateToProps = (state) => {
  return {
    allCities: state.fillListsReducer
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoadListsComponent);