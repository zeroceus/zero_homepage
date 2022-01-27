import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { green } from '@material-ui/core/colors';
import { MemoryRouter as Router } from 'react-router';
import {zero_host, jump} from '../../utils/request.js';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    box: {
        backgroundColor: 'white',
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
      },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    grids: {
      marginInline: theme.spacing(2),
      marginBlock: theme.spacing(2),
    }
}));


const UserCard = (user) => {
  const classes = useStyles();
  
    return (
        <Grid item key={user.id} xs={12} sm={6} md={4}>
          <Card className={classes.card}>
            <CardMedia
            className={classes.cardMedia}
            image="https://img0.baidu.com/it/u=1266318352,4238313613&fm=26&fmt=auto"
            />
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h5" component="h2">
              {user.name}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary" onClick={(e) => edit(user.id, e)}>
              Edit
            </Button>
          </CardActions>
        </Card>
      </Grid>
      )
}

export default function Index(props) {
  const classes = useStyles();

  return (
    <Router>
    <Box
        component="main"
        className={classes.box}
      >
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4}}>
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>   
            <Typography component="h2" variant="h6" color="primary">  {props.title} </Typography>
        </Box>
        <Grid container className={classes.grids} spacing={4}>
        {
            props.users.length > 0 ? (props.users.map((user) => (UserCard(user)))) : 
            (<Typography component="h2" variant="h6" color="secondary">  NO USERS YET </Typography>)
        }
        </Grid>
        </Container>
      </Box>
      </Router>
  );
}