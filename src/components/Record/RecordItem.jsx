import { useState } from 'react'
import { useRecordStore } from '@/stores/recordStore'
import {
    Card,
    Summary,
    RightBox,
    Score,
    Arrow,
    DetailWrapper,
    Detail
} from './styles'
import PlayerScore from "./PlayerScore.jsx";
import {useUserStore} from "@/stores/userStore.js";

export default function RecordItem({ item, modifyFunc }) {
    const [open, setOpen] = useState(false)
    const recordStore = useRecordStore();
    const userStore = useUserStore();
    const myScore = item.strokeRecords?.find(
        v => v.userId === userStore.me.id
    )

    const renderDetail = () => (
        <>
            <Detail>
                {item.strokeRecords.map((stroke, idx) => {
                    const money = item.moneyRecords.find(
                        m => m.userId === stroke.userId
                    )

                    return (
                        <PlayerScore
                            key={stroke.userId}
                            stroke={stroke}
                            money={item.moneyRecords[idx]}
                            item={item}
                        />
                    )
                })}
            </Detail>
        </>
    )
    return (
        <Card>

            {/* 🔥 헤더 */}
            <Summary onClick={() => setOpen(!open)}>

                <div>
                    {item.golf.name}
                </div>

                <RightBox>
                    <Score>
                        {myScore ? myScore.score : '-'}
                    </Score>

                    <Arrow $open={open}>
                        ▼
                    </Arrow>
                </RightBox>

            </Summary>

            {/* 🔥 아코디언 */}
            {
                modifyFunc ? renderDetail() : <DetailWrapper $open={open}>{renderDetail()}</DetailWrapper>
            }


        </Card>
    )
}