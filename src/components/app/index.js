
import moment from 'moment/moment';
import React, { useState } from 'react';
import Moment from 'react-moment';
import { Title } from '../title';
import { Monitor } from '../monitor';
import { CalendarGrid } from '../calendarGrid';
import styled from 'styled-components';

const ShadowWrapper = styled('div')`
  border-top: 1px solid #737374;
  border-left: 1px solid #464648;
  border-right: 1px solid #464648;
  border-bottom: 2px solid #464648;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 0 1px #1A1A1A, 0 8px 20px 6px #888;
`;

function App() {

  moment.updateLocale( "ru",{week:{dow: 1}});
  // window.moment = moment;
  // const today = moment();
  const [today, setToday] = useState(moment());
  const startDay = today.clone().startOf("month").startOf('week');

  const prevHendler = ()=> setToday(prev => prev.clone().subtract(1, 'month'));
  const nextHendler = ()=> setToday(next => next.clone().add(1, "month"));
  const todayHendler = ()=> setToday(moment()); 

  return (
    <ShadowWrapper >
      <Title />
      <Monitor 
        today={ today } 
        prevHendler={ prevHendler } 
        nextHendler={ nextHendler } 
        todayHendler={ todayHendler } 
      />
      <CalendarGrid startDay={startDay}/>
    
    </ShadowWrapper>
  );
}

export default App;
