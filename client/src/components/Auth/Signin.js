import React from 'react';

export default class Signin extends React.Component {

    //capturing value
    constructor(props) {
        super(props);
        this.state= {
            email: '',
            password: ''
        }
    }
    render() {
        return(
            <div className='main'>
                <div className="form">

                    <form className="inp-wrp">
                        <div className='emT'>Email Adress</div>
                    <input className='em' type="text" placeholder="email" value={this.state.email} onChange={e => this.setState({email: e.target.value})}/>
                    

                    <div className='psT'>Password</div>
                    <input className='ps' type="password" placeholder='******' value={this.state.password} onChange={e => this.setState({password: e.target.value})}/>
                   

                    <div className="btn" align="center" onClick={() => this.props.signIn(this.state.email, this.state.password)}>Login</div>
                    </form>
                </div>
            </div>
        )
    }}