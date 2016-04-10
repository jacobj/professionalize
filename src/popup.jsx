import fetch from 'isomorphic-fetch';
import React from 'react';
import ReactDOM from 'react-dom';

class InputTextArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputText: 'Welcome to Professionalize! Paste some text here and I will take good care of you.',
            outputText: null
        };
    }

    checkText() {
        fetch('http://localhost:5000/profesh', {
              method: 'POST',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  inputText: this.state.inputText,
              })
        }).then(res => {
            return res.text();
        }).then(text => {
            this.setState({ outputText: text });
        });
    }

    handleTextInput(event) {
        this.setState({ inputText: event.target.value });
    }

    render() {
        let outputTextEl;

        if (this.state.outputText) {
            outputTextEl = (
                <div className="output">{this.state.outputText}</div>
            );
        }

        return (
            <div className="wrapper">
                <img src="./img/logo.png" width="300"/>
                <div>
                    <textarea
                        type="text"
                        rows="10"
                        value={this.state.inputText}
                        onChange={this.handleTextInput.bind(this)}/>
                </div>
                <div>
                    <button
                        className="button"
                        type="button"
                        onClick={this.checkText.bind(this)}>
                        Professionalize it!
                    </button>
                </div>
                {outputTextEl}
            </div>
        );
    }
}

ReactDOM.render(
    <InputTextArea />,
    document.getElementById('popup')
);
