import React from 'react';
import CheckedService from "./CheckedService";
import PropTypes from "prop-types";
import styled from "styled-components";
import nextId from "react-id-generator";

export default class ServicesList extends React.Component {

    render() {
        return (
            <Wrapper>
                {this.props.services && this.props.services.map((service) => {
                    return <CheckedService key={nextId('checked-service-')}
                                           serviceName={service['name']}
                                           status={service['status']}
                                           time={service["timeStatusChanged"]}
                                           pollingTime={this.props.pollingTime}
                    />;
                })}
            </Wrapper>
        )
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

ServicesList.propTypes = {
    services: PropTypes.array
};