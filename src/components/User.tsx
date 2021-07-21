import { useContext, useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import env from 'react-dotenv';
import { AllContext } from './contexts/AllContext';
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Dialog,
    DialogContent,
    Input,
    Select,
    MenuItem,
    InputAdornment,
    IconButton
} from '@material-ui/core';
import {
    Edit,
    Visibility,
    VisibilityOff,
    Delete,
    Add
} from '@material-ui/icons';
import '../styles/components/User.css';

interface ListUserArray {
    id: number;
    name: string;
    email: string;
    password: string;
    type: string;
}

interface ResponseData {
    isSuccess: boolean;
    message: string;
}

interface ListUserData extends Array<ListUserArray> { }

const styles = {
    tcStyle: {
        color: '#fff'
    },
    tcTitle: {
        fontWeight: 'bold',
        color: '#FFF',
        fontSize: 18
    }
}

export default function User() {
    const { token } = useContext(AllContext);
    const [listUser, setListUser] = useState([] as ListUserData);
    const [visibleDialog, setVisibleDialog] = useState(false);
    const [visibleDialogExclude, setVisibleDialogExclude] = useState(false);
    const [idExclude, setIdExclude] = useState(0);
    const [idDialog, setIdDialog] = useState(0);
    const [titleDialog, setTitleDialog] = useState('');
    const [nameDialog, setNameDialog] = useState('');
    const [emailDialog, setEmailDialog] = useState('');
    const [passwordDialog, setPasswordDialog] = useState('');
    const [confirmPasswordDialog, setConfirmPasswordDialog] = useState('');
    const [typeDialog, setTypeDialog] = useState('');
    const [disabledTypeDialog, setDisabledTypeDialog] = useState(true);
    const [textButtonDialog, setTextButtonDialog] = useState('');
    const [visibilityPasswordDialog, setVisibilityPasswordDialog] = useState(false);
    const [typePasswordDialog, setTypePasswordDialog] = useState('password');
    const [visibilityConfPasswordDialog, setVisibilityConfPasswordDialog] = useState(false);
    const [typeConfPasswordDialog, setConfTypePasswordDialog] = useState('password');

    useEffect(() => {
        async function searchUsers() {
            const response = await axios.get(`${env.REACT_API}/user`, {
                headers: {
                    Authorization: token
                }
            });

            if (response) {
                setListUser(response.data);
                console.log(listUser)
            } else {
                alert('Não foi possível fazer a busca de usuários!');
            }
        }

        searchUsers();
    }, []);

    function handleClose() {
        setVisibleDialog(false);
    }

    function handleCloseExclude() {
        setVisibleDialogExclude(false);
    }

    function changeVisibility() {
        setVisibilityPasswordDialog(!visibilityPasswordDialog);
        if (visibilityPasswordDialog === false)
            setTypePasswordDialog('text');
        else if (visibilityPasswordDialog === true)
            setTypePasswordDialog('password');
    }

    function changeVisibilityConf() {
        setVisibilityConfPasswordDialog(!visibilityConfPasswordDialog);
        if (visibilityConfPasswordDialog === false)
            setConfTypePasswordDialog('text');
        else if (visibilityConfPasswordDialog === true)
            setConfTypePasswordDialog('password');
    }

    async function createClient() {
        if (!nameDialog) {
            alert('Por favor preencha o campo nome');
            return;
        }

        if (!emailDialog) {
            alert('Por favor preencha o campo email');
            return;
        }

        if (!passwordDialog) {
            alert('Por favor preencha o campo senha');
            return;
        }

        if (!confirmPasswordDialog) {
            alert('Por favor preencha o campo confirme senha');
            return;
        }

        if (passwordDialog !== confirmPasswordDialog) {
            alert('Senhas não correspondem');
            return;
        }

        const body = {
            name: nameDialog,
            email: emailDialog,
            password: passwordDialog,
            confirmPassword: confirmPasswordDialog,
            type: typeDialog
        }

        const response: AxiosResponse<ResponseData> = await axios.post(`${env.REACT_API}/user`, body, {
            headers: {
                Authorization: token
            }
        });

        if (response.data.isSuccess) {
            alert(response.data.message);
            setVisibleDialog(false);

            const responseUsers = await axios.get(`${env.REACT_API}/user`, {
                headers: {
                    Authorization: token
                }
            });

            if (responseUsers) {
                setListUser(responseUsers.data);
            } else {
                alert('Não foi possivel buscar os usuários');
            }
        } else {
            alert('Não foi possível criar o usuário');
        }

    }

    async function updatedClient() {
        if (!nameDialog) {
            alert('Por favor preencha o campo nome');
            return;
        }

        if (!emailDialog) {
            alert('Por favor preencha o campo email');
            return;
        }

        if (!passwordDialog) {
            alert('Por favor preencha o campo senha');
            return;
        }

        if (!confirmPasswordDialog) {
            alert('Por favor preencha o campo confirme senha');
            return;
        }

        if (passwordDialog !== confirmPasswordDialog) {
            alert('Senhas não correspondem');
            return;
        }

        const body = {
            email: emailDialog,
            password: passwordDialog,
            confirmPassword: confirmPasswordDialog
        }

        const response: AxiosResponse<ResponseData> = await axios.put(`${env.REACT_API}/user`, body, {
            headers: {
                Authorization: token
            }
        })

        if (response.data.isSuccess) {
            alert(response.data.message);
            setVisibleDialog(false);
        } else {
            alert('Não foi possivel alterar os dados');
        }
    }

    async function deleteUser() {
        const response: AxiosResponse<ResponseData> = await axios.delete(`${env.REACT_API}/user/${idExclude}`, {
            headers: {
                Authorization: token
            }
        });

        if (response) {
            alert(`${response.data.message}`);
            setVisibleDialogExclude(false);

            const responseUsers = await axios.get(`${env.REACT_API}/user`, {
                headers: {
                    Authorization: token
                }
            });

            if (responseUsers) {
                setListUser(responseUsers.data);
            } else {
                alert('Não foi possivel buscar os usuários');
            }
        } else {
            alert(`Não foi possivel excluir o usuário`);
        }
    }

    function renderDialog() {
        return (
            <Dialog onClose={handleClose} open={visibleDialog}>
                <DialogContent>
                    <h1>{titleDialog}</h1>

                    <div id='dialogContainer'>
                        <h2>Id:{idDialog}</h2>
                        <Input
                            className='inputDialog'
                            disableUnderline={true}
                            placeholder='Nome'
                            value={nameDialog}
                            onChange={e => setNameDialog(e.target.value)}
                        />

                        <Input
                            className='inputDialog'
                            disableUnderline={true}
                            placeholder='Email'
                            value={emailDialog}
                            onChange={e => setEmailDialog(e.target.value)}
                        />

                        <Input
                            className='inputDialog'
                            disableUnderline={true}
                            placeholder='Senha'
                            value={passwordDialog}
                            onChange={e => setPasswordDialog(e.target.value)}
                            type={typePasswordDialog}
                            endAdornment={
                                <InputAdornment position="end">
                                    {visibilityPasswordDialog ?
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

                        <Input
                            className='inputDialog'
                            disableUnderline={true}
                            placeholder='Confirme sua Senha'
                            value={confirmPasswordDialog}
                            onChange={e => setConfirmPasswordDialog(e.target.value)}
                            type={typeConfPasswordDialog}
                            endAdornment={
                                <InputAdornment position="end">
                                    {visibilityConfPasswordDialog ?
                                        <Button onClick={changeVisibilityConf}>
                                            <VisibilityOff />
                                        </Button>
                                        :
                                        <Button
                                            onClick={changeVisibilityConf}>
                                            <Visibility />
                                        </Button>
                                    }
                                </InputAdornment>
                            }
                        />

                        <Select
                            placeholder="Tipo"
                            value={typeDialog}
                            disabled={disabledTypeDialog}
                            style={{ marginTop: 10 }}
                        >
                            <MenuItem value="">Selecione</MenuItem>
                            <MenuItem value="ADM">ADM</MenuItem>
                            <MenuItem value="USER">USER</MenuItem>
                        </Select>

                        <div id='divBtnDialog'>
                            <Button
                                id='btnDialog'
                                onClick={() => textButtonDialog === 'Atualizar' ? updatedClient() : createClient()}
                            >{textButtonDialog}</Button>
                        </div>

                    </div>


                </DialogContent>
            </Dialog>

        )
    }

    function renderPgtExcludeDialog() {
        return (
            <Dialog onClose={handleCloseExclude} open={visibleDialogExclude}>
                <DialogContent>
                    <h2>Deseja realmente excluir esse usuário?</h2>
                    <div style={{ marginTop: 10 }}>
                        <Button id='btnExcludeSim' onClick={() => deleteUser()}>Sim</Button>
                        <Button id='btnExcludeNao' onClick={() => setVisibleDialogExclude(false)}>Não</Button>
                    </div>
                </DialogContent>
            </Dialog>
        )
    }

    function openEditDialog(item: ListUserArray) {
        setIdDialog(item.id);
        setTitleDialog('Editar');
        setNameDialog(item.name);
        setEmailDialog(item.email);
        // setPasswordDialog(item.password)
        setTypeDialog(item.type);
        setDisabledTypeDialog(true);
        setTextButtonDialog('Atualizar');
        setVisibleDialog(true);
    }

    function openExcludeDialog(item: ListUserArray) {
        setVisibleDialogExclude(true);
        setIdExclude(item.id);
    }

    function openCreateDialog() {
        setIdDialog(0);
        setTitleDialog('Criar');
        setNameDialog('');
        setEmailDialog('');
        setPasswordDialog('');
        setConfirmPasswordDialog('');
        setTypeDialog('ADM');
        setDisabledTypeDialog(true);
        setTextButtonDialog('Criar');
        setVisibleDialog(true);
    }

    return (
        <div>

            <h1 style={{ color: '#fff' }}>Usuários</h1>
            <IconButton
                style={{ margin: 0, marginLeft: 490 }}
                onClick={() => openCreateDialog()}
            >
                <Add style={{ color: '#fff' }} />
            </IconButton>

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell style={{ fontWeight: 'bold', color: '#FFF', fontSize: 18 }}>Id</TableCell>
                        <TableCell style={{ fontWeight: 'bold', color: '#FFF', fontSize: 18 }}>Nome</TableCell>
                        <TableCell style={{ fontWeight: 'bold', color: '#FFF', fontSize: 18 }}>Email</TableCell>
                        <TableCell style={{ fontWeight: 'bold', color: '#FFF', fontSize: 18 }}>Tipo</TableCell>
                        <TableCell style={{ fontWeight: 'bold', color: '#FFF', fontSize: 18 }}>Ações</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        listUser.map(item => (
                            <TableRow key={item.id}>
                                <TableCell style={styles.tcStyle}>{item.id}</TableCell>
                                <TableCell style={styles.tcStyle}>{item.name}</TableCell>
                                <TableCell style={styles.tcStyle}>{item.email}</TableCell>
                                <TableCell style={styles.tcStyle}>{item.type}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => openEditDialog(item)}>
                                        <Edit style={{ color: '#fff' }} />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => openExcludeDialog(item)}>
                                        <Delete style={{ color: '#fff' }} />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
            {renderDialog()}
            {renderPgtExcludeDialog()}
        </div>
    )
}

