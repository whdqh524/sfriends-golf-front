import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {useGolfStore} from "../../stores/golfStore.js";

const SaveGolfModal = ({ data }) => {
    const golfStore = useGolfStore();
    const isEdit = data?.mode === "edit";
    const golf = data?.golf;

    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [courses, setCourses] = useState([]);

    /* ================= 변환 ================= */

    const convertHolesArrayToObject = (holesArray = []) => {
        const result = {};
        holesArray.forEach((h) => {
            result[h.number] = h.par;
        });
        return result;
    };

    const convertHolesObjectToArray = (holesObj = {}, courseId, golfId) => {
        return Object.keys(holesObj).map((key) => ({
            number: Number(key),
            par: holesObj[key],
            courseId,
            golfId,
        }));
    };

    /* ================= 초기값 ================= */

    useEffect(() => {
        if (isEdit && golf) {
            setName(golf.name);
            setLocation(golf.location);

            setCourses(
                golf.courses.map((c) => ({
                    id: c.id,
                    name: c.name,
                    holes: convertHolesArrayToObject(c.holes), // ✅ 핵심 수정
                }))
            );
        } else {
            setName("");
            setLocation("");
            setCourses([]);
        }
    }, [golf]);

    /* ================= 유틸 ================= */

    const createEmptyHoles = () => {
        const holes = {};
        for (let i = 1; i <= 9; i++) {
            holes[i] = 0;
        }
        return holes;
    };

    /* ================= 코스 관리 ================= */

    const addCourse = () => {
        setCourses((prev) => [
            ...prev,
            {
                name: "",
                holes: createEmptyHoles(),
            },
        ]);
    };

    const updateCourse = (index, data) => {
        setCourses((prev) =>
            prev.map((c, i) => (i === index ? { ...c, ...data } : c))
        );
    };

    const updateHole = (index, holeNumber, value) => {
        setCourses((prev) =>
            prev.map((c, i) => {
                if (i !== index) return c;

                return {
                    ...c,
                    holes: {
                        ...c.holes,
                        [holeNumber]: Number(value),
                    },
                };
            })
        );
    };

    const removeCourse = (index) => {
        setCourses((prev) => prev.filter((_, i) => i !== index));
    };

    /* ================= 부모 전달 ================= */

    useEffect(() => {
        const transformedCourses = courses.map((c) => ({
            ...c,
            holes: convertHolesObjectToArray(
                c.holes,
                c.id,
                golf?.id
            ), // ✅ 서버 형식으로 복구
        }));

        golfStore.setRegisterInfo({
            id: golf?.id,
            name,
            location,
            courses: transformedCourses,
            mode: isEdit ? "edit" : "create",
        });
    }, [name, location, courses]);

    /* ================= UI ================= */

    return (
        <Wrapper>
            <Label>골프장 이름</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />

            <Label>위치</Label>
            <Input value={location} onChange={(e) => setLocation(e.target.value)} />

            <Label>코스</Label>

            {courses.map((course, index) => (
                <Card key={course.id ?? index}>
                    <CourseHeader>
                        <CourseName
                            placeholder="코스 이름 (IN / OUT)"
                            value={course.name}
                            onChange={(e) =>
                                updateCourse(index, { name: e.target.value })
                            }
                        />
                        <RemoveButton onClick={() => removeCourse(index)}>
                            삭제
                        </RemoveButton>
                    </CourseHeader>

                    <HoleGrid>
                        {Object.keys(course.holes).map((hole) => (
                            <HoleBox key={hole}>
                                <HoleLabel>{hole}</HoleLabel>
                                <HoleInput
                                    type="number"
                                    min={1}
                                    max={6}
                                    value={course.holes[hole]}
                                    onChange={(e) =>
                                        updateHole(index, hole, e.target.value)
                                    }
                                />
                            </HoleBox>
                        ))}
                    </HoleGrid>
                </Card>
            ))}

            <AddCourse onClick={addCourse}>+ 코스 추가</AddCourse>
        </Wrapper>
    );
};

export default SaveGolfModal;

/* ================= 스타일 ================= */

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const Label = styled.div`
    font-size: 14px;
    font-weight: 600;
`;

const Input = styled.input`
    height: 44px;
    border-radius: 10px;
    border: 1px solid #ddd;
    padding: 0 12px;
`;

const Card = styled.div`
    border: 1px solid #eee;
    border-radius: 12px;
    padding: 12px;
`;

const CourseHeader = styled.div`
    display: flex;
    gap: 8px;
    margin-bottom: 10px;
    align-items: center;
`;

const CourseName = styled.input`
    flex: 1;
    height: 36px;
    border-radius: 8px;
    border: 1px solid #ddd;
    padding: 0 10px;
`;

const RemoveButton = styled.div`
    font-size: 12px;
    color: red;
    cursor: pointer;
`;

const HoleGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
`;

const HoleBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const HoleLabel = styled.div`
    font-size: 12px;
`;

const HoleInput = styled.input`
    width: 100%;
    height: 34px;
    text-align: center;
    border-radius: 6px;
    border: 1px solid #ddd;
`;

const AddCourse = styled.div`
    height: 44px;
    border: 1px dashed #fd5a1e;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fd5a1e;
    cursor: pointer;
`;