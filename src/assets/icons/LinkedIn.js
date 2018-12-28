import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  root: {
    userSelect: 'none',
    width: '1em',
    height: '1em',
    display: 'inline-block',
    fill: 'currentColor',
    flexShrink: 0,
    fontSize: 24,
    transition: theme.transitions.create('fill', {
      duration: theme.transitions.duration.shorter,
    }),
  },
});

const Bullhorn = props => (
  <svg className={props.classes.root} focusable="false" viewBox="0 0 24 24">
    <path
      fillRule="evenodd"
      d="M18.3392348,18.3385681 L15.6704693,18.3385681 L15.6704693,14.1607467 C15.6704693,13.1643765 15.652802,11.8829957 14.2830846,11.8829957 C12.8936998,11.8829957 12.6816919,12.9690359 12.6816919,14.0894107 L12.6816919,18.3385681 L10.0129264,18.3385681 L10.0129264,9.74824994 L12.5736879,9.74824994 L12.5736879,10.9229601 L12.6103559,10.9229601 C12.9667025,10.2472684 13.8377347,9.53524205 15.1364495,9.53524205 C17.8402163,9.53524205 18.3392348,11.3139746 18.3392348,13.6270603 L18.3392348,18.3385681 Z M7.00314826,8.5745398 C6.14744991,8.5745398 5.45575762,7.88084744 5.45575762,7.02681581 C5.45575762,6.17178414 6.14744991,5.47809178 7.00314826,5.47809178 C7.8565132,5.47809178 8.55020556,6.17178414 8.55020556,7.02681581 C8.55020556,7.88084744 7.8565132,8.5745398 7.00314826,8.5745398 Z M5.66776547,18.3385681 L8.33853106,18.3385681 L8.33853106,9.74824994 L5.66776547,9.74824994 L5.66776547,18.3385681 Z M19.6686174,3 L4.32838253,3 C3.59568873,3 3,3.58135486 3,4.29804808 L3,19.7019519 C3,20.4186451 3.59568873,21.0006667 4.32838253,21.0006667 L19.6686174,21.0006667 C20.4029779,21.0006667 21,20.4186451 21,19.7019519 L21,4.29804808 C21,3.58135486 20.4029779,3 19.6686174,3 Z"
    />
    <path fill="none" d="M0 0h24v24H0z" />
  </svg>
);

export default withStyles(styles)(Bullhorn);