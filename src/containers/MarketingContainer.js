import React from 'react';
import { withNavigation } from '../components/withNavigation';

import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';

import LocationIndicator from '../components/LocationIndicator';
import CampaignEditor from '../components/Marketing/CampaignEditor';
import CampaignCard from '../components/Marketing/CampaignCard';
import TemplateEditor from '../components/Marketing/TemplateEditor';

import { ROUTES } from '../constants/routes';

import moment from 'moment';
import { momentLocales } from '../constants/momentLocales';

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.default,
        minHeight: '100vh',
        overflow: 'auto',
    },
});

const DUMMY_CAMPAIGNS = [
    { name:'Cupcake', live:false, author:'Robo-Shubham', createdAt:0, messages:Math.floor(Math.random()*100), replies:Math.floor(Math.random()*100) },
    { name:'Doughnut', live:false, author:'Robo-Shubham', createdAt:1543223714511, messages:Math.floor(Math.random()*100), replies:Math.floor(Math.random()*100) },
    { name:'Eclair', live:false, author:'Robo-Shubham', createdAt:1542226714511, messages:Math.floor(Math.random()*100), replies:Math.floor(Math.random()*100) },
    { name:'Froyo', live:false, author:'Robo-Shubham', createdAt:1544123714511, messages:Math.floor(Math.random()*100), replies:Math.floor(Math.random()*100) },
    { name:'Gingerbread', live:false, author:'Robo-Shubham', createdAt:1534222714511, messages:Math.floor(Math.random()*100), replies:Math.floor(Math.random()*100) },
    { name:'Honeycomb', live:false, author:'Robo-Shubham', createdAt:1534228714511, messages:Math.floor(Math.random()*100), replies:Math.floor(Math.random()*100) },
    { name:'Ice Cream Sandwich', live:false, author:'Robo-Shubham', createdAt:1512223714511, messages:Math.floor(Math.random()*100), replies:Math.floor(Math.random()*100) },
    { name:'Jelly Bean', live:false, author:'Robo-Shubham', createdAt:1444126714511, messages:Math.floor(Math.random()*100), replies:Math.floor(Math.random()*100) },
    { name:'KitKat', live:false, author:'Robo-Shubham', createdAt:1244226714511, messages:Math.floor(Math.random()*100), replies:Math.floor(Math.random()*100) },
    { name:'Lollipop', live:false, author:'Robo-Shubham', createdAt:1343226714511, messages:Math.floor(Math.random()*100), replies:Math.floor(Math.random()*100) },
    { name:'Marshmallow', live:false, author:'Robo-Shubham', createdAt:1144226714511, messages:Math.floor(Math.random()*100), replies:Math.floor(Math.random()*100) },
    { name:'Nougat', live:false, author:'Robo-Shubham', createdAt:1504226714511, messages:Math.floor(Math.random()*100), replies:Math.floor(Math.random()*100) },
    { name:'Oreo', live:false, author:'Robo-Shubham', createdAt:544226714511, messages:Math.floor(Math.random()*100), replies:Math.floor(Math.random()*100) },
]

function MarketingContainer(props) {
    const { classes, location } = props;

    moment.updateLocale('en', momentLocales);

    return (<Fade in><div className={classes.root}>
        <LocationIndicator title="Marketing" showBorder
            subRoutes={[
                { label:'Lead Generation', value:ROUTES.marketingLeadGeneration },
                { label:'Email', value:ROUTES.marketingEmail }
            ]}
        />
        { location.pathname === '/marketingLeadGeneration' ?
            <React.Fragment>
                <Typography variant="title">Campaigns</Typography>
                { DUMMY_CAMPAIGNS.map((x, i) => <CampaignCard data={x} key={i} />)}
                <CampaignEditor action="Edit" />
            </React.Fragment>
            : <TemplateEditor />
        }
    </div></Fade>);
}

export default withNavigation(withStyles(styles)(MarketingContainer));
