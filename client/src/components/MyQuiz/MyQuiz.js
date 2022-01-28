import React from 'react';
import './MyQuiz.css'
import axios from 'axios';
import Nav from '../MainNav/nav';

export default class MyQuiz extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quizzes: []
        }
    }

    componentDidMount() {
        axios.get('/api/quizzes/my-quiz/' + localStorage.getItem('_ID')).then(res => {
            this.setState({
                quizzes: res.data
            })
        })
    }

    //to view quiz after pressing on take quiz
    takeQuiz = (quizId) => {
        this.props.history.push('/view-quiz?id=' + quizId);
        console.log(quizId)
    }


    //rendering html
    render() {
        return (
            <div className="my-quiz-wrap">
                <div>
                    <Nav />
                </div>
                <div className="body">
                    <div className="header-top">My Quizzes</div>
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