import React, {Component, Fragment} from 'react';
import {fillCategoriesList, fillCitiesList} from "../actions/fillListsActions";
import {connect} from "react-redux";
import dataMap, {authHeaders} from "../constants/ApiSettings";

class LoadListsComponent extends Component {
  componentDidMount() {
    const urlAllCities = dataMap.allCities;
    const urlAllCategories = dataMap.categoryPath;
    let reqParam = {
      method: 'GET',
      headers: authHeaders
    };
    fetch(urlAllCities, reqParam)
      .then(res => res.json())
      .then(
        (result) => {
          this.props.getAllCities(result)
        }
      );

    fetch(urlAllCategories, reqParam)
      .then(res => res.json())
      .then(
        (result) => {
          this.props.getAllCategories(result)
        }
      );
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
    }
  }
};

const mapStateToProps = (state) => {
  return {
    allCities: state.fillListsReducer
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoadListsComponent);