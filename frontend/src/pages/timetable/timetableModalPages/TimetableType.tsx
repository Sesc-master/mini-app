import React from 'react';
import Options from "../../../components/Options";
import {Modal} from "../../../modules/Modal";
import {setModalView} from "../../../modules/effector/AppSettingsSrore";

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