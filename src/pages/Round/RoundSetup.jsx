import styled from "styled-components";
import DatePicker from "react-datepicker";
import CardSection from "@/components/CardSection";
import {Container, Button, Select} from "@/styles/common";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useStore} from "@/stores";
import {observer} from "mobx-react";

const RoundSetup = () => {
    const navigate = useNavigate();
    const {roundStore, golfStore} = useStore();
    const [type, setType] = useState("FIELD");
    const [amount, setAmount] = useState(1000);
    const [selectedGolf, setSelectedGolf] = useState(null);
    const [front, setFront] = useState(null);
    const [back, setBack] = useState(null);
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        golfStore.getList().then();
    }, [])
    const handleGolf = (id) => {
        const golf = golfStore.data.find(g => g.id === Number(id));
        setSelectedGolf(golf);
        setFront(null);
        setBack(null);
    };

    const confirm = () => {
        roundStore.setGolfInfo(type, selectedGolf, front, back, amount, date);
        navigate("/round/players");
    };

    return (<Container>

            <CardSection
                title="골프장 / 코스 선택"
                extra={<AddButton onClick={() => console.log("모달 오픈")}>
                    + 등록
                </AddButton>}
            >
                {/* 타입 선택 */}
                <Label>라운드 타입</Label>
                <TypeRow>
                    <TypeButton
                        $active={type === "FIELD"}
                        onClick={() => setType("FIELD")}
                    >
                        필드
                    </TypeButton>
                    <TypeButton
                        $active={type === "SCREEN"}
                        onClick={() => setType("SCREEN")}
                    >
                        스크린
                    </TypeButton>
                </TypeRow>

                {/* 날짜 */}
                <Label>라운드 날짜</Label>

                <DatePickerWrapper>
                    <StyledDatePicker
                        selected={date}
                        onChange={(d) => setDate(d)}
                        dateFormat="yyyy-MM-dd"
                    />
                </DatePickerWrapper>

                {/* 금액 */}
                <Label>타당 금액</Label>
                <Input
                    type="number"
                    placeholder="예: 1000"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />

                {/* 골프장 선택 */}
                <Label>골프장</Label>
                <Select onChange={(e) => handleGolf(e.target.value)}>
                    <option value="">골프장 선택</option>
                    {golfStore.data.map(golf => (<option key={golf.id} value={golf.id}>
                            {golf.name}
                        </option>))}
                </Select>

                {/* 코스 선택 */}
                {selectedGolf && (<>
                        <Label>전반 코스</Label>
                        <CourseRow>
                            {selectedGolf.courses.map(course => (<CourseButton
                                    key={course.id}
                                    onClick={() => setFront(course)}
                                    $active={front?.id === course.id}
                                >
                                    {course.name}
                                </CourseButton>))}
                        </CourseRow>

                        <Label>후반 코스</Label>
                        <CourseRow>
                            {selectedGolf.courses.map(course => (<CourseButton
                                    key={course.id}
                                    onClick={() => setBack(course)}
                                    $active={back?.id === course.id}
                                >
                                    {course.name}
                                </CourseButton>))}
                        </CourseRow>
                    </>)}

                <ButtonWrapper>
                    <Button
                        disabled={!selectedGolf || !front || !back}
                        onClick={confirm}
                    >
                        다음
                    </Button>
                </ButtonWrapper>


            </CardSection>

        </Container>);
};

export default observer(RoundSetup)

const Label = styled.div`
    font-size: 13px;
    margin: 10px 0 6px;
    color: #666;
`;

const TypeRow = styled.div`
    display: flex;
    gap: 8px;
    margin-bottom: 10px;
`;

const TypeButton = styled.button`
    flex: 1;
    padding: 10px;
    border-radius: 10px;
    border: none;

    background: ${({$active}) => ($active ? "#FD5A1E" : "#eee")};
    color: ${({$active}) => ($active ? "#fff" : "#333")};

    font-weight: 600;

    &:active {
        transform: scale(0.95);
    }
`;

const Input = styled.input`
    width: 100%;
    padding: 12px;
    border-radius: 10px;
    border: 1px solid #ddd;
`;

const CourseRow = styled.div`
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 12px;

    -webkit-tap-highlight-color: transparent;
`;

const CourseButton = styled.button`
    padding: 10px 14px;
    border-radius: 20px;
    border: none;

    font-size: 13px;
    font-weight: 500;

    background: ${({$active}) => ($active ? "#FD5A1E" : "#eee")};
    color: ${({$active}) => ($active ? "#fff" : "#333")};

    transition: 0.15s;

    &:active {
        transform: scale(0.95);
    }
`;

const AddButton = styled.div`
    font-size: 12px;
    color: #FD5A1E;
    cursor: pointer;
`;

const DatePickerWrapper = styled.div`
    width: 100%;
`;

const StyledDatePicker = styled(DatePicker)`
    width: 100%;
    padding: 12px;

    border-radius: 10px;
    border: 1px solid #ddd;

    font-size: 14px;
`;

const ButtonWrapper = styled.div`
    margin-top: 10px;
`