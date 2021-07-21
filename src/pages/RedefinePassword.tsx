import React, { useState } from 'react';
import '../styles/pages/RedefinePassword.css';
import { Button, Input, InputAdornment } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import axios from 'axios';
import env from 'react-dotenv';
import history from '../utils/history';

interface ResponseRedefine {
    isSuccess: boolean;
    message: string;
}

function RedefinePassword() {
    const [typePassword, setTypePassword] = useState('password');
    const [typeConfPassword, setTypeConfPassword] = useState('password');
    const [visibilityPassword, setVisibilityPassword] = useState(false);
    const [visibilityConfPassword, setVisibilityConfPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');

    function changeVisibility() {
        setVisibilityPassword(!visibilityPassword)
        if (visibilityPassword === false) {
            setTypePassword('text');
        } else if (visibilityPassword === true) {
            setTypePassword('password');
        }
    }

    function changeVisibilityConf() {
        setVisibilityConfPassword(!visibilityConfPassword)
        if (visibilityConfPassword === false) {
            setTypeConfPassword('text');
        } else if (visibilityConfPassword === true) {
            setTypeConfPassword('password');
        }
    }

    async function Redefine() {

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

        if (!confPassword) {
            alert('Favor preencha o campo confirme sua senha');
            return;
        }

        if (password !== confPassword) {
            alert('Senhas não correspondem!');
            return;
        }

        const body = {
            email,
            password,
            confirmNewPassword: confPassword
        }

        const responseRedefine = await axios.put(`${env.REACT_API}/user`, body);
        let response: ResponseRedefine = responseRedefine.data;

        if (response.isSuccess === true) {
            alert(`${response.message}`);
            history.push('/');
        } else {
            alert(`${response.message}`);
        }




    }

    return (
        <div className='container'>
            <div className='card'>
                <h1 style={{ color: '#fff' }}>Redefinir Senha</h1>

                <Input
                    className='inputRedPass'
                    disableUnderline={true}
                    type='text'
                    placeholder='Email'
                    onChange={e => setEmail(e.target.value)}
                />

                <Input
                    className='inputRedPass'
                    disableUnderline={true}
                    type={typePassword}
                    placeholder='Senha'
                    onChange={e => setPassword(e.target.value)}
                    endAdornment={
                        <InputAdornment position="end">
                            {visibilityPassword ?
                                <Button onClick={changeVisibility}>
                                    <VisibilityOff />
                                </Button>
                                :
                                <Button onClick={changeVisibility}>
                                    <Visibility />
                                </Button>
                            }
                        </InputAdornment>
                    }
                />

                <Input
                    className='inputRedPass'
                    disableUnderline={true}
                    type={typeConfPassword}
                    placeholder='Confirme sua Senha'
                    onChange={e => setConfPassword(e.target.value)}
                    endAdornment={
                        <InputAdornment position="end">
                            {visibilityConfPassword ?
                                <Button onClick={changeVisibilityConf}>
                                    <VisibilityOff />
                                </Button>
                                :
                                <Button onClick={changeVisibilityConf}>
                                    <Visibility />
                                </Button>
                            }
                        </InputAdornment>
                    }
                />

                <Button
                    id='btnRedefine'
                    onClick={Redefine}
                >
                    Redefinir
                </Button>
            </div>
        </div>
    );
}

export default RedefinePassword;