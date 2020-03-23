export const circleLayer = {
  id: 'clusters',
  type: 'circle',
  source: 'covid-19',
  paint: {
    'circle-color': [
      'step',
      ['get', 'confirmed'],
      '#03befc', 20,
      '#f1f075', 800,
      '#f28cb1', 5000,
      '#ba1818'
    ],
    'circle-radius': [
      'step',
      ['zoom'], 4, 2, 6, 4, [
        'interpolate',
        ['cubic-bezier', 0, 0.5, 1, 0.5 ],
        ['get', 'confirmed'],
        20,  8,
        5000, 25
      ]
    ],
  }
};

export const countLayer = {
  id: 'cluster-count',
  type: 'symbol',
  source: 'covid-19',
  layout: {
    'text-field': ['get', 'confirmed'],
    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
    'text-size': ['step', ['zoom'], 0, 4, 11],
  }
};
