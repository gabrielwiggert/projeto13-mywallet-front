import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import React from 'react'

import UserContext from "./UserContext";

export default function MainScreen() {
    const { userData, setUserData } = useContext(UserContext);
    const { userName, setUserName } = useContext(UserContext);
	const [posts, setPosts] = useState(null);
    const config = {
        headers: {
            "Authorization": `Bearer ${userData}`
        }
    }

    useEffect(() => {
        const requisicao = axios.get("http://localhost:5000/posts", config);
        requisicao.then((response) => {
            setPosts(response.data);
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
                {
                    posts ? <p>{posts}</p> : <p>Não há registros de entrada ou saída</p>
                }
            </Lancamentos>
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
`;