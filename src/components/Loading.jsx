import React from "react";
import {observer} from "mobx-react";
import styled from "styled-components";
import {useLoadingStore} from "../stores/loadingStore.js";
import IcLoading from "@/assets/icons/loading-gif-ico.gif";

const Loading = observer(() => {
    const loadingStore = useLoadingStore();
    return (
        <>
            {
                loadingStore.visible &&
                <LoadingContainerWrapper>
                    <div className={"inner"}><img src={IcLoading} alt={"페이지 로딩"}/></div>
                </LoadingContainerWrapper>
            }
        </>
    );
});
const LoadingContainerWrapper = styled.div`
    position: fixed;
    z-index: 999;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    align-items: center;
    justify-content: center;
    display: flex;

    .inner {
        width: 50px;
        color: #ffff;
        font-size: 50px;
    }

    .inner img {
        max-width: 100%;
    }
`
export default Loading;
