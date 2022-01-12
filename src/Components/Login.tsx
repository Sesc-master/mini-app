import React, {useState} from "react";
import {FormLayoutGroup, FormItem, Input, SliderSwitch, Button, Div, Text} from "@vkontakte/vkui";

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

const Login = ({setLoginRequest} : any) => {
    const [loginData, setLoginData] = useState<ILoginData>({
        login: "",
        password: "",
        type: "pupil",
    })

    return (
        <FormLayoutGroup mode="vertical">
            <FormItem>
                <SliderSwitch 
                    options={[
                        {
                            name: "Ученик",
                            value: "pupil",
                        },
                        {
                            name: "Родитель",
                            value: "par",
                        },
                    ]}
                    onSwitch={(value : string) => {
                        setLoginData({...loginData, type: value})
                    }}
                    activeValue={loginData.type}
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
                <Button size="l" stretched style={{ marginRight: 8 }} onClick={() => {
                    setLoginRequest(loginData)
                    setLoginData({
                        login: "",
                        password: "",
                        type: "pupil",
                    })
                }}>Войти</Button>
            </Div>
        </FormLayoutGroup>
    )
}

export default Login;