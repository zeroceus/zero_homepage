import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {host, request} from '../utils/request.js';
import avatar from '../../images/zero_avatar.jpg';
import reverseAvatar from '../../images/sleep_kaga.jpg';
import Avatar from '@material-ui/core/Avatar';
import { ThemeProvider } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';
import AudioPlayer from 'material-ui-audio-player';

const muiTheme = createTheme({});

const voiceAudio = new Audio(`${host}/audio/avatar_voice.mp3`);

const useStyles = makeStyles((theme) => ({
  sideBar: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '25%',
    maxWidth: theme.spacing(36),
  },
  info: {
    width: '100%',
    height: theme.spacing(50),
    marginTop: theme.spacing(16),
    paddingTop: theme.spacing(6),
    backgroundColor: '#F2F3F4',
    borderRadius: theme.spacing(1),
    opacity: 0.8,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categories: {
    width: '100%',
    height: 'auto',
    marginTop: theme.spacing(3),
    paddingBlock: theme.spacing(2),
    backgroundColor: '#F2F3F4',
    borderRadius: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    opacity: 0.8,
  },
  category: {
    width: '100%',
    height: '100%',
    paddingLeft: '30%',
    '&:hover' : {
      fontWeight: 'bold',
      cursor: 'pointer',
      backgroundColor: '#E2E3E4'
    }
  },
  audioPlayer: {
    width: '100%',
    height: theme.spacing(36),
    marginTop: theme.spacing(4),
    marginLeft: theme.spacing(3)
  },
  player: {
    lineHeight: '0px'
  },
  avatarBox: {
    position: 'relative',
    width: theme.spacing(18),
    height: theme.spacing(18),
    transitionTimingFunction: 'ease-in-out',
    transition: '0.5s',
    textAlign: 'center',
    transformStyle: 'preserve-3d',
    perspective: '1000px',
    '&:hover': {
      transform: 'rotateY(180deg)',
    }
  },
  introduction: {
    marginTop: theme.spacing(4),
    marginInline: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    flexGrow: 1
  },
  front: {
    position: 'absolute',
    backfaceVisibility: 'hidden',
    transform: 'rotateY(0deg)',
  },
  back: {
    position: 'absolute',
    backfaceVisibility: 'hidden',
    transform: 'rotateY(180deg)',
  },
  avatar: {
    width: '100%',
    height: '100%',
  }
}));

const avatarVoice = () => {
  voiceAudio.play();
}

export default function SideBar(props) {
  const classes = useStyles();
  const { categories, params, setBlog, setBlogs, setPage, setTotalPage } = props;
  console.log(host);
  const kagaMisaki = `${host}/audio/kagamisaki.mp3`;

  const showByCategory = (event, category_id) => {
    event.preventDefault();
    const baseURI = `${host}/blogs`;
    let url = `${baseURI}.json`;
    let location = `${baseURI}`;

    if(category_id != 0) {
      url = `${url}?category_id=${category_id}`;
      location = `${location}?category_id=${category_id}`;
    }

    request().get(url).then(res => {
      history.pushState('', '', location);  
      setBlogs(res.data.blogs);
      setBlog(null);
      setPage(1);
      setTotalPage(res.data.params.page_count);
    })
  }

  return (<Box className={classes.sideBar}>
            <Box className={classes.info}>
              <Box className={classes.avatarBox} 
                    onClick={avatarVoice}>
                <div className={classes.front}>
                  <Avatar alt="Kaga" src={avatar} className={classes.avatar} />
                </div>
                <div className={classes.back}>
                  <Avatar alt="Kaga" src={reverseAvatar} className={classes.avatar} />
                </div>
              </Box>
              <Box className={classes.introduction}>
                <Typography>Zero(Kaga), a programmer, a cook, a guitar player, an animation mania.</Typography>
              </Box>
            </Box>
            <Box className={classes.categories}>
            <Box fontWeight="fontWeightBold" fontSize="h6.fontSize">CATEGORIES</Box>
            <Box onClick={(e) => showByCategory(e, 0)} className={classes.category} alignSelf="flex-start" py={1} key="all blogs">All blogs({params.blog_count})</Box>
              {categories.map((category) => (<Box onClick={(e) => showByCategory(e, category.id)} className={classes.category} alignSelf="flex-start" py={1} key={category.id + category.name}>{category.name}({category.blogs_count})</Box>))}
            </Box>
            {/* TODO: <Box className="live2d"></Box> */}
            <Box className={classes.audioPlayer}>
              <ThemeProvider theme={muiTheme}>
                <AudioPlayer src={kagaMisaki} autoplay={true}/>
              </ThemeProvider>
            </Box>
          </Box>);  
}
