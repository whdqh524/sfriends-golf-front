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

export default function RecordItem({ item }) {
    const [open, setOpen] = useState(false)
    const recordStore = useRecordStore();
    const userStore = useUserStore();
    const myScore = item.strokeRecords?.find(
        v => v.userId === userStore.me.id
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
            <DetailWrapper $open={open}>
                <Detail>
                    {item.strokeRecords.map((stroke) => {
                        const money = item.moneyRecords.find(
                            m => m.userId === stroke.userId
                        )

                        return (
                            <PlayerScore
                                key={stroke.userId}
                                stroke={stroke}
                                money={money}
                                item={item}
                            />
                        )
                    })}
                </Detail>
            </DetailWrapper>

        </Card>
    )
}