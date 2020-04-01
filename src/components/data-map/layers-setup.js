import theme from '../../theme/theme';

const isZoomed = (trueVal, falseVal) => (
  ['step', ['zoom'], falseVal, 4.75, trueVal, 6.25, falseVal]
);

/*
const circleColor = ['step',
  ['get', 'confirmed'],
  '#03befc',
  20, '#f1f075',
  800, '#f28cb1',
  5000, '#ba1818'
];
*/

const circleRadius = (metric, scale = 1) => {
  return isZoomed(['interpolate',
    ['linear'],
    ['get', metric],
    100, scale*8,
    10000, scale*16,
    100000, scale*24,
    200000, scale*32
  ], 0);
}

export const confirmedLayer = {
  id: 'confirmed',
  type: 'circle',
  source: 'points-condensed',
  paint: {
    'circle-color': theme.color.infected,
    'circle-opacity': .8,
    'circle-radius': circleRadius('confirmed', 1),
  }
}

export const recoveredLayer = {
  id: 'recovered',
  type: 'circle',
  source: 'points-condensed',
  paint: {
    'circle-color': theme.color.recovered,
    'circle-opacity': .7,
    'circle-radius': circleRadius('recovered', .8),
  }
}

export const deathsLayer = {
  id: 'deaths',
  type: 'circle',
  source: 'points-condensed',
  paint: {
    'circle-color': theme.color.deaths,
    'circle-opacity': .6,
    'circle-radius': circleRadius('deaths', .67),
  }
}

export const countLayer = {
  id: 'cluster-count',
  type: 'symbol',
  source: 'points-condensed',
  layout: {
    'text-field': ['get', 'confirmed'],
    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
    'text-size': isZoomed(8, 0),
  }
}

export const areasLayer = {
  id: 'tile-paint',
  type: 'fill',
  source: 'areas-countries',
  layout: {},
  paint: {
    'fill-color': ['interpolate-hcl',
      ['linear'],
      ['get', 'confirmed'],
      0,
      '#52ff00',
      400000,
      '#c70039',
    ],
    'fill-opacity': ['interpolate',
      ['linear'],
      ['get', 'deaths'],
      0,
      .1,
      400000,
      1,
    ],
  }
}

export const surveyLayerClustered = {
  id: 'survey-clustered',
  type: 'circle',
  source: 'points-survey',
  filter: ['has', 'point_count'],
  paint: {
    'circle-color': ['step',
      ['get', 'point_count'],
      '#555',
      100, '#333',
      750, theme.color.dark,
    ],
    'circle-radius': ['step',
      ['get', 'point_count'],
      10,
      100, 14,
      750, 18,
    ]
  }
}
   
export const surveyLayerUnclustered = {
  id: 'survey-unclustered',
  type: 'circle',
  source: 'points-survey',
  filter: ['!', ['has', 'point_count']],
  paint: {
    'circle-color': ['interpolate-hcl',
    ['linear'],
    ['*', ['get', 'probability'], 100],
    0, '#ffd333',
    100, '#ff5733',
  ],
    'circle-radius': 5,
    'circle-stroke-width': 1,
    'circle-stroke-color': 'transparent',
  }
}

export const surveyLayerCount = {
  id: 'survey-count',
  type: 'symbol',
  source: 'points-survey',
  filter: ['has', 'point_count'],
  layout: {
    'text-field': '{point_count_abbreviated}',
    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
    'text-size': 12,
  },
  paint: {
    'text-color': theme.color.light,
  }
}
