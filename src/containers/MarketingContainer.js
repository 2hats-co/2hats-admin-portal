import React, { Suspense, lazy } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Fade from '@material-ui/core/Fade';

import LocationIndicator from '../components/LocationIndicator';

import { ROUTES } from '../constants/routes';

import moment from 'moment';
import { momentLocales } from '../constants/momentLocales';

import withNavigation from '../components/withNavigation';
import LoadingHat from '../components/LoadingHat';

const LinkedinCampaigns = lazy(() =>
  import('../components/Marketing/LinkedinCampaigns' /* webpackChunkName: "LinkedinCampaigns" */)
);
const EmailTemplates = lazy(() =>
  import('../components/Marketing/EmailTemplates' /* webpackChunkName: "EmailTemplates" */)
);

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
        <Suspense fallback={<LoadingHat />}>
          <LocationIndicator
            title="Marketing"
            showShadow
            subRoutes={[
              {
                label: 'Lead Generation',
                value: ROUTES.marketingLeadGeneration,
              },
              { label: 'Email', value: ROUTES.marketingEmail },
            ]}
          />
          {location.pathname === '/marketingLeadGeneration' ? (
            <LinkedinCampaigns />
          ) : (
            <EmailTemplates />
          )}
        </Suspense>
      </div>
    </Fade>
  );
}

export default withNavigation(withStyles(styles)(MarketingContainer));
