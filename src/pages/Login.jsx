import React, {useState} from "react";
import LogoText from "../assets/logo-text.svg";
import styled from "styled-components";

import Input from "../components/Input";
import Button from "../components/Button";

import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react";
import {useUserStore} from "../stores/userStore";
import {toast, ToastContainer} from "react-toastify";
import {formatPhoneNumber} from "@/utils/inputUtil.js";


const Login = observer(() => {
    let navigate = useNavigate();

    const userStore = useUserStore();

    const [cellphone, setCellphone] = useState("");
    const [password, setPassword] = useState("");
    let [typeChange, setTypeChange] = useState("password");

    const onChangeCellphone = (e) => {
        const inputData = formatPhoneNumber(e.target.value);
        setCellphone(inputData);
    };
    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };
    const onClickSubmit = async () => {
        await userStore.signIn(cellphone, password);
        navigate("/")
    };
    const logChkPress = async (e) => {
        if (e.key === "Enter") {
            await onClickSubmit();
        }
    }
    return (
        <LoginPageContainer>
            <LoginFormWrap>
                <img src={LogoText} alt="andar logo image in login page"/>
                <CustomInput
                    inputType={"text"}
                    id={"login_id"}
                    label={"아이디"}
                    placeholder={"아이디를 입력해 주세요."}
                    onChange={onChangeCellphone}
                    onKeyDown={logChkPress}
                />
                <CustomInput
                    inputType={typeChange}
                    id={"login_password"}
                    label={"비밀번호"}
                    placeholder={"비밀번호를 입력해 주세요."}
                    onChange={onChangePassword}
                    typeChange={typeChange}
                    setTypeChange={setTypeChange}
                    onEyes={"on"}
                    onKeyDown={logChkPress}
                />
                <ButtonWrap>
                    <Button
                        onClick={onClickSubmit}
                    >로그인</Button>
                </ButtonWrap>

                {/*<p className={"page-error-text" + (logVal ? ' on' : '')}>*/}
                {/*    아이디 또는 비밀번호를 확인해 주세요.*/}
                {/*</p>*/}
            </LoginFormWrap>
            <ToastContainer className={"toast_area"} autoClose={1500} hideProgressBar={true}
                            closeButton={false}
                            pauseOnHover={false}
                            position="bottom-center"/>
        </LoginPageContainer>
    );
});

const ButtonWrap = styled.div`
    margin-top: 48px;

    button {
        width: 100%;
    }
`;

const LoginFormWrap = styled.div`
    position: relative;
    max-width: 440px;
    width: 100%;
    padding: 0 12px;
    overflow: hidden;
    img {
        display: block;
        margin: 0 auto 40px;
        object-fit: cover;
        max-width: 100%;
        height: auto;
    }

    .page-error-text {
        position: absolute;
        bottom: -30px;
        left: 50%;
        transform: translateX(-50%);
        color: var(--Secondary-Red_-E75434, #e75434);
        text-align: center;
        font-size: 13px;
        font-style: normal;
        font-weight: 400;
        line-height: 18px;
        letter-spacing: -0.13px;
        transition: all .3s;
        opacity: 0;
        pointer-events: none;
        width: 100%;
    }

    .page-error-text.on {
        opacity: 1;
    }
`;

const CustomInput = styled(Input)`
    margin-top: 16px;
    width: 100%;

    &:first-of-type {
        margin-top: 0;
    }
`;

const LoginPageContainer = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .toast_area {

        > div {
            background: #161616;
            color: #FFF;
            text-align: center;
            font-size: 13px;
            font-weight: 500;
            line-height: 18px;
            letter-spacing: -0.13px;
            padding: 9px 24px;
            min-height: auto;
            white-space: pre-wrap;
        }
    }
`;

export default Login;
