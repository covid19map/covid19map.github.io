import React, { Component, Fragment } from 'react';
import SurveyQuestionnaire from './survey-questionnaire/survey-questionnaire';
import SurveyDashboard from './survey-dashboard/survey-dashboard';
import { EllipticLoader } from '../loader/loader';
import { evalInfectionProbability } from './survey-eval';
import './survey.css';

export const binaryAnswers = [
  { value: true, label: 'Ja' },
  { value: false, label: 'Nein' }
];

export const handWashDurations = [
  { value: 0, label: '0-5 Sekunden' },
  { value: 1, label: '5-10 Sekunden' },
  { value: 2, label: '10-15 Sekunden' },
  { value: 3, label: '15-20 Sekunden' },
  { value: 4, label: '>20 Sekunden' }
];

export const symptomsCovid = [
  { value: 'sore-throat', label: 'Halskratzen' },
  { value: 'chills', label: 'Frösteln' },
  { value: 'high-temperature', label: 'erhöhte Temperatur (>37,5)' },
  { value: 'breathing-problems', label: 'Atemprobleme' },
  { value: 'exhaustion', label: 'Abgeschlagenheit' },
  { value: 'limb-pain', label: ' Glieder- oder Muskelschmerzen' },
  { value: 'loss-of-smell', label: 'Geruchs- oder Geschmacksverlust' },
  { value: 'diarrhea', label: 'Durchfall' },
  { value: 'headache', label: 'Kopfschmerzen' },
  { value: 'sniff', label: 'Schnupfen' },
];

export default class Survey extends Component {
  constructor() {
    super();
    this.state = {
      landing: true,
      register: false,
      login: false,
      profile: false,
      credentials: {
        login: {
          user: undefined,
          password: undefined,
        },
        register: {
          id: undefined,
          email: undefined,
          password: undefined,
          zip: undefined,
        },
      },
      registerPending: false,
      registerComplete: false,
      metrics: {
        cough: null,
        fever: null,
        symptoms: [],
        proximity: null,
        washHands: null,
        washHandsDuration: 0,
        washHandsSoap: null,
        riskyTravel: null,
        symptomaticContact: null,
        diagnosedContact: null,
        criticalContact: null,
        RTPCR: false,
        antibody: false,
        infectionProbability: 0,
      },
    }
  }

  showLanding = () => {
    this.setState({
      landing: true,
      register: false,
      login: false,
      profile: false,
    });
  }

  showRegister = () => {
    this.setState({
      landing: false,
      register: true,
    });
  }

  showLogin = () => {
    this.setState({
      landing: false,
      login: true,
    });
  }

  showProfile = () => {
    this.setState({
      landing: false,
      register: false,
      login: false,
      profile: true,
    })
  }

  setRegister = ({ target }) => {
    const { credentials } = this.state;
    credentials.register[target.name] = target.value;
    this.setState({ credentials });
  }

  setLogin = ({ target }) => {
    const { credentials } = this.state;
    credentials.login[target.name] = target.value;
    this.setState({ credentials });
  }

  setSwitch = ({ target }) => {
    const { metrics } = this.state;
    metrics[target.name] = target.checked;
    if(target.checked) {
      metrics.infectionProbability = 1;
    } else {
      metrics.infectionProbability = evalInfectionProbability(metrics);
    }
    this.setState({ metrics });
  }

  setMetric = (metric, { value }) => {
    const { metrics } = this.state;
    metrics[metric] = value;
    metrics.infectionProbability = evalInfectionProbability(metrics);
    this.setState({ metrics });
  }

  setSymptoms = (metric, options) => {
    if(metric === 'symptoms') {
      const { metrics } = this.state;
      metrics.symptoms = !!options ? options.map(o => o.value) : [];
      metrics.infectionProbability = evalInfectionProbability(metrics);
      this.setState({ metrics });
    }
  }

  setAllMetrics = (metrics) => {
    console.log('setting all metrics', metrics);
    this.setState({ metrics });
  }

  setProbability = p => {
    const { metrics } = this.state;
    metrics.infectionProbability = p;
    this.setState({ metrics });
  }

