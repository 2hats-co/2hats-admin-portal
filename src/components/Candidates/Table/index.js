import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import TableHeader from './Header';
import TableRow from './Row';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});
class EnhancedTable extends React.Component {
  state = {};
  handleChangePage = (event, page) => {
    this.props.changeHandler('currentPage', page);
  };

  handleChangeRowsPerPage = event => {
    this.props.changeHandler('hitsPerPage', event.target.value);
  };
  render() {
    const { classes, changeHandler, catFilters } = this.props;
    const { currentPage, hitsPerPage, nHits } = this.props.resultData;
    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <TableHeader
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={nHits}
              catFilters={catFilters}
              addFilterHandler={this.props.addFilterHandler}
            />
            <TableBody>
              {this.props.candidateData.map(x => {
                return (
                  <TableRow
                    key={x.objectID}
                    candidateData={x}
                    changeHandler={changeHandler}
                  />
                );
              })}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={nHits}
          rowsPerPage={hitsPerPage}
          page={currentPage}
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
