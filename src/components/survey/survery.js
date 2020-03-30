import React, { Component, Fragment } from 'react';
import Select from 'react-select';
//import { CircularLoader } from '../loader/loader';
import { percentageDisplay } from '../../utilities/formatting';
import './survey.css';
import { CircularLoader } from '../loader/loader';

const _scalarMult = (scalar, array) => (
  array.map(a => scalar * a)
);

const _includesSymptoms = (values, symptoms) => (
  values.reduce((acc, val) => acc || symptoms.includes(val), false)
);

const symptomsMap = (values) => {
  if(_includesSymptoms(values, [
    'breathing-problems', 'high-temperature'
  ])) {
    return .8;
  } else if(_includesSymptoms(values, [
    'sore-throat', 'exhaustion',
  ])) {
    return .6;
  } else if(_includesSymptoms(values, [
    'headache', 'limb-pain', 'chills',
  ])) {
    return .4;
  } else if(_includesSymptoms(values, [
    'sniff', 'diarrhea', 'loss-of-smell',
  ])) {
    return .2;
  } else {
    return 0;
  }
}

const evalInfectionProbability = (metrics) => {
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
  } = metrics;

  const soapCoefficient = washHands ? (1 - .5*Number(washHandsSoap)) : 1,
        durationCoefficient = washHands ? 1 - (.75*Math.log(washHandsDuration + 4) - 1) : 1;

  const n = 7,
        g = new Array(n).fill(0);
  
  g[0] = Number(cough);
  g[1] = Number(fever);
  g[2] = symptomsMap(symptoms);
  g[3] = .6*Number(proximity);
  g[4] = (.4 - .4*Number(washHands) + .4) * soapCoefficient * durationCoefficient;
  g[5] = .75*Number(riskyTravel);

  if(symptomaticContact) g[6] = .5;
  if(diagnosedContact) g[6] = .75;
  if(criticalContact) g[6] = 1;

  return _scalarMult(1 / n, g).reduce((acc, val) => acc + val, 0);
}

const binaryAnswers = [
  { value: true, label: 'Ja' },
  { value: false, label: 'Nein' }
];

const handWashDurations = [
  { value: 0, label: '0-5 Sekunden' },
  { value: 1, label: '5-10 Sekunden' },
  { value: 2, label: '10-15 Sekunden' },
  { value: 3, label: '15-20 Sekunden' },
  { value: 4, label: '>20 Sekunden' }
];

