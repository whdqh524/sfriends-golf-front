import styled from "styled-components";
import {useState, useEffect} from 'react';

import {Outlet, useNavigate} from "react-router-dom";
import SideNav from "@/components/SideNav";
import BottomNav from "@/components/BottomNav";
import Toast from "@/components/Toast";
import ModalManager from "@/components/Modal/ModalManager";
import Loading from "../components/Loading.jsx";
import {Suspense} from "react";
import {useUserStore} from "@/stores/userStore.js";


const Root = () => {
    const userStore = useUserStore();
    const navigate = useNavigate();


    useEffect(() => {
        if(!userStore.isLogin) {
            userStore.signInWithToken().catch(() => {
                navigate("/login");
            });
        }
    }, [])

    return (
        <Suspense fallback={<Loading />}>
            <RootContainer className="layout-container">
                <MainContent className="page-content">
                    <Outlet/>
                </MainContent>
                <BottomNav/>
            </RootContainer>
            <ModalManager/>
            <Toast/>
            <Loading />
        </Suspense>
    );
};

export const RootContainer = styled.div`
    display: flex;
    min-height: 100vh;
    overflow-y: auto;   // 🔥 추가
`;

export const MainContent = styled.div`
    padding: 20px;
    flex: 1;
    overflow-y: auto;
`;


export default Root;
