import React from 'react';
//import withNavigation from '../components/withNavigation';

import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';

import LocationIndicator from '../components/LocationIndicator';
import TemplateEditor from '../components/Marketing/TemplateEditor';

import { ROUTES } from '../constants/routes';

import moment from 'moment';
import { momentLocales } from '../constants/momentLocales';

import withNavigation from '../components/withNavigation';
import LinkedinCampaigns from '../components/Marketing/LinkedinCampaigns';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100vh',
    overflow: 'auto',
  },
});

function MarketingContainer(props) {
  const { classes, location } = props;

  moment.updateLocale('en', momentLocales);

  return (
    <Fade in>
      <div className={classes.root}>
        <LocationIndicator
          title="Marketing"
          showBorder
          subRoutes={[
            { label: 'Lead Generation', value: ROUTES.marketingLeadGeneration },
            { label: 'Email', value: ROUTES.marketingEmail },
          ]}
        />
        {location.pathname === '/marketingLeadGeneration' ? (
          <LinkedinCampaigns />
        ) : (
          <TemplateEditor />
        )}
      </div>
    </Fade>
  );
}

export default withNavigation(withStyles(styles)(MarketingContainer));
