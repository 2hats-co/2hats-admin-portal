import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import IntegrationReactSelect from './IntegrationReactSelect';

import { AdminsConsumer } from '../contexts/AdminsContext';

const styles = theme => ({
  root: {
    minWidth: 480,
  },
  iconButton: {
    padding: theme.spacing.unit * 1.5,
    borderRadius: '50%',
    minWidth: 'auto',
    marginRight: -10,
    '& svg': { marginRight: 0 },
  },
});

function AdminSelector(props) {
  const {
    //classes,
    selected,
    onSelect,
  } = props;

  const handleSelector = data => {
    onSelect(data.value);
  };

  return (
    <AdminsConsumer>
      {context => {
        if (context.admins) {
          let adminOptions = context.admins.map(x => ({
            label: `${x.givenName} ${x.familyName}`,
            avatarURL: x.avatarURL,
            value: x.id,
          }));

          return (
            <React.Fragment>
              <IntegrationReactSelect
                intialValue={selected}
                value={selected}
                placeholder="Select Assignee"
                autoFocus
                changeHandler={handleSelector}
                suggestions={[
                  { label: 'UNASSIGNED', value: '' },
                  ...adminOptions,
                ]}
              />
            </React.Fragment>
          );
        } else {
          return <p>loadin</p>;
        }
      }}
    </AdminsConsumer>
  );
}

export default withStyles(styles)(AdminSelector);
