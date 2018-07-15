import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
  HashRouter as Router,
  Route
} from 'react-router-dom'
import Install from "./Install"
import Recipes from "./Recipes"

const styles = {
  root: {
    padding: '5vw 15vw 5vw 15vw'
  }
}

@withStyles(styles)
export default class Content extends React.Component {
  render() {
    const {classes} = this.props
    return (
      <Router>
        <div className={classes.root}>
          <Route exact path="/" component={Install} />
          <Route path="/install" component={Install} />
          <Route path="/recipes" component={Recipes} />
        </div>
      </Router>
    )
  }
}