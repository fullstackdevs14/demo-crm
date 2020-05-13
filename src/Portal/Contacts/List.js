import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const useStyles = makeStyles({
  table: {
    minWidth: 650
  },
  actionCol: {
    width: 48
  },
  createButton: {
    marginBottom: 20
  }
});

const GET_CONTACTS = gql`
  query {
    contacts {
      id
      name
      email
      phone
      status
      contactOwner {
        name
      }
    }
  }
`;

const ContactsList = ({ history }) => {
  const classes = useStyles();
  const { loading, error, data } = useQuery(GET_CONTACTS);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <div>
      <Button
        className={classes.createButton}
        color="primary"
        variant="contained"
      >
        Create
      </Button>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Contact Owner</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.contacts.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>
                  {row.contactOwner && row.contactOwner.name}
                </TableCell>
                <TableCell className={classes.actionCol}>
                  <IconButton
                    onClick={() => {
                      history.push(`/contacts/${row.id}`);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ContactsList;
