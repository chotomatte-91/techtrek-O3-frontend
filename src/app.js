import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import * as qs from 'query-string';
import './app.css';
import { Grid, Image, Icon, Menu, Dropdown } from 'semantic-ui-react';

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
    
    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {

        const { activeItem } = this.state.passLogin
      
        if (this.state.toLogin)
        {
            window.location.assign(this.state.urlLogin);
            return;
        }

        if (this.state.passLogin)
        {
            return(
                <div className="app">
                    <header>
                        <Menu icon='labeled' fluid widths={9} inverted>
                            <Menu.Item>
                                <Image src="http://pluspng.com/img-png/logo-dbs-png-dbs-bank-logo-logotype-4519.png" alt="DBS and POSB logos" size="small" />
                            </Menu.Item>
                            <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick}>
                                <Icon name='home' />
                                <Dropdown item text='Account Summary'>
                                    <Dropdown.Menu>
                                        <Dropdown.Item>Home</Dropdown.Item>
                                        <Dropdown.Item>View Transaction History</Dropdown.Item>
                                        <Dropdown.Item>View eStatement</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Menu.Item>
                            <Menu.Item name='exchange' active={activeItem === 'exchange'} onClick={this.handleItemClick}>
                                <Icon name='exchange' />
                                <Dropdown item text='Transfer'>
                                    <Dropdown.Menu>
                                        <Dropdown.Item>To PayNow</Dropdown.Item>
                                        <Dropdown.Item>To My Account</Dropdown.Item>
                                        <Dropdown.Item>To Other DBS or POSB Account</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Menu.Item>
                            <Menu.Item>
                                <Icon name='money' />
                                <Dropdown item text='Financial Planning'>
                                    <Dropdown.Menu>
                                        <Dropdown.Item>Invest</Dropdown.Item>
                                        <Dropdown.Item>Online Trading</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Menu.Item>
                            <Menu.Item>
                                <Image src='https://static1.squarespace.com/static/583ea48d29687f52b5521c55/t/5a6989010d929731fd1af4c6/1516865801923/Jolene+Tan' size='small' circular />
                                <Dropdown item text=''>
                                    <Dropdown.Menu>
                                        <Dropdown.Item>Account Info</Dropdown.Item>
                                        <Dropdown.Item>Change Email</Dropdown.Item>
                                        <Dropdown.Item>Change Password</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Menu.Item>
                            <Menu.Item name='tag' active={activeItem === 'tag'} onClick={this.handleItemClick}>
                                <Icon name='tag' />
                                Payment
                            </Menu.Item>
                            <Menu.Item name='credit card' active={activeItem === 'credit card'} onClick={this.handleItemClick}>
                                <Icon name='credit card' />
                                    Card
                            </Menu.Item>
                            <Menu.Item name='messages' active={activeItem === 'messages'} onClick={this.handleItemClick}>
                                <Icon name='envelope' />
                                    Messages
                            </Menu.Item>
                            <Menu.Item name='log out' active={activeItem === 'log out'} onClick={this.handleItemClick}>
                                <Icon name='log out' />
                                    Log Out
                            </Menu.Item>
                        </Menu>
                        <div className="contentspace">
                            <Grid>
                              <Grid.Row columns={3}>
                                <Grid.Column>
                                  <a href="" title="See profile information">
                                  <div className="grid-content-container">
                                    <Image src='http://www.fmwconcepts.com/misc_tests/gradr.png' fluid rounded />
                                    <div className="grid-content-left">
                                      <h1>Welcome Back</h1><br />
                                      Your last login was 06.00PM on Tuesday 29th January 2019 (Singapore)
                                    </div>
                                  </div>
                                  </a>
                                </Grid.Column>
                                <Grid.Column>
                                  <a href="" title="See all deposit accounts">
                                  <div className="grid-content-container">
                                    <Image src='http://www.fmwconcepts.com/misc_tests/gradr.png' fluid rounded />
                                    <div className="grid-content-left">
                                      <h1>Deposit Accounts</h1><br />
                                      <u>POSB Savings Account 806290151</u><br />
                                      S$2365.07
                                    </div>
                                  </div>
                                  </a>
                                </Grid.Column>
                                <Grid.Column>
                                  <a href="" title="See all credit accounts">
                                  <div className="grid-content-container">
                                    <Image src='http://www.fmwconcepts.com/misc_tests/gradr.png' fluid rounded />
                                    <div className="grid-content-left">
                                      <h1>Credit Accounts</h1><br />
                                      <u>DBS Altitude Visa Signature Card 1111-2222-3333-4444</u><br />
                                      S$0.00<br />
                                      <br />
                                      <u>VISA Platinum 1234-2345-3456-4567</u><br />
                                      S$1322.80
                                    </div>
                                  </div>
                                  </a>
                                </Grid.Column>
                              </Grid.Row>
                              
                              <Grid.Row columns={3}>
                                <Grid.Column>
                                  <a href="" title="See all promotions">
                                  <div className="grid-content-container">
                                    <Image src='http://www.fmwconcepts.com/misc_tests/gradr.png' fluid rounded />
                                    <div className="grid-content-left">
                                      <h1>Grab discount with PayLah!</h1><br />
                                      Enjoy your discount when you pay for Grab with PayLah! Offer till 5th Jul 2019!
                                    </div>
                                  </div>
                                  </a>
                                </Grid.Column>
                                <Grid.Column>
                                  <a href="" title="See all transactions">
                                  <div className="grid-content-container">
                                    <Image src='http://www.fmwconcepts.com/misc_tests/gradr.png' fluid rounded />
                                    <div className="grid-content-left">
                                      <h1>Recent Transactions</h1><br />
                                      TRANSFER - S$27.84<br />
                                      TRANSPORT - S$17.60
                                    </div>
                                  </div>
                                  </a>
                                </Grid.Column>
                                <Grid.Column>
                                  <a href="" title="See PayLah information">
                                  <div className="grid-content-container">
                                    <Image src='http://www.fmwconcepts.com/misc_tests/gradr.png' fluid rounded />
                                    <div className="grid-content-left">
                                      <h1>PayLah</h1><br />
                                      $0.00
                                    </div>
                                  </div>
                                  </a>
                                </Grid.Column>
                              </Grid.Row>
                              
                            </Grid>
                        </div>
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
