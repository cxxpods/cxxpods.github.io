
import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import LogoSrc from "../assets/images/logo.png"
import {makeRouteHandler} from "../util/RouteHelper"

const styles = {
  logo: {
    position: 'absolute',
    left: '3vw',
    top: '1vw',
    zIndex: 100,
    width: '10vw',
    height: '15vw'
  },
  
  github: {
    fontSize: '1.2rem'
  },
  
  root: {
    flexGrow: 1,
    height: '10vh'
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
}


@withStyles(styles)
export default class Header extends React.Component {
  render() {
    const { classes } = this.props
    return (
      
        <AppBar position="static"  color="default">
          <img className={classes.logo} src={LogoSrc}/>
          <Toolbar>
            <Typography variant="title" color="inherit" className={classes.flex}>
            
            </Typography>
            <Button color="inherit" onClick={makeRouteHandler('/install')}>INSTALL</Button>
            <Button color="inherit" onClick={makeRouteHandler('/recipes')}>RECIPES</Button>
            <Button color="inherit" href="https://github.com/cxxpods/cxxpods">
              <i className={`fab fa-github ${classes.github}`}></i>
            </Button>
          </Toolbar>
        </AppBar>
      
    )
  }
}

// Header.propTypes = {
//   classes: PropTypes.object.isRequired,
// }