import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import {zero_host, request, jump} from '../../utils/request.js';

const useStyles = makeStyles((theme) => ({
    box: {
        backgroundColor: 'white',
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
    }
}));

export default function Form (props) {
  const classes = useStyles();
  const category = props.category;
  const [name, setName] = React.useState(true);

  const handleNameChange = (event) =>{
    setName(event.target.value);
  }

  const submit = (event) => {
    event.preventDefault();
    let baseURI = `${zero_host}`;
    let action;

    if(!props.category.id) {
        baseURI = `${baseURI}/categories`;
        action = 'create';
    }else {
        baseURI = `${baseURI}/categories/${props.category.id}`;
        action = 'update';
    }

    let body = {
      name: name,
      format: 'json'
    }

    if(action == 'create') {
        request().post(baseURI, body).then(res => {
            jump(`${zero_host}/categories`);
        });
    }else {
        request().put(baseURI, body).then(res => {
            jump(`${zero_host}/categories`);
        }).catch(err => {
            console.log(err);
        });
    }
    
  }

  return (
    <Box
        component="main"
        className={classes.box}
      >
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4}}>
            <Box sx={{ mt: 2, mb: 2}}>
                <Typography component="h2" variant="h6" color="primary" >  {props.title} </Typography>
            </Box>
            <form className={classes.form} onSubmit={submit} method='POST'>
                <Container maxWidth="xs" className={classes.container}>
                <TextField
                variant="outlined"
                margin="normal"
                required
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                onChange={handleNameChange}
                autoFocus
                defaultValue={category.name}
                size="small"
                />

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="medium"
                    className={classes.submit}
                >
                    Submit
                </Button>
                </Container>
            </form>
        </Container>
    </Box>
  );
}