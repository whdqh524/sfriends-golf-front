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
} from './styles'

export default function PlayerScore({ stroke, money, item }) {

    const holes = [
        ...item.frontCourse.holes,
        ...item.backCourse.holes
    ]

    const getScoreColor = (stroke, par) => {
        if (stroke === 0) return '#ccc'
        if (stroke < par) return '#1565c0'
        if (stroke > par) return '#d32f2f'
        return '#000'
    }

    const holeData = Array.from({ length: 18 }, (_, i) => ({
        stroke: stroke[`hole${i + 1}`],
        money: money?.[`hole${i + 1}`] ?? 0
    }))

    const sum = (arr, key) =>
        arr.reduce((acc, cur) => acc + (cur[key] || 0), 0)

    const front = holeData.slice(0, 9)
    const back = holeData.slice(9, 18)

    const summary = {
        frontScore: sum(front, 'stroke'),
        backScore: sum(back, 'stroke'),
        totalScore: sum(holeData, 'stroke'),
        frontMoney: sum(front, 'money'),
        backMoney: sum(back, 'money'),
        totalMoney: sum(holeData, 'money'),
    }

    return (
        <PlayerRow>

            <PlayerHeader>
                {stroke.user.name} / 타수 {stroke.score} / (핸디 {stroke.handy})
            </PlayerHeader>

            <HoleGrid>
                {holes.map((hole, idx) => {
                    const data = holeData[idx]

                    return (
                        <Hole key={idx}>
                            <HoleNum>{idx + 1}</HoleNum>
                            <Par>PAR {hole.par}</Par>

                            <Stroke color={getScoreColor(data.stroke, hole.par)}>
                                {data.stroke}
                            </Stroke>

                            <Money positive={data.money > 0}>
                                {data.money}
                            </Money>
                        </Hole>
                    )
                })}
            </HoleGrid>

            <SummaryRow>
                <SumBox>
                    <div>OUT</div>
                    <b>{summary.frontScore}</b>
                    <Money positive={summary.frontMoney > 0}>
                        {summary.frontMoney}
                    </Money>
                </SumBox>

                <SumBox>
                    <div>IN</div>
                    <b>{summary.backScore}</b>
                    <Money positive={summary.backMoney > 0}>
                        {summary.backMoney}
                    </Money>
                </SumBox>

                <SumBox $highlight={true}>
                    <div>TOTAL</div>
                    <b>{summary.totalScore}</b>
                    <Money $positive={summary.totalMoney > 0}>
                        {summary.totalMoney}
                    </Money>
                </SumBox>
            </SummaryRow>

        </PlayerRow>
    )
}