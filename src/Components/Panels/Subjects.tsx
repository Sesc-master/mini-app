import React, { useState } from 'react';
// import '@vkontakte/vkui/dist/vkui.css';
import Options from "../Options";
import {useDispatch, useSelector} from 'react-redux'
import { IRootState } from '../../Modules/IRootState'

type ISubjectsProps = { 
  setActiveViewDiary: () => void
}

const Subjects = ({setActiveViewDiary} : ISubjectsProps) => {
  const dispatch = useDispatch()
  const subjects = useSelector((state : IRootState) => state.subjects)
  const setTargetSubject = (subject: string) => dispatch({type: "SET_TARGET_SUBJECT", payload: subject})

  return (
    <>
      <Options options={subjects} setOption={(subject) => {
        setActiveViewDiary();
        setTargetSubject(subject)
      }}/>
    </>
  );
}

export default Subjects;