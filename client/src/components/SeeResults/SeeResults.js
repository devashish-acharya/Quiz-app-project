import React from 'react';
import axios from 'axios';
import qs from 'qs';

import Nav from '../MainNav/nav';
import './SeeResults.css';

export default class SeeResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            result: null,
            quiz: null
        }
    }

    componentDidMount() {
        if (!localStorage.getItem("_ID")) {
            this.props.history.push('/');
            localStorage.clear();
        } else {
            let id = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).id;
            if (!id) {
                this.props.history.push('/');
            } else {
                axios.get('/api/quizzes/results/' + id).then(res => {
                    this.setState({ result: res.data.score, quiz: res.data.quiz})
                })
            }
        }
    }


    //showing if you got the correct answer
    getBorderLeft = idx => {
        if (this.state.result.answers[idx]) {
            return '5px solid green';
        } else {
            return '5px solid red';
        }
    }

    //calculating score using maths
    getScore = () => {
        let len = this.state.result.answers.length;
        let right = this.state.result.answers.filter(ans => ans === true);
        return (100 * (right.length / len)) + '%';
    }
    
    //rendering html front end
    render() {
        return (
            <div className="view-results-wrapper">
                <div>
                    <Nav />
                </div>
                {(this.state.quiz && this.state.result) && 
                    <div className="body">
                        <div className="header">
                            Quiz Results 
                        </div>
                        <div className="quiz-data">
                            <div className="left">
                                <div className="header">{this.state.quiz.name}</div>
                                <div className="category">{this.state.quiz.category}</div>

                            </div>
                            <div className="right">
                            </div>
                        </div>

                        <div className="score">
                           Score: {this.getScore()}
                        </div>

                        <div className="answers"> 
                            {this.state.quiz.questions.map((q, idx) => (
                                <div key={idx} className="answer" style={{borderLeft: this.getBorderLeft(idx)}}>
                                    <div>{q.questionName}</div>
                                </div> 
                            ))}
                        </div>

                    </div>
                }
            </div>
        )
    }
}