import TableHead from '@material-ui/core/TableHead';
import React from 'react'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

const rows = [
    { id: 'updatedAt', numeric: false, disablePadding: false, label: 'UP', filterable: true, filters: ['x'] },
    { id: 'name', numeric: false, disablePadding: false, label: 'NAME' },
    { id: 'contact', numeric: false, disablePadding: false, label: 'CONTACT'},
    { id: 'stage', numeric: false, disablePadding: false, label: 'STAGE', filterable: true, filters: ['pre-review','resume','interview','assessment','placed'] },
    { id: 'status', numeric: false, disablePadding: false, label: 'STATUS', filterable: true, filters: ['in-review','completed','updating','incomplete','accepted','rejected','no show','lost','conditional','hired','offer','interview'] },
    { id: 'staff', numeric: false, disablePadding: false, label: 'STAFF' },
    { id: 'careerInterests', numeric: false, disablePadding: false, label: 'INTERESTS', filterable: true, filters: ['x'] },
    { id: 'note', numeric: false, disablePadding: false, label: 'NOTE' },
    { id: 'industry', numeric: false, disablePadding: false, label: 'INDUSTRY', filterable: true, filters: ['x'] },
    { id: 'score', numeric: false, disablePadding: false, label: 'SCORE', filterable: true, filters: ['x'] },
  ];

const styles = theme => ({
  selectRoot: {
    '&::before': {
      content: 'none',
    },
    '&::after': {
      content: 'none',
    }
  },
  select: {
    minWidth: 0,
    width: 0,
    paddingRight: 24,
  },
});
  class CandidateTableHeader extends React.Component {
    state={openFilter:''}
    createSortHandler = property => event => {
      this.props.onRequestSort(event, property);
    };

    render() {
      const { classes } = this.props;

      return (
        <TableHead>
          <TableRow>
            {rows.map(row => {
              return (
                <TableCell 
                  key={row.id}
                  numeric={row.numeric}
                  padding={'none'}
                  onClick={()=>{if(this.state.openFilter!==row.id){this.setState({openFilter:row.id})}}}
                >
             
                    <TableSortLabel
                   //   onClick={this.createSortHandler(row.id)}
                    >
                      {row.label}
                      { !row.filterable ? null :
                        <Select
                          multiple
                          value={this.props.catFilters[row.id]}
                          onOpen= {()=>{this.setState({openFilter:row.id})}}
                          open = {this.state.openFilter===row.id}
                          onChange={e => { this.props.addFilterHandler(row.id, e.target.value), this.setState({openFilter:''}) }}
                          renderValue={() => null}
                          classes={{select: classes.select}}
                          className={classes.selectRoot}
                          onClose={()=>{this.setState({openFilter:''})}}
                        >
                          {row.filters.map(name => (
                            <MenuItem key={name} value={name}>
                              <Checkbox checked={this.props.catFilters[row.id].includes(name)} />
                              <ListItemText primary={name} />
                            </MenuItem>
                          ))}
                        </Select>
                      }
                    </TableSortLabel>
                </TableCell>
              );
            }, this)}
          </TableRow>
        </TableHead>
      );
    }
  }
  CandidateTableHeader.propTypes = {
    rowCount: PropTypes.number.isRequired,
  };

export default withStyles(styles)(CandidateTableHeader);
