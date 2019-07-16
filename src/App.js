import React from 'react';
import { Provider } from 'react-redux'
import store from './redux/store'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Index from './components/Index/Index'
import Page from './components/Page/Page'
import Comment from './components/Comment/Comment'
import './App.css'

function App() {
  const style = {
    position:'relative',
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
    overflow: 'hidden'
  }
  const indexStyle = {
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
    overflow: 'hidden'
  }
  const pageStyle = {
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
    position: 'relative',
    top: `-${document.documentElement.clientHeight}px`,
    left: document.documentElement.clientWidth
    // transform: `translateX(${document.documentElement.clientWidth}px) translateZ(0px)`
  }
  const commentStyle = {
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
    position: 'absolute',
    top:'0px',
    left:document.documentElement.clientWidth
    // left:'0px'
  }
  return (
    <Provider store={store}>
      <Router>
        <div className="App" style={style}>
          <div className='index' style={indexStyle}>
            <Index />
          </div>
          <div className='page' style={pageStyle}>
            <Route path='/page' component={Page} />
          </div>
          <div className='comment' style={commentStyle}>
            <Route path='/page/comment/:id' component={Comment} />
          </div>
        </div>
      </Router>
    </Provider>
  )
}

export default App;
