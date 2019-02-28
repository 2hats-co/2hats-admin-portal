import React from 'react';

import Select from './Select';
import useCollection from '../../../hooks/useCollection';

const DocumentSelect = props => {
  const { collection, mappings } = props;

  const [collectionState] = useCollection({
    path: collection,
    // sort: [{ field: 'createdAt', direction: 'desc' }],
  });
  const docs = collectionState.documents;
  const suggestions = docs
    ? docs.map(x => ({ value: x[mappings.value], label: x[mappings.label] }))
    : [];
  if (collectionState.loading) return 'loading';
  // return <Select {...props} disabled/>;

  if (!docs || docs.length === 0) return <div />;
  return <Select {...props} suggestions={suggestions} />;
};

export default DocumentSelect;
