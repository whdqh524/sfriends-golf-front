import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import styled from "styled-components";
import {useRoundStore} from "../../stores/roundStore.js";

const RoundPlay = observer(() => {
    const [params] = useSearchParams();
    const roundId = params.get("roundId");
    const roundStore = useRoundStore();

    useEffect(() => {
        if(roundId) {
            roundStore.fetchFromId(roundId);
        }
    }, []);

    if (!roundStore.isHydrated) return <div>loading...</div>;

    return (<Container>
            <Header>
                {roundStore.golfInfo.name} | {roundStore.golfInfo.type}
            </Header>

            <Hole>{roundStore.currentHole}번 홀</Hole>

            {round.players.map(player => (<Row key={player.id}>
                    <Name>{player.name}</Name>

                    <ScoreRow>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(score => (<ScoreButton key={score}>
                                {score}
                            </ScoreButton>))}
                    </ScoreRow>
                </Row>))}
        </Container>);
});

export default RoundPlay;

const Container = styled.div`
    padding: 16px;
`;

const Header = styled.div`
    font-size: 14px;
    color: #666;
    margin-bottom: 10px;
`;

const Hole = styled.div`
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 16px;
`;

const Row = styled.div`
    margin-bottom: 16px;
`;

const Name = styled.div`
    margin-bottom: 6px;
    font-weight: 600;
`;

const ScoreRow = styled.div`
    display: flex;
    gap: 8px;
    overflow-x: auto;
`;

const ScoreButton = styled.button`
    min-width: 44px;
    height: 44px;
    border-radius: 10px;
    border: none;

    background: #eee;

    &:active {
        transform: scale(0.9);
    }
`;