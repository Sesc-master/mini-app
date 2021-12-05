import React from 'react';
import {FormLayoutGroup, FormItem, Input, SliderSwitch, Button, Div} from "@vkontakte/vkui";
  

import '@vkontakte/vkui/dist/vkui.css';

const Login = () => {
    return (

        <FormLayoutGroup mode="vertical">
            <FormItem>
                <SliderSwitch 
                    options={[
                    {
                        name: 'Ученик',
                        value: 'student',
                    },
                    {
                        name: 'Родитель',
                        value: 'parent',
                    },
                    ]}
                />
            </FormItem>
            <FormItem top="Логин">
                <Input />
            </FormItem>
            <FormItem top="Пароль">
                <Input type="password"/>
            </FormItem>
            <Div>
                <Button size="l" stretched style={{ marginRight: 8 }}>Войти</Button>
            </Div>
        </FormLayoutGroup>

    )
}

export default Login;