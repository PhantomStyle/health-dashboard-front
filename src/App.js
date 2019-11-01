import React from 'react';
import ServicesList from './ServicesList';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios';


export default class App extends React.Component {
    state = {
        services: [],
        pollingTime: 1000,
        interval: null,
    }

    render() {
        const { pollingTime, services } = this.state;

        return (
            <Wrapper>
                <TitleWrapper>
                    <h2>HEALTH-DASHBOARD</h2>
                </TitleWrapper>
                <DropdownWrapper>
                    <Label>Polling period (seconds):</Label>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {pollingTime / 1000}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => {
                                this.changePollingTime(1000);
                            }}>1</Dropdown.Item>
                            <Dropdown.Item onClick={() => {
                                this.changePollingTime(10000);
                            }}>10</Dropdown.Item>
                            <Dropdown.Item onClick={() => {
                                this.changePollingTime(30000);
                            }}>30</Dropdown.Item>
                            <Dropdown.Item onClick={() => {
                                this.changePollingTime(60000);
                            }}>60</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </DropdownWrapper>
                <ServicesWrapper>
                    <ServicesList services={services} pollingTime={pollingTime}/>
                </ServicesWrapper>
            </Wrapper>
        );
    }

    componentDidMount() {
        const { pollingTime } = this.state;

        this.setState({
            interval: setInterval(() => {this.fetchData();}, pollingTime)
        });
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    changePollingTime(newPollingTime) {
        const { interval } = this.state;

        clearInterval(interval);
        this.setState({ pollingTime: newPollingTime });
        this.setState({
            interval: setInterval(() => {this.fetchData();}, newPollingTime)
        });
    }

    fetchData = () => {
        axios.get('http://localhost:11021/v1/hd/get-services')
            .then(res => {
                this.setState({ services: res.data });
            });
    }
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 30px 0;
`;

const DropdownWrapper = styled.div`
    display: flex;
    justify-content: center;
    flex: 1;
    align-items: center;
    margin-bottom: 40px;
`;

const TitleWrapper = styled.div`
    display: flex;
    justify-content: center;
    flex: 1;
    margin-bottom: 20px;
`;

const ServicesWrapper = styled.div`
    display: flex;
    justify-content: center;
`;

const Label = styled.div`
    margin-right: 15px;
`;
