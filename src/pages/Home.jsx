import styled from 'styled-components';
import Button from "@/components/Button";
import CardSection from "@/components/CardSection";
import {theme} from "@/styles/theme";
import React from "react";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {Link} from "react-router-dom";
import {observer} from "mobx-react";
import {useUserStore} from "../stores/userStore.js";

const Home = observer(() => {
    const [tab, setTab] = useState('field')
    const navigate = useNavigate()
    const userStore = useUserStore();

    const fieldRounds = [{name: '한양CC', score: 82}, {name: '남서울CC', score: 79},]

    const screenRounds = [{name: '골프존 판교', score: 76}, {name: '카카오VX', score: 74},]

    const rounds = tab === 'field' ? fieldRounds : screenRounds

    return (<Container>

        {/* 프로필 */}
        <CardSection>
            <ProfileRow>
                <Avatar/>
                <UserInfo>
                    <Name>홍길동</Name>
                </UserInfo>
            </ProfileRow>
        </CardSection>

        {/* 핸디 */}
        <CardSection title={'핸디'}>
            <HandicapRow>
                <Stat>
                    <Label>필드 핸디</Label>
                    <Value color="#2e7d32">12.3</Value>
                </Stat>

                <Divider/>

                <Stat>
                    <Label>스크린 핸디</Label>
                    <Value color="#1565c0">8.7</Value>
                </Stat>
            </HandicapRow>
        </CardSection>

        {/* 최근 라운드 */}
        <CardSection
            title="최근 라운드"
            extra={<MoreButton onClick={() => navigate('/rounds')}>
                더보기
            </MoreButton>}
        >
            <TabRow>
                <Tab active={tab === 'field'} onClick={() => setTab('field')}>
                    필드
                </Tab>
                <Tab active={tab === 'screen'} onClick={() => setTab('screen')}>
                    스크린
                </Tab>
            </TabRow>
            <RoundList>
                {rounds.map((round, idx) => (<RoundItem key={idx}>
                        <div>{round.name}</div>
                        <Score>{round.score}</Score>
                    </RoundItem>))}

                <MoreRow onClick={() => navigate(`/${tab}`)}>
                    더보기 →
                </MoreRow>
            </RoundList>
        </CardSection>

        {/* 액션 */}
        <CardSection>
            <ActionRow>
                <ActionButton primary>라운드 추가</ActionButton>
                <ActionButton>기록 보기</ActionButton>
            </ActionRow>
        </CardSection>

    </Container>);
});

export default Home;

const Container = styled.div`
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;

    @media (min-width: 768px) {
        max-width: 700px;
        margin: 0 auto;
        padding: 24px;
    }
`

/* 프로필 */
const ProfileRow = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`

const Avatar = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #ddd;
`

const UserInfo = styled.div``

const Name = styled.div`
    font-size: 16px;
    font-weight: 600;
`

const SubText = styled.div`
    font-size: 12px;
    color: #888;
`

/* 핸디 */
const HandicapRow = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
`

const Stat = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 10px;
`

const Label = styled.div`
    font-size: 12px;
    color: #888;
`

const Value = styled.div`
    font-size: 20px;
    font-weight: 700;
    color: ${({color}) => color};
`

const Divider = styled.div`
    width: 1px;
    height: 30px;
    background: #eee;
`

/* 라운드 */
const RoundItem = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 14px;
`

const Score = styled.div`
    font-weight: 600;
`

/* 액션 */
const ActionRow = styled.div`
    display: flex;
    gap: 10px;
`

const ActionButton = styled.button`
    flex: 1;
    padding: 12px;

    border-radius: 10px;
    border: none;

    font-weight: 600;
    cursor: pointer;

    background: ${({primary}) => (primary ? '#FD5A1E' : '#eee')};
    color: ${({primary}) => (primary ? '#fff' : '#333')};

    &:active {
        transform: scale(0.96);
    }
`

const TabRow = styled.div`
    display: flex;
    gap: 8px;
`

const Tab = styled.div`
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 12px;

    cursor: pointer;

    background: ${({active}) => (active ? '#FD5A1E' : '#eee')};
    color: ${({active}) => (active ? '#fff' : '#666')};

    transition: 0.2s;

    &:active {
        transform: scale(0.95);
    }
`

const MoreButton = styled.div`
    font-size: 12px;
    color: #888;
    cursor: pointer;

    &:hover {
        color: #000;
    }
`

const RoundList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const MoreRow = styled.div`
    margin-top: 6px;
    padding-top: 10px;

    text-align: center;
    font-size: 13px;
    font-weight: 500;

    color: #888;
    cursor: pointer;

    border-top: 1px solid #eee;

    transition: 0.2s;

    &:hover {
        color: #000;
    }

    &:active {
        transform: scale(0.98);
    }
`