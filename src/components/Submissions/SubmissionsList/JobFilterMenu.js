import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import JobIcon from '@material-ui/icons/BusinessCenterOutlined';

import FilterMenu from './FilterMenu';

import useCollection from '../../../hooks/useCollection';
import { COLLECTIONS } from '@bit/sidney2hats.2hats.global.common-constants';

const JobFilterMenu = props => {
  const { selectedFilters, setFilter } = props;

  const [jobsState] = useCollection({
    path: COLLECTIONS.jobs,
    sort: [{ field: 'createdAt', direction: 'desc' }],
  });
  const jobs = jobsState.documents;

  if (jobsState.loading)
    return <CircularProgress size={32} style={{ marginLeft: 10 }} />;
  if (!jobs || jobs.length === 0) return null;

  return (
    <FilterMenu
      title="job"
      Icon={JobIcon}
      items={jobs.map(x => ({ value: x.id, label: x.title }))}
      selection={selectedFilters.job}
      setSelection={val => {
        setFilter('job', val);
      }}
    />
  );
};

export default JobFilterMenu;
