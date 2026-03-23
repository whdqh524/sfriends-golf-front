import { useState } from 'react'
import {
    Card
} from '@/components/Record/styles'
import styled from "styled-components";
import ResultScore from "@/pages/Round/ResultScore.jsx";
import {useRoundStore} from "@/stores/roundStore.js";
import {observer} from "mobx-react";
import {Button} from "@/styles/common.js";

export default observer(({ modifyFunc, handleNext, handleFinish }) => {
    const roundStore = useRoundStore();

    return (
        <Card>
            {/* 🔥 아코디언 */}
            <ResultTable>
                {roundStore.strokeRecords.map((stroke) => {
                    const money = roundStore.moneyRecords.find(
                        m => m.userId === stroke.userId
                    )

                    return (
                        <ResultScore
                            key={stroke.userId}
                            stroke={stroke}
                            money={money}
                            modifyFunc={modifyFunc}
                        />
                    )
                })}
            </ResultTable>

            {
                roundStore.isLastHole ? <FinishButton onClick={handleFinish}>라운드 종료</FinishButton> : <NextButton onClick={handleNext}>다음 홀 →</NextButton>}
        </Card>
    )
});

const ResultTable = styled.div`
    margin-top: 12px;
    padding-bottom: 8px;
`

const NextButton = styled.button`
    width: 100%;
    margin-top: 14px;
    height: 52px;
    background: #222;
    color: white;
    border-radius: 14px;
    margin-bottom: 60px;
`;

const FinishButton = styled.button`
    width: 100%;
    padding: 14px;
    border-radius: 12px;
    border: none;
    font-weight: 600;
    background: #FD5A1E;
    color: #fff;
    margin-bottom: 90px;

    &:active {
        transform: scale(0.97);
    }
`;