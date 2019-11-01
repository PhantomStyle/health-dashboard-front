import React from 'react';
import RunningCircle from './RunningCircle';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import StoppedCircle from './StoppedCircle';


export default class CheckedService extends React.Component {
    render() {
        const { serviceName, status, pollingTime, time } = this.props;

        return (
            <Wrapper>
                <AlertWrapper>
                    <Alert width={'500px'} variant={'dark'}>
                        {serviceName}
                    </Alert>
                </AlertWrapper>
                {renderCircle(status, pollingTime)}
                <AlertWrapper>
                    <Alert variant={'dark'}>
                        {time}
                    </Alert>
                </AlertWrapper>
            </Wrapper>
        );
    }
}

CheckedService.propTypes = {
    serviceName: PropTypes.string,
    time: PropTypes.string,
    pollingTime: PropTypes.number,
    status: PropTypes.string
};

const renderCircle = (status, pollingTime) => {
    if (status === 'UP') {
        return <RunningCircle pollingTime={pollingTime}/>;
    }
    return <StoppedCircle/>;
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
