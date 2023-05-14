import React from "react";
import styled from "styled-components";

const DivWrapper = styled('div')`
  background-color: #2A2B2D;
  height: 36px;
  padding-left: 16px;
`;
const ArrowsWrapper = styled('div')`
  display: flex;
  justify-content: space-between;
  height: 100%;
  max-width: 55px;
`;

const Arrows = styled('div')`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin: auto;
`;

const ArrowRed = styled(Arrows)`
  background-color: #ff524f;
`;

const ArrowYellow = styled(Arrows)`
  background-color: #ffaf29;
`;

const ArrowGreen = styled(Arrows)`
  background-color: #24c036;
`;

const Title = () => {

  return (
    <DivWrapper>
      <ArrowsWrapper>
        <ArrowRed />
        <ArrowYellow />
        <ArrowGreen />
      </ArrowsWrapper>  
    </DivWrapper>
  );
};

export {Title}