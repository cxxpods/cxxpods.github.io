import React from 'react'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import Markdown from 'react-markdown'
import MdCodeBlockRenderer from "./MdCodeBlockRenderer"
import mdStyles from './MdStyles.scss'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
})


const installMd = `
## Install

### Linux, macOS

On linux or macOS you can run the following snippet to install a binary version of cxxpods, no need to install node, npm or anything else. It will be installed to \`/usr/local/bin\`

\`\`\`bash
curl -s https://raw.githubusercontent.com/cxxpods/cxxpods/master/scripts/client-install.sh | bash
\`\`\`

### NPM (Windows, Linux, macOS)

You can also install via [npm](http://nodejs.org) if you have [node](http://nodejs.org) and npm installed.

\`\`\`bash
npm i -g cxxpods
\`\`\`

## Quickstart

It takes a few simple steps.

- Create a cxxpods.yml file in the root of your project

\`\`\`yaml
name: cxxpods-example

dependencies:
  opencv: 3.4.1

\`\`\`

- Then run configure

\`\`\`bash
cxxpods project configure
\`\`\`

- In your root \`CMakeLists.txt\` *BEFORE* your \`project\` declaration
  add something like the following:

\`\`\`cmake
cmake_minimum_required(VERSION 3.10)

# INSERT THIS LINE
include(\${CMAKE_CURRENT_LIST_DIR}/.cxxpods/cxxpods.cmake)

project(cxxpods_example)
`
  



@withStyles(styles)
export default class Install extends React.Component {
  
  constructor(props,context) {
    super(props,context)
    
    this.state = {installMd}
    
    // fetch("https://raw.githubusercontent.com/cxxpods/cxxpods/master/README.md")
    //   .then(async (res) => {
    //     const installMd = await res.text()
    //     this.setState({installMd})
    //   })
    //   .catch(err => console.error(`Failed to fetch md`, err))
  }
  
  
  
  render() {
    const
      {classes} = this.props,
      {installMd} = this.state
    
    return <Paper className={classes.root}>
      <Typography>
      <Markdown
        className={mdStyles.root}
        source={installMd}
        renderers={{code: MdCodeBlockRenderer}}
      />
      </Typography>
    </Paper>
  }
}