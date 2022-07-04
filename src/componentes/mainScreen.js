import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import React from 'react'
import { v4 as uuid } from 'uuid';

import UserContext from "./UserContext";

export default function MainScreen() {
    const { userData, setUserData } = useContext(UserContext);
    const { userName, setUserName } = useContext(UserContext);
	const [posts, setPosts] = useState(undefined);
    const config = {
        headers: {
            "Authorization": `Bearer ${userData}`
        }
    }

    useEffect(() => {
        const requisicao = axios.get("http://localhost:5000/posts", config);
        requisicao.then((response) => {
            setPosts(response.data);
            console.log(response.data);
        });
    
        requisicao.catch((err) => {
            console.log(err);
            alert(err);
        });
    }, []);

    return posts ? (
        <Fullscreen>
            <h1>Olá {userName}</h1>
            <Lancamentos>
                <ul>
                    {posts.map(post => <li key={uuid()} >{post.date}, {post.titulo}, {post.post}</li>)}
                </ul>
            </Lancamentos>
            <Container>
                <Link to="/lancamentoEntrada">
                    <Input><p>Nova entrada</p></Input>
                </Link>
                <Link to="/lancamentoSaida">
                    <Input><p>Nova saída</p></Input>
                </Link>
            </Container>
        </Fullscreen>
    ) : "Carregando...";
}

const Fullscreen = styled.div`
    margin-top: 29px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h1 {
        color: white;
        font-size: 32px;
        font-weight: 700;
        font-style: bold;
        margin-bottom: 24px;
    }
`;

const Lancamentos = styled.div`
    margin-top: 29px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
    color: black;
    height: 70vh;
    width: 90vw;

    p {
        color: black;
    }
`;

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    background-color: #8C11BE;
    width: 90vw;
    margin-top: 13px;
`;

const Input = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 156px;
    height: 114px;
    background-color: #A328D6;
    text-align: center;
`;