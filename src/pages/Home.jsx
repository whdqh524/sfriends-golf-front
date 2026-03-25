import styled from 'styled-components';
import CardSection from "@/components/CardSection";
import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {observer} from "mobx-react";
import {useUserStore} from "@/stores/userStore.js";
import moment from "moment";
import {useModalStore} from "@/stores/modalStore.js";
import {MODAL_PAYLOAD} from "@/constants/modal.js";
import UpdatePasswordModal from "@/components/Modal/UpdatePasswordModal.jsx";
import AlertModal from "@/components/Modal/AlertModal.jsx";
import {useRoundStore} from "../stores/roundStore.js";

const Home = observer(() => {
    const [tab, setTab] = useState('FIELD')
    const navigate = useNavigate()
    const userStore = useUserStore();
    const modalStore = useModalStore();
    const roundStore = useRoundStore();
    useEffect(() => {
        const fetchData = () => {
            userStore.getCurrentRecord().then(() => {
                clickTab('FIELD');

                if (userStore.rounding) {
                    modalStore.open(MODAL_PAYLOAD.ALERT_MODAL({
                        component: AlertModal,
                        props: {
                            title: '라운드 진행',
                            message: '진행중인 라운드가 있습니다. 이어하시겠습니까?',
                            data: { step: 1 },
                            cancelText: '취소',
                            onConfirm: async () => {
                                navigate(`/round/play?roundId=${userStore.rounding.id}`);
                            },
                        },
                    }))
                }
            });

            userStore.getAllUsers().then();
        };

        fetchData();

        window.addEventListener("focus", fetchData);

        return () => {
            window.removeEventListener("focus", fetchData);
        };
    }, []);

    const clickTab = (value) => {
        setTab(value);
        userStore.setShowRecord(value);
    }

    return (<Container>

        {/* 프로필 */}
        <CardSection>
            <ProfileRow>
                <Avatar/>
                <UserInfo>
                    <Name>{userStore.me?.name}</Name>
                </UserInfo>
                <UpdatePassword onClick={()=>{
                    modalStore.open(MODAL_PAYLOAD.UPDATE_USER_MODAL({
                        component: UpdatePasswordModal,
                        props: {
                            data: { step: 1 },
                            onConfirm: async () => {
                                if (userStore.updateModal.newPassword !== userStore.updateModal.confirmPassword) {
                                    modalStore.open(MODAL_PAYLOAD.ALERT_MODAL({
                                        component: AlertModal,
                                        props: {
                                            message: `비밀번호 확인이 일치하지 않습니다.`,
                                        },
                                    }))
                                    return false;
                                }
                                try {
                                    await userStore.updatePassword();
                                } catch (e) {
                                    console.error(e.message);
                                    const errorMessage = e.response.data.code === 400 ? 'a' : 'b';
                                    modalStore.open(MODAL_PAYLOAD.ALERT_MODAL({
                                        component: AlertModal,
                                        props: {
                                            message: errorMessage,
                                        },
                                    }))
                                }

                            }
                        },
                    }),)
                }}>비밀번호 변경</UpdatePassword>
            </ProfileRow>
        </CardSection>

        {/* 액션 */}
        <CardSection>
            <ActionRow>
                <ActionButton $primary={"true"} onClick={() => {
                    navigate('/round/setup', {state: {type: 'FIELD'}});
                }}>필드 라운딩</ActionButton>
                <ActionButton onClick={() => {
                    navigate('/round/setup', {state: {type: 'SCREEN'}});
                }}>스크린 라운딩</ActionButton>
            </ActionRow>
        </CardSection>

        {/* 핸디 */}
        <CardSection title={'핸디'}>
            <HandicapRow>
                <Stat>
                    <Label>필드 핸디</Label>
                    <Value color="#2e7d32">{userStore.me?.fieldHandy}</Value>
                </Stat>

                <Divider/>

                <Stat>
                    <Label>스크린 핸디</Label>
                    <Value color="#1565c0">{userStore.me?.screenHandy}</Value>
                </Stat>
            </HandicapRow>
            <UserHandyList>
                {
                    userStore.allUsers.filter(user => user.id !== userStore.me?.id).map((user, idx) => (
                        <UserHandyItem key={idx}>
                            <div><span>{user.name}</span></div>
                            <UserHandyGroup>
                                <UserHandyValue color="#2e7d32">{user.fieldHandy}</UserHandyValue>
                                <UserHandyValue color="#1565c0">{user.screenHandy}</UserHandyValue>
                            </UserHandyGroup>
                        </UserHandyItem>
                    ))
                }
            </UserHandyList>
        </CardSection>

        {/* 최근 라운드 */}
        <CardSection
            title="최근 라운드"
            extra={<MoreButton onClick={() => {
                recordStore.setLoading(true);
                navigate(`/${tab}`)}
            }>
                더보기
            </MoreButton>}
        >
            <TabRow>
                <Tab $active={tab === 'FIELD'} onClick={() => clickTab('FIELD')}>
                    필드
                </Tab>
                <Tab $active={tab === 'SCREEN'} onClick={() => clickTab('SCREEN')}>
                    스크린
                </Tab>
            </TabRow>
            <RoundList>
                {
                    userStore.showRecords?.map((round, idx) => (<RoundItem key={idx}>
                        <div><span>{round.golf.name}</span>  ({moment(round.date).format('YYYY-MM-DD')})</div>
                        <Score>{round.strokeRecords.find(data => data.userId === userStore.me?.id).score}</Score>
                    </RoundItem>))
                }
                {/*<MoreRow onClick={() => navigate(`/${tab}`)}>*/}
                {/*    더보기 →*/}
                {/*</MoreRow>*/}
            </RoundList>
        </CardSection>
    </Container>);
});

export default Home;

const Container = styled.div`
    padding: 16px 0;
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 90px;
    
    @media (min-width: 1024px) {
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
const UpdatePassword = styled.div`
    text-decoration-line: underline;
    font-size: 14px;
    margin-left: auto;
`

const Name = styled.div`
    font-size: 20px;
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
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
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
    padding: 5px 0;
    
    span {
        font-weight: 500;
    }
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

    background: ${({$primary}) => ($primary ? '#FD5A1E' : '#eee')};
    color: ${({$primary}) => ($primary ? '#fff' : '#333')};

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

    background: ${({$active}) => ($active ? '#FD5A1E' : '#eee')};
    color: ${({$active}) => ($active ? '#fff' : '#666')};

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

const UserHandyList = styled.div`
    display: flex;
    flex-direction: column;
`

const UserHandyItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    margin: 0 30px;
    & + & {
        border-top: 1px solid #eee;
    }
    

    span {
        font-weight: 400;
    }
`

const UserHandyGroup = styled.div`
    display: flex;
    gap: 12px;
    align-items: center;
`;

const UserHandyValue = styled.div`
    padding: 7px 0;
    width: 20px;
    color: ${({color}) => color};
`

const RoundList = styled.div`
    display: flex;
    flex-direction: column;
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