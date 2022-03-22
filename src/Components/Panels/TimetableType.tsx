import React from 'react';
import Options from "../Options";
import {Modal} from "../../Modules/Modal";
import {setModalView} from "../../Modules/Effector/AppSettingsSrore";

const TimetableType = () => {
    const options = ["Учитель", "Класс"];

    const openTargetModal = (option: string) => {
        if (option === options[0]){
            setModalView(Modal.Teachers);
        }else if (option === options[1]){
            setModalView(Modal.Grades);
        }
    };

    return (
        <div>
            <Options options={options} setOption={openTargetModal}/>
        </div>
    );
};

export default TimetableType;