  postRegisterCredentials = () => {
    const { credentials } = this.state,
          { register } = credentials;
    
    // Validate credentials
    //if() {
    // POST to server
      console.log(register);
      this.setState({
        registerPending: true,
      });
    //}

    // Use websockets here
    // On Registration Completion
    setTimeout(() => {
      window.sessionStorage.setItem('coronahub-login-state', 'true');
      this.setState({
        register: false,
        login: false,
        landing: false,
        registerPending: false,
        registerComplete: true,
        credentials: {
          login: {
            user: register.id,
            password: register.password,
          },
          register,
        }
      });
    }, 3000);
  }

  postLoginCredentials = () => {
    const { credentials } = this.state,
          { login } = credentials;
    
    // Validate credentials
    //if() {
    // POST to server
      console.log(login);
      const response = {
        id: login.user,
        metrics: {
          cough: true,
          fever: false,
          symptoms: ['headache', 'sore-throat'],
          proximity: true,
          washHands: true,
          washHandsDuration: 3,
          washHandsSoap: true,
          riskyTravel: true,
          symptomaticContact: true,
          diagnosedContact: false,
          criticalContact: false,
          RTPCR: false,
          antibody: false,
          infectionProbability: .508,
        },
      }
    //}

    // On Positive Server Response
    setTimeout(() => {
      window.sessionStorage.setItem('coronahub-login-state', 'true');
      window.sessionStorage.setItem('coronahub-login-id', response.id);
      this._onLogin(response.metrics);
    }, 750);
  }


  _onLogin = metrics => {
    this.setState({
      landing: false,
      register: false,
      login: false,
      profile: true,
      metrics,
    });
  }

  componentDidMount() {
    if(window.sessionStorage.getItem('coronahub-login-state') === 'true') {
      const id = window.sessionStorage.getItem('coronahub-login-id');
      if(!!id) {
        // POST to server
        console.log(id);
        // Dummy response
        const response = {
          metrics: {
            cough: true,
            fever: false,
            symptoms: ['headache', 'sore-throat'],
            proximity: true,
            washHands: true,
            washHandsDuration: 3,
            washHandsSoap: true,
            riskyTravel: true,
            symptomaticContact: true,
            diagnosedContact: false,
            criticalContact: false,
            RTPCR: false,
            antibody: false,
            infectionProbability: .508,
          },
        }
        this._onLogin(response.metrics);
      } else {
        console.error('Something went wrong');
        // reset login
        window.sessionStorage.removeItem('coronahub-login-state');
        window.sessionStorage.removeItem('coronahub-login-id');
        window.location.reload();
      }
    }
  }

  render() {
    const isLogged = window.sessionStorage.getItem('coronahub-login-state') === 'true';
    const {
      state,
      showLanding,
      showRegister,
      showLogin,
      showProfile,
      setRegister,
      setLogin,
      setSwitch,
      setMetric,
      setSymptoms,
      setProbability,
      setAllMetrics,
      postRegisterCredentials,
      postLoginCredentials,
    } = this;
    const {
      landing,
      register,
      login,
      profile,
      credentials,
      registerPending,
      registerComplete,
      metrics,
    } = state;
    
    const navigationHandlers = {
      onShowLanding: showLanding,
      onShowRegister: showRegister,
      onShowLogin: showLogin,
    }
    const metricsHandlers = {
      onSetMetric: setMetric,
      onSetSwitch: setSwitch,
      onSetSymptoms: setSymptoms,
      onSetProbability: setProbability,
      onSetAllMetrics: setAllMetrics,
    }

    const registerParams = {
      credentials: credentials.register,
      onChange: setRegister,
      onSubmit: postRegisterCredentials,
      onReset: showLanding,
      registerPending,
      registerComplete,
    }
    const loginParams = {
      credentials: credentials.login,
      onChange: setLogin,
      onSubmit: postLoginCredentials,
      onReset: showLanding,
    }

    return(
      <Fragment>
        {(!isLogged) && // && (landing || register || login)
          <div className="survey">
            {landing && <SurveyLanding {...navigationHandlers} />}
            {register && <SurveyRegister {...registerParams} />}
            {login && <SurveyLogin {...loginParams} />}
          </div>
        }
        {(isLogged && registerComplete && !profile) &&
          <SurveyQuestionnaire
            credentials={credentials.login}
            metrics={metrics}
            metricsHandlers={metricsHandlers}
            onShowProfile={showProfile}
          />
        }
        {(isLogged && profile) &&
          <SurveyDashboard
            credentials={credentials.login}
            metrics={metrics}
            metricsHandlers={metricsHandlers}
          />
        }
      </Fragment>
    );
  }
}

