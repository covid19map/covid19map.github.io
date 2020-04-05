export const sortBy = (params) => {
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

// TODO: Fix user story 'prop !== sortProp'
// for both click handlers
//
export const handleClickSortProp = (e, hooks) => {
  const { prop } = e.target.dataset,
        { sortProp, sortAscending, onSortProp, onSortAscending } = hooks,
        _sortAscending = { ...sortAscending };
  
  if(!!prop) {
    if(prop === sortProp) {
      _sortAscending[prop] = !_sortAscending[prop];
    }
    onSortProp(prop);
    onSortAscending(_sortAscending);
  }
}

export const handleClickSortDirection = (e, hooks) => {
  const { prop } = e.target.parentNode.dataset,
        { sortAscending, onSortProp, onSortAscending } = hooks,
        _sortAscending = { ...sortAscending };

  _sortAscending[prop] = !_sortAscending[prop];
  onSortProp(prop);
  onSortAscending(_sortAscending);
}
