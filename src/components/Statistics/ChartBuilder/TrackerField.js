import React,{Component} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';

import { SketchPicker } from 'react-color'

import IconButton from '@material-ui/core/IconButton';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';

const trackerTypes = ['candidate','link','talentTeam']
const trackerNames = {
    candidate:['signup','signup-3rdParty','signup-password','signup-speedy','submission'],
    link:['DiscussionGroup'],
    talentTeam:['submissionAccepted','submissionProcessed','submissionRejected','submissionReviewed']
}
const styles = theme => ({
    root: {
    },
    formControl:{
        minWidth :80
    },
    swatchWrapper: {
      paddingBottom: 16,
    },
    swatch: {
      margin: '0 8px -6px 0',
      display: 'inline-block',
      cursor: 'pointer',
      background: '#fff',
      width:20,
      height:20,
      borderRadius: 10,
      boxShadow: '0 0 1px 0 rgba(0,0,0,.5) inset',
    },
    popover: {
      position: 'absolute',
      zIndex: '2',
    },
    cover: {
      position: 'relative',
      top: '-100px',
      right: '100px',
      bottom: '0px',
      left: '0px',
    },
});
class TrackerField extends Component {
    constructor(props) {
        super(props);
        this.state = { showColourPicker:false,colour:'#f00' }
    }
    toggleColourPicker =()=>{
        this.setState({showColourPicker:!this.state.showColourPicker})
    }
    componentDidMount(){
      const {colour,label,name,type,id} = this.props.tracker
      this.setState({colour,label,id,trackerName:name,trackerType:type})
    }
    componentDidUpdate(prevProps, prevState) {
      if(this.state!== prevState){
        const {label,trackerType,trackerName,id,colour} = this.state
        if(label&&trackerType&&trackerName)
        this.props.handleUpdate({id:id,type:trackerType,name:trackerName,label:label,colour})
      }
    }
    handleChange = (value,event) => {
        if(value.hex){
            // colour picker
            this.setState({colour:value.hex,
             // showColourPicker:false
            })
        }else if(value.target.name){
          //selector and text field
          this.setState({[value.target.name]:value.target.value})
      }

      };
    render() { 
        const {classes,handleDelete} = this.props
        const{showColourPicker,colour,trackerType,id,trackerName,label} =this.state
        return (
        <Grid container alignItems="baseline" className={classes.root} spacing="8">
          <Grid item>
            <IconButton aria-label="Delete" className={classes.button} onClick={()=>{handleDelete(id)}}>
              <RemoveCircleOutlineIcon fontSize="small" />
            </IconButton>
          </Grid>

          <Grid item className={classes.swatchWrapper}>
            <div
              className={ classes.swatch }
              style={{background:colour}}
              onClick={this.toggleColourPicker}
            />
            { showColourPicker ? <div className={ classes.popover }>
              <div className={ classes.cover } onClick={ this.toggleColourPicker }/>
              <SketchPicker color={colour} onChange={ this.handleChange } />
            </div> : null }
          </Grid>

          <Grid item>
            <TextField
              autoFocus
              margin="dense"
              id="label"
              name="label"
              label="Label"
              value={label}
              type="text"
              onChange={this.handleChange}
              InputLabelProps={{ shrink: label }}
            />
          </Grid>

          <Grid item>
            <FormControl className={classes.formControl} margin="dense">
              <InputLabel htmlFor="trackerName" shrink={trackerType}>Type</InputLabel>
              <Select
                value={trackerType}
                onChange={this.handleChange}
                input={<Input name="trackerType" id="trackerName"/>}
              >
                <MenuItem value="" disabled>
                  Select a type
                </MenuItem> {trackerTypes.map(x=><MenuItem value={x}>{x}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>

          {trackerType ?
            <Grid item>
              <FormControl className={classes.formControl} margin="dense">
                <InputLabel htmlFor="tracker-name" shrink={trackerName}>Name</InputLabel>
                <Select
                  value={trackerName}
                  onChange={this.handleChange}
                  input={<Input name="trackerName" id="tracker-name" />}
                >
                  <MenuItem value="" disabled>
                    Select a name
                  </MenuItem> {trackerNames[trackerType].map(x=><MenuItem value={x}>{x}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
            : null
          }

        </Grid>);
    }
}
export default withStyles(styles)(TrackerField);
