import React from "react";
import $ from 'jquery';

export default class Message extends React.Component {

    constructor(props) {
        super(props);
        this.mesRef = React.createRef()
    }

    componentDidMount() {
        $(this.mesRef.current).hide()
    }


    //creating toast animation fadein
    hideScreen = () => {
        $(this.mesRef.current).fadeIn(180);
        document.getElementsByTagName('html')[0].style.overflow = 'hidden';
    }

     //creating toast animation fadeout
    showScreen = () => {
        $(this.mesRef.current).fadeOut(180);
        document.getElementsByTagName('html')[0].style.overflow = 'auto';
    }


    render() {
        let cMod = undefined;
        if(this.props.model === true) {
            this.hideScreen();
        } else {
            this.showScreen();
        }
            cMod = <div ref={this.mesRef} style={{overflow: 'scroll', position: 'absolute', top: '15px', right: '15px', zIndex: this.props.zIndex ? this.props.zIndex : 20, width: '100vw', backgroundColor: this.props.backgroundColor ? this.props.backgroundColor : '#30D158', width: 'fit-content', color: 'white', borderRadius: '5px', padding: '15px 25px'}}>
                {this.props.message}
            </div>
        return (
            <div>
                {cMod}
            </div>
        )
    }
}