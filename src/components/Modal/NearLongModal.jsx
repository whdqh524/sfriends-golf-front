import React from "react";
import styled from "styled-components";
import {useRoundStore} from "../../stores/roundStore.js";
import {observer} from "mobx-react";

const NearLongModal = () => {
    const roundStore = useRoundStore();
    return (
        <Wrapper>
            <Label>플레이어</Label>
            {
                roundStore?.players?.map((player, idx) => (
                    <PlayerButton
                        $active={roundStore.holeBestPlayer === player.id}
                        onClick={() => roundStore.setHoleBestPlayer(player.id)}
                        key={idx}
                    >
                        {player.name}
                    </PlayerButton>
                ))
            }
        </Wrapper>
    );
};

export default observer(NearLongModal);

/* ================= 스타일 ================= */

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const Label = styled.div`
    font-size: 14px;
    font-weight: 600;
`;

const PlayerButton = styled.button`
    flex: 1;
    padding: 12px;

    border: none;
    border-radius: 10px;

    font-size: 14px;
    font-weight: 600;

    background: ${({ $active }) => ($active ? "#FD5A1E" : "#eee")};
    color: ${({ $active }) => ($active ? "#fff" : "#333")};

    transition: 0.15s;

    &:active {
        transform: scale(0.96);
    }
`;

const Input = styled.input`
    height: 44px;
    border-radius: 10px;
    border: 1px solid #ddd;
    padding: 0 12px;
`;

const Card = styled.div`
    border: 1px solid #eee;
    border-radius: 12px;
    padding: 12px;
`;

const CourseHeader = styled.div`
    display: flex;
    gap: 8px;
    margin-bottom: 10px;
    align-items: center;
`;

const CourseName = styled.input`
    flex: 1;
    height: 36px;
    border-radius: 8px;
    border: 1px solid #ddd;
    padding: 0 10px;
`;

const RemoveButton = styled.div`
    font-size: 12px;
    color: red;
    cursor: pointer;
`;

const HoleGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
`;

const HoleBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const HoleLabel = styled.div`
    font-size: 12px;
`;

const HoleInput = styled.input`
    width: 100%;
    height: 34px;
    text-align: center;
    border-radius: 6px;
    border: 1px solid #ddd;
`;

const AddCourse = styled.div`
    height: 44px;
    border: 1px dashed #fd5a1e;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fd5a1e;
    cursor: pointer;
`;