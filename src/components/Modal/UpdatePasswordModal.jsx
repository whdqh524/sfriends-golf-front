import React from "react";
import styled from "styled-components";
import {useUserStore} from "@/stores/userStore.js";

const UpdatePasswordModal = () => {
    const userStore = useUserStore();
    return (
        <div className="flex-box col gap-10">
            <Field>
                <Label>현재 비밀번호</Label>
                <Input name="currentPassword" type="password" onChange={(e) => {
                    userStore.setModalPassword(e.target.value);
                }} required={true} />
            </Field>

            <Field>
                <Label>새 비밀번호</Label>
                <Input name="newPassword" type="password" onChange={(e) => {
                    userStore.setModalNewPassword(e.target.value);
                }} required={true} />
            </Field>

            <Field>
                <Label>새 비밀번호 확인</Label>
                <Input name="confirmPassword" type="password" onChange={(e) => {
                    userStore.setModalConfirmPassword(e.target.value);
                }} required={true} />
            </Field>
        </div>
    );
};

const Field = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding-bottom: 25px;
`

const Label = styled.label`
    font-size: 12px;
    color: #666;
    padding-bottom: 4px;
`

const Input = styled.input`
    padding: 8px 10px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 14px;

    &:focus {
        outline: none;
        border-color: #1565c0;
    }
`
export default UpdatePasswordModal;