const SurveyLanding = ({ onShowRegister, onShowLogin }) => {
  return(
    <div className="survey__landing">
      <h2>Willkommen bei der Corona-Sympthom-Umfrage!</h2>
      <div>Sie sind neu bei Umfrage?</div>
      <div>
        <button onClick={onShowRegister}>Zur Registrierung</button>
      </div>
      <div>Oder haben Sie bereits teilgenommen und wollen Angaben ändern?</div>
      <div>
        <button onClick={onShowLogin}>Zum Login</button>
      </div>
    </div>
  );
}

const SurveyRegister = props => {
  const {
    credentials,
    onChange,
    onSubmit,
    onReset,
    registerPending,
    registerComplete,
  } = props;
  const { id, email, zip, password } = credentials;
  return(
    <Fragment>
      <h3>Registrierung</h3>
      <div className="survey__form">
        <LoginInput
          id="id"
          name="id"
          label="Benutzername (anonymisiert)"
          value={id}
          onChange={onChange}
        />
        <LoginInput
          type="email"
          id="email"
          name="email"
          label="E-Mail"
          value={email}
          onChange={onChange}
        />
        <LoginInput
          type="password"
          id="password-login"
          name="password"
          label="Passwort"
          value={password}
          onChange={onChange}
        />
        <LoginInput
          id="zip"
          name="zip"
          label="PLZ"
          value={zip}
          onChange={onChange}
        />
      </div>
      <button onClick={onReset}>Zurück</button>
      <button onClick={onSubmit}>Registrieren</button>
      {(registerPending && !registerComplete) &&
        <div className="survey__register__progress">
          <div>
            Bitte überprüfen Sie Ihr E-Mail-Postfach und bestätigen Sie die Registrierung
            <div><EllipticLoader /></div>
          </div>
        </div>
      }
      <div className="survey__register__notes">
        <i>Hinweise / Erklärungen</i>
        <p>
          Ihre E-Mail-Adresse, sowie Ihr Passwort werden nur
          in unkenntlicher Form in unserer Datenbank hinterlegt.
          Das Unkenntlichmachen erfolgt mit Hilfe einer
          kryptographischen Hash-Funktion.
          Inhaber der Daten haben keine Möglichkeit,
          die Klarform der E-Mail-Adresse und des Passworts zu entschlüsseln.
          Die Daten sind vollkommen anonymisiert.
        </p>
        <p>
          Wenn Sie nach der Registrierung Ihr Passwort zurücksetzen wollen,
          geschieht das Versenden der Anfrage an die angegebene E-Mail-Adresse
          ohne Speicherung der Klarform auf unserem Server.
          Ebenso wird bei jedem Abgleich der eingegeben E-Mail-Daten
          die Eingabe verschlüsselt.
          Das gleiche gilt für jedwede Kontaktaufnahme unserseits an Sie.
        </p>
        <p>
          Die PLZ wird zur Lokalisierung der Daten
          auf der Karte im Dashboard verwendet werden.
        </p>
        <p>
          Auf Anfrage können Nutzer dieser Seite
          die zum Zeitpunkt der Anfrage gespeicherten Daten übermittelt bekommen
          oder dessen Löschung veranlassen.
        </p>
      </div>
    </Fragment>
  );
}

const SurveyLogin = props => {
  const { credentials, onChange, onSubmit, onReset } = props;
  const { id, password } = credentials;
  return(
    <Fragment>
      <h3>Login</h3>
      <div className="survey__form">
        <LoginInput
          id="user-login"
          name="id"
          label="Benutzername / E-Mail"
          value={id}
          onChange={onChange}
        />
        <LoginInput
          type="password"
          id="password-login"
          name="password"
          label="Passwort"
          value={password}
          onChange={onChange}
        />
      </div>
      <button onClick={onReset}>Zurück</button>
      <button onClick={onSubmit}>Login</button>
      <div className="survey__login__reset">
        Passwort vergessen?
      </div>
    </Fragment>
  );
}

const LoginInput = props => {
  const { id, name, label, value, onChange, type = 'text' } = props;
  return(
    <div className="survey__form__input">
      <input type={type} id={id} name={name} value={value} onChange={onChange} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

/*
const CheckIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24">
    <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.393 7.5l-5.643 5.784-2.644-2.506-1.856 1.858 4.5 4.364 7.5-7.643-1.857-1.857z" />
  </svg>
);
*/
