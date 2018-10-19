import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Switch from '@material-ui/core/Switch';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

import Collapse from '@material-ui/core/Collapse';
import SendIcon from '@material-ui/icons/Send';

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  list: {
    height: '100%',
    overflowY: 'scroll',
    padding: 0,
  },
  listPadder: {
    width: '100%',
    height: 88,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 6,
  },
  submitButton: {
    position: 'fixed',
    bottom: 20,
    right: 20,
    width: 320,
    fontWeight: 700,
  },
});

class FeedbackForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      feedback: {},
    };

    for (let section of this.props.sections) {
      const newFeedback = this.state.feedback;
      newFeedback[section.name] = { open: false };

      for (let i = 0; i < section.options.length; i++) {
        newFeedback[section.name][i] = section.options[i].isPositive;

        if (section.options[i].isPositive)
          newFeedback[section.name].open = true;
      }

      this.state.feedback = newFeedback;
    }

  }

  handleSectionClick(sectionName) {
    const newFeedback = this.state.feedback;
    newFeedback[sectionName].open = !newFeedback[sectionName].open;
    if (!newFeedback[sectionName].open) {
      for (let key of Object.keys(newFeedback[sectionName])) {
        newFeedback[sectionName][key] = false;
      }
    }
    this.setState({ feedback: newFeedback });
  };

  handleOptionClick(sectionName, index) {
    const newFeedback = this.state.feedback;
    newFeedback[sectionName][index] = !newFeedback[sectionName][index];
    this.setState({ feedback: newFeedback });
  }

  render() {
    const { classes, sections } = this.props;

    return (
      <div className={classes.root}>
        <List component="nav"
          className={classes.list}
        >
          {
            sections.map(section => (<React.Fragment key={section.name}>
              <ListItem button key={section.name}
                onClick={() => {this.handleSectionClick(section.name)}}
              >
                <ListItemText primary={section.name} />
                <ListItemSecondaryAction>
                  <Switch color="primary" checked={this.state.feedback[section.name].open}
                    onClick={() => {this.handleSectionClick(section.name)}}
                  />
                </ListItemSecondaryAction>
              </ListItem>

              <Collapse in={this.state.feedback[section.name].open} timeout="auto" unmountOnExit
                key={`${section.name}-collapse`}
              >
                <List component="div" disablePadding>
                  { section.options.map((option, index) => (
                    <ListItem button className={classes.nested} key={`${section.name}-${index}`}
                      onClick={() => {this.handleOptionClick(section.name, index)}}
                    >
                      <ListItemText secondary={option.label} />
                      <Checkbox
                        color="primary"
                        checked={this.state.feedback[section.name][index]}
                        tabIndex={-1}
                        disableRipple
                      />
                    </ListItem>
                  )) }
                </List>
              </Collapse>
            </React.Fragment>))
          }
          <div className={classes.listPadder} />
        </List>

        <Button variant="extendedFab" color="primary" aria-label="Submit Feedback"
          className={classes.submitButton}
        >
          <SendIcon style={{marginRight: 8}} />
          Submit Feedback
        </Button>
      </div>
    );
  }
}

FeedbackForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FeedbackForm);
