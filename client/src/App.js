import axios from 'axios';
import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Auth from './components/Auth/Auth';
import Dashboard from './components/dash/dash';
import MakeQuiz from './components/MakeQuiz/MakeQuiz'
import MyQuiz from './components/MyQuiz/MyQuiz';
import AllQuiz from './components/AllQuiz/AllQuiz';
import SeeQuiz from './components/SeeQuiz/SeeQuiz';
import TakeQuiz from './components/TakeQuiz/TakeQuiz';
import store from './store'
import SeeResults from './components/SeeResults/SeeResults';

class App extends React.Component {

  //fetch user from DB and save into store for each page
  componentDidMount() {
    if (localStorage.getItem('_ID')) {
      axios.get(`/api/users/${localStorage.getItem('_ID')}`).then(res => {
        store.dispatch({
          user: res.data.user,
          type: 'set_user'
        })
      }).catch(er => {
        console.log(er)
      })
    }
  }

  //all the routes
  render() {
    return (
      <div className="app">

        <Router> 
        <Switch>
          <Route exact path="/" component={Auth}/>
          <Route path="/dash" component={Dashboard} />
          <Route path='/make-quiz' component={MakeQuiz}/>
          <Route path='/my-quiz' component={MyQuiz}/>
          <Route path='/all-quiz' component={AllQuiz}/>
          <Route path='/view-quiz' component={SeeQuiz}/>
          <Route path='/take-quiz' component={TakeQuiz}/>
          <Route path='/view-results' component={SeeResults}/>


          <Route path ="*">
            <Redirect to="/"/>
          </Route>
        </Switch>
        </Router>
      </div>
    )
  }
}
  
export default App;
