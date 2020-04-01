import React, { Component, Fragment } from 'react';
import Select from 'react-select';
import { CircularLoader } from '../../loader/loader';
import { Button } from '../../../theme/base-components';
import { percentageDisplay } from '../../../utilities/formatting';
import { binaryAnswers, handWashDurations, symptomsCovid } from '../survey';
import './survey-questionnaire.css';

const postQuestionnaire = data => {
  // Dummy POST
  const res = true;
  console.log('post survey questionnaire', res, data);
  return res;
}

export default class SurveyQuestionnaire extends Component {
  render() {
    const { props } = this,
          { credentials, metrics, metricsHandlers, onShowProfile } = props,
          { infectionProbability } = metrics,
          { onSetMetric, onSetSymptoms } = metricsHandlers;

    return(
      <div className="corona-survey">
        <CoronaSurveyHero /> 
        <Survey title="COVID-19 infection probability assesement">
          <SurveySlide>
            <Question>
              Haben Sie aktuell oder hatten Sie in den vergangenen zwei Wochen trockenen Husten?
              <Answer metric="cough" onChange={onSetMetric} />
            </Question>
            <Question>
              Haben Sie aktuell oder hatten Sie in den vergangenen zwei Wochen Fieber (>37,9)?
              <Answer metric="fever" onChange={onSetMetric} />
            </Question>
            <Question>
              Haben oder hatten Sie in den vergangenen zwei Wochen zusätzlich dazu eine oder mehrere der folgenden Symptome?
              Wenn ja, welche?
              <Answer
                metric="symptoms"
                onChange={onSetSymptoms}
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
              <Answer metric="proximity" onChange={onSetMetric} />
            </Question>
            <Question>
              Waschen Sie sich häufig die Hände (mind. 3x am Tag)?
              <Answer metric="washHands" onChange={onSetMetric} />
            </Question>
            <Question>
              Für wie lange waschen Sie sich die Hände?
              <Answer
                metric="washHandsDuration"
                options={handWashDurations}
                onChange={onSetMetric}
              />
            </Question>
            <Question>
              Verwenden Sie Seife?
              <Answer metric="washHandsSoap" onChange={onSetMetric} />
            </Question>
          </SurveySlide>
          <SurveySlide>
            <Question>
              Sind Sie in den vergangenen zwei Wochen in eines dieser Risikogebiete gereist?
              (RKI, Stand 21.3.2020: Ägypten, China (Provinz Hubei), Iran, Italien,
              Österreich (Bundesland Tirol), Spanien (Madrid),
              Südkorea (Provinz Gyeongsangbuk-do (Nord-Gyeongsang),
              USA (Bundesstaaten Kalifornien, Washington und New York))
              <Answer metric="riskyTravel" onChange={onSetMetric} />
            </Question>
          </SurveySlide>
          <SurveySlide>
            <Question>
              Haben Sie aktuell oder hatten Sie in den vergangenen zwei Wochen Kontakt*
              zu einer Person, die gehustet hat?
              <Answer metric="symptomaticContact" onChange={onSetMetric} />
            </Question>
            <Question>
              Haben Sie aktuell oder hatten Sie in den vergangenen zwei Wochen Kontakt* zu einer Person,
              die leicht an COVID-19 erkrankt ist
              (labortechnisch festgestellt, ohne Fieber, mit Husten, Halskratzen und/oder ggf. Abgeschlagenheit)?
              <Answer metric="diagnosedContact" onChange={onSetMetric} />
            </Question>
            <Question>
              Haben Sie aktuell oder hatten Sie in den vergangenen zwei Wochen Kontakt*
              zu einer Person, die schwer an COVID-19 erkrankt ist
              (labortechnisch festgestellt, mit Husten, Fieber und/oder Lungenentzündung)?
              <Answer metric="criticalContact" onChange={onSetMetric} />
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
                {`${percentageDisplay(infectionProbability*100)}%`}
              </p>
              {/*TODO: Cancel on launch*/}
              <p style={{color: 'red'}}>
                ACHTUNG: Dies ist ein Prototyp!
                Der errechnete Wert basiert auf einem
                noch nicht bestätigten Modell.
              </p>
              <p>
                <Button onClick={() => {
                  postQuestionnaire({ credentials, metrics })
                }}>
                  <SendIcon />
                  Daten absenden
                </Button>
              </p>
              <p>
                Mit Hilfe der von Ihnen bereitgestellten Daten wird eine
                weitaus differenziertere Betrachtung der Situation
                möglich sein als mit den gemeldeteten Labortests allein.
              </p>
              <p>
                Halten Sie gut durch! <span role="img" aria-label="strength">💪</span>
              </p>
              <p>
                <Button onClick={onShowProfile}>
                  <ProfileIcon />
                  Zum Profil
                </Button>
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

export const Answer = props => {
  const {
    metric,
    onChange,
    options = binaryAnswers,
    value,
    multi = false,
    closeMenuOnSelect = true,
  } = props;

  let _value;
  if(!(value == null)) {
    if(multi) {
      // `value` will be an arary
      _value = options.filter(o => value.includes(o.value));
    } else {
      // `value` will be a string || int
      _value = options.filter(o => o.value === value);
    }
  }

  return(
    <Select
      className="corona-survey__answers"
      name={metric}
      isMulti={multi}
      options={options}
      value={_value}
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
    const clsPrev = `survery-caroussel__controls__navigation ${ currentSlide === 0 ? 'disabled' : ''}`;
    const clsNext = `survery-caroussel__controls__navigation ${ currentSlide === totalSlides - 1 ? 'disabled' : ''}`;
    return(
      <Fragment>
        {totalSlides > 0 ?
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
                <button className={clsPrev} onClick={prevSlide}>Zurück</button>
                <button className={clsNext} onClick={nextSlide}>Weiter</button>
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

const SendIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24">
    <path d="M0 12l11 3.1 7-8.1-8.156 5.672-4.312-1.202 15.362-7.68-3.974 14.57-3.75-3.339-2.17 2.925v-.769l-2-.56v7.383l4.473-6.031 4.527 4.031 6-22z" />
  </svg>
);

const ProfileIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24">
    <path d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z" />
  </svg>
);
