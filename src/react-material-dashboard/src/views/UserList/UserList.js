import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import { UsersToolbar, UsersTable } from './components';
import mockData from './data';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const UserList = () => {
  const classes = useStyles();

  const [users] = useState(mockData);
  const [search,setsearch]=useState('')
  console.log(search)
  return (
    <div className={classes.root}>
      <UsersToolbar search={search} setsearch={setsearch}/>
      <div className={classes.content}>
        <UsersTable users={users} search={search}/>
      </div>
    </div>
  );
};

export default UserList;
