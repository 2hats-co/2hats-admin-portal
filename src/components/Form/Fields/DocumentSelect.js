import React, { useEffect } from 'react';

import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';

import Select from './Select';
import useCollection from '../../../hooks/useCollection';

const labelReducer = (doc, mappings) => {
  const output = {};

  if (Array.isArray(mappings.label))
    output.label = mappings.label
      .reduce((a, c) => a + ' – ' + doc[c], '')
      .substr(2);
  else output.label = doc[mappings.label];

  output.value = doc[mappings.value];

  return output;
};

const DocumentSelect = props => {
  const { collection, mappings, formikProps, name, width } = props;
  const { setValues, values } = formikProps;

  const [collectionState] = useCollection({
    path: collection,
    // sort: [{ field: 'createdAt', direction: 'desc' }],
  });
  const docs = collectionState.documents;
  const suggestions = docs ? docs.map(x => labelReducer(x, mappings)) : [];
  // return <Select {...props} disabled/>;

  useEffect(
    () => {
      if (values[name] && suggestions.length > 0) {
        if (Array.isArray(values[name])) {
          const existingValues = values[name].map(v => {
            const filtered = suggestions.filter(x => x.value === v);
            return filtered[0];
          });
          setValues({ ...values, [name]: existingValues });
        } else {
          const filtered = suggestions.filter(x => x.value === values[name]);
          if (filtered.length > 0)
            setValues({ ...values, [name]: filtered[0] });
        }
      }
    },
    [collectionState.documents]
  );

  if (collectionState.loading)
    return (
      <Grid item xs={width || 12} style={{ height: 78 }}>
        <Grid
          container
          alignItems="center"
          justify="center"
          style={{ height: '100%', padding: 8 }}
        >
          <LinearProgress style={{ width: '100%' }} />
        </Grid>
      </Grid>
    );

  if (!docs || docs.length === 0) return <div />;
  return <Select {...props} suggestions={suggestions} />;
};

export default DocumentSelect;
