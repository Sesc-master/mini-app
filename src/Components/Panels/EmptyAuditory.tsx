import React from 'react';
import { Div, Button} from "@vkontakte/vkui";

type IEmptyAuditory = {
    setActiveView: () => void
}

const EmptyAuditory = (props : IEmptyAuditory) => {

    return (
        <Div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
            <h1>Свободные аудитории:</h1>

            <Button onClick={props.setActiveView}>Вернуться назад</Button>
        </Div>
    );
}

export default EmptyAuditory;