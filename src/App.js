import React from 'react';
import ServicesList from "./ServicesList";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from "styled-components";
import Dropdown from "react-bootstrap/Dropdown";


export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            services: [],
            pollingTime: 1000,
            interval: null,
        };
    }

    componentDidMount() {
        this.setState({
            interval: setInterval(() => {
                axios.get('http://localhost:11021/v1/hd/get-services')
                    .then(res => {
                        this.setState({services: res.data});
                    })
            }, this.state.pollingTime)
        })
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <div>
                <TitleWrapper>
                    <Title/>
                </TitleWrapper>
                <Wrapper>
                    <ServicesList services={this.state.services} pollingTime={this.state.pollingTime}/>
                    <DropdownWrapper>
                        <div>Polling period (seconds)</div>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                {this.state.pollingTime / 1000}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => {
                                    this.changePollingTime(1000)
                                }}>1</Dropdown.Item>
                                <Dropdown.Item onClick={() => {
                                    this.changePollingTime(10000)
                                }}>10</Dropdown.Item>
                                <Dropdown.Item onClick={() => {
                                    this.changePollingTime(30000)
                                }}>30</Dropdown.Item>
                                <Dropdown.Item onClick={() => {
                                    this.changePollingTime(60000)
                                }}>60</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </DropdownWrapper>
                </Wrapper>
            </div>
        )
    }

    changePollingTime(newPollingTime) {
        clearInterval(this.state.interval);
        this.setState({pollingTime: newPollingTime});
        this.setState({
            interval: setInterval(() => {
                axios.get('http://localhost:11021/v1/hd/get-services')
                    .then(res => {
                        this.setState({services: res.data});
                    })
            }, newPollingTime)
        });
    }
}

const Wrapper = styled.div`
    display: flex;
`;

const DropdownWrapper = styled.div`
    position: relative;
    left: 40px;
    bottom: 23px;
`;

const TitleWrapper = styled.div`
    margin-left: 30px;
`;

const Title = () => <h1>HEALTH-DASHBOARD</h1>;
