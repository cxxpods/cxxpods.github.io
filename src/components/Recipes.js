import React from 'react'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import {withStyles} from '@material-ui/core/styles'
import hlMatch from 'autosuggest-highlight/match';
import hlParse from 'autosuggest-highlight/parse'
import {connect} from 'react-redux'
import TextField from '@material-ui/core/TextField'
import {fetchRecipes} from '../store/Actions'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import styles from "./Recipes.scss"
import MdCodeBlockRenderer from "./MdCodeBlockRenderer"
import mdStyles from './MdStyles.scss'
import Markdown from 'react-markdown'
import * as Yaml from 'js-yaml'

const baseStyles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
  },
  
  recipeControls: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: theme.spacing.unit
  },
  
  list: {},
  
  item: {
    marginBottom: theme.spacing.unit,
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.primary.dark
    }
  },
  
  itemHighlight: {
    color: theme.palette.primary.dark
  },
  
  content: {
    flex: '1 0 auto',
  },
  
  media: {
    width: 60,
    height: 60,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  
  mediaIcon: {
    fontSize: '2rem'
  },
  
  input: {
    fontSize: '2rem',
    '&:before': {
      borderBottom: '2px solid transparent !important'
    }
  }
})


@withStyles(baseStyles)
@connect(state => ({
  ...state
}), {
  fetchRecipes
})
export default class Recipes extends React.Component {
  
  constructor(props, context) {
    super(props, context)
    
    this.state = {
      query: ""
    }
  }
  
  componentWillMount() {
    if (!this.props.isFetching)
      this.props.fetchRecipes()
  }
  
  handleChange = event => {
    this.setState({
      query: event.target.value,
    })
  }
  
  handleCloseRecipe = () => this.setState({recipe: null})
  
  makeHandleSelect = recipe => () => {
    this.setState({recipe})
  }
  
  renderRecipe = recipe => {
    
    const
      {classes} = this.props,
      {query} = this.state,
      matches = hlMatch(recipe.name, query),
      parts = hlParse(recipe.name, matches)
    
    return <Card key={recipe.repository.url} className={classes.item} onClick={this.makeHandleSelect(recipe)}>
      <CardContent className={classes.content}>
        <Typography variant="headline">
          {parts.map((part, index) => {
            return part.highlight ? <strong key={String(index)} className={classes.itemHighlight}>
                {part.text}
              </strong> :
              <strong key={String(index)} style={{fontWeight: 300}}>
                {part.text}
              </strong>
            
          })}
        </Typography>
        <Typography variant="subheading" color="textSecondary">
          {recipe.repository.url}
        </Typography>
      </CardContent>
      
      {recipe.buildType !== "manual" ?
        <CardMedia
          className={classes.media}
          image={"//gitlab.kitware.com/uploads/-/system/project/avatar/541/cmakelogo-centered.png"}
        /> : <div className={classes.media}><Typography><i className={`fa fa-cogs ${classes.mediaIcon}`}/></Typography>
        </div>}
    </Card>
    
  }
  
  renderSelectedRecipe() {
    const
      {classes} = this.props,
      {recipe} = this.state,
      configMd = `
\`\`\`yaml
${Yaml.safeDump(recipe)}
\`\`\`
`
    
    return <div>
      <div className={classes.recipeControls}>
        <Button onClick={this.handleCloseRecipe}>Close</Button>
      </div>
      {this.renderRecipe(recipe)}
      <Paper className={classes.root}>
        
        <Typography>
          <Markdown
            className={mdStyles.root}
            source={configMd}
            renderers={{code: MdCodeBlockRenderer}}
          />
        </Typography>
      </Paper>
    </div>
  }
  
  renderSearchRecipes() {
  
    const
      {classes, recipes: allRecipes = []} = this.props,
      {query} = this.state
  
  
  
    let recipes = allRecipes
    if (!_.isEmpty(query))
      recipes = recipes.filter(recipe => recipe.name.toLowerCase().indexOf(query.toLowerCase()) > -1)
    //recipes = recipes.filter(recipe => hlMatch(recipe.name,query).length > 0)
  
    if (recipes.length > 6)
      recipes = recipes.slice(0, 6)
  
    return <div>
      <Paper className={classes.root}>
        <Typography>
          <TextField
            placeholder="i.e. cxxopts"
            fullWidth
            autoFocus={true}
            inputProps={{
              tabIndex: 0
            }}
            InputProps={{
              value: query,
              onChange: this.handleChange,
              classes: {
                underline: classes.input,
                input: classes.input,
              },
            }}
          />
          
        </Typography>
      </Paper>
    
      {/* RECIPES */}
    
      <ReactCSSTransitionGroup
        transitionName={{
          enter: styles.itemsEnter,
          enterActive: styles.itemsEnterActive,
          leave: styles.itemsLeave,
          leaveActive: styles.itemsLeaveActive
        }}>
        {recipes.map(this.renderRecipe)}
      </ReactCSSTransitionGroup>
    </div>
  }
  
  render() {
    return this.state.recipe ?
      this.renderSelectedRecipe() :
      this.renderSearchRecipes()
    
  }
}