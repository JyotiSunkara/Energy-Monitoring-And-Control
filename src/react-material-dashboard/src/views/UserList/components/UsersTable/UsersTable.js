import React, { useState,useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
  Button
} from '@material-ui/core';
import axios from 'axios';
import { getInitials } from 'helpers';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const UsersTable = props => {
  let { className, users, ...rest } = props;

  const classes = useStyles();
  console.log("YES "+props.search)
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [userlist,setuserlist]=useState([]);
  useEffect(() => {
    console.log("START")
    axios.get('http://localhost:5000/users/')
    .then(user=>{
      console.log("END")
      setuserlist(user.data)})
  }, [])
  const handleSelectAll = event => {
    

    let selectedUsers;

    if (event.target.checked) {
      selectedUsers = users.map(user => user.id);
    } else {
      selectedUsers = [];
    }

    setSelectedUsers(selectedUsers);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedUsers.indexOf(id);
    let newSelectedUsers = [];

    if (selectedIndex === -1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers, id);
    } else if (selectedIndex === 0) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(1));
    } else if (selectedIndex === selectedUsers.length - 1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedUsers = newSelectedUsers.concat(
        selectedUsers.slice(0, selectedIndex),
        selectedUsers.slice(selectedIndex + 1)
      );
    }

    setSelectedUsers(newSelectedUsers);
  };

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };
  // console.log("USERLIST")
  // console.log(userlist)
  users=userlist.filter(function(user){
    return user.position=="space" && (user.first_name.startsWith(props.search)||props.search=='')
  })
  // console.log(users)
  // console.log("PAGE "+page)

  const handleSendEmail =(event,name,email)  => {
    let info={
      name: name,
      email:email
    }
    axios.post('http://localhost:5000/email/send',info)
    .then(console.log("SUCCESFULLY SENT!!"))
    // console.log(name)
    
  }

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                   
                  </TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Send Email</TableCell>
                  
                </TableRow>
              </TableHead>
              <TableBody>
                {users.slice((page)*rowsPerPage, (page+1)*rowsPerPage).map(user => (
                  
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={user.id}
                    selected={selectedUsers.indexOf(user.id) !== -1}
                  >
                    <TableCell padding="checkbox">
                     
                    </TableCell>
                    
                    <TableCell>{user.first_name+" "+user.last_name}</TableCell>
                    <TableCell>
                      {user.email}
                    </TableCell>
                    <TableCell>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={(event)=>handleSendEmail(event,user.first_name,user.email)}
                    >
                      Send Email
                    </Button>
                    </TableCell>
                  
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <CardActions className={classes.actions}>
        <TablePagination
          component="div"
          count={users.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </CardActions>
    </Card>
  );
};

UsersTable.propTypes = {
  className: PropTypes.string,
  users: PropTypes.array.isRequired
};

export default UsersTable;
