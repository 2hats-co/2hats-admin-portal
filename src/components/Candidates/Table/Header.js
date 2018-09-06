import TableHead from '@material-ui/core/TableHead';
import React from 'react'
import PropTypes from 'prop-types';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Tooltip from '@material-ui/core/Tooltip';
import TableSortLabel from '@material-ui/core/TableSortLabel';
const rows = [
    { id: 'updatedAt', numeric: false, disablePadding: false, label: 'UP' },
    { id: 'name', numeric: false, disablePadding: false, label: 'NAME' },
    { id: 'conact', numeric: false, disablePadding: false, label: 'CONTACT' },
    { id: 'stage', numeric: false, disablePadding: false, label: 'STAGE' },
    { id: 'status', numeric: false, disablePadding: false, label: 'STATUS' },
    { id: 'staff', numeric: false, disablePadding: false, label: 'STAFF' },
    { id: 'careerInterests', numeric: false, disablePadding: false, label: 'INTERESTS' },
    { id: 'note', numeric: false, disablePadding: false, label: 'NOTE' },
    { id: 'industry', numeric: false, disablePadding: false, label: 'INDUSTRY' },
    { id: 'score', numeric: false, disablePadding: false, label: 'SCORE' },
  ];
  class CandidateTableHeader extends React.Component {
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
                  padding={'none'}
                 // padding={row.disablePadding ? 'none' : 'default'}
              
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
  CandidateTableHeader.propTypes = {
    rowCount: PropTypes.number.isRequired,
  };

export default CandidateTableHeader