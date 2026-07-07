import React, { useState } from 'react'
import { useRecordStore } from '@/stores/recordStore'
import {
    Card,
    Summary,
    RightBox,
    Score,
    Arrow,
    DetailWrapper,
    Detail, RemoveRecordButton, RemoveRecordButtonRow
} from './styles'
import PlayerScore from "./PlayerScore.jsx";
import {useUserStore} from "@/stores/userStore.js";
import moment from "moment";
import axios from "axios";
import {MODAL_PAYLOAD} from "@/constants/modal.js";
import {useModalStore} from "@/stores/modalStore.js";
import AlertModal from "../Modal/AlertModal.jsx";

export default function RecordItem({ item, modifyFunc }) {
    const [open, setOpen] = useState(false)
    const modalStore = useModalStore();
    const userStore = useUserStore();
    const recordStore = useRecordStore();
    const scoreUserId = ['ALL', 'MY'].includes(recordStore.selectedTab) ? userStore.me.id : parseInt(recordStore.selectedTab);
    const myScore = item.strokeRecords?.find(
        v => v.userId === scoreUserId
    )

    const renderDetail = () => (
        <>
            <Detail>
                {item.strokeRecords.map((stroke, idx) => {
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
                    <span className={'summary-date'}>
                        {` (${moment(item.date).format('YYYY-MM-DD')})`}
                    </span>
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
                modifyFunc ? renderDetail() : <DetailWrapper $open={open}>
                    {renderDetail()}
                    {item.writeUserId === userStore.me.id &&
                        <RemoveRecordButtonRow>
                            <RemoveRecordButton onClick={async () => {
                                modalStore.open(MODAL_PAYLOAD.CONFIRM_MODAL({
                                    component: AlertModal,
                                    props: {
                                        title: '라운드 삭제',
                                        message: '해당기록을 삭제할 경우 복구가 불가능합니다. 진행하시겠습니까?',
                                        data: { step: 1 },
                                        cancelText: '취소',
                                        onConfirm: async () => {
                                            await axios.post('/round/remove', {roundId: item.id, userId: userStore.me.id});
                                            recordStore.clear();
                                            await recordStore.getList(item.type);
                                        },
                                        onCancel: async () => {

                                        }
                                    },
                                }))
                            }}>
                                기록 삭제
                            </RemoveRecordButton>
                        </RemoveRecordButtonRow>
                    }
                </DetailWrapper>
            }


        </Card>
    )
}