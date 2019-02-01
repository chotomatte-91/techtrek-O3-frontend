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
                        <Menu icon='labeled' fluid widths={7}>
                            <Menu.Item>
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKpR3gGNQ798uNU4atd0Wi6L_99kPKmz40A3_7gYYOnUVp64f6" alt="DBS and POSB logos"/>
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
                                <Image src='https://static1.squarespace.com/static/583ea48d29687f52b5521c55/t/5a6989010d929731fd1af4c6/1516865801923/Jolene+Tan' size='small' circular />
                            </Menu.Item>
                            <Menu.Item name='tag' active={activeItem === 'tag'} onClick={this.handleItemClick}>
                                <Icon name='tag' />
                                Payment
                            </Menu.Item>
                            <Menu.Item name='credit card' active={activeItem === 'credit card'} onClick={this.handleItemClick}>
                                <Icon name='credit card' />
                                    Card
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
                                    <Image src='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0HBwcHBw0NDQcHBhYHBwcHCA8ICQcPIBEXGBQdFRUYHSggIiYxJxQfLTItJykrLjYzGCs/ODMsOSotOjcBCgoKDQ0NDg0NFSsZHxkrKysrKy03LTcrKysrKysrKysrLS0rKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAMIBAwMBIgACEQEDEQH/xAAZAAEBAQEBAQAAAAAAAAAAAAACAAEEAwb/xAAnEAEBAAIBAQYHAQAAAAAAAAAAEQECEjEhIiNRkcEEFDJBcbHwA//EABkBAQEBAQEBAAAAAAAAAAAAAAABAwIGBf/EABURAQEAAAAAAAAAAAAAAAAAAAAR/9oADAMBAAIRAxEAPwD5JJPmPdJMVEamVUGoaqFJlGqiUqqNZQp1lGsolOso1VSlVQqolKqhVRKVVGsoUqqNZRKdZRrKqU6qFVClVQqolKqhVRKVaFSldVVCquG1KqhVVSlVRrKFOso1USlWUaqJSqoVVUpVUKqFKqhVRKVVGsolOso1VSlWUaqJSqoVUSlVQqoUqqNZVSnWUayiU6yjVQpVBUJXXWUayuW1Oso1UKVZRqolKqhVVSlVRrKFKqjWUSnWUayiU6yjVVSlVQqoUqqNZRKVVGsolKqjWVSnWUaqJSrKNVEpVUKqFKqjWVUp1g1BXVVQqrltSqo1lEpVUayiU6yjWUKdZRqqpSqoVUSlVRrKFKqjWUSnWUayiU6yjVVKVVCqiUqqFVEpVUayhSqo1lVKdZRqolKqhVRKVQ1gV11lGquW1Kso1USlVQqqlKqjWUSlVRrKJTrKNVClWUaqqUqqFVEpVUKqFKqjWUSnWUayiU6yjVVKVVCqiUqqFVEpVUKqFOso1lVKdQVCV1VUayuW9KqjWUSnWUaqJSrKNVClVQqqpSqo1lEpVUayiU6yjWUKdZRqqpSqoVUSlVQqoUqqNZRKVVGsolOso1lUp1lGqiUqqFVEpVDUFdVZRqrltSqoVUSlVRrKpSqo1lEp1lGqiUqyjVQpVUKqqUqqFVEpVUayhTrKNZRKdZRqqpSrKNVClVQqolKqhVRKVVGsolOso1VSlUFQldVVGsrltTrKNVClWUaqJSqoVUSlVQqqlKqjWUSnWUayiU6yjVQpVlGqqlKqhVRKVVGsoUqqNZRKdZRrKJTrKNVUpVUKqJSqoVUSlWhUQrqqoVVy2pVUKqJSqo1lUp1lGsolOso1USlVQqoUqqFVVKVVGsolKqjWUSnWUaqFKso1VUpVUKqJSqo1lClVRrKJTrKNZVSnWUaqFKoK0Suqso1lctqdZRqoUqyjVRKVVCqiUqqNZVKVVGsolOso1USlWUaqFKqhVVSlVQqolKqjWUSnWUayhTrKNVVKVZRqolKqhVQpVUayiU6grCFddVCquW1KqjWVUp1lGsolOso1lCnWUaqJSqoVUSlVRrKpSqo1lEp1lGsolOso1lCnVQqqpSqoVUSlVRrKFKqjWUSnWUayqlOso1USlWvOtCuqso1Vy2pVlZWUKVVGsolKqhVVSlVRrKJTrKNVClWUaqJSqoVVUpVUKqFKqjWUSnWUayiU6yjVQpVUaxUpVUS/z1576aWctuNz0wFZVXRt8L4mdMZk05eLrw29P0XyVztx3xnh9WeOezvZx7COWsdW/wAHNsY12uM5z2YxnbOMYv8AfnK+UmvLbfGMeWdc3Pdvt6g5UW+vDbbXrx243HTKB7JJy3YxIRJIRMagYkhGJJUYxqBiSESYlRMSBJIRJIEkgSSBNvZnH2z1x5pAxJAkkD//2Q==' fluid rounded />
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
                                    <Image src='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0HBwcHBw0NDQcHBhYHBwcHCA8ICQcPIBEXGBQdFRUYHSggIiYxJxQfLTItJykrLjYzGCs/ODMsOSotOjcBCgoKDQ0NDg0NFSsZHxkrKysrKy03LTcrKysrKysrKysrLS0rKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAMIBAwMBIgACEQEDEQH/xAAZAAEBAQEBAQAAAAAAAAAAAAACAAEEAwb/xAAnEAEBAAIBAQYHAQAAAAAAAAAAEQECEjEhIiNRkcEEFDJBcbHwA//EABkBAQEBAQEBAAAAAAAAAAAAAAABAwIGBf/EABURAQEAAAAAAAAAAAAAAAAAAAAR/9oADAMBAAIRAxEAPwD5JJPmPdJMVEamVUGoaqFJlGqiUqqNZQp1lGsolOso1VSlVQqolKqhVRKVVGsoUqqNZRKdZRrKqU6qFVClVQqolKqhVRKVaFSldVVCquG1KqhVVSlVRrKFOso1USlWUaqJSqoVVUpVUKqFKqhVRKVVGsolOso1VSlWUaqJSqoVUSlVQqoUqqNZVSnWUayiU6yjVQpVBUJXXWUayuW1Oso1UKVZRqolKqhVVSlVRrKFKqjWUSnWUayiU6yjVVSlVQqoUqqNZRKVVGsolKqjWVSnWUaqJSrKNVEpVUKqFKqjWVUp1g1BXVVQqrltSqo1lEpVUayiU6yjWUKdZRqqpSqoVUSlVRrKFKqjWUSnWUayiU6yjVVKVVCqiUqqFVEpVUayhSqo1lVKdZRqolKqhVRKVQ1gV11lGquW1Kso1USlVQqqlKqjWUSlVRrKJTrKNVClWUaqqUqqFVEpVUKqFKqjWUSnWUayiU6yjVVKVVCqiUqqFVEpVUKqFOso1lVKdQVCV1VUayuW9KqjWUSnWUaqJSrKNVClVQqqpSqo1lEpVUayiU6yjWUKdZRqqpSqoVUSlVQqoUqqNZRKVVGsolOso1lUp1lGqiUqqFVEpVDUFdVZRqrltSqoVUSlVRrKpSqo1lEp1lGqiUqyjVQpVUKqqUqqFVEpVUayhTrKNZRKdZRqqpSrKNVClVQqolKqhVRKVVGsolOso1VSlUFQldVVGsrltTrKNVClWUaqJSqoVUSlVQqqlKqjWUSnWUayiU6yjVQpVlGqqlKqhVRKVVGsoUqqNZRKdZRrKJTrKNVUpVUKqJSqoVUSlWhUQrqqoVVy2pVUKqJSqo1lUp1lGsolOso1USlVQqoUqqFVVKVVGsolKqjWUSnWUaqFKso1VUpVUKqJSqo1lClVRrKJTrKNZVSnWUaqFKoK0Suqso1lctqdZRqoUqyjVRKVVCqiUqqNZVKVVGsolOso1USlWUaqFKqhVVSlVQqolKqjWUSnWUayhTrKNVVKVZRqolKqhVQpVUayiU6grCFddVCquW1KqjWVUp1lGsolOso1lCnWUaqJSqoVUSlVRrKpSqo1lEp1lGsolOso1lCnVQqqpSqoVUSlVRrKFKqjWUSnWUayqlOso1USlWvOtCuqso1Vy2pVlZWUKVVGsolKqhVVSlVRrKJTrKNVClWUaqJSqoVVUpVUKqFKqjWUSnWUayiU6yjVQpVUaxUpVUS/z1576aWctuNz0wFZVXRt8L4mdMZk05eLrw29P0XyVztx3xnh9WeOezvZx7COWsdW/wAHNsY12uM5z2YxnbOMYv8AfnK+UmvLbfGMeWdc3Pdvt6g5UW+vDbbXrx243HTKB7JJy3YxIRJIRMagYkhGJJUYxqBiSESYlRMSBJIRJIEkgSSBNvZnH2z1x5pAxJAkkD//2Q==' fluid rounded />
                                    <div className="grid-content-left">
                                      <h1>Deposit Accounts</h1><br />
                                      POSB Savings Account 806290151 S$2365.07<br />
                                    </div>
                                  </div>
                                  </a>
                                </Grid.Column>
                                <Grid.Column>
                                  <a href="" title="See all credit accounts">
                                  <div className="grid-content-container">
                                    <Image src='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0HBwcHBw0NDQcHBhYHBwcHCA8ICQcPIBEXGBQdFRUYHSggIiYxJxQfLTItJykrLjYzGCs/ODMsOSotOjcBCgoKDQ0NDg0NFSsZHxkrKysrKy03LTcrKysrKysrKysrLS0rKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAMIBAwMBIgACEQEDEQH/xAAZAAEBAQEBAQAAAAAAAAAAAAACAAEEAwb/xAAnEAEBAAIBAQYHAQAAAAAAAAAAEQECEjEhIiNRkcEEFDJBcbHwA//EABkBAQEBAQEBAAAAAAAAAAAAAAABAwIGBf/EABURAQEAAAAAAAAAAAAAAAAAAAAR/9oADAMBAAIRAxEAPwD5JJPmPdJMVEamVUGoaqFJlGqiUqqNZQp1lGsolOso1VSlVQqolKqhVRKVVGsoUqqNZRKdZRrKqU6qFVClVQqolKqhVRKVaFSldVVCquG1KqhVVSlVRrKFOso1USlWUaqJSqoVVUpVUKqFKqhVRKVVGsolOso1VSlWUaqJSqoVUSlVQqoUqqNZVSnWUayiU6yjVQpVBUJXXWUayuW1Oso1UKVZRqolKqhVVSlVRrKFKqjWUSnWUayiU6yjVVSlVQqoUqqNZRKVVGsolKqjWVSnWUaqJSrKNVEpVUKqFKqjWVUp1g1BXVVQqrltSqo1lEpVUayiU6yjWUKdZRqqpSqoVUSlVRrKFKqjWUSnWUayiU6yjVVKVVCqiUqqFVEpVUayhSqo1lVKdZRqolKqhVRKVQ1gV11lGquW1Kso1USlVQqqlKqjWUSlVRrKJTrKNVClWUaqqUqqFVEpVUKqFKqjWUSnWUayiU6yjVVKVVCqiUqqFVEpVUKqFOso1lVKdQVCV1VUayuW9KqjWUSnWUaqJSrKNVClVQqqpSqo1lEpVUayiU6yjWUKdZRqqpSqoVUSlVQqoUqqNZRKVVGsolOso1lUp1lGqiUqqFVEpVDUFdVZRqrltSqoVUSlVRrKpSqo1lEp1lGqiUqyjVQpVUKqqUqqFVEpVUayhTrKNZRKdZRqqpSrKNVClVQqolKqhVRKVVGsolOso1VSlUFQldVVGsrltTrKNVClWUaqJSqoVUSlVQqqlKqjWUSnWUayiU6yjVQpVlGqqlKqhVRKVVGsoUqqNZRKdZRrKJTrKNVUpVUKqJSqoVUSlWhUQrqqoVVy2pVUKqJSqo1lUp1lGsolOso1USlVQqoUqqFVVKVVGsolKqjWUSnWUaqFKso1VUpVUKqJSqo1lClVRrKJTrKNZVSnWUaqFKoK0Suqso1lctqdZRqoUqyjVRKVVCqiUqqNZVKVVGsolOso1USlWUaqFKqhVVSlVQqolKqjWUSnWUayhTrKNVVKVZRqolKqhVQpVUayiU6grCFddVCquW1KqjWVUp1lGsolOso1lCnWUaqJSqoVUSlVRrKpSqo1lEp1lGsolOso1lCnVQqqpSqoVUSlVRrKFKqjWUSnWUayqlOso1USlWvOtCuqso1Vy2pVlZWUKVVGsolKqhVVSlVRrKJTrKNVClWUaqJSqoVVUpVUKqFKqjWUSnWUayiU6yjVQpVUaxUpVUS/z1576aWctuNz0wFZVXRt8L4mdMZk05eLrw29P0XyVztx3xnh9WeOezvZx7COWsdW/wAHNsY12uM5z2YxnbOMYv8AfnK+UmvLbfGMeWdc3Pdvt6g5UW+vDbbXrx243HTKB7JJy3YxIRJIRMagYkhGJJUYxqBiSESYlRMSBJIRJIEkgSSBNvZnH2z1x5pAxJAkkD//2Q==' fluid rounded />
                                    <div className="grid-content-left">
                                      <h1>Credit Accounts</h1><br />
                                      DBS Altitude Visa Signature Card 1111-2222-3333-4444<br />
                                      S$0.00
                                    </div>
                                  </div>
                                  </a>
                                </Grid.Column>
                              </Grid.Row>
                              
                              <Grid.Row columns={3}>
                                <Grid.Column>
                                  <a href="" title="See all promotions">
                                  <div className="grid-content-container">
                                    <Image src='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0HBwcHBw0NDQcHBhYHBwcHCA8ICQcPIBEXGBQdFRUYHSggIiYxJxQfLTItJykrLjYzGCs/ODMsOSotOjcBCgoKDQ0NDg0NFSsZHxkrKysrKy03LTcrKysrKysrKysrLS0rKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAMIBAwMBIgACEQEDEQH/xAAZAAEBAQEBAQAAAAAAAAAAAAACAAEEAwb/xAAnEAEBAAIBAQYHAQAAAAAAAAAAEQECEjEhIiNRkcEEFDJBcbHwA//EABkBAQEBAQEBAAAAAAAAAAAAAAABAwIGBf/EABURAQEAAAAAAAAAAAAAAAAAAAAR/9oADAMBAAIRAxEAPwD5JJPmPdJMVEamVUGoaqFJlGqiUqqNZQp1lGsolOso1VSlVQqolKqhVRKVVGsoUqqNZRKdZRrKqU6qFVClVQqolKqhVRKVaFSldVVCquG1KqhVVSlVRrKFOso1USlWUaqJSqoVVUpVUKqFKqhVRKVVGsolOso1VSlWUaqJSqoVUSlVQqoUqqNZVSnWUayiU6yjVQpVBUJXXWUayuW1Oso1UKVZRqolKqhVVSlVRrKFKqjWUSnWUayiU6yjVVSlVQqoUqqNZRKVVGsolKqjWVSnWUaqJSrKNVEpVUKqFKqjWVUp1g1BXVVQqrltSqo1lEpVUayiU6yjWUKdZRqqpSqoVUSlVRrKFKqjWUSnWUayiU6yjVVKVVCqiUqqFVEpVUayhSqo1lVKdZRqolKqhVRKVQ1gV11lGquW1Kso1USlVQqqlKqjWUSlVRrKJTrKNVClWUaqqUqqFVEpVUKqFKqjWUSnWUayiU6yjVVKVVCqiUqqFVEpVUKqFOso1lVKdQVCV1VUayuW9KqjWUSnWUaqJSrKNVClVQqqpSqo1lEpVUayiU6yjWUKdZRqqpSqoVUSlVQqoUqqNZRKVVGsolOso1lUp1lGqiUqqFVEpVDUFdVZRqrltSqoVUSlVRrKpSqo1lEp1lGqiUqyjVQpVUKqqUqqFVEpVUayhTrKNZRKdZRqqpSrKNVClVQqolKqhVRKVVGsolOso1VSlUFQldVVGsrltTrKNVClWUaqJSqoVUSlVQqqlKqjWUSnWUayiU6yjVQpVlGqqlKqhVRKVVGsoUqqNZRKdZRrKJTrKNVUpVUKqJSqoVUSlWhUQrqqoVVy2pVUKqJSqo1lUp1lGsolOso1USlVQqoUqqFVVKVVGsolKqjWUSnWUaqFKso1VUpVUKqJSqo1lClVRrKJTrKNZVSnWUaqFKoK0Suqso1lctqdZRqoUqyjVRKVVCqiUqqNZVKVVGsolOso1USlWUaqFKqhVVSlVQqolKqjWUSnWUayhTrKNVVKVZRqolKqhVQpVUayiU6grCFddVCquW1KqjWVUp1lGsolOso1lCnWUaqJSqoVUSlVRrKpSqo1lEp1lGsolOso1lCnVQqqpSqoVUSlVRrKFKqjWUSnWUayqlOso1USlWvOtCuqso1Vy2pVlZWUKVVGsolKqhVVSlVRrKJTrKNVClWUaqJSqoVVUpVUKqFKqjWUSnWUayiU6yjVQpVUaxUpVUS/z1576aWctuNz0wFZVXRt8L4mdMZk05eLrw29P0XyVztx3xnh9WeOezvZx7COWsdW/wAHNsY12uM5z2YxnbOMYv8AfnK+UmvLbfGMeWdc3Pdvt6g5UW+vDbbXrx243HTKB7JJy3YxIRJIRMagYkhGJJUYxqBiSESYlRMSBJIRJIEkgSSBNvZnH2z1x5pAxJAkkD//2Q==' fluid rounded />
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
                                    <Image src='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0HBwcHBw0NDQcHBhYHBwcHCA8ICQcPIBEXGBQdFRUYHSggIiYxJxQfLTItJykrLjYzGCs/ODMsOSotOjcBCgoKDQ0NDg0NFSsZHxkrKysrKy03LTcrKysrKysrKysrLS0rKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAMIBAwMBIgACEQEDEQH/xAAZAAEBAQEBAQAAAAAAAAAAAAACAAEEAwb/xAAnEAEBAAIBAQYHAQAAAAAAAAAAEQECEjEhIiNRkcEEFDJBcbHwA//EABkBAQEBAQEBAAAAAAAAAAAAAAABAwIGBf/EABURAQEAAAAAAAAAAAAAAAAAAAAR/9oADAMBAAIRAxEAPwD5JJPmPdJMVEamVUGoaqFJlGqiUqqNZQp1lGsolOso1VSlVQqolKqhVRKVVGsoUqqNZRKdZRrKqU6qFVClVQqolKqhVRKVaFSldVVCquG1KqhVVSlVRrKFOso1USlWUaqJSqoVVUpVUKqFKqhVRKVVGsolOso1VSlWUaqJSqoVUSlVQqoUqqNZVSnWUayiU6yjVQpVBUJXXWUayuW1Oso1UKVZRqolKqhVVSlVRrKFKqjWUSnWUayiU6yjVVSlVQqoUqqNZRKVVGsolKqjWVSnWUaqJSrKNVEpVUKqFKqjWVUp1g1BXVVQqrltSqo1lEpVUayiU6yjWUKdZRqqpSqoVUSlVRrKFKqjWUSnWUayiU6yjVVKVVCqiUqqFVEpVUayhSqo1lVKdZRqolKqhVRKVQ1gV11lGquW1Kso1USlVQqqlKqjWUSlVRrKJTrKNVClWUaqqUqqFVEpVUKqFKqjWUSnWUayiU6yjVVKVVCqiUqqFVEpVUKqFOso1lVKdQVCV1VUayuW9KqjWUSnWUaqJSrKNVClVQqqpSqo1lEpVUayiU6yjWUKdZRqqpSqoVUSlVQqoUqqNZRKVVGsolOso1lUp1lGqiUqqFVEpVDUFdVZRqrltSqoVUSlVRrKpSqo1lEp1lGqiUqyjVQpVUKqqUqqFVEpVUayhTrKNZRKdZRqqpSrKNVClVQqolKqhVRKVVGsolOso1VSlUFQldVVGsrltTrKNVClWUaqJSqoVUSlVQqqlKqjWUSnWUayiU6yjVQpVlGqqlKqhVRKVVGsoUqqNZRKdZRrKJTrKNVUpVUKqJSqoVUSlWhUQrqqoVVy2pVUKqJSqo1lUp1lGsolOso1USlVQqoUqqFVVKVVGsolKqjWUSnWUaqFKso1VUpVUKqJSqo1lClVRrKJTrKNZVSnWUaqFKoK0Suqso1lctqdZRqoUqyjVRKVVCqiUqqNZVKVVGsolOso1USlWUaqFKqhVVSlVQqolKqjWUSnWUayhTrKNVVKVZRqolKqhVQpVUayiU6grCFddVCquW1KqjWVUp1lGsolOso1lCnWUaqJSqoVUSlVRrKpSqo1lEp1lGsolOso1lCnVQqqpSqoVUSlVRrKFKqjWUSnWUayqlOso1USlWvOtCuqso1Vy2pVlZWUKVVGsolKqhVVSlVRrKJTrKNVClWUaqJSqoVVUpVUKqFKqjWUSnWUayiU6yjVQpVUaxUpVUS/z1576aWctuNz0wFZVXRt8L4mdMZk05eLrw29P0XyVztx3xnh9WeOezvZx7COWsdW/wAHNsY12uM5z2YxnbOMYv8AfnK+UmvLbfGMeWdc3Pdvt6g5UW+vDbbXrx243HTKB7JJy3YxIRJIRMagYkhGJJUYxqBiSESYlRMSBJIRJIEkgSSBNvZnH2z1x5pAxJAkkD//2Q==' fluid rounded />
                                    <div className="grid-content-left">
                                      <h1>Recent Transactions</h1><br />
                                      TRANSFER - S$27.84<br />
                                      TRANSPORT - S$17.60
                                    </div>
                                  </div>
                                  </a>
                                </Grid.Column>
                                <Grid.Column>
                                  <a href="" alt="">
                                  <div className="grid-content-container">
                                    <Image src='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0HBwcHBw0NDQcHBhYHBwcHCA8ICQcPIBEXGBQdFRUYHSggIiYxJxQfLTItJykrLjYzGCs/ODMsOSotOjcBCgoKDQ0NDg0NFSsZHxkrKysrKy03LTcrKysrKysrKysrLS0rKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAMIBAwMBIgACEQEDEQH/xAAZAAEBAQEBAQAAAAAAAAAAAAACAAEEAwb/xAAnEAEBAAIBAQYHAQAAAAAAAAAAEQECEjEhIiNRkcEEFDJBcbHwA//EABkBAQEBAQEBAAAAAAAAAAAAAAABAwIGBf/EABURAQEAAAAAAAAAAAAAAAAAAAAR/9oADAMBAAIRAxEAPwD5JJPmPdJMVEamVUGoaqFJlGqiUqqNZQp1lGsolOso1VSlVQqolKqhVRKVVGsoUqqNZRKdZRrKqU6qFVClVQqolKqhVRKVaFSldVVCquG1KqhVVSlVRrKFOso1USlWUaqJSqoVVUpVUKqFKqhVRKVVGsolOso1VSlWUaqJSqoVUSlVQqoUqqNZVSnWUayiU6yjVQpVBUJXXWUayuW1Oso1UKVZRqolKqhVVSlVRrKFKqjWUSnWUayiU6yjVVSlVQqoUqqNZRKVVGsolKqjWVSnWUaqJSrKNVEpVUKqFKqjWVUp1g1BXVVQqrltSqo1lEpVUayiU6yjWUKdZRqqpSqoVUSlVRrKFKqjWUSnWUayiU6yjVVKVVCqiUqqFVEpVUayhSqo1lVKdZRqolKqhVRKVQ1gV11lGquW1Kso1USlVQqqlKqjWUSlVRrKJTrKNVClWUaqqUqqFVEpVUKqFKqjWUSnWUayiU6yjVVKVVCqiUqqFVEpVUKqFOso1lVKdQVCV1VUayuW9KqjWUSnWUaqJSrKNVClVQqqpSqo1lEpVUayiU6yjWUKdZRqqpSqoVUSlVQqoUqqNZRKVVGsolOso1lUp1lGqiUqqFVEpVDUFdVZRqrltSqoVUSlVRrKpSqo1lEp1lGqiUqyjVQpVUKqqUqqFVEpVUayhTrKNZRKdZRqqpSrKNVClVQqolKqhVRKVVGsolOso1VSlUFQldVVGsrltTrKNVClWUaqJSqoVUSlVQqqlKqjWUSnWUayiU6yjVQpVlGqqlKqhVRKVVGsoUqqNZRKdZRrKJTrKNVUpVUKqJSqoVUSlWhUQrqqoVVy2pVUKqJSqo1lUp1lGsolOso1USlVQqoUqqFVVKVVGsolKqjWUSnWUaqFKso1VUpVUKqJSqo1lClVRrKJTrKNZVSnWUaqFKoK0Suqso1lctqdZRqoUqyjVRKVVCqiUqqNZVKVVGsolOso1USlWUaqFKqhVVSlVQqolKqjWUSnWUayhTrKNVVKVZRqolKqhVQpVUayiU6grCFddVCquW1KqjWVUp1lGsolOso1lCnWUaqJSqoVUSlVRrKpSqo1lEp1lGsolOso1lCnVQqqpSqoVUSlVRrKFKqjWUSnWUayqlOso1USlWvOtCuqso1Vy2pVlZWUKVVGsolKqhVVSlVRrKJTrKNVClWUaqJSqoVVUpVUKqFKqjWUSnWUayiU6yjVQpVUaxUpVUS/z1576aWctuNz0wFZVXRt8L4mdMZk05eLrw29P0XyVztx3xnh9WeOezvZx7COWsdW/wAHNsY12uM5z2YxnbOMYv8AfnK+UmvLbfGMeWdc3Pdvt6g5UW+vDbbXrx243HTKB7JJy3YxIRJIRMagYkhGJJUYxqBiSESYlRMSBJIRJIEkgSSBNvZnH2z1x5pAxJAkkD//2Q==' fluid rounded />
                                    <div className="grid-content-left">
                                      <h1></h1><br />
                                      
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
