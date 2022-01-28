import React from 'react';





export default class Signup extends React.Component {

    
    //capturing value
    constructor(props) {
        super(props);
        this.state= {
            email: '',
            password: '',
            firstName: '',
            lastName: ''
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

                    <div className='emT'>First Name</div>
                <input className='em' type="text" placeholder="first name" value={this.state.firstName} onChange={e => this.setState({firstName: e.target.value})}/>
                

                <div className='psT'>Last Name</div>
                <input className='ps' type="text" placeholder='last name' value={this.state.lastName} onChange={e => this.setState({lastName: e.target.value})}/>               

                <div className="btn" align="center" onClick={() => this.props.signUp({...this.state})}>Sign Up</div>
                </form>
            </div>
        </div>
        )
    }}