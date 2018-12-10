import React, { useState, useEffect } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Slide from '@material-ui/core/Slide';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import SearchIcon from '@material-ui/icons/Search';
import PersonIcon from '@material-ui/icons/Person';
import SubmissionIcon from '@material-ui/icons/DescriptionOutlined';
import ResumeIcon from '@material-ui/icons/Attachment';

import { useSearch } from '../../hooks/useSearch';

const styles = theme => ({
    modalRoot: {
        backgroundColor: 'rgba(0,0,0,.35)',
    },
    root: {
        paddingTop: 64,
        outline: 'none',
    },
    paperRoot: {
        borderRadius: 20,
    },
    searchIcon: {
        fontSize: 28,
        marginRight: 12,
        opacity: .54,
    },
    searchInput: {
        fontSize: 24,
        fontWeight: 500,
        padding: '12px 0 12px 22px',
        width: 640,
    },
    listRoot: {
        borderRadius: '0 0 20px 20px',
        overflow: 'hidden',
    },
    list: {
        '&::before': {
            content: '""',
            display: 'block',
            width: 576,
            height: 1,
            backgroundColor: 'rgba(0,0,0,.1)',
            
            position: 'relative',
            top: -8,
            left: 64,
        },
    },
    listIcon: {
        margin: 0,
    },
    secondaryAction: {
        right: theme.spacing.unit,
    },
    noResults: {
        paddingLeft: 40,
        opacity: .54,
    },
});


function Search(props) {
    const { history, classes, showSearch, setShowSearch } = props;

    const [slide, setSlide] = useState(true);

    useEffect(() => {
        setSlide(showSearch);
    }, [showSearch]);

    const onClose = () => {
        setSlide(false);
        setTimeout(() => { setShowSearch(false); }, 200);
    }

    const handleRoute = (hit) => {
        const {stage, status, objectID} = hit;
        console.log(stage, status, objectID);
        if (status !=='pre-review' || status !=='incomplete' || status !=='complete') {
            history.push(`/submissions?uid=${objectID}`);
        }
    };

    const [searchState, searchDispatch] = useSearch();
    const { results } = searchState;
    console.log('results',results);

    return(<Modal open={showSearch} onClose={onClose} classes={{ root: classes.modalRoot }}>
        <Grid container justify="center" alignContent="center" className={classes.root}>
            <Slide in={slide} direction="down" timeout={200}>
                <Paper elevation={24} classes={{ root: classes.paperRoot }}>
                    <InputBase
                        autofocus
                        className={classes.searchInput}
                        onChange={e => { searchDispatch({search:e.target.value})}}
                        placeholder="Search candidates"
                        startAdornment={<SearchIcon className={classes.searchIcon} />}
                    />
                    <List component="nav" className={classes.list} classes={{ root:classes.listRoot }}>
                        {results.hits && results.hits.length > 0 ? results.hits.map( (hit, i) =>
                            <ListItem key={i}>
                                <ListItemIcon classes={{ root:classes.listIcon }} ><PersonIcon /></ListItemIcon>
                                <ListItemText primary={`${hit.firstName} ${hit.lastName}`} />
                                <ListItemSecondaryAction classes={{ root:classes.secondaryAction }}>
                                    { hit.resume &&
                                        <Tooltip title="Resume">
                                            <IconButton onClick={()=>{ window.open(hit.resume.downloadURL, '_blank') }}>
                                                <ResumeIcon />
                                            </IconButton>
                                        </Tooltip>
                                    }

                                    <Tooltip title="Submission">
                                        <IconButton onClick={()=>{handleRoute(hit)}}>
                                            <SubmissionIcon />
                                        </IconButton>
                                    </Tooltip>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ) :
                            <ListItem>
                                <ListItemText primary="No results" className={classes.noResults}></ListItemText>
                            </ListItem>
                        }
                    </List>
                </Paper>
            </Slide>
        </Grid>
    </Modal>);

}
export default withRouter(withStyles(styles)(Search));
