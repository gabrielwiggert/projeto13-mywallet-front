import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import React from 'react'
import { render } from 'react-dom'
import { ThreeDots } from 'react-loader-spinner'
import logotipo from "./../assets/imgs/MyWallet.png";

export default function Cadastro () {
	const [email, setEmail] = useState("");
	const [senha, setSenha] = useState("");
    const [nome, setNome] = useState("");
    const [confirmaSenha, setConfirmaSenha] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

	function fazerCadastro (event) {
		event.preventDefault();

        setLoading(true);

            const requisicao = axios.post("https://back-end-my-wallet000.herokuapp.com/cadastrar", {
                name: nome,
                email: email,
                password: senha,
                confirm_password: confirmaSenha
            });

        requisicao.then((response) => {
            console.log(response.data);
            navigate("/");
        });

        requisicao.catch((err) => {
            console.log(err);
            alert(err);
        });
	}

    return (
        <>
        <Logo>
        <img src={logotipo} />
        </Logo>
        
            <Form>
                <form onSubmit={fazerCadastro}>
                    <input type="text" placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} required disabled={loading}/>
                    <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required disabled={loading}/>
                    <input type="password" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} required disabled={loading}/>
                    <input type="password" placeholder="Confirme a senha" value={confirmaSenha} onChange={e => setConfirmaSenha(e.target.value)} required disabled={loading}/>
                    {loading ? <button disabled><ThreeDots color="#fff" height={'1.8rem'} width={'100%'} /></button> : <button type="submit">Cadastrar</button>}
                </form>
            </Form>

            <RedirectLogin>
                <Link to="/">
                    <h1>Já possui uma conta? Entre</h1>
                </Link>
            </RedirectLogin>
        </>
    );
}

const Logo = styled.div`
    margin-top: 134px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
`;

const RedirectLogin = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    a:link {
        text-decoration: none;
        text-decoration: black;
    }

    h1 {
        color: white;
        text-decoration: underline;
    }
`;

const Form = styled.div`
    form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 100px;
    }

    input {
        border-width: 1px;
        border-color: #D4D4D4;
        background-color: white;
        border-radius: 5px;
        border: 1px solid #D5D5D5;
        width: 80vw;
        height: 52px;
        margin-bottom: 24px;
        font-family: 'Lexend Deca', sans-serif;
    }

    input:disabled{
        background: grey;
        color: darkgray;
        opacity: 0.2;
        cursor: progress;
    }

    button:disabled{
        background: grey;
        color: darkgray;
        opacity: 0.2;
        cursor: progress;
    }

    input::placeholder {
        padding-left: 11px;
        font-size: 14px;
        color: #7E7E7E;
    }

    button {
        border-style: none;
        border-radius: 5px;
        margin-bottom: 20px;
        width: 80vw;
        height: 45px;
        background-color: #A328D6;
        color: white;
        font-family: 'Lexend Deca', sans-serif;
        font-size: 21px;
    }
`;