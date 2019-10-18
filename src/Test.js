import React from "react";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";


Loader.propTypes = {
    size: PropTypes.number,
    weight: PropTypes.number,
    color: PropTypes.string,
    centered: PropTypes.bool,
    fast: PropTypes.bool,
    style: PropTypes.object,
    className: PropTypes.string,
};

export default function Loader({ size = 50, weight = 2, color = "#0299de", centered, fast, style, className }) {
    const defaultProps = {
        style,
        size,
        centered,
        className: className ? className + " Loader" : "Loader",
    };

    return (
        <Wrapper {...defaultProps}>
            <CircularSvg fast={fast} viewBox="25 25 50 50">
                <CirclePath
                    cx="50"
                    cy="50"
                    r="20"
                    fill="none"
                    stroke={color}
                    strokeWidth={weight}
                    strokeMiterlimit="10"
                />
            </CircularSvg>
        </Wrapper>
    );
}

const Rotate = keyframes`
    100% {
        transform: rotate(360deg);
    }
`;

const Dash = keyframes`
    0% {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
    }
    50% {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: -35px;
    }
    100% {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: -124px;
    }
`;

const Wrapper = styled.div`
    position: relative;
    width: ${({ size }) => size}px;
    height: ${({ size }) => size}px;
    margin: ${({ centered }) => centered && "0 auto"};
    &:before {
        content: "";
        display: block;
        padding-top: 100%;
    }
`;

const CircularSvg = styled.svg`
    animation: ${Rotate} 2s linear infinite;
    animation-duration: ${({ fast }) => fast && "0.35s"};
    height: 100%;
    transform-origin: center center;
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
`;

const CirclePath = styled.circle`
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
    animation: ${Dash} 1.5s ease-in-out infinite;
    strokelinecap: round;
`;