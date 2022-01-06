import React, {useState} from 'react';
import {FormLayoutGroup, FormItem, Input, SliderSwitch, Button, Div, Text} from "@vkontakte/vkui";
import Authenticate from "../Modules/Authenticate";
import { type } from 'os';

// import '@vkontakte/vkui/dist/vkui.css';

type ISetLoginData = ( data : { roles: string[]; token: string; teachLoad: string;}) => void;
type ILogin = {
    setLoginData?: ISetLoginData
}

type ILoginData = {
    login: string,
    password: string,
    type: string | number,
}

const Login = () => {
    const [loginData, setLoginData] = useState<ILoginData>({
        login: '',
        password: '',
        type: '',
    })

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
                        setLoginData({...loginData, type: value})
                    }}
                />
            </FormItem>
            <FormItem top="Логин">
                <Input value={loginData.login} onChange={(event) => {
                    setLoginData({...loginData, login: event.target.value})
                }}/>
            </FormItem>
            <FormItem top="Пароль">
                <Input type='password' value={loginData.password} onChange={(event) => {
                    setLoginData({...loginData, password: event.target.value})
                }}/>
            </FormItem>
            <Div>
                <Button size="l" stretched style={{ marginRight: 8 }} >Войти</Button>
            </Div>
        </FormLayoutGroup>
    )
}

export default Login;