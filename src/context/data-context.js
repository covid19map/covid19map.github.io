import { createContext } from 'react';

export const data = {
  laboratory: {},
  survey: {},
}

const DataContext = createContext(data);

export default DataContext;
