import React from 'react';
import {Spinner} from "@vkontakte/vkui";

const Loading = () => {
    return (
        <div className="loader">
            <Spinner size="medium"/>
        </div>
    );
};

export default Loading;