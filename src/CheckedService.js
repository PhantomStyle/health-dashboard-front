import React from "react";
import RunningCircle from "./RunningCircle";
import styled from "styled-components";
import PropTypes from "prop-types";
import {Alert} from 'react-bootstrap'
import nextId from "react-id-generator";
import 'bootstrap/dist/css/bootstrap.min.css';
import StoppedCircle from "./StoppedCircle";

export default class CheckedService extends React.Component {
    render() {
        return (
            <Wrapper>
                <AlertWrapper>
                    <Alert width={'500px'} key={nextId('service-name-')}
                           variant={'dark'}>{this.props.serviceName}
                    </Alert>
                </AlertWrapper>
                {getCircle(this.props.status, this.props.pollingTime)}
                <AlertWrapper>
                    <Alert key={nextId('last-time-updated-')}
                           variant={'dark'}>{this.props.time}
                    </Alert>
                </AlertWrapper>
            </Wrapper>
        )
    }
}

CheckedService.propTypes = {
    serviceName: PropTypes.string,
    time: PropTypes.string,
    pollingTime: PropTypes.number,
    status: PropTypes.string
};

const getCircle = (status, pollingTime) => {
    if (status === "UP") {
        return <RunningCircle pollingTime={pollingTime}/>
    }
    return <StoppedCircle/>
};

const Wrapper = styled.div`
    display: flex;
    flex-flow: row nowrap;
`;


const AlertWrapper = styled.div`
    width: 220px;
    margin-left: 10px;
    margin-right: 10px;
`;
