import React from 'react';
import { withNavigation } from '../components/withNavigation';
import withStyles from '@material-ui/core/styles/withStyles';

import Fade from '@material-ui/core/Fade';

import LocationIndicator from '../components/LocationIndicator';
import CampaignEditor from '../components/Marketing/CampaignEditor';
import TemplateEditor from '../components/Marketing/TemplateEditor';

import { ROUTES } from '../constants/routes';

const styles = theme => ({
});

function MarketingContainer(props) {
    const { classes, location } = props;

    return (<Fade in><React.Fragment>
        <LocationIndicator title="Marketing" showBorder
            subRoutes={[
                { label:'Lead Generation', value:ROUTES.marketingLeadGeneration },
                { label:'Email', value:ROUTES.marketingEmail }
            ]}
        />
        { location.pathname === '/marketingLeadGeneration' ?
            <CampaignEditor action="Edit" />
            : <TemplateEditor />
        }
    </React.Fragment></Fade>);
}

export default withNavigation(withStyles(styles)(MarketingContainer));
