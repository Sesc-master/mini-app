import React from "react";
import { FormItem, SelectMimicry, Div} from "@vkontakte/vkui";
import { IRootState } from "../Modules/IRootState"
import { useSelector} from "react-redux"
import Task from "./Task";

type IJuranalProps = { 
    setActiveViewSubjects: () => void
}

const Journal = (props: IJuranalProps) => {
    const journal : any = useSelector((state : IRootState) => state.journal)
    const targetSubgect : string = useSelector((state : IRootState) => state.targetSubject)
    const teacher = journal.get(targetSubgect)?.teacher
    const notes = journal.get(targetSubgect)?.notes

    return (
        <>
            <FormItem top="Выберите предмет">
                <SelectMimicry
                    placeholder="Не выбран"
                    onClick={() => props.setActiveViewSubjects()}
                >{!!targetSubgect && `${targetSubgect}. ${teacher}`}</SelectMimicry>
            </FormItem>
            {notes !== undefined && [...notes]?.map((note, index) => 
            (<div className="journal-task" key={index}>
                <Task date={note.date} topic={note.theme} homework={note.hometask} weight={note.coefficient} mark={note.grades}/>
            </div>
            ))}
            <Div className='end'></Div>
        </>
    )
}

export default Journal