import React, {useState} from "react";
import styled from "styled-components";

/** @type {string} */
import IcInputReset from "../assets/icons/ic-input-rest.svg";
/** @type {string} */
import IcEyeOn from "../assets/icons/ic-eye-on.svg";
/** @type {string} */
import IcEyeOff from "../assets/icons/ic-eye-off.svg";
/** @type {string} */
import IcSearch from "../assets/icons/ic-btn-search.svg"

const Input = ({
                   label,
                   placeholder,
                   id,
                   inputType,
                   className,
                   onChange,
                   error,
                   errorText,
                   value,
                   reset,
                   state,
                   onBlur,
                   onEyes,
                   typeChange,
                   name,
                   autoComplete,
                   autoFocus,
                   setTypeChange,
                   search,
                   onClick,
                   onKeyDown,
                   onFocus,
                   disabled,
                   readOnly,
               }) => {
    let [eye, setEye] = useState(false);

    return (
        <InputWrapper className={className}>
            {label ? <label htmlFor={id}>{label}</label> : null}
            <div className={"input-wrapper"}>
                <input
                    id={id}
                    placeholder={placeholder}
                    type={inputType}
                    onChange={onChange}
                    value={value}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    name={name}
                    autoComplete={autoComplete}
                    autoFocus={!!autoFocus}
                    onKeyDown={onKeyDown}
                    disabled={disabled}
                    readOnly={readOnly}
                />
                {
                    onEyes === "on" ?
                        eye === false
                            ? <div className={"eyes"} onClick={() => {
                                setTypeChange("text")
                                setEye((prev) => !prev);
                            }}><img src={IcEyeOff}/></div>
                            : <div className={"eyes"} onClick={() => {
                                setTypeChange("password")
                                setEye((prev) => !prev);
                            }}><img src={IcEyeOn}/></div>
                        : null
                }
                {search && <div className={"ico-search"} onClick={onClick}><img src={IcSearch}/></div>}
            </div>
            {reset &&
                <div
                    className="reset"
                    onClick={() => {
                        state[0]("") // test
                        state[1](false) // reset버튼
                        //console.log( state[0], state[1] )
                    }}
                ><img src={IcInputReset} alt={"Reset btn"}/></div>
            }
            {error ?? <p className={"warning-text"}>{errorText}</p>}
        </InputWrapper>
    );
};

const InputWrapper = styled.div`
    position: relative;

    label {
        display: block;
        color: var(--Gray-900_-3B3B3B, #3b3b3b);
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px;
        letter-spacing: -0.14px;
        margin-bottom: 8px;
    }

    input {
        display: block;
        width: 100%;
        height: 32px;
        border-radius: 2px;
        padding: 0 16px;
        border: 1px solid var(--line-input-enable, #dfdfdf);
        background: #fff;

        color: var(--Gray-1000_-262626, #262626);
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px;
        letter-spacing: -0.14px;
        outline: none;

        &::placeholder {
            color: var(--place-holder-on-lgt, #b0b0b0);
        }

        &.error {
            border: 1px solid var(--Secondary-Red_-E75434, #e75434);
            box-shadow: 0 0 8px 0 rgba(231, 84, 52, 0.2);
        }
    }

    p.warning-text {
        margin-top: 4px;
        colo8r: var(--Secondary-Red_-E75434, #e75434);
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 16px;
        letter-spacing: -0.12px;

        &:empty {
            margin: 0;
        }
    }

    & .reset {
        position: absolute;
        top: 50%;
        right: 8px;
        transform: translate(0, -50%);
        cursor: pointer;
    }

    & .input-wrapper {
        display: flex;
        position: relative;

        & .eyes {
            position: absolute;
            top: 50%;
            right: 10px;
            transform: translate(0, -50%);
            cursor: pointer;

            & img {
                margin: 0;
            }
        }
    }


`;

Input.defaultProps = {
    inputType: "text",
};

export default Input;
