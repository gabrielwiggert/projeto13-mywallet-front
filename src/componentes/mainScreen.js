import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import React from 'react'
import { v4 as uuid } from 'uuid';

import UserContext from "./UserContext";
import logout from "./../assets/imgs/logout.png";

let saldo = 0;

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
        const requisicao = axios.get("https://back-end-my-wallet000.herokuapp.com/posts", config);
        requisicao.then((response) => {
            setPosts(response.data);
            console.log(response.data);
            if (posts) {
                posts.forEach(lancamento => {
                    if (lancamento.type === "entrada") {
                        saldo += lancamento.post;
                    } else if (lancamento.type === "saida") {
                        saldo -= lancamento.post;
                    }
                });
            }
        });

        requisicao.catch((err) => {
            console.log(err);
            alert(err);
        });
    }, []);

    return posts ? (
        <Fullscreen>
            <Header>
                <h1>Olá {userName}</h1>
                <Link to="/">
                    <img src={logout} />
                </Link>
            </Header>
            <Lancamentos>
                <ul>
                    {posts.map(post => <li key={uuid()} ><span>{post.date}</span><em>{post.titulo}</em><Value type={post.type}>{post.post}</Value></li>)}
                </ul>
                <LastLine>
                    <h2>SALDO:</h2>
                    <h3>{saldo}</h3>
                </LastLine>
            </Lancamentos>
            <Container>
                <Link to="/lancamentoEntrada">
                    <Input><p>Nova <br></br> entrada</p></Input>
                </Link>
                <Link to="/lancamentoSaida">
                    <Input><p>Nova <br></br> saída</p></Input>
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
        margin-bottom: 10px;
    }
`;

const Value = styled.div`
    color: ${props => (props.type === "entrada") ? "#03AC00" : "#C70000"};
`;

const LastLine = styled.div`
    display: flex;
    justify-content: space-between;
    color: black;

    h2 {
       font-weight: 900;
    }

    h3 {
        padding-left: 230px;
        color: ${(saldo >= 0) ? "#03AC00" : "#C70000"}; 
    }

`;

const Lancamentos = styled.div`
    margin-top: 29px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    background-color: white;
    color: black;
    height: 70vh;
    width: 90vw;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 10px;
    font-size: 20px;
    border-radius: 5px;

    ul {
        width: 80vw;
    }

    em, strong {
        padding-left: 10px;
    }

    span {
        color: #C6C6C6;
    }

    p {
        color: black;
    }

    li {
        padding-bottom: 15px;
        display: flex;
        justify-content: space-between;
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

    a:link {
        text-decoration: none;
        color: white;
    }
`;

const Input = styled.div`
    border-radius: 5px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 170px;
    height: 114px;
    background-color: #A328D6;
    text-align: center;
    color: white;
    font-weight: 900;
    font-size: large;
    padding-left: 15px;
    padding-top: 50px;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    img {
        padding-left: 200px;
    }
`;