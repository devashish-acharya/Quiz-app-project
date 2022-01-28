import React from 'react';
import $ from 'jquery'

export default class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.modRef = React.createRef()
    }

    componentDidMount() {
        $(this.modRef.current).hide()
    }

    //making anivation for modal fade in
    hideScreen = () => {
        $(this.modRef.current).fadeIn(180);
        document.getElementsByTagName('html')[0].style.overflow = 'hidden';
    }

    //making anivation for modal fade out
    showScreen = () => {
        $(this.modRef.current).fadeOut(180);
        document.getElementsByTagName('html')[0].style.overflow = 'auto';
    }

    //rendering html frontend
    render() {
        let cMod = undefined;
        if(this.props.model === true) {
            this.hideScreen();
        } else {
            this.showScreen();
        }
            cMod = <div ref={this.modRef} style={{overflow: 'scroll', position: 'absolute', top: '0', bottom: '0', left: '0', right: '0', zIndex: this.props.zIndex ? this.props.zIndex : 20, width: '100vw', backgroundColor: this.props.backgroundColor ? this.props.backgroundColor : 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <div style={{backgroundColor: this.props.noBg ? '' : 'white', borderRadius: '20px', padding: '20px'}}>
                    {this.props.children}
                </div>
            </div>
        return (
            <div>
                {cMod}
            </div>
        )
    }
}

