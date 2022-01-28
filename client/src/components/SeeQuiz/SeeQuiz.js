import React from 'react';
import './SeeQuiz.css';
import qs from 'qs';
import axios from 'axios';

export default class SeeQuiz extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            quiz: {},
            isLoading: true, 
            isAuthenticated: true, 
            inputVal: ''
        }
    }
//checking auth if user is correct user signed in to take quiz
    checkAuth = () => {
        if (this.state.quiz.mustBeSigned && localStorage.getItem('JWT_PAYLOAD') && localStorage.getItem('_ID')) {
            this.setState({isAuthenticated: true})
        } else if (this.state.quiz.mustBeSigned) {
            this.setState({isAuthenticated: false});
        }
    }

    componentDidMount() {
        let id = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).id;
        this.setState({ id: id });
        this.refreshQuiz();
    }
//refreshing quiz
    refreshQuiz = () => {
        axios.get('/api/quizzes/get-quiz/' + qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).id).then(res => {
            if (res.data) {
                this.setState({isLoading: false, quiz: res.data.quiz});
                this.checkAuth();
            }
        }).catch(er => {
            console.log(er);
        })
    }


    //starting quiz
  
    startQuiz = () => {
        this.props.history.push({ 
            pathname: "/take-quiz/" + this.state.id,
            state: {
                quiz: this.state.quiz
            }
        })
    }

 

    render() {
        return !this.state.isLoading ? (
            <div className="see-quiz">
                {!this.state.isAuthenticated ? <div className="not-auth">Please login to take quiz</div> : 
                <div className="content">
                    <div className="header">
                        {this.state.quiz.name}
                    </div>
                    <div className="body">
                        <div className="right">
                            <div className="questions-num">{this.state.quiz.questions.length} Questions</div>
                            <div className={this.state.quiz.createdBy === localStorage.getItem('_ID') ? 'questions-wrapper' : 'questions-wrapper no-scroll'}>
                                {this.state.quiz.questions.map((question, idx) => (
                                    <div className="question" key={idx}>
                                        <div>{this.state.quiz.createdBy === localStorage.getItem('_ID') ? question.questionName : 'question name'}</div>
                                        <div>{this.state.quiz.createdBy === localStorage.getItem('_ID') ? question.correctAnswer : 'answer'}</div>
                                    </div>
                                ))}
                                {this.state.quiz.createdBy !== localStorage.getItem('_ID') ? <div className="hidden"><div>Need admin access to view quiz questions</div></div> : ''}
                            </div>
                        </div>
                    </div>
                    <div className="footer">
                        <div className="buttons-wrapper">
                            <button onClick={() => this.props.history.goBack()}>previous</button>
                            <button onClick={this.startQuiz}>Take the Quiz</button>
                        </div>
                    </div>
                </div>
                }
            </div>
        ) : <h2>Loading</h2>
    }
}