import styled from 'styled-components'

export const Card = styled.div`
    background: #fff;
    border-radius: 12px;
    padding: 14px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
`

export const Summary = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
`

export const RightBox = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`

export const Score = styled.div`
    font-size: 18px;
    font-weight: 700;
    color: #FD5A1E;
`

/* 🔥 화살표 (회전 + 클릭감) */
export const Arrow = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    transition: transform 0.25s ease;
    transform: ${({ $open }) => ($open ? 'rotate(180deg)' : 'rotate(0deg)')};

    font-size: 14px;
    color: #999;
`

/* 🔥 아코디언 (핵심 수정) */
export const DetailWrapper = styled.div`
    overflow: hidden;
    transition: max-height 0.3s ease;

    max-height: ${({ $open }) => ($open ? '2000px' : '0')};
`

export const Detail = styled.div`
    margin-top: 12px;
    border-top: 1px solid #eee;
    padding-top: 12px;
    padding-bottom: 8px;
`

export const PlayerRow = styled.div`
    margin-bottom: 16px;
`

export const PlayerHeader = styled.div`
    font-size: 13px;
    font-weight: 600;
    margin-bottom: 8px;
    color: #333;
`

/* 🔥 핵심: 가로 overflow 대응 */
export const HoleGrid = styled.div`
    display: grid;
    gap: 6px;

    /* 모바일: 2줄 (9 + 9) */
    grid-template-columns: repeat(9, minmax(28px, 1fr));

    /* PC: 한 줄 */
    @media (min-width: 768px) {
        grid-template-columns: repeat(18, minmax(32px, 1fr));
    }
`

export const Hole = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    padding: 6px 0px;
    border-radius: 6px;
    background: #f8f8f8;

    min-width: 0; /* 🔥 overflow 방지 핵심 */
`

export const HoleNum = styled.div`
    font-size: 10px;
    color: #999;
`

export const Par = styled.div`
    font-size: 10px;
    color: #bbb;
`

export const Stroke = styled.div`
    font-size: 14px;
    font-weight: 700;
    color: ${({ color }) => color};
`

export const Money = styled.div`
    font-size: 10px;
    color: ${({ $positive }) =>
            $positive ? '#1565c0' : '#d32f2f'};
`

/* 🔥 합계 영역 */
export const SummaryRow = styled.div`
    display: flex;
    gap: 8px;
    margin-top: 12px;
`

export const SumBox = styled.div`
    flex: 1;
    text-align: center;
    padding: 8px;
    border-radius: 8px;

    font-size: 12px;
    font-weight: 600;

    background: ${({ $highlight }) =>
            $highlight ? '#FD5A1E' : '#f5f5f5'};

    color: ${({ $highlight }) =>
            $highlight ? '#fff' : '#333'};
`