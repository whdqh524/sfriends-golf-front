import styled from "styled-components";
import CardSection from "@/components/CardSection";
import {Container, Button} from "@/styles/common";
import {useNavigate} from "react-router-dom";
import {useEffect, useState, useLocation} from "react";
import {useStore} from "../../stores";
import {observer} from "mobx-react";

const PlayerSelect = observer(({userList}) => {
    const navigate = useNavigate();
    const [selected, setSelected] = useState([]);
    const {userStore, roundStore} = useStore();

    useEffect(() => {
        userStore.getAllUsers().then();
    }, [])
    const toggle = (user) => {
        setSelected(prev => prev.find(p => p.id === user.id) ? prev.filter(p => p.id !== user.id) : [...prev, user]);
    };

    const confirm = () => {
        roundStore.setPlayers(selected);
        roundStore.create().then((roundId) => {
            navigate(`/round/play?roundId=${roundId}`);
        })

    };

    return (<Container>
            <CardSection title="플레이어 선택">

                {/* 선택된 유저 */}
                {selected.length > 0 && (<SelectedBox>
                        {selected.map(user => (<SelectedUser key={user.id}>
                                {user.name}
                            </SelectedUser>))}
                    </SelectedBox>)}

                {/* 전체 유저 */}
                <List>
                    {userStore.allUsers.map(user => (<UserItem
                            key={user.id}
                            onClick={() => toggle(user)}
                            $active={!!selected.find(p => p.id === user.id)}
                        >
                            {user.name}
                        </UserItem>))}
                </List>

                <Button
                    disabled={selected.length === 0}
                    onClick={confirm}
                >
                    라운드 시작
                </Button>

            </CardSection>

        </Container>);
});

export default PlayerSelect;

const SelectedBox = styled.div`
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
    margin-bottom: 10px;
`;

const SelectedUser = styled.div`
    background: #1565c0;
    color: #fff;
    padding: 6px 10px;
    border-radius: 20px;
    font-size: 12px;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 32px;
`;

const UserItem = styled.div`
    padding: 12px;
    border-radius: 10px;
    background: ${({$active}) => ($active ? "#1565c0" : "#eee")};
    color: ${({$active}) => ($active ? "#fff" : "#333")};

    font-weight: 500;

    &:active {
        transform: scale(0.97);
    }
`;