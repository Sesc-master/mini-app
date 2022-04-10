import React, {useState, useMemo, useEffect, useCallback} from "react";
import {FormItem, SelectMimicry, SegmentedControl} from "@vkontakte/vkui";
import Task from "./task/Task";
import {Modal} from "../../../modules/Modal";
import {setModalView} from "../../../modules/effector/AppSettingsSrore";
import {diaryStore, setDiary} from "../../../modules/effector/DiaryStore";
import {useStore} from "effector-react"
import styles from "./Journal.module.scss"
import dateComparator from "../../../modules/scoleAPI/date/dateComparator";

enum ISortingType {
    NewerToOlder = 1,
    OlderToNewer = 2
}

const Journal = () => {
    const {diary, targetSubject} = useStore(diaryStore)
    const teacher = diary.get(targetSubject)?.teacher
    const tasks = diary.get(targetSubject)?.notes
    const [sortingType, setSortingType] = useState<ISortingType>(ISortingType.NewerToOlder);

    useEffect(() => {
        if (!tasks) return;

        const newDiary = diary;
        newDiary.get(targetSubject).notes = Array.from(tasks).sort((a : any, b : any) => {
            if (sortingType === ISortingType.OlderToNewer){
                return dateComparator(a.date, b.date)
            } else {
                return -dateComparator(a.date, b.date)
            }
        })
        setDiary(newDiary)
    }, [sortingType, targetSubject])

    return (
        <div className="content">
            <SelectMimicry
                placeholder="предмет не выбран"
                onClick={() => setModalView(Modal.Subjects)}
            >{!!targetSubject && `${targetSubject}. ${teacher}`}</SelectMimicry>
            {tasks && <SegmentedControl
                options={[
                    {
                        label: "От новых к старым",
                        value: ISortingType.NewerToOlder,
                    },
                    {
                        label: "От старых к новым",
                        value: ISortingType.OlderToNewer,
                    }
                ]}
                onChange={(value ) => setSortingType(value as ISortingType)}
                defaultValue={sortingType}
            />}
            {tasks && Array.from(tasks)?.map((task: any, index) =>
            (<div className={styles.task} key={index}>
                <Task date={task.date} topic={task.theme} homework={task.hometask} weight={task.coefficient} mark={task.grades}/>
            </div>
            ))}
        </div>
    )
}

export default Journal