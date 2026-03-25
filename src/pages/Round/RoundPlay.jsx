import {useNavigate, useSearchParams} from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useRoundStore } from "@/stores/roundStore.js";
import { observer } from "mobx-react";
import {
    DndContext,
    closestCenter,
    useSensor,
    useSensors,
    MouseSensor,
    TouchSensor
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
    SortableContext,
    verticalListSortingStrategy,
    useSortable,
    arrayMove
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";
import ResultItem from "@/pages/Round/ResultItem.jsx";

const RoundPlay = observer(() => {
    const [params] = useSearchParams();
    const roundId = params.get("roundId");
    const roundStore = useRoundStore();
    const navigate = useNavigate();

    const [mode, setMode] = useState("input");
    const [selectedScores, setSelectedScores] = useState({});

    const [players, setPlayers] = useState([]);

    useEffect(() => {
        setPlayers(roundStore.players);
    }, [roundStore.players]);

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
        window.scrollTo({
            top: 0,
            behavior: "smooth", // 부드럽게 이동
        });
    };

    const handleFinish = () => {
        roundStore.finish().then(() => {
            navigate("/")
        });
    }

    const sensors = useSensors(
        useSensor(MouseSensor), // PC
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 200,      // 200ms 누르면 드래그 시작
                tolerance: 5,    // 살짝 움직이는 건 스크롤로 처리
            },
        })
    );

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (!over) return;

        if (active.id !== over.id) {
            const oldIndex = players.findIndex(p => p.id === active.id);
            const newIndex = players.findIndex(p => p.id === over.id);

            roundStore.setPlayers(arrayMove(players, oldIndex, newIndex));
        }
    };

    const SortableRow = ({ player, children }) => {
        const {
            attributes,
            listeners,
            setNodeRef,
            transform,
            transition,
        } = useSortable({ id: player.id });

        const style = {
            transform: CSS.Transform.toString(transform),
            transition,
        };

        return (
            <Row ref={setNodeRef} style={style}>
                <TopRow>
                    <DragHandle {...attributes} {...listeners}>
                        ☰
                    </DragHandle>
                    <Name>{player.name}</Name>
                </TopRow>

                {children}
            </Row>
        );
    };

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
                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd} modifiers={[restrictToVerticalAxis]}>
                        <SortableContext
                            items={roundStore.players.map(p => p.id)}
                            strategy={verticalListSortingStrategy}
                        >
                            {roundStore.players.map(player => (
                                <SortableRow key={player.id} player={player}>
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
                                </SortableRow>
                            ))}
                        </SortableContext>
                    </DndContext>
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
    touch-action: pan-y;  /* 세로 스크롤 허용 */
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

const DragHandle = styled.div`
    cursor: grab;
    touch-action: none;  /* 🔥 중요 */
    margin-bottom: 6px;
`;

const TopRow = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;