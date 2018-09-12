import React, {Component, Fragment} from 'react';
import {fillCategoriesList, fillCitiesList} from "../actions/fillListsActions";
import {connect} from "react-redux";
import dataMap, {authHeaders} from "../constants/ApiSettings";
import {changeUser, setLoggedIn} from "../actions/userActions";

class LoadListsComponent extends Component {
  componentDidMount() {
    const urlAllCities = dataMap.allCities;
    const urlAllCategories = dataMap.categoryPath;
    const {getAllCities, getAllCategories, setLoggedIn} = this.props;

    let reqParam = {
      method: 'GET',
      headers: authHeaders
    };
    fetch(urlAllCities, reqParam)
      .then(res => res.json())
      .then(
        (result) => {
          getAllCities(result)
        }
      );

    fetch(urlAllCategories, reqParam)
      .then(res => res.json())
      .then(
        (result) => {
          getAllCategories(result)
        }
      );

    if(localStorage.getItem('logged') && localStorage.getItem('accessToken')){
      setLoggedIn(true);
    }

  }

  render() {
    return (<Fragment/>)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllCities: (citiesList) => {
      dispatch(fillCitiesList(citiesList))
    },
    getAllCategories: (categoriesList) => {
      dispatch(fillCategoriesList(categoriesList))
    },
    setLoggedIn: isLogged => {
      dispatch(setLoggedIn(isLogged))
    },
    changeUser: user => {
      dispatch(changeUser(user))
    }
  }

};

const mapStateToProps = (state) => {
  return {
    allCities: state.fillListsReducer
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoadListsComponent);