import React from 'react';
import {Text, FormItem, SelectMimicry, Div} from "@vkontakte/vkui";
import { SсheduleLesson } from '../Modules/Schedule/ScheduleLesson';
import { IRootState } from '../Modules/IRootState'
import {useDispatch, useSelector} from 'react-redux'
import Task from './Task';

type IJuranalProps = { 
	setActiveViewSubjects: () => void
}

const Journal = (props: IJuranalProps) => {
    const journal : any = useSelector((state : IRootState) => state.journal)
    const targetSubgect : string = useSelector((state : IRootState) => state.targetSubject)
    const teacher = journal[targetSubgect]?.teacher
    const notes = (journal[targetSubgect])?.notes

    return (
        <>
            <FormItem top="Выберите предмет">
                <SelectMimicry
                    placeholder="Не выбран"
                    onClick={() => props.setActiveViewSubjects()}
                >{!!targetSubgect && `${targetSubgect}. ${teacher}`}</SelectMimicry>
            </FormItem>
            {notes !== undefined && [...notes]?.map((note, index) => (<div style={{paddingLeft: '5px', paddingRight: '5px', paddingTop: '5px', padding: '6px'}}>
                <Task date={note.date} topic={note.theme} homework={note.hometask} weight={note.coefficient} mark={note.grades}/>
            </div>
            ))}
            <Div className='end'></Div>
        </>
    )
}

export default Journal