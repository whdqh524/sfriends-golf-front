const createModalPayload =
    (baseProps = {}) =>
        ({ component: ContentComponent, props = {} } = {}) => ({
            component: ContentComponent,
            props: {
                ...baseProps,
                ...props,
            },
        });

const BASE_MODAL_PROPS = {
    type: "modal",
    width: 700,
    title: "베이스 모달",
    maxHeight: "80vh",
    confirmText: "확인",
};

const BASE_CONFIRM_PROPS = {
    type: "confirm",
    title: "확인 모달",
    confirmText: "확인",
    cancelText: "취소",
};

export const MODAL_PAYLOAD = {
    UPDATE_USER_MODAL: createModalPayload({
        ...BASE_MODAL_PROPS,
        title: '비밀번호 변경',
        confirmText: "저장"
    }),

    ROUND_START_MODAL: createModalPayload({
        ...BASE_MODAL_PROPS,
        title: '라운드 시작',
        confirmText: "시작"
    }),

    ALERT_MODAL: createModalPayload({
        ...BASE_MODAL_PROPS,
        title: "알림 모달",
    }),
};

export const CONFIRM_PAYLOAD = {
    REGISTER_MODAL: createModalPayload({
        ...BASE_CONFIRM_PROPS,
        width: 400,
        title: "등록 모달",
        confirmText: "저장",
    }),



    DELETE_CONFIRM: createModalPayload({
        ...BASE_CONFIRM_PROPS,
        title: "삭제 모달",
        message: "선택한 항목을 삭제하시겠습니까?",
        confirmText: "삭제",
    }),

    INPUT_CONFIRM: createModalPayload({
        ...BASE_CONFIRM_PROPS,
        title: "입력 모달",
        message: "입력 내용을 확인해주세요.",
        confirmText: "저장",
    }),
};
