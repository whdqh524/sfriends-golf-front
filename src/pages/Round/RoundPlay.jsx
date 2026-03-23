import {useNavigate, useSearchParams} from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useRoundStore } from "@/stores/roundStore.js";
import { observer } from "mobx-react";
import ResultItem from "@/pages/Round/ResultItem.jsx";

const RoundPlay = observer(() => {
    const [params] = useSearchParams();
    const roundId = params.get("roundId");
    const roundStore = useRoundStore();
    const navigate = useNavigate();

    const [mode, setMode] = useState("input");
    const [selectedScores, setSelectedScores] = useState({});

    useEffect(() => {
        if (roundId) {
            roundStore.fetchFromId(roundId).then((result) => {
                if(roundStore.strokeRecords[0][`hole${roundStore.inputHole}`]) {
                    setSelectedScores(roundStore.getStroke(roundStore.inputHole));
                }
            });
        }
    }, [roundId]);

    if (!roundStore.isHydrated) return <div>loading...</div>;

    const parList = [
        ...roundStore.golfInfo.frontCourse.holes,
        ...roundStore.golfInfo.backCourse.holes
    ].map(h => h.par);

    const scoreOptions = (hole) => {
        const par = parList[hole - 1];
        return Array.from({ length: par * 2 }, (_, i) => i - par + 1);
    };

    const handleSelect = (playerId, score) => {
        setSelectedScores(prev => ({
            ...prev,
            [playerId]: score,
        }));
    };

    const handleSave = () => {
        roundStore.saveHoleScore(selectedScores).then(() => {setMode("result")});
    };

    const handleModify = (hole) => {
        roundStore.setInputHole(hole);
        const scores = roundStore.getStroke(hole);
        setSelectedScores(scores || {});   // 🔥 이거 추가
        setMode("input");
    }
    const handleNext = () => {
        setSelectedScores({});
        roundStore.nextHole();
        setMode("input");
    };

    const handleFinish = () => {
        roundStore.finish().then(() => {
            navigate("/")
        });
    }

    return (
        <Container>
            <Header>
                {roundStore.golfInfo.golf.name} | {roundStore.golfInfo.type}
            </Header>

            {mode === "input" && (
                <>
                    <HoleInfo>
                        {roundStore.inputHole}번홀 (Par {parList[roundStore.inputHole - 1]})
                    </HoleInfo>
                    <></>
                    {roundStore.players.map(player => (
                        <Row key={player.id}>
                            <Name>{player.name}</Name>
                            <ScoreRow>
                                {scoreOptions(roundStore.inputHole).map(score => (
                                    <ScoreButton
                                        key={score}
                                        selected={selectedScores[player.id] === score}
                                        onClick={() => handleSelect(player.id, score)}
                                    >
                                        {score}
                                    </ScoreButton>
                                ))}
                            </ScoreRow>
                        </Row>
                    ))}
                    <SaveButton onClick={handleSave}>저장</SaveButton>
                </>
            )}

            {mode === "result" && (
                <>
                    <ResultItem item={roundStore.golfInfo} modifyFunc={handleModify} handleNext={handleNext} handleFinish={handleFinish} />
                </>
            )}
        </Container>
    );
});

export default RoundPlay;

/* ================= 스타일 ================= */

const Container = styled.div`
    min-height: 100vh;
    margin-bottom: 70px;
`;

const Header = styled.div`
    text-align: center;
    margin-bottom: 14px;
    color: #888;
`;

const HoleInfo = styled.div`
    text-align: center;
    font-weight: 700;
    font-size: 18px;
    margin-bottom: 16px;
    color: #222;
`;

const Row = styled.div`
    margin-bottom: 16px;
`;

const Name = styled.div`
    margin-bottom: 8px;
    font-weight: 700;
`;

const ScoreRow = styled.div`
    display: flex;
    gap: 4px;
`;

const ScoreButton = styled.button`
    flex: 1;
    min-width: 0;
    height: 36px;
    border-radius: 10px;
    border: none;

    color: ${(p) => (p.selected ? "#fff" : "#666")};
    background: ${(p) => (p.selected ? "#ff7f50" : "#eee")};
`;

const SaveButton = styled.button`
    width: 100%;
    margin-top: 20px;
    height: 48px;
    background: #222;
    color: white;
    border-radius: 14px;
`;