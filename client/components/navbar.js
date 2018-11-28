import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`,
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
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6,
  },
});

const Navbar = ({handleClick, isLoggedIn, classes}) => (
  <div>
    <CssBaseline/>
  <AppBar position="static" className={classes.appBar}>
      <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
          ComicBOOM
          </Typography>
          </Toolbar>
      {isLoggedIn ? (
        <div className={classes.heroUnit}>
          {/* The navbar will show these links after you log in */}
          <Button  component={Link} to="/">

            {/* <img
              src="http://icons.iconarchive.com/icons/custom-icon-design/pretty-office-4/256/home-icon.png"
              width="30px"
            /> */} Home

          </Button>
          <Button>
          <a href="#" onClick={handleClick}>
            {/* <img
              src="http://www.iconarchive.com/download/i89546/alecive/flatwoken/Apps-Dialog-Logout.ico"
              width="30px"
            /> */} Logout
          </a>
          </Button>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
         <button type='button'> <Link to="/login">Login{'  '}</Link></button>{'   '}
         <button type='button'>  <Link to="/signup">Sign Up</Link></button>
        </div>
      )}

  </AppBar>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default withStyles(styles)(connect(mapState, mapDispatch)(Navbar))

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
