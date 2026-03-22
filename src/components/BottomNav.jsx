import styled from 'styled-components'
import { GiGolfFlag } from 'react-icons/gi'
import { MdOutlineMonitor } from 'react-icons/md'
import {FaMapMarkedAlt, FaDesktop} from 'react-icons/fa'
import {useLocation, useNavigate} from 'react-router-dom'
import { MdDashboard } from 'react-icons/md'
import {useRecordStore} from "@/stores/recordStore.js";

export default function BottomNav() {
    const navigate = useNavigate()
    const location = useLocation()
    const recordStore = useRecordStore();
    const isActive = (path) => location.pathname === path

    return (<NavWrapper>

            <NavItem
                $active={isActive('/field')}
                onClick={() => {
                    recordStore.clear();
                    navigate('/field')}
                }
                >
                <GiGolfFlag size={30}/>
                <span>필드</span>
            </NavItem>

            <HomeButton onClick={() => navigate('/')}>
                <InnerCircle>
                    <MdDashboard size={35}/>
                </InnerCircle>
            </HomeButton>

            <NavItem
                $active={isActive('/screen')}
                onClick={() => {
                    recordStore.clear();
                    navigate('/screen')}
                }
            >
                <MdOutlineMonitor size={30}/>
                <span>스크린</span>
            </NavItem>

        </NavWrapper>)
}

const NavWrapper = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;

    width: 100%;
    height: 70px;

    /* iOS 스타일 */
    background: rgba(0, 0, 0, 0.85);
    backdrop-filter: blur(10px);

    display: flex;
    justify-content: space-around;
    align-items: center;

    padding-bottom: env(safe-area-inset-bottom);

    z-index: 100;
`

const NavItem = styled.div`
    flex: 1;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    gap: 4px;
    font-size: 11px;

    cursor: pointer;

    color: ${({$active}) => ($active ? '#FD5A1E' : '#aaa')};

    transition: all 0.2s ease;

    svg {
        transform: ${({$active}) => ($active ? 'scale(1.2)' : 'scale(1)')};
        transition: transform 0.2s ease;
    }

    span {
        font-size: 11px;
    }

    &:active {
        transform: scale(0.95);
    }
`

const HomeButton = styled.div`
    position: absolute;
    top: -30px;

    width: 80px;
    height: 80px;

    border-radius: 50%;

    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;

    /* 부드러운 떠있는 느낌 */
    animation: float 3s ease-in-out infinite;

    @keyframes float {
        0% {
            transform: translateY(0px);
        }
        50% {
            transform: translateY(-4px);
        }
        100% {
            transform: translateY(0px);
        }
    }
`

const InnerCircle = styled.div`
    width: 70px;
    height: 70px;

    background: white;
    border-radius: 50%;

    display: flex;
    justify-content: center;
    align-items: center;

    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3),
    0 0 0 4px rgba(253, 90, 30, 0.2);

    transition: all 0.2s ease;

    &:active {
        transform: scale(0.9);
    }
`