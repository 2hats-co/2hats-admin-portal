import React, { useState, useEffect } from 'react'
import {withNavigation} from '../components/withNavigation';

import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import { useSubmission } from '../hooks/useSubmission';

import LocationIndicator from '../components/LocationIndicator';
import Done from '../components/Done';
import Submission from '../components/Submission';
import ScreeningForm from '../components/ScreeningForm';
import FeedbackForm from '../components/FeedbackForm';
import TemplateGenerator from '../components/TemplateGenerator';

function SumbissionsContainer(props) {
    const { location } = props;

    const [template, setTemplate] = useState(null);
    const [showDisqualify, setShowDisqualify] = useState(false);

    const submission = useSubmission(location.pathname.replace('/',''));

    const locationIndicator = <LocationIndicator
                                title="Submissions"
                                subRoutes={['/pending', '/rejected', '/accepted']}
                            />;

    if (!submission) {
        return <React.Fragment>
            { locationIndicator }
            <Grid container justify="center" alignItems="center" style={{ height: 'calc(100vh - 64px)' }}>
                <CircularProgress size={50} />
            </Grid>
        </React.Fragment>;
    }

    let rightPanel;
    switch (location.pathname) {
        case '/pending':
            rightPanel = <ScreeningForm
                            submissionID={submission.id}
                            setTemplate={setTemplate}
                            showDisqualify={showDisqualify}
                            setShowDisqualify={setShowDisqualify}
                        />;
            break;
        case '/rejected':
        case '/accepted':
            rightPanel = null;
            break;
            // rightPanel = <FeedbackForm
            //     sections={/*SUBMISSION_FEEDBACK*/null}
            //     submissionID={submission.id}
            //     getNextSubmission={this.getNextSubmission}
            //     skipHandler={this.handleSkip}
            //     disableSkip={this.state.disableSkip}
            // />;
    }

    if (submission.complete) {
        return <React.Fragment> { locationIndicator } <Done /> </React.Fragment>
    }

    return(<React.Fragment>
        { locationIndicator }
        <Grid container style={{ height: 'calc(100vh - 64px)' }}>
            <Grid item xs>
                <Submission
                    submission={submission}
                    listType={location.pathname.split('/')[1]}
                />
                { template &&
                    <TemplateGenerator
                        template={template}
                        recipientUID={submission.UID}
                        route=""
                        close={ () => { setTemplate(null); setShowDisqualify(false) } }
                    />
                }
            </Grid>
            <Grid item style={{width:400}}>
                { rightPanel }
            </Grid>
        </Grid>
    </React.Fragment>);
}

export default withNavigation(SumbissionsContainer);
