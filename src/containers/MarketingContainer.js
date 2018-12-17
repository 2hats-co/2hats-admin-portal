import React from 'react';
import { withNavigation } from '../components/withNavigation';
import withStyles from '@material-ui/core/styles/withStyles';

import Fade from '@material-ui/core/Fade';

import LocationIndicator from '../components/LocationIndicator';
import CampaignEditor from '../components/Marketing/CampaignEditor';

import { ROUTES } from '../constants/routes';

const styles = theme => ({
});

function MarketingContainer(props) {
    const { classes } = props;

    return (<Fade in><React.Fragment>
        <LocationIndicator title="Marketing" showBorder
            subRoutes={[
                { label:'Lead Generation', value:ROUTES.marketingLeadGeneration },
                { label:'Email', value:ROUTES.marketingEmail }
            ]}
        />
        <CampaignEditor action="Edit" />
    </React.Fragment></Fade>);
}

export default withNavigation(withStyles(styles)(MarketingContainer));
