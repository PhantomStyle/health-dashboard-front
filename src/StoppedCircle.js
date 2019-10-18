import React from "react";
import styled from "styled-components";

export default class StoppedCircle extends React.Component {

    render() {
        return (
            <CircularSvg viewBox="25 25 50 50"/>
        )
    }
}

const CircularSvg = styled.svg`
    border-radius: 50%;
    width: 40px;
    height: 40px;
    
    background-image: -moz-radial-gradient(45px 45px 45deg, circle cover, #cf647a 0%, #a60d16 100%, #f95b47 95%);
    background-image: -webkit-radial-gradient(45px 45px, circle cover, #cf647a, #a60d16);
    background-image: radial-gradient(45px 45px 45deg, circle cover, #cf647a 0%, #a60d16 100%, #f95b47 95%);
`;