import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {changeUser, setLoggedIn} from "../actions/userActions";
import {fetchDataFromApi} from "../actions/fetchDataActions";
import {categoriesList, citiesList, languagesList, topEvents, userData, wishList} from "../constants/queryTypes";

class LoadListsComponent extends Component {
  componentDidMount() {
    const {fetchDataFromApi, setLoggedIn, filter} = this.props;

    fetchDataFromApi(citiesList, '');
    fetchDataFromApi(categoriesList, '');
    fetchDataFromApi(topEvents, {
      page: 2,
      pageSize: 10,
      cityName: '',
      dateStart: filter.dateStart,
      dateFin: '01/01/2050',
      categoryId: 0
    });
    fetchDataFromApi(languagesList, '');

    if (localStorage.getItem('logged') && localStorage.getItem('accessToken')) {
      let userQuery = {name: localStorage.getItem('usr')};
      fetchDataFromApi(userData, userQuery);
      fetchDataFromApi(wishList, localStorage.getItem("uid"));
    }
    if (this.props.userState.currentUser.id) setLoggedIn(true);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userState.currentUser.id !== this.props.userState.currentUser.id) {
      this.props.setLoggedIn(true)
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
    allCities: state.fillListsReducer,
    filter: state.filterReducer,
    userState: state.userReducer
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoadListsComponent);