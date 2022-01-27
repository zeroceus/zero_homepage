import * as React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AssignmentIcon from '@material-ui/icons/Assignment';
import CategoryIcon from '@material-ui/icons/Category';
import MessageIcon from '@material-ui/icons/Message';
import PeopleIcon from '@material-ui/icons/People';
import {zero_host, jump} from '../utils/request.js';
import axios from 'axios';
import {Link} from 'react-router-dom';

const index = (name, event) => {
  event.preventDefault();
  const baseURI = `${zero_host}/${name}`;
  jump(baseURI);
}

let item = 'index';

export const menuItems = (
  
  <div>
    <ListItem button component={Link} to="blogs" onClick={(e) => index('blogs', e)} selected={item=='blogs' ? true : false}>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Blogs" />
    </ListItem>
    <ListItem button component={Link} to="categories" onClick={(e) => index('categories', e)} selected={item=='categories' ? true : false}>
      <ListItemIcon>
        <CategoryIcon />
      </ListItemIcon>
      <ListItemText primary="Caterories" />
    </ListItem>
    <ListItem button component={Link} to="comments" onClick={(e) => index('comments', e)} selected={item=='comments' ? true : false}>
      <ListItemIcon>
        <MessageIcon />
      </ListItemIcon>
      <ListItemText primary="Comments" />
    </ListItem>
    <ListItem button component={Link} to="users" onClick={(e) => index('users', e)} selected={item=='users' ? true : false}>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Users" />
    </ListItem>
  </div>
);
