import React from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';


export default class RunningCircle extends React.Component {
    render() {
        const { pollingTime } = this.props;

        return (
            <CircularSvg viewBox="25 25 50 50" pollingTime={pollingTime}>
                <CirclePath
                    cx="50"
                    cy="50"
                    r="20"
                    fill="none"
                    strokeMiterlimit="10"
                />
            </CircularSvg>
        );
    }
}

RunningCircle.propTypes = {
    pollingTime: PropTypes.number,
};

const Rotate = keyframes`
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
`;

const CircularSvg = styled.svg`
    border-radius: 50%;
    width: 40px;
    height: 40px;
    background-image: -webkit-radial-gradient(45px 45px, circle cover, #bbffb5, #33ba2f);

    animation-name: ${Rotate};
    animation-duration: ${({ pollingTime }) => pollingTime / 1000}s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
`;

const CirclePath = styled.circle`
    background-image: -moz-radial-gradient(45px 45px 45deg, circle cover, #bbffb5 0%, #95ffac 100%, #1dff13 95%);
    background-image: -webkit-radial-gradient(45px 45px, circle cover, #bbffb5, #33ba2f);
    background-image: radial-gradient(45px 45px 45deg, circle cover, #bbffb5 0%, #95ffac 100%, #1dff13 95%);
`;
