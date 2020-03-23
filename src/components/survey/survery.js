import React, { Component, Fragment } from 'react';
import Select from 'react-select';
import './survey.css';

const binaryAnswers = [
  { value: true, label: 'Ja' },
  { value: false, label: 'Nein' }
];

const handWashDurations = [
  { value: 1, label: '0-5 Sekunden' },
  { value: 2, label: '5-10 Sekunden' },
  { value: 3, label: '10-15 Sekunden' },
  { value: 4, label: '15-20 Sekunden' },
  { value: 5, label: '>20 Sekunden' }
];

export default class CoronaSurvey extends Component {
  constructor() {
    super();
    this.state = {
      cough: false,
      fever: false,
      symptoms: false,
      proximity: false,
      washHands: false,
      washHandsDuration: 0,
      washHandsSoap: false,
      riskyTravel: false,
      symptomaticContact: false,
      diagnosedContact: false,
      criticalContact: false,
    }
  }

  setMetric = (metric, { value }) => {
    this.setState({ [metric]: value });
  }

  render() {
    const { setMetric } = this;
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
              (Halskratzen, Frösteln, erhöhte Temperatur (>37,5), Atemprobleme, Durchfall, Abgeschlagenheit,
              Glieder- oder Muskelschmerzen, Geruchs- oder Geschmacksverlust, Kopfschmerzen, Schnupfen.)
              <Answer metric="symptoms" onChange={setMetric} />
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
              <Answer metric="washHandsDuration" options={handWashDurations} onChange={setMetric} />
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
              *Händeschütteln, Umarmen, von einem gemeinsamen Teller essen, Gegenstände berühren,
              die die Infizierte Person auch berührt hat, weniger als 1,5 m Abstand.
              <Answer metric="criticalContact" onChange={setMetric} />
            </Question>
          </SurveySlide>
          <SurveySlide>
            <div className="corona-survey__conclusion">
              <p>
                Vielen Dank für Ihre Teilnahme!
              </p>
              <p>
                Die Wahrscheinlichkeit einer Infektion beträgt:
                &nbsp;
                {`${Math.random()*100}%`}
              </p>
              <p style={{color: 'red'}}>
                ACHTUNG: Das ist (noch) ein zufällig errechneter Wert dieses Prototyps!!!
              </p>
              <p>
                Mit Hilfe der von Ihnen bereitgestellten Daten wird eine
                weitaus differenziertere Betrachtung der Situation
                möglich sein als mit den gemeldeteten Labortests allein.
              </p>
              <p>
                Halten Sie gut durch! <span role="img">💪</span>
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

const Answer = ({ metric, onChange, options = binaryAnswers }) => (
  <Select
    className="corona-survey__answers"
    name={metric}
    options={options}
    onChange={(option) => { onChange(metric, option) }}
  />
);

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
    this.setState({
      totalSlides: this.props.children.length,
    });
  }

  render() {
    const { props, state, prevSlide, nextSlide } = this;
    const { title, children } = props;
    const { totalSlides, currentSlide } = state;
    // console.log(totalSlides);
    // TODO: Loading spinner while totalSLides <= 0
    return(
      <Fragment>
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
