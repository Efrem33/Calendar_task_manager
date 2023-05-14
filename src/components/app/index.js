
import moment from 'moment/moment';
import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';
import { Title } from '../title';
import { Monitor } from '../monitor';
import { CalendarGrid } from '../calendarGrid';
import styled from 'styled-components';
import { CreateEven } from '../createEvent';

const ShadowWrapper = styled('div')`
  border-top: 1px solid #737374;
  border-left: 1px solid #464648;
  border-right: 1px solid #464648;
  border-bottom: 2px solid #464648;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 0 1px #1A1A1A, 0 8px 20px 6px #888;
`;

const FromPositionWrapper = styled('div')`
  position: absolute;
  display: flex;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.35);
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  align-items: center;
  justify-content: center;

`;

const FormWrapper = styled(ShadowWrapper)`
  min-width: 200px;
  background-color: #1E1F21;
  color: #DDDDDD;
  box-shadow: unset;
`;

const EventBody = styled('input')`
  padding: 4px 14px;
  font-size: .85rem;
  width: 100%;
  border: unset;
  background-color: #1E1F21;
  color: #DDDDDD;
  outline: unset;
  border-bottom: 1px solid #464648;
`;
const EventTitle = styled('input')`
  padding: 4px 14px;
  font-size: .85rem;
  width: 100%;
  border: unset;
  background-color: #1E1F21;
  color: #DDDDDD;
  outline: unset;
  border-bottom: 1px solid #464648;
`;

const ButtonsWrapper = styled('div')`
  display: flex;
  padding: 8px 14px;
  justify-content: flex-end;
`;

const url = 'http://localhost:5000';
const totalDays = 42;
const defaultEvent = {
  title: '',
  description: '',
  date: moment().format('X')
};

const tipeEventOptions = [
  {key: 1, value: "Стрейчинг"},
  {key: 2, value: "Индивидуальное занятие"}
];


function App() {

  moment.updateLocale( "ru",{week:{dow: 1}});
  window.moment = moment;
  //const today = moment();
  const [today, setToday] = useState(moment());
  const startDay = today.clone().startOf("month").startOf('week');

  const prevHendler = ()=> setToday(prev => prev.clone().subtract(1, 'month'));
  const nextHendler = ()=> setToday(next => next.clone().add(1, "month"));
  const todayHendler = ()=> setToday(moment()); 

  const [method, setMethod] = useState(null);
  const [isShadowForm, satShadowForm] = useState(false);
  const [event, setEvent] = useState(null);
  const [events, setEvents] = useState([]);

  const [openEventSelect, setOpenEventSelect] = useState(false);


  const startDateQuery = startDay.clone().format('X');
  const endDateQuery = startDay.clone().add(totalDays, 'days').format('X');
  
  useEffect(() => {
    fetch(`${url}/events?date_gte=${startDateQuery}&date_lte=${endDateQuery}`)
    .then(res => res.json())
    .then(res => {
      console.log('Response', res);
      setEvents(res);
    });
  },[today]);

  const openSelect = () => {

  };

  const openFormHandler = (methodName, eventForUpdate, dayItem) => {
    setEvent(eventForUpdate || {...defaultEvent, date: dayItem.format('X')});
    satShadowForm(true);
    setMethod(methodName);
  };

  const canselButtonHendler = () => {
    satShadowForm(false); 
    setEvent(null);
  };

  const changeEventHendler = (text, field) => {
    setEvent(prevState => ({
      ...prevState,
      [field]: text
    }));
  };

  const eventFetchHendler = () => {
    const fetchUrl = method === 'Update' ? `${url}/events/${event.id}` : `${url}/events`;
    const httpMethod = method === 'Update' ? 'PATCH' : 'POST';

    fetch(fetchUrl, {
      method: httpMethod,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(event)
    })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      if(method === 'Update') {
        setEvents(prevState => prevState.map(eventEl => eventEl.id === res.id ? res : eventEl));
      } else {
        setEvents(prevState => [...prevState, res]);
      }
      
      canselButtonHendler();
    });
  };

  const removeEventHendler = () => {
    const fetchUrl = `${url}/events/${event.id}`;
    const httpMethod = 'DELETE';

    fetch(fetchUrl, {
      method: httpMethod,
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      setEvents(prevState => prevState.filter(eventEl => eventEl.id !== event.id));
      canselButtonHendler();
    });
  };

  return (
    <>
    {
      isShadowForm ? (
        <FromPositionWrapper onClick={canselButtonHendler} >
          <FormWrapper onClick={e=>e.stopPropagation()}>
          {
                method !== 'Update' ? (
                  <CreateEven 
                    tipeEventOptions={tipeEventOptions}
                    openEventSelect={openEventSelect}
                    setOpenEventSelect={setOpenEventSelect}
                    />
                ) : null
          }
            <EventTitle 
              value={event.title} 
              onChange={e => changeEventHendler(e.target.value, 'title')}
            />
            <EventBody 
              value={event.description}               
              onChange={e => changeEventHendler(e.target.value, 'description')} 
            />
            <ButtonsWrapper>
              <button onClick={canselButtonHendler} >Cansel</button>  
              <button onClick={eventFetchHendler} >{method}</button>  
              {
                method === 'Update' ? (
                  <button onClick={removeEventHendler} >Remove</button> 
                ) : null
              }
               
            </ButtonsWrapper>
          </FormWrapper>
        </FromPositionWrapper>
      ) : null  
    }
      <ShadowWrapper >
        <Title />
        <Monitor 
          today={ today } 
          prevHendler={ prevHendler } 
          nextHendler={ nextHendler } 
          todayHendler={ todayHendler } 
          />
        <CalendarGrid 
          startDay={ startDay } 
          today={ today } 
          totalDays = { totalDays }
          events = {events}
          openFormHandler={openFormHandler}
          />
      </ShadowWrapper>
    </>
  );
}

export default App;
