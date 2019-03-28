import React, { Suspense, lazy } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Fade from '@material-ui/core/Fade';

import LocationIndicator from '../components/LocationIndicator';

import { ROUTES } from '../constants/routes';

import moment from 'moment';
import { momentLocales } from '../constants/momentLocales';

import withNavigation from '../components/withNavigation';
import LoadingHat from '../components/LoadingHat';

const LinkedInCampaigns = lazy(() =>
  import('../components/Marketing/LinkedinCampaigns' /* webpackChunkName: "LinkedinCampaigns" */)
);
const EmailBlast = lazy(() =>
  import('../components/Marketing/EmailBlast' /* webpackChunkName: "EmailBlast" */)
);

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100vh',
    overflow: 'auto',
  },
});

const pathContent = path => {
  switch (path) {
    case ROUTES.marketingLeadGeneration:
      return <LinkedInCampaigns />;
    case ROUTES.marketingEmailBlast:
      return <EmailBlast />;
    default:
  }
};

function MarketingContainer(props) {
  const { classes, location } = props;

  moment.updateLocale('en', momentLocales);

  return (
    <Fade in>
      <div className={classes.root}>
        <Suspense fallback={<LoadingHat />}>
          <LocationIndicator
            title="Marketing"
            showBorder
            subRoutes={[
              {
                label: 'Lead Generation',
                value: ROUTES.marketingLeadGeneration,
              },
              {
                label: 'EmailBlast❗',
                value: ROUTES.marketingEmailBlast,
              },
            ]}
          />

          {pathContent(location.pathname)}
        </Suspense>
      </div>
    </Fade>
  );
}

export default withNavigation(withStyles(styles)(MarketingContainer));
