import React, { useEffect, useState } from "react";
import styled from "styled-components";

const CreateEventWrapper = styled('div')`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding-left: 15px;
`;

const CreateEventItem = styled('div')`
  display: flex;
  margin-bottom: 10px;
`;

const CreateEventName = styled('div')`
  position: relative;
  margin-right: 10px;
  
`;

const CreateEventOptionWrapper = styled('div')`
  position: absolute;
  display: none;
  width: 100%;
  left: 0;
  top: 100%;
  border: 1px solid rgb(221, 221, 221);
`;

const CreateEventOptionWrapperViseble = styled(CreateEventOptionWrapper)`
  display: block;
`;

const CreateEventNameB = styled(CreateEventName)`
  ::before{
    position: absolute;
    content: "*";
    top: -25%;
    right: -6px;
    color: red;
  }
`;

const CreateEventselect = styled('div') `
  display: inline-block;
  position: relative;
  cursor: pointer;
  font-size: 13px;
  color: rgb(221, 221, 221);
  background-color: transparent;
  border: 1px solid rgb(221, 221, 221);
  border-radius: 4px;
  padding:  2px 22px 2px 5px;
`;

const CreateEventselectwrapper = styled(CreateEventselect) `
  ::after{
    position: absolute;
    top: 50%;
    right: 8px;
    content: "";
    color: red;
    display: block;
    transform: translate( 0, -5%);
    border: 5px solid transparent; 
    border-top: 5px solid rgb(221, 221, 221);
  }
`;

const CreateEventOptionLast = styled('div') `
  cursor: pointer;
  padding: 2px 2px 2px 8px;
  background-color: #1E1F21;
  border-bottom: 1px solid rgb(221, 221, 221);
`;

const CreateEventOption = styled(CreateEventOptionLast) `
  :last-child {
    border-bottom: none;
  }
  :hover {
    background-color: gray;
  }
`;

const InputSelect = styled('input') `
  background-color: transparent;
  color: rgb(221, 221, 221);
  border: none;
`;

const InputLimit = styled('input') `
  width: 80px;
  min-width: 15px;
  background-color: transparent;
  color: rgb(221, 221, 221);
  border: 1px solid rgb(221, 221, 221);
  border-radius: 3px;
`;


const CreateEven = ({
  tipeEventOptions,
  placeholder = "",
  onChange,
  selectedKey,
  openEventSelect,
  setOpenEventSelect
}) => {
  // Тип события
  const [inputTipeVal, setinputTipeVal] = useState('');
  const onInputChange = (e) => {
    setinputTipeVal(e.target.value);
  };

  const onItemSelected = (option) => {
    setinputTipeVal(option.value);
    onChange !== undefined && onInputChange(option.key);
    onChange !== undefined && onInputChange(option.value);
    setOpenEventSelect(true);
  };

  const onSelectClick = () => {
    setOpenEventSelect((prevValue) => !prevValue);
  };

  useEffect(()=>{
    if(selectedKey){
      setinputTipeVal(tipeEventOptions.find((o)=>o.key === selectedKey).value);
    }
  },[selectedKey, tipeEventOptions]);

  // Лимит
  const [inputLimiteVal, setinputLimiteVal] = useState('');
  const onLimitChange = (e) => {
    setinputLimiteVal(e.target.value);
  };
  return (
    <CreateEventWrapper>
    <h2>Создать событие</h2>
    <CreateEventItem> 
      <CreateEventNameB>Тип события</CreateEventNameB>
        <div>
      <CreateEventselectwrapper onClick={()=>{onSelectClick()}}>
          <InputSelect
            type='text'
            value={inputTipeVal}
            placeholder={placeholder}
            onChange={onInputChange}/>
        <CreateEventOptionWrapper className={openEventSelect === true ? 'displayBlock' : ''}>
          {
            tipeEventOptions.map(opt => {
              return (
              <CreateEventOption 
                key={opt.key}
                onClick={()=>{onItemSelected(opt)}}
                >
                  {opt.value}
              </CreateEventOption>
              )
            })
          }
          
        </CreateEventOptionWrapper>
      </CreateEventselectwrapper>
        </div>
    </CreateEventItem>
    <CreateEventItem>
      <CreateEventNameB>Лимит</CreateEventNameB>
      <InputLimit
            type='number'
            value={inputLimiteVal}
            placeholder={placeholder}
            onChange={onLimitChange}/>
    </CreateEventItem>
    <CreateEventItem>Когда</CreateEventItem>
    <CreateEventItem>Повторять</CreateEventItem>
    <CreateEventItem>Повторять</CreateEventItem>
    <CreateEventItem>Кол-в повторов</CreateEventItem>
    </CreateEventWrapper>
  );
};

export {CreateEven}