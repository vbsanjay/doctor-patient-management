import styled from 'styled-components';
import logo from '../images/logo.png';
import React from 'react';

const StyledWelcomeLogo: any = styled.img`
width: 255px;
height: 150px;
`;

const WelcomeLogo = (props: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>) => {
  const {alt = 'Logo'} = props;
  return (
    <StyledWelcomeLogo src={logo} alt={alt}/>
  )
};

export default WelcomeLogo;
