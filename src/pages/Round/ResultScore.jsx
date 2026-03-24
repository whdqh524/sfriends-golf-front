import {
    PlayerRow,
    PlayerHeader,
    HoleGrid,
    Hole,
    HoleNum,
    Par,
    Stroke,
    Money,
    SummaryRow,
    SumBox
} from '@/components/Record/styles'
import {observer} from "mobx-react";
import {useRoundStore} from "@/stores/roundStore.js";

export default observer(({ stroke, money, modifyFunc }) => {
    const roundStore = useRoundStore();
    const holes = [
        ...roundStore.golfInfo.frontCourse.holes,
        ...roundStore.golfInfo.backCourse.holes
    ]

    const getScoreColor = (stroke) => {
        if (stroke === 0) return '#ccc'
        if (stroke < 0) return '#1565c0'
        if (stroke > 0) return '#d32f2f'
        return '#000'
    }

    const holeData = Array.from({ length: 18 }, (_, i) => ({
        par: holes[i].par,
        stroke: stroke[`hole${i + 1}`],
        money: money?.[`hole${i + 1}`] ?? 0
    }))

    const sum = (arr, key) =>
        arr.reduce((acc, cur) => acc + (cur[key] || 0), 0)

    const front = holeData.slice(0, 9)
    const back = holeData.slice(9, 18)

    const summary = {
        frontStrokeScore: sum(front, 'stroke'),
        frontScore: sum(front, 'stroke') + sum(front, 'par'),
        backStrokeScore: sum(back, 'stroke'),
        backScore: sum(back, 'stroke') + sum(back, 'par'),
        totalStrokeScore: sum(holeData, 'stroke'),
        totalScore: sum(holeData, 'stroke') + sum(holeData, 'par'),
        frontMoney: sum(front, 'money'),
        backMoney: sum(back, 'money'),
    }

    return (
        <PlayerRow>

            <PlayerHeader>
                {stroke.user.name} / 타수 {stroke.score} / 핸디 {stroke.handy} ({`${money.handyMoney > 0 ? '+' : ''}${money.handyMoney}`})
            </PlayerHeader>

            <HoleGrid>
                {holes.map((hole, idx) => {
                    const data = holeData[idx]

                    return (
                        <Hole key={idx} onClick={() => {
                            modifyFunc(idx+1)
                        }}>
                            <HoleNum $multiple={roundStore.golfInfo.doubleHole.includes(idx+1)}>{idx + 1}</HoleNum>
                            <Par>PAR {hole.par}</Par>

                            <Stroke $color={getScoreColor(data.stroke)}>
                                {data.stroke}
                            </Stroke>

                            <Money $positive={data.money > 0}>
                                {data.money}
                            </Money>
                        </Hole>
                    )
                })}
            </HoleGrid>

            <SummaryRow>
                <SumBox>
                    <div>OUT</div>
                    <b>{summary.frontScore}({`${summary.frontStrokeScore > 0 ? '+' : '-'}${summary.frontStrokeScore}`})</b>
                    <Money $positive={summary.frontMoney > 0}>
                        <div className={'summary'}>
                            {summary.frontMoney}
                        </div>
                    </Money>
                </SumBox>

                <SumBox>
                    <div>IN</div>
                    <b>{summary.backScore}({`${summary.backStrokeScore > 0 ? '+' : '-'}${summary.backStrokeScore}`})</b>
                    <Money $positive={summary.backMoney > 0}>
                        <div className={'summary'}>
                            {summary.backMoney}
                        </div>
                    </Money>
                </SumBox>

                <SumBox>
                    <div>TOTAL</div>
                    <b>{summary.totalScore}({`${summary.totalStrokeScore > 0 ? '+' : '-'}${summary.totalStrokeScore}`})</b>
                    <Money $positive={money.resultMoney > 0}>
                        <div className={'summary'}>
                            {money.resultMoney}
                        </div>
                    </Money>
                </SumBox>
            </SummaryRow>

        </PlayerRow>
    )
})