import moment from "moment";
import React from "react";
import styled from "styled-components";

const GridWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-gap: 1px; 
    background-color: ${props => props.isHeader ? '#1E1F21' : '#404040'};
    ${props => props.isHeader && 'border-bottom: 1px solid #404040'}
`;

const CellWrapper = styled.div`
    min-width: 140px;
    min-height: ${props => props.isHeader ? 24 : 80}px;
    background-color: ${props => props.isWeekend ? '#272829' : '#1E1F21'};
    color: ${props => props.isSelectedMonth ? '#DDDCDD' : '#555759'};
`;

const RowInCell = styled.div`
  display: flex;
  justify-content: ${props => props.justifyContent ? props.justifyContent : 'flex-start'};
  flex-direction: column;
  ${props => props.pr && `padding-right: ${props.pr * 8}px`}
`;

const ShowDayWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const DayWrapper = styled.div`
  display: flex;
  cursor: pointer;
  height: 33px;
  width: 33px;
  align-items: center;
  justify-content: center;
  margin: 2px;
`;

const CurrentDay = styled.div`
  height: 100%;
  width: 100%;
  background: #f00;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const EventListWrapper = styled.ul`
  margin: unset;
  list-style-position: inside;
  padding: 0 4px 4px 4px;
`;

const EventItemWrapper = styled.button`
  overflow: hidden;
  background-color: #886ce4;
  border-radius: 4px;
  hyphens: auto; 
  text-align: left;
  white-space: nowrap;
  text-overflow: ellipsis;
  border: unset;
  max-width: 130px;
  color: #DDDDDD;
  cursor: pointer;
  margin: 0;
  padding: 1px 3px;

  :hover {
    overflow: inherit;
    text-overflow: inherit;
    white-space: inherit;
    height: auto;
  }
`;

const CalendarGrid = ({ startDay, today, totalDays, events, openFormHandler }) => {

  const isCurrentDay = (day) => moment().isSame(day, 'day');
  const isSelectedMonth = (day) => today.isSame(day, 'month');

  const day = startDay.clone().subtract(1, 'day');
  const daysArray = [...Array(totalDays)].map(() => day.add(1, 'day').clone());

  return (
    <>
      <GridWrapper isHeader>
        {[...Array(7)].map((e, i) => <CellWrapper isHeader isSelectedMonth key={i}>
          
          <RowInCell
                justifyContent={'flex-end'}
                pr={1}
                key={i}
              >
            {moment().day(i+1).format('ddd')}

          </RowInCell>
        </CellWrapper>
      )}
      </GridWrapper>
        
      <GridWrapper>
        {
          daysArray.map((dayItem) => (
            <CellWrapper
              key={dayItem.unix()}
              isWeekend={dayItem.day()===6 || dayItem.day()===0}
              isSelectedMonth={isSelectedMonth(dayItem)}
            >
              <RowInCell justifyContent={'flex-end'} >
                <ShowDayWrapper>
                  <DayWrapper onClick={()=>{openFormHandler('Create')}}>
                    {
                      isCurrentDay(dayItem) ? (
                        <CurrentDay>{dayItem.format('D')}</CurrentDay>
                      ) : (
                        dayItem.format('D')
                      )
                    }
                  </DayWrapper>
                </ShowDayWrapper>
                  <EventListWrapper>
                    {
                      events
                        .filter(event => event.date >= dayItem.format('X') && event.date <= dayItem.clone().endOf('day').format('X') )
                        .map(event => (
                          <li key={event.id}>
                            <EventItemWrapper onClick={()=>{openFormHandler('Update', event)}}>
                              {event.title}
                            </EventItemWrapper>
                          </li>
                        ))
                    }
                  </EventListWrapper>
              </RowInCell>
            </CellWrapper>
          ))
        }
      </GridWrapper>
    </>
  );
};

export {CalendarGrid}