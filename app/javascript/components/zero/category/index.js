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
import avatar from '../../../images/kaga_wanwan.jpg';

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
}));

const edit = (category_id, event) => {
  event.preventDefault();
  const baseURI = `${zero_host}/categories/${category_id}/edit`;
  axios.get(baseURI).then(res => {
    jump(res.request.responseURL);
  });
}


const CategoriesCard = (category) => {
  const classes = useStyles();
  
    return (
        <Grid item key={category.id} xs={12} sm={6} md={4}>
          <Card className={classes.card}>
            <CardMedia
            className={classes.cardMedia}
            image={avatar}
            />
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h5" component="h2">
              {category.name}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary" onClick={(e) => edit(category.id, e)}>
              Edit
            </Button>
          </CardActions>
        </Card>
      </Grid>
      )
}

const onClick = (event) => {
    event.preventDefault();
    const baseURI = `${zero_host}/categories/new`;
    axios.get(baseURI).then(res => {
      jump(res.request.responseURL);
    });
}

export default function Index(props) {
  const classes = useStyles();

  return (
    <Router>
    <Box
        component="main"
        className={classes.box}
      >
        <Container maxWidth="lg">
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>   
            <Typography component="h2" variant="h6" color="primary">  {props.title} </Typography>
            <IconButton aria-label="new" onClick={onClick}>
              <AddIcon style={{ color: green[500] }} fontSize="large"/>
            </IconButton>
        </Box>
        <Grid container spacing={4}>
        {
            props.categories.length > 0 ? (props.categories.map((category) => (CategoriesCard(category)))) : 
            (<Typography component="h2" variant="h6" color="secondary">  No categories yet </Typography>)
        }
        </Grid>
        </Container>
      </Box>
      </Router>
  );
}