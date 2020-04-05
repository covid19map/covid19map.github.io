import React, { Component } from 'react';
import { Link } from '@reach/router';
import { percentageDisplay } from '../../../utilities/formatting';
import { handWashDurations, symptomsCovid } from '../survey';
import { Answer } from '../survey-questionnaire/survey-questionnaire';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { Button } from '../../../theme/base-components';
import { ReactComponent as SaveIcon } from '../../../icons/save.svg';
import { ReactComponent as LogoutIcon } from '../../../icons/logout.svg';
import BrandLogo from '../../brand-logo/brand-logo';
import {
  Dashboard,
  Header,
  Brand,
  Controls,
  HeaderButton,
  DashboardContent,
  DashboardRow,
  DashboardTile,
} from './survey-dashboard-styled';

export default class SurveyDashboard extends Component {
  postChanges = () => {
    const { credentials, metrics } = this.props;
    console.log(credentials, metrics);
    // POST changes to server
    setTimeout(() => {
      window.location.reload();
    }, 1200);
  }

  handleLogout = () => {
    window.sessionStorage.setItem('coronahub-login-state', 'false');
  }

  render() {
    const { props, postChanges, handleLogout } = this,
          { metrics, metricsHandlers } = props,
          { onSetSwitch, onSetMetric, onSetSymptoms } = metricsHandlers;

    const {
      cough,
      fever,
      symptoms,
      proximity,
      washHands,
      washHandsDuration,
      washHandsSoap,
      riskyTravel,
      symptomaticContact,
      diagnosedContact,
      criticalContact,
      RTPCR,
      antibody,
      infectionProbability,
    } = metrics;

    const clsRow = (RTPCR || antibody) && 'muted';

    return(
      <Dashboard>
        <Header>
          <Brand>
            <BrandLogo />
          </Brand>
          <Controls>
            <HeaderButton onClick={postChanges}>
              <SaveIcon /> Speichern
            </HeaderButton>
            <Link to ="/dashboard">
              <HeaderButton onClick={handleLogout}>
                <LogoutIcon /> Logout
              </HeaderButton>
            </Link>
          </Controls>
        </Header>
        <DashboardContent>
          <DashboardRow>
            <DashboardTile>
              <FormControlLabel
                control={
                  <Switch
                    checked={RTPCR}
                    onChange={onSetSwitch}
                    name="RTPCR"
                    color="primary"
                  />
                }
                label="Positiver RTPCR-Test"
              />
            </DashboardTile>
            <DashboardTile>
              <FormControlLabel
                control={
                  <Switch
                    checked={antibody}
                    onChange={onSetSwitch}
                    name="antibody"
                    color="primary"
                  />
                }
                label="Positiver Antikörper-Test"
              />
            </DashboardTile>
          </DashboardRow>
          <DashboardRow className={clsRow}>
            <DashboardTile>
              Trockener Husten
              <Answer metric="cough" onChange={onSetMetric} value={cough} />
            </DashboardTile>
            <DashboardTile>
              Fieber (>37,9)
              <Answer metric="fever" onChange={onSetMetric} value={fever}/>
            </DashboardTile>
            <DashboardTile>
              Nähe zu symptomatischen Personen
              <Answer metric="proximity" onChange={onSetMetric} value={proximity} />
            </DashboardTile>
            <DashboardTile>
              Hände waschen (min. 3x täglich)
              <Answer metric="washHands" onChange={onSetMetric} value={washHands} />
            </DashboardTile>
            <DashboardTile>
              Dauer des Hände waschens
              <Answer
                metric="washHandsDuration"
                options={handWashDurations}
                onChange={onSetMetric}
                value={washHandsDuration}
              />
            </DashboardTile>
            <DashboardTile>
              Hände waschen mit Seife
              <Answer metric="washHandsSoap" onChange={onSetMetric} value={washHandsSoap} />
            </DashboardTile>
            <DashboardTile>
              Besuch eines Risikogebiets
              <Answer metric="riskyTravel" onChange={onSetMetric} value={riskyTravel} />
            </DashboardTile>
          </DashboardRow>
          <DashboardRow className={clsRow}>
            <DashboardTile>
              Direkter Kontakt* zu symptomatischen Personen
              <Answer metric="symptomaticContact" onChange={onSetMetric} value={symptomaticContact} />
            </DashboardTile>
            <DashboardTile>
            Direkter Kontakt* zu einer diagnostizierten Person
              <Answer metric="diagnosedContact" onChange={onSetMetric} value={diagnosedContact} />
            </DashboardTile>
            <DashboardTile>
            Direkter Kontakt* zu einer diagnostizierten Person mit starken Symptomen
              <Answer metric="criticalContact" onChange={onSetMetric} value={criticalContact} />
            </DashboardTile>
            <DashboardTile>
              *Händeschütteln, Umarmen, von einem gemeinsamen Teller essen, Gegenstände berühren,
              die die Infizierte Person auch berührt hat, weniger als 1,5 m Abstand.
            </DashboardTile>
          </DashboardRow>
          <DashboardRow className={clsRow}>
            Zusätzliche Symptome
            <Answer
              metric="symptoms"
              onChange={onSetSymptoms}
              options={symptomsCovid}
              value={symptoms}
              multi={true}
              closeMenuOnSelect={false}
            />
          </DashboardRow>
          <DashboardRow>
            Infektionswahrscheinlichkeit:
            <span style={{
              display: 'inline-block',
              margin: '0 0 0 5px',
              fontSize: '1.5rem',
              transform: 'translate(0, -.5rem)',
            }}>
              {`${percentageDisplay(infectionProbability*100)}%`}
            </span>
          </DashboardRow>
          <DashboardRow centered>
            <Button onClick={postChanges}>
              Änderungen speichern
            </Button>
          </DashboardRow>
        </DashboardContent>
      </Dashboard>
    );
  }
}
