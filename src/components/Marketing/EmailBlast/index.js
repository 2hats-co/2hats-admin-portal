import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';

import AddIcon from '@material-ui/icons/Add';

import Form from '../../Form';
import BlastList from './BlastList';
import BlastDetails from './BlastDetails';
import BlastPreview from './BlastPreview';

import useAuthedUser from '../../../hooks/useAuthedUser';
import useDocument from '../../../hooks/useDocument';
import { createDoc } from '../../../utilities/firestore';
import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';

import { COLLECTIONS } from '@bit/sidney2hats.2hats.global.common-constants';
import { ROUTES } from '../../../constants/routes';
import emailBlastFields from '../../../constants/forms/emailBlast';

const styles = theme => ({
  root: {
    height: 'calc(100vh - 64px)',
  },

  blastListWrapper: {
    backgroundColor: theme.palette.background.paper,
    borderRight: `1px solid ${theme.palette.divider}`,
    position: 'relative',
  },
  addButton: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },

  detailsWrapper: {
    overflowY: 'scroll',
    height: '100%',
  },

  // wrapperGrid: {
  //   minHeight: 400,
  // },

  noBlasts: {
    height: '100%',
    color: theme.palette.text.secondary,
    textAlign: 'center',
    cursor: 'default',
    userSelect: 'none',
    '& svg': {
      fontSize: 48,
      color: theme.palette.text.disabled,
    },
  },
});

function EmailBlast(props) {
  const { classes, location, history } = props;

  const [showForm, setShowForm] = useState(false);
  const [blastState, dispatchBlast] = useDocument();
  let selectedBlast = blastState.doc;

  const isMobile = useMediaQuery('(max-width: 704px)');
  const currentUser = useAuthedUser();

  const createBlast = data => {
    createDoc(COLLECTIONS.emailBlasts, { ...data, createdBy: currentUser.UID });
  };

  useEffect(
    () => {
      selectedBlast = null;
      const parsedQuery = queryString.parse(location.search);
      if (parsedQuery.id)
        dispatchBlast({ path: `${COLLECTIONS.emailBlasts}/${parsedQuery.id}` });
    },
    [location.search]
  );

  return (
    <>
      <Grid container className={classes.root}>
        <Grid
          item
          className={classes.blastListWrapper}
          style={{
            width: isMobile ? '100%' : 320,
            height: 'calc(100vh - 64px)',
          }}
        >
          <BlastList
            selectedBlast={selectedBlast}
            setSelectedBlast={blast => {
              dispatchBlast({
                path: `${COLLECTIONS.emailBlasts}/${blast.id}`,
              });
              history.push(`${ROUTES.marketingEmailBlast}?id=${blast.id}`);
            }}
          />

          <Fab
            color="primary"
            onClick={() => {
              setShowForm(true);
            }}
            className={classes.addButton}
          >
            <AddIcon />
          </Fab>
        </Grid>
        <Grid item xs className={classes.detailsWrapper}>
          {selectedBlast ? (
            <BlastDetails data={selectedBlast} />
          ) : (
            <Grid
              container
              justify="center"
              alignItems="center"
              className={classes.noBlasts}
            >
              <Grid item>
                <Typography variant="subtitle1" color="textSecondary">
                  No open blasts
                </Typography>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
      <Form
        action="Create"
        actions={{
          Create: createBlast,
          close: () => {
            setShowForm(false);
          },
        }}
        data={emailBlastFields()}
        open={showForm}
        classes={{
          justFormWrapper: classes.justFormWrapper,
          wrapperGrid: classes.wrapperGrid,
        }}
        formFooter={values => (
          <BlastPreview query={values.query} template={values.templateId} />
        )}
        formTitle="Blast!"
      />
    </>
  );
}

export default withRouter(withStyles(styles)(EmailBlast));
