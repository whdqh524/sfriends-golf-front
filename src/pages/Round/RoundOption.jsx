import styled from "styled-components";
import CardSection from "@/components/CardSection";
import { Button, Container } from "@/styles/common";
import {useNavigate, useSearchParams} from "react-router-dom";
import { useState } from "react";
import { observer } from "mobx-react";
import { useStore } from "@/stores";

const DEFAULT_OPTIONS = {
    under: false,
    onlyDoublePar: true,
    etc: [],
};

const ETC_OPTIONS = [
    {value: "NearAndLong", name: "니어리스트&롱기스트"},
    {value: "AllSame", name: "전부 동타"}
];

const RoundOption = () => {
    const navigate = useNavigate();
    const { roundStore } = useStore();

    const [options, setOptions] = useState(
        roundStore.options || DEFAULT_OPTIONS
    );

    const setUnder = (value) => {
        setOptions((prev) => ({
            ...prev,
            under: value,
        }));
    };

    const setOnlyDoublePar = (value) => {
        setOptions((prev) => ({
            ...prev,
            onlyDoublePar: value,
        }));
    };

    const toggleEtc = (value) => {
        setOptions((prev) => ({
            ...prev,
            etc: prev.etc.includes(value)
                ? prev.etc.filter((v) => v !== value)
                : [...prev.etc, value],
        }));
    };

    const confirm = () => {
        roundStore.setOptions(options);
        roundStore.create().then((roundId) => {
            navigate(`/round/play?roundId=${roundId}`);
        })
    };

    return (
        <Container>
            <CardSection title="라운드 옵션">
                <Description>
                    이번 라운드에서 사용할 게임 옵션을 선택하세요.
                </Description>

                <Label>언더파 배판</Label>

                <TypeRow>
                    <TypeButton
                        $active={!options.under}
                        onClick={() => setUnder(false)}
                    >
                        미허용(타당+1000)
                    </TypeButton>

                    <TypeButton
                        $active={options.under}
                        onClick={() => setUnder(true)}
                    >
                        허용
                    </TypeButton>
                </TypeRow>

                <Label>오버파 배판</Label>

                <TypeRow>
                    <TypeButton
                        $active={options.onlyDoublePar}
                        onClick={() => setOnlyDoublePar(true)}
                    >
                        더블파만
                    </TypeButton>

                    <TypeButton
                        $active={!options.onlyDoublePar}
                        onClick={() => setOnlyDoublePar(false)}
                    >
                        트리플(더블)보기 이상
                    </TypeButton>
                </TypeRow>

                <Label>추가 옵션</Label>

                <TagRow>
                    {ETC_OPTIONS.map((tag) => (
                        <TagButton
                            key={tag.value}
                            $active={options.etc.includes(tag.value)}
                            onClick={() => toggleEtc(tag.value)}
                        >
                            {tag.name}
                        </TagButton>
                    ))}
                </TagRow>

                <ButtonWrapper>
                    <Button onClick={confirm}>
                        다음
                    </Button>
                </ButtonWrapper>
            </CardSection>
        </Container>
    );
};

export default observer(RoundOption);

const Description = styled.div`
    font-size: 13px;
    color: #777;
    margin-bottom: 16px;
    line-height: 1.5;
`;

const Label = styled.div`
    font-size: 13px;
    color: #666;
    margin: 14px 0 8px;
    font-weight: 600;
`;

const TypeRow = styled.div`
    display: flex;
    gap: 10px;
    margin-bottom: 18px;
`;

const TypeButton = styled.button`
    flex: 1;
    padding: 12px;

    border: none;
    border-radius: 10px;

    font-size: 14px;
    font-weight: 600;

    background: ${({ $active }) => ($active ? "#FD5A1E" : "#eee")};
    color: ${({ $active }) => ($active ? "#fff" : "#333")};

    transition: 0.15s;

    &:active {
        transform: scale(0.96);
    }
`;

const TagRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 6px;
`;

const TagButton = styled.button`
    padding: 9px 16px;

    border-radius: 999px;
    border: 1px solid
        ${({ $active }) => ($active ? "#FD5A1E" : "#ddd")};

    background: ${({ $active }) => ($active ? "#FD5A1E" : "#fff")};

    color: ${({ $active }) => ($active ? "#fff" : "#666")};

    font-size: 13px;
    font-weight: 500;

    transition: 0.15s;

    &:active {
        transform: scale(0.96);
    }
`;

const ButtonWrapper = styled.div`
    margin-top: 24px;
`;