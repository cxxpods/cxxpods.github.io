import 'babel-polyfill'
import React from "react"
import ReactDOM from "react-dom"
import style from "./Entry.css"
import Header from "./components/Header"
import CssBaseline from '@material-ui/core/CssBaseline'
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import Content from "./components/Content"
import "./FontAwesome"
import {Provider} from 'react-redux'
import store from './store/Store'
import blue from '@material-ui/core/colors/blue';
import {fetchRecipes} from "./store/Actions"

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: blue
    
  },
});

const Entry = () => {
  return <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <div className={style.root}>
        <CssBaseline/>
        <Header/>
        <Content/>
      </div>
    </MuiThemeProvider>
  </Provider>
};

let rendered = false

function renderEntry() {
  const state = store.getState()
  if (rendered || !state.recipes.length) {
    if (!state.recipes.length && !state.isFetching) {
      console.log("Fetching recipes")
      store.dispatch(fetchRecipes())
    }
    return
  }
  rendered = true
  ReactDOM.render(<Entry/>, document.getElementById("entry"))
}

store.subscribe(renderEntry)

renderEntry()