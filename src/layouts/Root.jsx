import styled from "styled-components";
import {useState, useEffect} from 'react';

import {Outlet} from "react-router-dom";
import SideNav from "@/components/SideNav";
import BottomNav from "@/components/BottomNav";
import Toast from "@/components/Toast";
import ModalManager from "@/components/Modal/ModalManager";
import Loading from "../components/Loading.jsx";
import {Suspense} from "react";


const Root = () => {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 1024)
        }

        handleResize()
        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <Suspense fallback={<Loading />}>
            <RootContainer className="layout-container">
                {!isMobile && <SideNav/>}
                <MainContent className="page-content" $isMobile={isMobile}>
                    <Outlet/>
                </MainContent>
                {isMobile && <BottomNav/>}
            </RootContainer>
            <ModalManager/>
            <Toast/>
            <Loading />
        </Suspense>
    );
};

export const RootContainer = styled.div`
    display: flex;
    height: 100vh;
`;

export const MainContent = styled.div`
    padding: 20px;
    flex: 1;
`;


export default Root;
