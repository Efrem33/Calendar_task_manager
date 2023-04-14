import React from "react";
import styled from "styled-components";

const DivWrapper = styled('div')`
  display: flex;
  justify-content: space-between;
  background-color: #1E1F21;
  color: #DCDDDD;
  padding: 16px;
`;

const TextWrapper = styled('span')`
  font-size: 32px;
`;

const TittleWrapper = styled(TextWrapper)`
  font-weight: bold;
  margin-right: 8px;
`;

const ButtonsWrapper = styled('div')`
  display: flex;
  align-items: center;
`;

const ButtonWrapper = styled('button')`
  border: unset;
  background-color: #565759;
  height: 20px;
  margin-right: 2px;
  border-radius: 4px;
  color: #E6E6E6;
  cursor: pointer;
`;

const TodayButton = styled(ButtonWrapper)`
  padding: 0 16px;
  font-weight: bold;
`;

const Monitor = ({today, prevHendler, nextHendler, todayHendler}) => {
  
  return (
    <DivWrapper>
      <div>
        <TittleWrapper>{today.format('MMMM')}</TittleWrapper>
        <TextWrapper>{today.format('YYYY')}</TextWrapper>
      </div>
      <ButtonsWrapper>
        <ButtonWrapper onClick={prevHendler}> &lt; </ButtonWrapper>
        <TodayButton onClick={todayHendler}>Today</TodayButton>
        <ButtonWrapper onClick={nextHendler}> &gt; </ButtonWrapper>
      </ButtonsWrapper>
    </DivWrapper>
  );
};

export {Monitor}