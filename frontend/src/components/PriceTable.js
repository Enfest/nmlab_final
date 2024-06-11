import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import { concerts } from '../informations/concert_information';

const PriceTable = ({tickets}) => {

  return (
    <Paper sx={{ width: '95%', overflow: 'hidden' }}>
      <TableContainer sx={{ height: "35%"}}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Ticket Type</ TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets.map((e) => (
                  <TableRow hover role="checkbox" tabIndex={-1}>
                    <TableCell>{e.type}</ TableCell>
                    <TableCell>{e.price}</ TableCell>
                  </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default PriceTable;
