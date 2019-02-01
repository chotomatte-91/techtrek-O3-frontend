import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import * as qs from 'query-string';
import './app.css';

class App extends Component {

    constructor()
    {
        super()
        this.clickEvent = this.clickEvent.bind(this)
        this.inputChange = this.inputChange.bind(this)
        this.inputProcess = this.inputProcess.bind(this)

        this.state = {
            toLogin: false,
            passLogin: false,
            urlLogin: '',
            cardValue: ''
        }
    }

    clickEvent()
    {
        fetch('http://localhost:8080/login')
        .then(results=>{return results.text()})
            .then( text=> this.setState({
                toLogin: true,
                urlLogin: text
            }))
    }

    inputChange(event)
    {
       this.setState({cardValue: event.target.value})
    }
    
    inputProcess(event)
    {
        fetch('http://localhost:8080/card',{method: 'POST', body: this.state.cardValue})
            .then(results=> console.log(results.toString()  ))
        event.preventDefault();
    }

    componentDidMount()
    {
        if(window.location.search)
        {
            const parsed = qs.parse(window.location.search.toString());
            if(parsed.code)
            {
                fetch('http://localhost:8080/auth', {method: 'POST', body: parsed.code.toString()})
                    .then(results=>{
                        if(results)
                        {
                            this.setState({passLogin: true})
                            console.log("passlogin is true")
                        }
                    })
            }
        }
    }

    render() {
      
        if (this.state.toLogin)
        {
            window.location.assign(this.state.urlLogin);
            return;
        }

        if (this.state.passLogin)
        {
            return(
                <div className="app">
                    <header className="app-header">
                        <img src="https://www.dbs.com/sandbox/api/sg/v1/security/static/images/DBS_POSB_LOGO2.png" alt="DBS and POSB logos" />
                        <br />
                        <label className="h1">Customer Page</label>
                        <form onSubmit = {this.inputProcess}>
                            <label>
                                Card Number:<br/>
                                <input type="text" value={this.state.cardValue} onChange={this.inputChange} />
                            </label>
                            <input type="submit" value="Submit" onClick={this.inputProcess} />
                        </form>
                    </header>
                </div>

            );
        }
        else
        {
            return (
                <div className="app">
                    <header className="app-header">
                        <img src="https://www.dbs.com/sandbox/api/sg/v1/security/static/images/DBS_POSB_LOGO2.png" alt="DBS and POSB logos" />
                        <br />
                        <label className="h1">Login</label>
                        <p className="h2">Login to DBS / POSB via credit card or internet banking.</p>
                        <br /><br /><br />
                        <button className='button' onClick={this.clickEvent}>Login</button>
                    </header>
                </div>
            );
        }
        
  }
}

export default App;
