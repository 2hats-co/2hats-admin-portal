import React,{Component} from 'react';
import { withStyles } from '@material-ui/core';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MailIcon from '@material-ui/icons/Mail';
import DescriptionIcon from '@material-ui/icons/Description';
import CallIcon from '@material-ui/icons/Call';
import FolderIcon from '@material-ui/icons/Folder';
import HistoryIcon from '@material-ui/icons/History';
import ListIcon from '@material-ui/icons/List';

const styles = theme => ({
    root: {
        marginBottom: 20,
    },
    iconWrapper: {
        width: 48,
        height: 48,
        borderRadius: "50%",
        backgroundColor: "red",
        color: "#fff",
        padding: 12,
        boxSizing: "border-box",
        marginRight: 20,
    },
    cardContent: {
        padding: "0 !important",
    },
    cardHeader: {
        backgroundColor: "#F1F1F1",
        padding: "0 8px 0 24px",
    }
});

function getIcon(type) {
    switch (type) {
        case "mail": return <MailIcon />
        case "note": return <DescriptionIcon />
        case "call": return <CallIcon />
        case "file": return <FolderIcon />
        case "history": return <HistoryIcon />
        case "task": return <ListIcon />
    }
}

function getColor(type, outgoing) {
    switch (type) {
        case "mail": if (outgoing) return "green"; else return "#66B3E7";
        case "note": return "#E78C3C";
        case "call": return "#966ABC";
        case "file": return "#D66161";
        case "history": return "#E2B600";
        case "task": return "#42A56D";
    }
}

function renderContent(type, title, description) {
    if (type === "mail") {
        return (
            <ExpansionPanel style={{ margin: 0 }}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="body2" style={{flexBasis: "32%"}}>{title}</Typography>
                    <Typography variant="body1" style={{
                        lineHeight: "1.71429em",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                    }}>{description.substr(0,40)}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography variant="body1">{description}</Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    } else if (type === "file" || type === "history") {
        return null;
    } else {
        return (
            <div style={{padding: "14px 24px"}}>
                <Typography variant="body1">{ description }</Typography>
            </div>
        );
    }
}

function CommunicationItem(props) {
    const { icon, outgoing, author, date, title, description, linkName, link, classes } = props;

    return(
        <Grid container className={classes.root}>
            <div className={classes.iconWrapper} style={{backgroundColor: getColor(icon, outgoing)}}>
                { getIcon(icon) }
            </div>
            <Grid item xs>
                <Card>
                    <CardContent className={classes.cardContent}>
                        <Grid
                            container
                            alignItems="center"
                            className={classes.cardHeader}
                        >
                            <Grid item xs>
                                <Typography variant="body2">{author}{outgoing}</Typography>
                            </Grid>
                            { (icon === "file" || icon === "history") ?
                                <Grid item xs>
                                    <Typography variant="body1">
                                        <a href={link}>
                                            {linkName}
                                        </a>
                                    </Typography>
                                </Grid> : null
                            }
                            <Grid item xs style={{ textAlign: "right" }}>
                                <Typography variant="body1">{date}</Typography>
                            </Grid>
                            <Grid item>
                                <IconButton><MoreVertIcon /></IconButton>
                            </Grid>
                        </Grid>

                        {renderContent(icon, title, description)}

                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}
export default withStyles(styles)(CommunicationItem);
