import React, { Component, Fragment } from 'react';
import './data-table.css';

const sortBy = (params) => {
  const {
    prop,
    ascending = true,
  } = params;
  return (a, b) => {
    a = a[prop];
    b = b[prop];
    if(a === b) {
      return 0;
    }
    // empty and null values get sorted after anything else
    else if(a === '' || a === null) {
      return 1;
    }
    else if(b === '' || b === null) {
      return -1;
    } else if(ascending) {
      return a < b ? -1 : 1;
    } else { 
      return a < b ? 1 : -1;
    }
  }
}

export default class DataTable extends Component {
  constructor() {
    super();
    this.state = {
      sortProp: 'country',
      sortAscending: {
        country: true,
        province: true,
        confirmed: true,
        recovered: true,
        deaths: true,
      }, 
    }
  }

  onClickProp = (e) => {
    const { prop } = e.target.dataset,
          { sortProp, sortAscending } = this.state;
    if(!!prop) {
      if(prop === sortProp) {
        sortAscending[prop] = !sortAscending[prop];
      }
      this.setState({
        sortProp: prop,
        sortAscending,
      });
    }
  }

  onClicktDirection = (e) => {
    const { prop } = e.target.parentNode.dataset,
          { sortAscending } = this.state;
    sortAscending[prop] = !sortAscending[prop];
    this.setState({
      sortProp: prop,
      sortAscending });
  }

  render() {
    const { props, state, onClickProp, onClicktDirection } = this,
          { sortProp, sortAscending } = state,
          dataset = props.dataset.sort(sortBy({
            prop: sortProp,
            ascending: sortAscending[sortProp],
          }));
    
    return(
      <Fragment>
        <div className="data-table-hero"></div>
        <div className="data-table-container">
          <h2>Data table</h2>
          <div className="data-table">
            <table>
              <TableHead
                onClickProp={onClickProp}
                onClicktDirection={onClicktDirection}
                selected={sortProp}
                sortDirections={sortAscending}
                columns={[
                  { title: 'Country / Region', prop: 'country' },
                  { title: 'Province / State', prop: 'province' },
                  { title: 'Confirmed', prop: 'confirmed' },
                  { title: 'Recovered', prop: 'recovered' },
                  { title: 'Deaths', prop: 'deaths' },
                ]}
              />
              <tbody>
                {dataset.map((d, i) => <Row key={i} datapoint={d} />)}
              </tbody>
            </table>
          </div>
        </div>
      </Fragment>
    );
  }
}

const TableHead = (props) => {
  const {
    columns,
    selected,
    onClickProp,
    onClicktDirection,
    sortDirections
  } = props;
  return(
    <thead>
      <tr>
        {columns.map((c, i) => {
          const { title, prop } = c;
          const cls = `data-table-category ${prop === selected ? 'selected' : ''}`;
          const clsIcon = `data-table-category__sort-control ${sortDirections[prop] ? 'ascending' : ''}`;
          return(
            <th key={i} className={cls} data-prop={prop} onClick={onClickProp}>
              {title}
              <span className={clsIcon} onClick={onClicktDirection}>
                <SortingArrowsIcon />
              </span>
            </th>
          );
        })}
      </tr>
    </thead>
  );
}

const Row = ({ datapoint }) => {
  const {
    country, province, confirmed, recovered, deaths,
  } = datapoint;
  return(
    <tr>
      <td>{country}</td>
      <td>{province}</td>
      <td>{confirmed}</td>
      <td>{recovered}</td>
      <td>{deaths}</td>
    </tr>
  );
}

const SortingArrowsIcon = () => (
  <svg width="24" height="24" viewBox="0 -4 20 35">
    <path transform="translate(-6 -5)" d="M12 0l8 9h-6v15h-4v-15h-6z"/>
    <path transform="translate( 6  5)" d="M12 24l-8-9h6v-15h4v15h6z"/>
  </svg>
);
