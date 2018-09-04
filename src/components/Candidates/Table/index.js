import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import EmailIcon from '@material-ui/icons/MailOutline'
import PhoneIcon from '@material-ui/icons/Phone'
import moment from 'moment'
function copyToClipboard(text){
  var dummy = document.createElement("input");
  document.body.appendChild(dummy);
  dummy.setAttribute('value', text);
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);
}
function createData(hit) {
  console.log(hit)
  return { id: hit.objectID, name:hit.firstName+' '+hit.lastName,phoneNumber:hit.phoneNumber,email:hit.email,stage:hit.stage,status:hit.status};
}
const rows = [
  { id: 'updatedAt', numeric: true, disablePadding: true, label: 'UP' },
  { id: 'name', numeric: false, disablePadding: true, label: 'NAME' },
  { id: 'conact', numeric: false, disablePadding: true, label: 'CONTACT' },
  { id: 'stage', numeric: false, disablePadding: true, label: 'STAGE' },
  { id: 'status', numeric: false, disablePadding: true, label: 'STATUS' },
  { id: 'staff', numeric: false, disablePadding: true, label: 'STAFF' },
  { id: 'careerInterests', numeric: false, disablePadding: true, label: 'INTERESTS' },
  { id: 'note', numeric: false, disablePadding: true, label: 'NOTE' },
  { id: 'industry', numeric: false, disablePadding: true, label: 'INDUSTRY' },
  { id: 'score', numeric: false, disablePadding: true, label: 'SCORE' },
];


class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };
  render() {
    return (
      <TableHead>
        <TableRow>
          {rows.map(row => {
            return (
              <TableCell
                key={row.id}
                numeric={row.numeric}
                padding={row.disablePadding ? 'none' : 'default'}
            
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                 //   onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}
EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class EnhancedTable extends React.Component {
  state = {
    selected: [],
    data: [
    ],
    page: 0,
    rowsPerPage: 5,
    totalResult:0
  };
  componentDidUpdate(prevProps){
    if(prevProps.resultData !== this.props.resultData){
      const {currentPage,hitsPerPage,nHits} = this.props.resultData
      this.setState({page:currentPage,rowsPerPage:hitsPerPage,totalResult:nHits})
    }
    console.log('cand',this.props)

    if(prevProps.candidateData !== this.props.candidateData){
      let data = []
      console.log(this.props.candidateData)
      this.props.candidateData.map(x=>data.push(createData(x)))
      this.setState({data:data})
    }
  }
  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: state.data.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    console.log(id)
   // this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.props.changeHandler('currentPage',page)
    console.log(page)
   // this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    console.log(event.target.value)
    this.props.changeHandler('hitsPerPage',event.target.value)
   // this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page,totalResult } = this.state;
  //  const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={totalResult}
            />
            <TableBody>
              {data
                .map(n => {
                  return (
                    <TableRow
                      hover
                      onClick={event => this.handleClick(event, n.id)}
                      tabIndex={-1}
                      key={n.id}
                    > 
                      <TableCell component="th" scope="row">
                        {n.name}
                      </TableCell>
                      <TableCell>        
                      {n.email &&
                          <Tooltip title={n.email}>
                          <IconButton onClick={()=>{copyToClipboard(n.email)}}>
                            <EmailIcon/>
                          </IconButton>
                      </Tooltip>
                        }
                      {n.phoneNumber && <Tooltip title={n.phoneNumber}> 
                            <IconButton onClick={()=>{copyToClipboard(n.phoneNumber)}}>
                              <PhoneIcon/>
                            </IconButton>
                        </Tooltip>} 
                      </TableCell>
                      <TableCell >{n.stage}</TableCell>
                      <TableCell >{n.status}</TableCell>
                    </TableRow>
                  );
                })}
            
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={totalResult}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);
