import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment-timezone'

import { calStageStatus } from '../../utilities/algolia'

class AnalyticsButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            total: 0,
            percentage: 0
        };
    }

    async componentWillMount() {
        try {
            const { heading, from, to } = this.props;
            const fromTimestamp = moment.tz(from, 'YYYY-MM-DD', 'Australia/Sydney').startOf('day').unix();
            const toTimestamp = moment.tz(to, 'YYYY-MM-DD', 'Australia/Sydney').endOf('day').unix();
            let total, percentage;

            total = await this.calTotal(heading, fromTimestamp, toTimestamp);
            percentage = await this.calPercentage(heading, from, to);
            this.setState({
                total: total,
                percentage: percentage
            })
        } catch(error) {
            console.error("Componemt will mount error: ", error.message);
        }
    }

    async componentDidUpdate(prevProps) {
        try {
            const { heading, from, to } = this.props;
            if (from !== prevProps.from || to !== prevProps.to) {
                const fromTimestamp = moment.tz(from, 'YYYY-MM-DD', 'Australia/Sydney').startOf('day').unix();
                const toTimestamp = moment.tz(to, 'YYYY-MM-DD', 'Australia/Sydney').endOf('day').unix();
                let total, percentage;
    
                total = await this.calTotal(heading, fromTimestamp, toTimestamp);
                percentage = await this.calPercentage(heading, from, to);
                this.setState({
                    total: total,
                    percentage: percentage
                })
            }
        } catch(error) {
            console.error("Componemt did update error: ", error.message);
        }
    }

    calTotal = (heading, from, to) => {
        let query;

        // Generate query based on heading.
        switch(heading) {
            case 'New Submissions':
            case 'Submission': {
                query = {
                    stage: 'pre-review',
                    statusList: ['in-review'],
                    from: from,
                    to: to
                };
                break;
            }
            case 'Interview': {
                query = {
                    stage: 'interview',
                    statusList: ['accepted', 'rejected', 'lost'],
                    from: from,
                    to: to
                };
                break;
            }
            case 'Assessment Centre': {
                query = {
                    stage: 'assessment',
                    statusList: ['accepted', 'rejected', 'no show', 'lost', 'conditional'],
                    from: from,
                    to: to
                };
                break;
            }
            case 'Job Placement': {
                query = {
                    stage: 'placed',
                    statusList: ['active', 'contract', 'hired', 'offer', 'interview'],
                    from: from,
                    to: to
                };
                break;
            }
            default:
                throw new Error(`Heading: ${heading} is not defined`);
        } 

        // Calculate total based on query.
        return calStageStatus(query);
    }

    calPercentage = async (heading, from, to) => {
        const curFrom = moment.tz(from, 'YYYY-MM-DD', 'Australia/Sydney').startOf('day');
        const curTo = moment.tz(to, 'YYYY-MM-DD', 'Australia/Sydney').endOf('day');
        const diffDays = Math.ceil(moment.duration(curTo.diff(curFrom)).asDays());
        const pastFrom = curFrom.clone().subtract(diffDays, 'day').startOf('day');
        const pastTo = curTo.clone().subtract(diffDays, 'day').endOf('day');
        let curTotal;
        let pastTotal;
        let diffTotal;
        let percentage;

        curTotal = await this.calTotal(heading, curFrom.unix(), curTo.unix());
        pastTotal = await this.calTotal(heading, pastFrom.unix(), pastTo.unix());
        diffTotal = curTotal - pastTotal;
        percentage = (diffTotal / curTotal) * 100;
        return Math.round(percentage);
    }

    render() {
        const { heading } = this.props;
        const { total, percentage } = this.state;

        return (
            <div>
                <h3>
                    {heading}
                </h3>
                <p>
                    {total}
                </p>
                <p>
                    {percentage + '%'}
                </p>
            </div>
        )
    }
}

export default AnalyticsButton