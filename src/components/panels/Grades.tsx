import React, { useState } from 'react';

import '@vkontakte/vkui/dist/vkui.css';
import Options from "../Options"

type IGrades = {
  setGrade: (grade: string) => void,
  setActiveView: () => void
}

const Grades = ({setGrade, setActiveView} : IGrades) => {
  const grades = {
    '8': ['8А', '8В'],
    '9': ['9А', '9Б', '9В', '9Г', '9Е'],
    '10': ['10А', '10Б', '10В', '10Г', '10Е', '10З', '10Е', '10К', '10Л', '10М', '10Н', '10С'],
    '11': ['11А', '11Б', '11В', '11Г', '11Е', '11З', '11Е', '11К', '11Л', '11М', '11Н', '11С']
  };

  const [gradeName, setGradeName] = useState('');

	return (
    <>
      {!gradeName ? <Options options={Object?.keys({...grades})} setOption={setGradeName}/> : 
      <Options options={Object.assign({...grades}[gradeName], [])} setOption={(grade) => {setGrade(grade); setActiveView()}}/>}
    </>
	);
}

export default Grades;