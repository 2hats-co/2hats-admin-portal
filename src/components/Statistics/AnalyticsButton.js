import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment-timezone'
import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import PersonIcon from '@material-ui/icons/Person';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import SendIcon from '@material-ui/icons/Send';
import DescriptionIcon from '@material-ui/icons/Description';
import VideocamIcon from '@material-ui/icons/Videocam';
import ListIcon from '@material-ui/icons/List';
import WorkIcon from '@material-ui/icons/Work';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

import { calStageStatus } from '../../utilities/algolia'


const styles = theme =>({
    root: {
        boxSizing: 'border-box',
        width: 130,
        height: 70,
        borderRadius: 5,
        padding: '7px 16px',
        margin: '16px 0',
        boxShadow: '0 5px 25px 0 rgba(108,108,108,0.35)',
        position: 'relative',
        overflow: 'hidden',
        '& *': {
            color: '#fff',
        },
    },
    iconWrapper: {
        position: 'absolute',
        bottom: -16,
        right: -8,
        '& svg': {
            width: 64,
            height: 64,
            opacity: .2,
            position: 'relative',
        },
    },
    orangeGradient: {
        backgroundImage: 'linear-gradient(105deg, #EF8B55 0%, #EC7A86 100%)',
    },
    purpleGradient: {
        backgroundImage: 'linear-gradient(105deg, #3023AE 0%, #C86DD7 100%)',
    },
    blueGradient: {
        backgroundImage: 'linear-gradient(105deg, #373bce 0%, #53A0FD 61%, #7dc1b1 100%)',
    },
    redGradient: {
        backgroundImage: 'linear-gradient(105deg, #B43636 0%, #FF8D00 100%)',
    }
});

class AnalyticsButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            total: 2341,
            change: 2,
            percentage: 1,
        };
    }

    async componentWillMount() {
        try {
            const { from, to, type} = this.props;
            const fromTimestamp = moment.tz(from, 'YYYY-MM-DD', 'Australia/Sydney').startOf('day').unix();
            const toTimestamp = moment.tz(to, 'YYYY-MM-DD', 'Australia/Sydney').endOf('day').unix();
            let total, percentage;

            total = await this.calTotal(type, fromTimestamp, toTimestamp);
            percentage = await this.calPercentage(type, from, to);
            this.setState({
                total: total,
                percentage: percentage
            })
        } catch(error) {
            console.error("Componemt will mount error: ", error.message);
        }
    }

   
    async setData(){
        try {
            const { from, to,type } = this.props;
            if (false) {
                const fromTimestamp = moment.tz(from, 'DD-MM-YYYY', 'Australia/Sydney').startOf('day').unix();
                const toTimestamp = moment.tz(to, 'DD-MM-YYYY', 'Australia/Sydney').endOf('day').unix();
                let total, percentage;
    
                total = await this.calTotal(type, fromTimestamp, toTimestamp);
                percentage = await this.calPercentage(type, from, to);
                console.log('an button',total, percentage)
                this.setState({
                    total: total,
                    percentage: percentage
                })
            }
        } catch(error) {
            console.error("Componemt did update error: ", error.message);
        }

    }

    calTotal = (type, from, to) => {
        let query;

        switch(type) {
            case 'resume': {
                query = {
                    stage: 'pre-review',
                    statusList: ['in-review'],
                    from: from,
                    to: to
                };
                break;
            }
            case 'interview': {
                query = {
                    stage: 'interview',
                    statusList: ['accepted', 'rejected', 'lost'],
                    from: from,
                    to: to
                };
                break;
            }
            case 'assessment': {
                query = {
                    stage: 'assessment',
                    statusList: ['accepted', 'rejected', 'no show', 'lost', 'conditional'],
                    from: from,
                    to: to
                };
                break;
            }
            case 'placement': {
                query = {
                    stage: 'placed',
                    statusList: ['active', 'contract', 'hired'],
                    from: from,
                    to: to
                };
                break;
            }
            default:
                throw new Error(`Heading: ${type} is not defined`);
        } 

        // Calculate total based on query.
        return calStageStatus(query);
    }

    calPercentage = async (type, from, to) => {
        const curFrom = moment.tz(from, 'YYYY-MM-DD', 'Australia/Sydney').startOf('day');
        const curTo = moment.tz(to, 'YYYY-MM-DD', 'Australia/Sydney').endOf('day');
        const diffDays = Math.ceil(moment.duration(curTo.diff(curFrom)).asDays());
        const pastFrom = curFrom.clone().subtract(diffDays, 'day').startOf('day');
        const pastTo = curTo.clone().subtract(diffDays, 'day').endOf('day');
        let curTotal;
        let pastTotal;
        let diffTotal;
        let percentage;

        curTotal = await this.calTotal(type, curFrom.unix(), curTo.unix());
        pastTotal = await this.calTotal(type, pastFrom.unix(), pastTo.unix());
        diffTotal = curTotal - pastTotal;
        percentage = (diffTotal / curTotal) * 100;
        return Math.round(percentage);
    }

    getGradient(type) {
        switch(type) {
            case 'student':    return 'orangeGradient';
            case 'account':    return 'purpleGradient';
            case 'submission': return 'blueGradient';
            case 'resume':     return 'orangeGradient';
            case 'interview':  return 'purpleGradient';
            case 'assessment': return 'blueGradient';
            case 'placement':  return 'redGradient';
            default: return 'orangeGradient';
        }
    }

    getIcon(type) {
        switch (type) {
            case 'student':    return <PersonIcon style={{transform:'scale(1.3)',top:-4}} />;
            case 'account':    return <PersonAddIcon style={{transform:'scale(1.1)',top:-4,left:-6}} />;
            case 'submission': return <SendIcon style={{transform:'scale(0.9)'}} />;
            case 'resume':     return <DescriptionIcon style={{left:-4}} />;
            case 'interview':  return <VideocamIcon style={{transform:'scale(1.1)',left:-1}} />;
            case 'assessment': return <ListIcon />;
            case 'placement':  return <WorkIcon style={{top:6,left:2}} />;
            default: return null;
        }
    }

    render() {
        const { type, classes, timeframe } = this.props;
        const { total, change, percentage } = this.state;
        return (
            <div className={classNames(classes.root, classes[this.getGradient(type)])}>
                <Typography variant="caption" style={{textTransform:'capitalize'}}>{type}</Typography>
                <Grid container alignItems="flex-end">
                    <Grid item xs={7}>
                        <Typography
                            variant={change == 0 ? 'headline' : 'title'}
                            style={change == 0 ? {marginTop:4,fontWeight:500} : {marginTop:1,fontWeight:500}}
                        >
                            {total}
                        </Typography>
                    </Grid>
                    { change == 0 ? null :
                        <Grid item xs={5}>
                            <Typography variant="caption" style={{fontWeight:500}}>
                                {change > 0 ? '+' : null} {change}
                            </Typography>
                        </Grid>
                    }
                </Grid>
                { change == 0 ? null :
                    <Grid container alignItems="center" style={{marginTop:-4}}>
                        <div style={{marginLeft:-7,fontSize:0}}>{change < 0 ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}</div>
                        <Typography variant="caption" style={{textTransform:'lowercase',marginLeft:-3,fontSize:11}}>{`${percentage}% last ${timeframe}`}</Typography>
                    </Grid>
                }
                <div className={classes.iconWrapper}>{this.getIcon(type)}</div>
            </div>
        )
    }
}

export default withStyles(styles)(AnalyticsButton);
