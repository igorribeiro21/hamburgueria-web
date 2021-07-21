import React, { useState, useEffect, useContext } from 'react';
import {
    IconButton,
    Table,
    TableHead,
    TableCell,
    TableBody,
    TableRow,
    Dialog,
    DialogContent,
    Input,
    Select,
    MenuItem,
    Button
} from '@material-ui/core';
import { Add, Delete, Edit } from '@material-ui/icons';
import SideMenu from '../components/SideMenu';
import env from 'react-dotenv';
import axios, { AxiosResponse } from 'axios';
import { AllContext } from '../components/contexts/AllContext';
import '../styles/pages/Product.css';

interface TypeProduct {
    name: string
}

interface ListProductArray {
    id: number;
    name: string;
    description: string;
    price: number;
    id_type_product: number;
    TypeProduct: TypeProduct;
}

interface ResponseData {
    isSuccess: boolean;
    message: string;
}

interface ListProductData extends Array<ListProductArray> { }

function Product() {
    const { token } = useContext(AllContext);
    const [listProduct, setListProduct] = useState([] as ListProductData);
    const [visibleDialog, setVisibleDialog] = useState(false);
    const [visibleDialogExclude, setVisibleDialogExclude] = useState(false);
    const [titleDialog, setTitleDialog] = useState('');
    const [idDialog, setIdDialog] = useState(0);
    const [nameDialog, setNameDialog] = useState('');
    const [descriptionDialog, setDescriptionDialog] = useState('');
    const [priceDialog, setPriceDialog] = useState(0.00);
    const [typeDialog, setTypeDialog] = useState('');
    const [disabledTypeDialog, setDisabledTypeDialog] = useState(false);
    const [textButtonDialog, setTextButtonDialog] = useState('Criar');
    const [idExclude, setIdExclude] = useState(0);

    useEffect(() => {
        searchProducts();
    }, []);

    async function searchProducts() {
        const response = await axios.get(`${env.REACT_API}/product`,
            {
                headers: {
                    Authorization: token
                }
            });
        if (response) {
            setListProduct(response.data);
        } else {
            alert('Não foi possível encontrar os produtos!');
        }

    }

    function handleClose() {
        setVisibleDialog(false);
    }

    function handleCloseExclude() {
        setVisibleDialogExclude(false);
    }

    function formatarMoeda(value: string) {
        let number = parseFloat(value.toString()).toFixed(2).replace(".", ",");
        value = number.toString();

        return value;
    }

    function openCreateDialog() {
        setTitleDialog('Criar');
        setVisibleDialog(true);
    }

    function editDialog(item: ListProductArray) {
        setIdDialog(item.id);
        setNameDialog(item.name);
        setDescriptionDialog(item.description);
        setPriceDialog(item.price);
        setTypeDialog(item.id_type_product.toString());
        setTitleDialog('Editar');
        setTextButtonDialog('Atualizar');
        setVisibleDialog(true);
    }

    function openExcludeDialog(item: ListProductArray) {
        setVisibleDialogExclude(true);
        setIdExclude(item.id);
    }

    function clearDialog() {
        setNameDialog('');
        setDescriptionDialog('');
        setPriceDialog(0);
        setTypeDialog('');
        setVisibleDialog(false);

    }

    async function createProduct() {
        if (!nameDialog) {
            alert('Favor informar o nome do produto');
            return;
        }

        if (!descriptionDialog) {
            alert('Favor informar a descrição do produto');
            return;
        }

        if (!priceDialog) {
            alert('Favor informar o preço do produto');
            return;
        }

        if (!typeDialog) {
            alert('Favor informar o tipo do produto');
            return;
        }

        const body = {
            name: nameDialog,
            description: descriptionDialog,
            price: priceDialog,
            id_type_product: typeDialog
        }


        const product: AxiosResponse<ResponseData> = await axios.post(`${env.REACT_API}/product`, body, {
            headers: {
                Authorization: token
            }
        });

        console.log(product);

        if (product.data.isSuccess) {
            alert('Produto criado com sucesso');
            searchProducts();
            clearDialog();
        }
    }

    async function editProduct() {
        if (!nameDialog) {
            alert('Favor informar o nome do produto');
            return;
        }

        if (!descriptionDialog) {
            alert('Favor informar a descrição do produto');
            return;
        }

        if (!priceDialog) {
            alert('Favor informar o preço do produto');
            return;
        }

        if (!typeDialog) {
            alert('Favor informar o tipo do produto');
            return;
        }

        const body = {
            name: nameDialog,
            description: descriptionDialog,
            price: priceDialog,
            id_type_product: typeDialog
        }

        const product: AxiosResponse<ResponseData> = await axios.put(`${env.REACT_API}/product/${idDialog}`, body, {
            headers: {
                Authorization: token
            }
        });

        if (product.data.isSuccess) {
            alert(product.data.message);
            searchProducts();
            clearDialog()
        } else {
            alert(product.data.message);
        }
    }

    async function deleteUser() {
        const product : AxiosResponse<ResponseData> = await axios.delete(`${env.REACT_API}/product/${idExclude}`,{
            headers: {
                Authorization: token
            }
        });

        if(product.data.isSuccess){
            alert(product.data.message);
            setVisibleDialogExclude(false);
            searchProducts();            
        }else {
            alert(product.data.message);
        }
    }

    function renderDialog() {
        return (
            <Dialog onClose={handleClose} open={visibleDialog}>
                <DialogContent>
                    <h1>{titleDialog}</h1>

                    <div id='dialogContainer'>
                        <Input
                            className="inputDialog"
                            disableUnderline={true}
                            value={nameDialog}
                            placeholder='Nome'
                            onChange={e => setNameDialog(e.target.value)}
                        />
                        <Input
                            className="inputDialog"
                            disableUnderline={true}
                            value={descriptionDialog}
                            placeholder='Descrição'
                            onChange={e => setDescriptionDialog(e.target.value)}
                        />
                        <Input
                            className="inputDialog"
                            disableUnderline={true}
                            value={priceDialog !== 0 ? priceDialog : ''}
                            placeholder='Preço'
                            onChange={e => setPriceDialog(parseFloat(e.target.value))}
                            type='number'
                        />

                        <Select
                            placeholder="Tipo"
                            value={typeDialog}
                            disabled={disabledTypeDialog}
                            style={{ marginTop: 10 }}
                            onChange={e => setTypeDialog(e.target.value as any)}
                        >
                            <MenuItem value="">Selecione</MenuItem>
                            <MenuItem value="1">Hamburgueres</MenuItem>
                            <MenuItem value="2">Batatas Fritas</MenuItem>
                            <MenuItem value="3">Bebidas</MenuItem>
                            <MenuItem value="4">Sobremesas</MenuItem>
                        </Select>

                        <div id="divBtnDialog">
                            <Button
                                id="btnDialog"
                                onClick={() => {
                                    textButtonDialog === 'Atualizar' ? editProduct() : createProduct()
                                }}
                            >
                                {textButtonDialog}

                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        );
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

    const styles = {
        tableTitle: {
            fontWeight: 'bold',
            color: '#FFF',
            fontSize: 18
        } as React.CSSProperties,
        tableBody: {
            color: '#fff'
        }
    }

    return (
        <div style={{ display: 'flex' }}>
            <div>
                <SideMenu />
            </div>
            <div>
                <h1 style={{ color: '#fff' }}>Produtos</h1>
                <IconButton
                    style={{ margin: 0, marginLeft: 490 }}
                    onClick={() => openCreateDialog()}
                >
                    <Add style={{ color: '#fff' }} />
                </IconButton>

                <Table>
                    <TableHead>
                        <TableCell style={styles.tableTitle}>Id</TableCell>
                        <TableCell style={styles.tableTitle}>Nome</TableCell>
                        <TableCell style={styles.tableTitle}>Descrição</TableCell>
                        <TableCell style={styles.tableTitle}>Preço</TableCell>
                        <TableCell style={styles.tableTitle}>Tipo Produto</TableCell>
                        <TableCell style={styles.tableTitle}>Ações</TableCell>
                    </TableHead>
                    <TableBody>
                        {
                            listProduct.map(item => (
                                <TableRow>
                                    <TableCell style={styles.tableBody}>{item.id}</TableCell>
                                    <TableCell style={styles.tableBody}>{item.name}</TableCell>
                                    <TableCell style={styles.tableBody}>{item.description}</TableCell>
                                    <TableCell style={styles.tableBody}>R$ {formatarMoeda(item.price.toString())}</TableCell>
                                    <TableCell style={styles.tableBody}>{item.TypeProduct.name}</TableCell>
                                    <TableCell>
                                        <IconButton
                                            onClick={() => editDialog(item)}>
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
        </div>
    );
}

export default Product;