const symptomsCovid = [
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

export default class CoronaSurvey extends Component {
  constructor() {
    super();
    this.state = {
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
    }
  }

  setMetric = (metric, { value }) => {
    this.setState({ [metric]: value });
  }

  setSymptoms = (metric, options) => {
    if(metric === 'symptoms') {
      this.setState({
        symptoms: !!options ? options.map(o => o.value) : [],
      });
    }
  }

  render() {
    const { state, setMetric, setSymptoms } = this;
    return(
      <div className="corona-survey">
        <CoronaSurveyHero /> 
        <Survey title="COVID-19 infection probability assesement">
          <SurveySlide>
            <Question>
              Haben Sie aktuell oder hatten Sie in den vergangenen zwei Wochen trockenen Husten?
              <Answer metric="cough" onChange={setMetric} />
            </Question>
            <Question>
              Haben Sie aktuell oder hatten Sie in den vergangenen zwei Wochen Fieber (>37,9)?
              <Answer metric="fever" onChange={setMetric} />
            </Question>
            <Question>
              Haben oder hatten Sie in den vergangenen zwei Wochen zusätzlich dazu eine oder mehrere der folgenden Symptome?
              Wenn ja, welche?
              <Answer
                metric="symptoms"
                onChange={setSymptoms}
                options={symptomsCovid}
                multi={true}
                closeMenuOnSelect={false}
              />
            </Question>
          </SurveySlide>
          <SurveySlide>
            <Question>
              Haben Sie sich in den vergangenen zwei Wochen für mindestens 5 Minuten in der Nähe zu Personen aufgehalten,
              die geniest oder gehustet haben (z.B. in der U-Bahn, im Bus oder in einem geschlossenen Raum)?
              <Answer metric="proximity" onChange={setMetric} />
            </Question>
            <Question>
              Waschen Sie sich häufig die Hände (mind. 3x am Tag)?
              <Answer metric="washHands" onChange={setMetric} />
            </Question>
            <Question>
              Für wie lange waschen Sie sich die Hände?
              <Answer
                metric="washHandsDuration"
                options={handWashDurations}
                onChange={setMetric}
              />
            </Question>
            <Question>
              Verwenden Sie Seife?
              <Answer metric="washHandsSoap" onChange={setMetric} />
            </Question>
          </SurveySlide>
          <SurveySlide>
            <Question>
              Sind Sie in den vergangenen zwei Wochen in eines dieser Risikogebiete gereist?
              (RKI, Stand 21.3.2020: Ägypten, China (Provinz Hubei), Iran, Italien,
              Österreich (Bundesland Tirol), Spanien (Madrid),
              Südkorea (Provinz Gyeongsangbuk-do (Nord-Gyeongsang),
              USA (Bundesstaaten Kalifornien, Washington und New York))
              <Answer metric="riskyTravel" onChange={setMetric} />
            </Question>
          </SurveySlide>
          <SurveySlide>
            <Question>
              Haben Sie aktuell oder hatten Sie in den vergangenen zwei Wochen Kontakt*
              zu einer Person, die gehustet hat?
              <Answer metric="symptomaticContact" onChange={setMetric} />
            </Question>
            <Question>
              Haben Sie aktuell oder hatten Sie in den vergangenen zwei Wochen Kontakt* zu einer Person,
              die leicht an COVID-19 erkrankt ist
              (labortechnisch festgestellt, ohne Fieber, mit Husten, Halskratzen und/oder ggf. Abgeschlagenheit)?
              <Answer metric="diagnosedContact" onChange={setMetric} />
            </Question>
            <Question>
              Haben Sie aktuell oder hatten Sie in den vergangenen zwei Wochen Kontakt*
              zu einer Person, die schwer an COVID-19 erkrankt ist
              (labortechnisch festgestellt, mit Husten, Fieber und/oder Lungenentzündung)?
              <Answer metric="criticalContact" onChange={setMetric} />
            </Question>
            *Händeschütteln, Umarmen, von einem gemeinsamen Teller essen, Gegenstände berühren,
            die die Infizierte Person auch berührt hat, weniger als 1,5 m Abstand.
          </SurveySlide>
          <SurveySlide>
            <div className="corona-survey__conclusion">
              <p>
                Vielen Dank für Ihre Teilnahme!
              </p>
              <p>
                Die Wahrscheinlichkeit einer Infektion beträgt:
                &nbsp;
                {`${percentageDisplay(evalInfectionProbability(state)*100)}%`}
              </p>
              <p style={{color: 'red'}}>
                ACHTUNG: Dies ist ein Prototyp!
                Der errechnete Wert basiert auf einem
                noch nicht bestätigten Modell.
              </p>
              <p>
                Mit Hilfe der von Ihnen bereitgestellten Daten wird eine
                weitaus differenziertere Betrachtung der Situation
                möglich sein als mit den gemeldeteten Labortests allein.
              </p>
              <p>
                Halten Sie gut durch! <span role="img" aria-label="strength">💪</span>
              </p>
            </div>
          </SurveySlide>
        </Survey>
      </div>
    );
  }
}

const CoronaSurveyHero = () => <div className="corona-survey-hero"></div>;

const Question = ({ children }) => (
  <div className="corona-survey__question">{children}</div>
);

const Answer = (props) => {
  const {
    metric,
    onChange,
    options = binaryAnswers,
    multi = false,
    closeMenuOnSelect = true,
  } = props;
  return(
    <Select
      className="corona-survey__answers"
      name={metric}
      isMulti={multi}
      options={options}
      onChange={(option) => { onChange(metric, option) }}
      closeMenuOnSelect={closeMenuOnSelect}
      placeholder={'Auswahl...'}
    />
  );
}

//------------

const SurveySlide = ({ children }) => (
  <Fragment>{children}</Fragment>
);

class Survey extends Component {
  constructor() {
    super();
    this.state = {
      totalSlides: 0,
      currentSlide: 0,
    }
  }

  prevSlide = () => {
    const { currentSlide } = this.state;
    if(currentSlide > 0) {
      this.setState({ currentSlide: currentSlide - 1 });
    }
  }

  nextSlide = () => {
    const { totalSlides, currentSlide } = this.state;
    if(currentSlide < totalSlides - 1) {
      this.setState({ currentSlide: currentSlide + 1 });
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        totalSlides: this.props.children.length,
      });
    }, 1500);
  }

  render() {
    const { props, state, prevSlide, nextSlide } = this;
    const { title, children } = props;
    const { totalSlides, currentSlide } = state;
    // TODO: Loading spinner while totalSLides <= 0
    return(
      <Fragment>
        {totalSlides > 0 ? <Fragment>
          <h2>{title}</h2>
          <div className="survey__step">
            {currentSlide + 1} / <span>{totalSlides}</span>
          </div>
          <SurveyCaroussel>
            {children.map((c, i) => (
              <SurveySlideRender key={i} slideNumber={i} currentSlide={currentSlide}>
                {c.props.children}
              </SurveySlideRender>
            ))}
            <div className="survery-caroussel__controls">
              <button onClick={prevSlide}>Zurück</button>
              <button onClick={nextSlide}>Weiter</button>
            </div>
          </SurveyCaroussel>
        </Fragment>
        :
        <div className="corona-survey-loader-container"><CircularLoader /></div>
        }
      </Fragment>
    );
  }
}

const SurveyCaroussel = ({ children }) => (
  <div className="survey-caroussel">{children}</div>
);

const SurveySlideRender = ({ slideNumber, currentSlide, children }) => {
  const isVisible = slideNumber === currentSlide;
  const cls = `survey-slide-render ${isVisible ? 'visible': ''}`;
  const clsInner = 'survey-slide-render__inner';
  return <div className={cls}><div className={clsInner}>{children}</div></div>;
};
