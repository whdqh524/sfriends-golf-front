import styled from "styled-components";

const BUTTON_STYLES = {
    disable: {
        bgColor: {
            fill: "var(--disabled-bg-colored, #F5F5F5)",
            outline: "var(--disabled-bg-no-color, #FAFAFA)",
        },
        borderColor: {
            fill: "#F5F5F5",
            outline: "#C8C8C8",
        },
    },
    xs: {
        lineHeight: "16px",
        padding: "0 8px",
        height: "28px",
        fontSize: "12px",
        fontWeight: 400,
        bgColor: {
            fill: "#C86733",
            outline: "#fff",
        },
        hoverBgColor: {
            fill: "#AC4B25",
            outline: "#fff",
        },
        border: {
            fill: "#C86733",
            outline: "#C8C8C8",
        },
        hoverBorderColor: {
            fill: "#AC4B25",
            outline: "#282828",
        },
        textColor: {
            fill: "#fff",
            outline: "#262626",
        },
    },
    s: {
        lineHeight: "16px",
        padding: "0 12px",
        height: "32px",
        fontSize: "12px",
        fontWeight: 400,
        bgColor: {
            fill: "#C86733",
            outline: "#fff",
        },
        hoverBgColor: {
            fill: "#AC4B25",
            outline: "#fff",
        },
        border: {
            fill: "#C86733",
            outline: "#C8C8C8",
        },
        hoverBorderColor: {
            fill: "#AC4B25",
            outline: "#282828",
        },
        textColor: {
            fill: "#fff",
            outline: "#262626",
        },
    },
    m: {
        lineHeight: "18px",
        padding: "0 16px",
        height: "36px",
        fontSize: "13px",
        fontWeight: 400,
        bgColor: {
            fill: "#C86733",
            outline: "#fff",
        },
        hoverBgColor: {
            fill: "#AC4B25",
            outline: "#fff",
        },
        border: {
            fill: "#C86733",
            outline: "#C8C8C8",
        },
        hoverBorderColor: {
            fill: "#AC4B25",
            outline: "#282828",
        },
        textColor: {
            fill: "#fff",
            outline: "#262626",
        },
    },
    l: {
        lineHeight: "20px",
        padding: "0 20px",
        height: "40px",
        fontSize: "20px",
        fontWeight: 500,
        bgColor: {
            fill: "#C86733",
            outline: "#fff",
        },
        hoverBgColor: {
            fill: "#AC4B25",
            outline: "#fff",
        },
        border: {
            fill: "#C86733",
            outline: "#C8C8C8",
        },
        hoverBorderColor: {
            fill: "#AC4B25",
            outline: "#282828",
        },
        textColor: {
            fill: "#fff",
            outline: "#262626",
        },
    },
    xl: {
        lineHeight: "20px",
        padding: "0 24px",
        height: "44px",
        fontSize: "14px",
        fontWeight: 500,
        bgColor: {
            fill: "#C86733",
            outline: "#fff",
        },
        hoverBgColor: {
            fill: "#AC4B25",
            outline: "#fff",
        },
        border: {
            fill: "#C86733",
            outline: "#C8C8C8",
        },
        hoverBorderColor: {
            fill: "#AC4B25",
            outline: "#282828",
        },
        textColor: {
            fill: "#fff",
            outline: "#262626",
        },
    },
};

const Button = ({ type, size, text, onClickFunc, className }) => {
    return (
        <StyledButton
            onClick={onClickFunc}
            $type={type}
            $size={size}
            className={className}
        >
            {text}
        </StyledButton>
    );
};

const StyledButton = styled.button`
    //width: 100%;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    padding: ${(props) => BUTTON_STYLES[props.$size].padding};
    height: ${(props) => BUTTON_STYLES[props.$size].height};
    font-size: ${(props) => BUTTON_STYLES[props.$size].fontSize};
    border: 1px solid
        ${(props) => BUTTON_STYLES[props.$size].border[props.$type]};
    background-color: ${(props) =>
    BUTTON_STYLES[props.$size].bgColor[props.$type]};
    border-radius: 4px;
    line-height: ${(props) => BUTTON_STYLES[props.$size].lineHeight};
    font-weight: ${(props) => BUTTON_STYLES[props.$size].fontWeight};
    color: ${(props) => BUTTON_STYLES[props.$size].textColor[props.$type]};

    &:not(:disabled) {
        &:hover {
            background-color: ${(props) =>
    BUTTON_STYLES[props.$size].hoverBgColor[props.$type]};
            border-color: ${(props) =>
    BUTTON_STYLES[props.$size].hoverBorderColor[props.$type]};
        }
    }

    &:disabled {
        cursor: not-allowed;
        background-color: ${(props) =>
    BUTTON_STYLES.disable.bgColor[props.$type]};
    }
`;

export default Button;
