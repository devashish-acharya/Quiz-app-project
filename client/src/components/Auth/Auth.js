import React from 'react';
import Signin from './Signin';
import Signup from './Signup';
import axios from 'axios';
import store from '../../store/index';
import Message from '../Message/message';
import './Auth.css';

export default class Auth extends React.Component {

//state setup
constructor(props) {
    super(props);
    this.state= {
        tab: 'signin',
        showToast: false
    }
}


//axios calls
signIn = (email, password) => {
   axios.post('/api/users/login', {email, password}).then(res => {

       //saving jwt to local storage
        if (res.data.success) {
            
            store.dispatch({
                type: 'login',
                _id: res.data.user._id,
                user: res.data.user,
                token: res.data.token
            });

            //checking user is in storage
            console.log(store.getState())
            this.props.history.push('/dash');
        }   else {
            this.setState({
                showToast: true
            });
            setTimeout(() => {
             this.setState({showToast: false})
            }, 2500);
        }
   }).catch(er => {
       this.setState({
           showToast: true
       });
       setTimeout(() => {
        this.setState({showToast: false})
       }, 2500);
   })
}


//axios calls for singing up
signUp = ({firstName, lastName, email, password}) => {
    axios.post('/api/users/register', {firstName, lastName, email, password}).then(res => {
      if (res.data.success) {
          this.setState({tab: 'signin'});
      }
    }).cath(er => {
        console.log(er);
    })
}

//defining change tab method

changeTab =() => {
    this.setState({
        tab: this.state.tab === 'signup' ? 'signin' : 'signup'
    });
}


    render() {
        let page = this.state.tab === 'signin' ? <Signin signIn={this.signIn} /> : <Signup signUp={this.signUp} />
        return(
            <div className='auth-wrap'>
                <Message model={this.state.showToast} message="failed login" backgroundColor='#FF4232' />
                <div className='Main'>
                    <div className="sub">
                        <div className="header">Quizinator</div>
                        {page}
                        <div className='newUsr' onClick={this.changeTab}>{this.state.tab === 'signin' ? 'New user? sign up here' : 'Returning user? login!'}</div>
                    </div>
                </div>
            </div>
        )
    }}