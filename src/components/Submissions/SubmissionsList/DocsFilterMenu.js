import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';

import FilterMenu from './FilterMenu';

import useCollection from '../../../hooks/useCollection';

const DocsFilterMenu = props => {
  const { collection, title, Icon, selectedFilters, setFilter } = props;

  const [docsState] = useCollection({
    path: collection,
    sort: [{ field: 'createdAt', direction: 'desc' }],
  });
  const docs = docsState.documents;

  if (docsState.loading)
    return <CircularProgress size={32} style={{ marginLeft: 10 }} />;
  if (!docs || docs.length === 0) return null;

  return (
    <FilterMenu
      title={title}
      Icon={Icon}
      items={docs.map(x => ({ value: x.id, label: x.title }))}
      selection={selectedFilters[title]}
      setSelection={val => {
        setFilter(title, val);
      }}
    />
  );
};

export default DocsFilterMenu;
