import React from 'react';

import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import DonutIcon from '@material-ui/icons/DonutLarge';
import BarIcon from '@material-ui/icons/BarChart';
import LineIcon from '@material-ui/icons/Timeline';
const ChartTypePicker = (props) => {
    console.log('props',    props)
    return (
      <ToggleButtonGroup
        exclusive
        value={props.type}
        onChange={props.changeHandler}
        style={{ boxShadow: 'none' }}
      >
        <ToggleButton value="bar">
          <BarIcon/>
        </ToggleButton>
        <ToggleButton value="line">
          <LineIcon/>
        </ToggleButton>
        <ToggleButton value="donut">
          <DonutIcon/>
        </ToggleButton>
        <ToggleButton value="number">
          123
        </ToggleButton>
      </ToggleButtonGroup>);
}
 
export default ChartTypePicker;
