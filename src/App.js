import React, { Component } from 'react';
import { Router } from '@reach/router';
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';
import fetchJSON from './utilities/fetch-json';
import DataContext, { data } from './context/data-context';
import styled from 'styled-components';
import { ThemeProvider as MaterialThemeProvider } from '@material-ui/core/styles';
import { materialTheme } from './theme/theme';
import Loader from './components/loader/loader';
import Navigation from './components/navigation/navigation';
import Routes from './routes';

import { laboratoryDataMockup, surveyDataMockup } from './data-mockup';

const _PROXY = 'https://cors-anywhere.herokuapp.com/';

const getLaboratoryData = fetchJSON({
  url: 'http://nodejs-express-app-yadii.eu-gb.mybluemix.net/getOfficialData',
  proxy: _PROXY,
  fallback: laboratoryDataMockup,
});

const getSurveyData = fetchJSON({
  url: 'http://nodejs-express-app-yadii.eu-gb.mybluemix.net/getSurveyData',
  proxy: _PROXY,
  fallback: surveyDataMockup,
});

const DataLoadingIndicator = () => {
  const { promiseInProgress } = usePromiseTracker();
  return promiseInProgress && <Loader />;
}

const AppWrapper = styled.div`
  box-sizing: border-box;
  width: 100vw;
  height: 100%;
  margin: 0;
  padding: 0;
`;

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      data,
    }
  }

  async componentDidMount() {
    const laboratory = await trackPromise(getLaboratoryData());
    const survey = await trackPromise(getSurveyData());
    this.setState({
      data: { laboratory, survey },
    });
  }

  render() {
    return(
      <AppWrapper>
        <DataContext.Provider value={this.state.data}>
          <MaterialThemeProvider theme={materialTheme}>
            <DataLoadingIndicator />
            <Navigation />
            <Router>
              <Routes.Home path="/" />
              <Routes.Dashboard path="/dashboard" />
              <Routes.DataTable path="/table" />
              <Routes.Survey path="/survey" />
              <Routes.Contact path="/contact" />
              <Routes.Imprint path="/imprint" />
            </Router>
          </MaterialThemeProvider>
        </DataContext.Provider>
      </AppWrapper>
    );
  }
}
