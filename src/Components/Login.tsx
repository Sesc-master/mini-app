import React, {useState} from 'react';
import {FormLayoutGroup, FormItem, Input, SliderSwitch, Button, Div, Text} from "@vkontakte/vkui";
import Authenticate from "../Modules/Authenticate";

// import '@vkontakte/vkui/dist/vkui.css';

type ISetLoginData = ( data : { roles: string[]; token: string; teachLoad: string;}) => void;
type ILogin = {
    setLoginData: ISetLoginData
}

const Login = () => {
    return (

        <FormLayoutGroup mode="vertical">
            <FormItem>
                <SliderSwitch 
                    options={[
                    {
                        name: 'Ученик',
                        value: 'pupil',
                    },
                    {
                        name: 'Родитель',
                        value: 'parent',
                    },
                    ]}
                    onSwitch={value => {
                        setType(value)
                    }}
                />
            </FormItem>
            <FormItem top="Логин">
                <Input />
            </FormItem>
            <FormItem top="Пароль">
                <Input value={password} type="password" onChange={event => (setPassword(event.target.value))}/>
            </FormItem>
            <Div>
                <Button size="l" stretched style={{ marginRight: 8 }} onClick={() => {
                    Authenticate(login, password, type).then(response => {
                        props.setLoginData(response)
                    })
                }}>Войти</Button>
            </Div>
        </FormLayoutGroup>

    )
}

export default Login;