import React from "react";
import './AllQuiz.css';
import axios from 'axios';
import Nav from '../MainNav/nav';

export default class AllQuiz extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quizzes: []
        }
    }

    componentDidMount() {
        axios.get('/api/quizzes/all-quiz/').then(res => {
            this.setState({
                quizzes: res.data
            })
        })
    }

    //allquiz showing quiz to be fixed.
    takeQuiz = (quizId) => {
        this.props.history.push('/view-quiz?id=' + quizId);
    }

    render() {
        return (
            <div className="all-quiz-wrap">
                <div>
                    <Nav />
                </div>
                <div className="body">
                    <div className="header-top">All Quizzes</div>
                    <div className="quizzes-wrapper">
                        {this.state.quizzes.map((quiz, idx) => (
                            <div key={idx} className="quiz-card card">
                           
                                <div className="quiz-name">{quiz.name}</div>
                                <div className="category">{quiz.category}</div>
                                <div className="questions">{quiz.questions.length} Questions</div>
                                <div className="take-quiz btn" onClick={() => this.takeQuiz(quiz._id)}>Take Quiz</div>

                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}