import React, {FC} from 'react';
import {IconName} from './IconName'
import {
    Icon24Dismiss,
    Icon28BillheadOutline,
    Icon28DoorArrowLeftOutline,
    Icon28MenuOutline,
    Icon28NewsfeedOutline,
    Icon28ServicesOutline,
    Icon28SettingsOutline,
    Icon28LinkOutline
} from "@vkontakte/icons";


type IconProps = {
    iconName: IconName
}

const Icon: React.FC<IconProps> = ({iconName} : IconProps) => {
    let TargetIcon : FC<any>;

    switch (iconName) {
        case IconName.About:
            TargetIcon = Icon28MenuOutline
            break
        case IconName.Diary:
            TargetIcon = Icon28NewsfeedOutline
            break
        case IconName.DiaryInfo:
            TargetIcon = Icon28ServicesOutline
            break
        case IconName.Timetable:
            TargetIcon = Icon28BillheadOutline
            break
        case IconName.CloseButton:
            TargetIcon = Icon24Dismiss
            break
        case IconName.EmptyRoom:
            TargetIcon = Icon28DoorArrowLeftOutline
            break
        case IconName.Settings:
            TargetIcon = Icon28SettingsOutline
            break
        case IconName.Link:
            TargetIcon = Icon28LinkOutline
            break
    }

    return (
        <>
            <TargetIcon/>
        </>
    )
};

export default Icon;