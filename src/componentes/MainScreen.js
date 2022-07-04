import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import React from 'react'

import UserContext from "./UserContext";

export default function MainScreen() {
    const [subscriptionsData, setSubscriptionsData] = useState(false);
    const { userData, setUserData } = useContext(UserContext);
    const config = {
        headers: {
            "Authorization": `Bearer ${userData}`
        }
    }

    useEffect(() => {
        const requisicao = axios.get("https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships", config);
        requisicao.then((response) => {
            console.log(response.data);
            setSubscriptionsData(response.data);
        });
    
        requisicao.catch((err) => {
            console.log(err);
            alert(err);
        });
    }, []);

    return subscriptionsData ? (
        <Fullscreen>
            <h1>Escolha seu Plano</h1>

            <Link to={`/subscriptions/${subscriptionsData[0].id}`}>
                <Plano>
                    <img src={subscriptionsData[0].image} />
                    <h2>R$ {subscriptionsData[0].price}</h2>
                </Plano>
            </Link>

            <Link to={`/subscriptions/${subscriptionsData[1].id}`}>
                <Plano>
                    <img src={subscriptionsData[1].image} />
                    <h2>R$ {subscriptionsData[1].price}</h2>
                </Plano>
            </Link>

            <Link to={`/subscriptions/${subscriptionsData[2].id}`}>
                <Plano>
                    <img src={subscriptionsData[2].image} />
                    <h2>R$ {subscriptionsData[2].price}</h2>
                </Plano>
            </Link>
        </Fullscreen>
    ) : "Carregando...";
}

const Plano = styled.div`
    margin-bottom: 10px;
    height: 180px;
    width: 290px;
    border: 3px solid #7E7E7E;
    border-radius: 12px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    padding: 16px;
    h2 {
        font-size: 24px;
        color: white;
        font-weight: 700;
        font-style: bold;
        margin-bottom: 24px;
    }
`;

const Fullscreen = styled.div`
    margin-top: 29px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    a:link {
        text-decoration: none;
    }

    h1 {
        color: white;
        font-size: 32px;
        font-weight: 700;
        font-style: bold;
        margin-bottom: 24px;
    }
`;