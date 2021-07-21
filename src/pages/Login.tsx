import React, { useState, useContext } from 'react';
import '../styles/pages/Login.css';
import { Button, Input, InputAdornment } from '@material-ui/core';
import logo from '../imgs/logo.jpeg';
import history from '../utils/history';
import axios from 'axios';
import env from 'react-dotenv';
import { Link } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { AllContext } from '../components/contexts/AllContext';

interface User {
    id: number;
    email: string;
    password: string;
    type: string;
}

interface LoginInterface {
    token: string;
    isSuccess: boolean;
    user: User;
    message: string;
}

function Login() {
    const [visibility, setVisibility] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [typePassword, setTypePassword] = useState('password');
    const { updateToken } = useContext(AllContext);

    async function Signin() {

        if (!email) {
            alert('Favor preencha o campo e-mail');
            return;
        }

        const validaEmailPonto = email.includes('.');
        const validaEmailArroba = email.includes('@');

        if (!validaEmailArroba || !validaEmailPonto) {
            alert('Favor preencha um e-mail válido');
            return;
        }

        if (!password) {
            alert('Favor preencha o campo senha');
            return;
        }

        const body = {
            email,
            password
        }

        const responseLogin = await axios.post(`${env.REACT_API}/login`, body);
        let response: LoginInterface = responseLogin.data;
        console.log(response)
        if (response.isSuccess && response.user.type !== "USER"){
            updateToken(response.token);
            history.push("/dashboard");
        }
        else if (response.user.type === "USER")
            alert('Usuário não permitido')
        else
            alert(`${response.message}`);
    }

    function changeVisibility() {
        setVisibility(!visibility);
        if (visibility === false)
            setTypePassword('text');
        else if (visibility === true)
            setTypePassword('password');
    }



    return (
        <div className="container">
            <div className="card">
                <img src={logo} alt="" />
                <Input
                    className="inputLogin"
                    type="email"
                    placeholder="E-mail"
                    disableUnderline={true}
                    onChange={e => setEmail(e.target.value)}
                />


                <Input
                    className="inputLogin"
                    type={typePassword}
                    placeholder="Senha"
                    disableUnderline={true}
                    onChange={e => setPassword(e.target.value)}
                    endAdornment={
                        <InputAdornment position="end">
                            {visibility ?
                                <Button onClick={changeVisibility}>
                                    <VisibilityOff />
                                </Button>
                                :
                                <Button
                                    onClick={changeVisibility}>
                                    <Visibility />
                                </Button>
                            }
                        </InputAdornment>
                    }
                />


                <Link
                    id="redSenha"
                    to="/redefine-password">Redefinir Senha</Link>




                <Button
                    id="btnLogin"
                    onClick={Signin}
                >
                    Login
                </Button>

            </div>
        </div>
    )
}

export default Login;