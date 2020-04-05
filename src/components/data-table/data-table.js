import React, { Fragment, useState, useEffect, useContext } from 'react';
import DataContext from '../../context/data-context';
import { sortBy, handleClickSortProp, handleClickSortDirection } from './data-table-utilities';
import { ReactComponent as ArrowsSortIcon } from '../../icons/arrows-sort.svg';
import './data-table.css';

function TableHead(props) {
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
                <ArrowsSortIcon />
              </span>
            </th>
          );
        })}
      </tr>
    </thead>
  );
}

function Row({ datapoint }) {
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

function DataTable() {
  const [dataset, setDataset] = useState([]);
  const [sortProp, setSortProp] = useState('country');
  const [sortAscending, setSortAscending] = useState({
    country: true,
    province: true,
    confirmed: true,
    recovered: true,
    deaths: true,
  });
  const _data = useContext(DataContext);

  useEffect(() => {
    if(!!_data) {
      if(_data.hasOwnProperty('laboratory')) {
        const dataLab = Object.values(_data.laboratory);
        if(dataLab.length > 0) {
          const dataLabLatest = dataLab.slice(-1)[0];
          setDataset(dataLabLatest.sort(sortBy({
            prop: sortProp,
            ascending: sortAscending[sortProp],
          })));
        }
      }
    }
  }, [_data, sortProp, sortAscending]);

  return(
    <Fragment>
      <div className="data-table-hero"></div>
      <div className="data-table-container">
        <h2>Data table</h2>
        <div className="data-table">
          <table>
            <TableHead
              onClickProp={(e) => {
                handleClickSortProp(e, {
                  sortProp,
                  sortAscending,
                  onSortProp: setSortProp,
                  onSortAscending: setSortAscending,
                })
              }}
              onClicktDirection={(e) => {
                handleClickSortDirection(e, {
                  sortAscending,
                  onSortProp: setSortProp,
                  onSortAscending: setSortAscending,
                })
              }}
              selected={sortProp}
              sortDirections={sortAscending}
              columns={[
                { title: 'Country', prop: 'country' },
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

export default DataTable;

/*
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
      sortAscending,
    });
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
                  { title: 'Country', prop: 'country' },
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
*/
