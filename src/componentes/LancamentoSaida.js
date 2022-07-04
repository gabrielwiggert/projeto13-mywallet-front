import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import React from 'react'
import { ThreeDots } from 'react-loader-spinner'
import dayjs from 'dayjs';

import UserContext from "./UserContext";

export default function LancamentoSaida() {
    const [titulo, setTitulo] = useState("");
    const [post, setPost] = useState("");
	const [type, setType] = useState("saida");
    const [loading, setLoading] = useState(false);
    const { userData, setUserData } = useContext(UserContext);
    const navigate = useNavigate();
    const config = {
        headers: {
            "Authorization": `Bearer ${userData}`
        }
    }

	function fazerLancamento (event) {
        const day = dayjs().date();
        const month = dayjs().month();
        const date = `${day}/${month}`
		event.preventDefault();

        setLoading(true);

        const requisicao = axios.post("https://back-end-my-wallet000.herokuapp.com/posts", {
            titulo,
            post,
            type,
            date
        }, config);


        requisicao.then((response) => {
            console.log(response.data);
            navigate("/mainScreen");
        });

        requisicao.catch((err) => {
            console.log(err);
            alert(err);
        });
	}

    return (
        <>
            <Logo>
                <h1>Nova saída</h1>
            </Logo>

            <Form>
                <form onSubmit={fazerLancamento}>
                    <input type="number" placeholder="Valor" value={post} onChange={e => setPost(e.target.value)} required disabled={loading}/>
                    <br/>
                    <input type="text" placeholder="Descrição" value={titulo} onChange={e => setTitulo(e.target.value)} required disabled={loading}/>
                    <br/>
                    {loading ? <button disabled><ThreeDots color="#fff" height={'1.8rem'} width={'100%'} /></button> : <button type="submit">Salvar saída</button>}
                </form>
            </Form>
        </>
    );
}

const Logo = styled.div`
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 30px;

    h1 {
        color: white;
        font-size: 32px;
        font-weight: 700;
        font-style: bold;
        margin-bottom: 24px;
    }
`;

const Form = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

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
        margin-bottom: 24px;
        width: 80vw;
        height: 45px;
        background-color: #A328D6;
        color: white;
        font-family: 'Lexend Deca', sans-serif;
        font-size: 21px;
    }
`;