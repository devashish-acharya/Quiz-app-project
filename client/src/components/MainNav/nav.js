import React from 'react';
import store from '../../store/index';
import './nav.css';
import { NavLink } from 'react-router-dom';

export default class Nav extends React.Component {

    //describe mount methods, subscribe to store and listen to changes
    //get users, unsuscribe

        componentDidMount() {
            this.unsubscribe = store.subscribe(() => this.forceUpdate());
        }
    
        componentWillUnmount() {
            this.unsubscribe();
        }
    
    
    
        render() {
            if (store.getState().user) {
                return (
                    <div className="nav-wrapper">
                        <div className="header">Apprenticeship training provider</div>
        
                        <div className="user">
                            <div className="name">Current User: {store.getState().user.firstName + ' ' + store.getState().user.lastName}</div>
                        </div>
                    <div className="links">
                        <NavLink to="/dash">
                            <div className='link'>Homepage</div>
                        </NavLink>
                        <NavLink to="/dash">
                            <div className='link'>About us</div>
                        </NavLink>
                        <NavLink to="/make-quiz">
                            <div className='link'>Make Quiz</div>
                        </NavLink>
                        <NavLink to="/my-quiz">
                            <div className='link'>My Quizzes</div>
                        </NavLink>
                        <NavLink to="/all-quiz">
                            <div className='link'>All Quizzes</div>
                        </NavLink>
                        <NavLink to="/view-results">
                            <div className='link'>view results</div>
                        </NavLink>

                    </div>
                    </div>
                )
            } else {
                return (
                    <div>Loading</div>
                )
            }
        }
    }