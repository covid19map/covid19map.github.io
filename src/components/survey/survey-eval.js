const _scalarMult = (scalar, array) => (
  array.map(x => scalar * x)
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

export const evalInfectionProbability = metrics => {
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
