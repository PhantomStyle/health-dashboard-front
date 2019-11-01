import React from 'react';
import CheckedService from './CheckedService';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import nextId from 'react-id-generator';


export default class ServicesList extends React.Component {
    render() {
        const { services, pollingTime } = this.props;

        return (
            <Wrapper>
                {services && services.map((service) => (
                    <CheckedService
                        key={nextId('checked-service-')}
                        serviceName={service['name']}
                        status={service['status']}
                        time={service['timeStatusChanged']}
                        pollingTime={pollingTime}
                    />)
                )}
            </Wrapper>
        );
    }
}

ServicesList.propTypes = {
    services: PropTypes.array,
    pollingTime: PropTypes.number,
};

const Wrapper = styled.div`
    position: relative;
    left: 20px;
`;
