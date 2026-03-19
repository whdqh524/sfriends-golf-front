import React from "react";
import styled from 'styled-components';
import Select from "react-select";

const SELECT_SIZE = {
    xs: {width: "160px"},
    s: {width: "200px"},
    m: {width: "200px"},
    l: {width: "200px"},
    xl: {width: "200px"},
    fill: {width: "100%"}
}


const SelectBox = (
    {
        option,
        size,
        classNamePrefix,
        className,
        placeholder,
        onChange,
        defaultValue,
        value,
        border,
        isSearchable
    }) => {
    return (
        <>
            <SelectWrapper
                options={option}
                size={size}
                classNamePrefix={classNamePrefix}
                className={className}
                placeholder={placeholder}
                onChange={onChange}
                defaultValue={defaultValue}
                value={value}
                border={border}
                isSearchable={isSearchable}
            />
        </>

    );
}

const SelectWrapper = styled(Select).attrs({
    classNamePrefix: 'react-select',
})`
    .react-select__control {
        width: ${(props) => SELECT_SIZE[props.size].width};
        height: 32px;
        border: ${(props) => props.border ? props.border : "1px solid #DFDFDF"};
        border-radius: 2px;
        display: flex;
        text-align: center;
        cursor: pointer;
        padding: 8px 12px;
        box-sizing: border-box;
        min-height: auto;
        font-size: 12px;
        flex-wrap: nowrap;
    }

    .react-select__control--is-focused,
    .react-select__control:hover,
    .react-select__control:focus {
        border: 1px solid #C86733;
    }

    .react-select__control--is-focused {
        box-shadow: none;
    }


    .react-select__control--menu-is-open {
        border: 1px solid #C86733;
        box-shadow: none;

        .react-select__indicator {
            svg {
                transform: rotate(180deg) !important;
            }
        }
    }


    .react-select__placeholder {
        font-weight: 500;
        text-align: left;
    }

    .react-select__value-container {
        padding: 0;
    }

    .react-select__input-container {
        margin: 0;
        padding: 0;
    }

    .react-select__single-value {
        color: #232323; /* 텍스트 색상 지정 */
        font-size: 12px;
        font-weight: 500;
        text-align: left;
    }

    .react-select__menu {
        width: ${(props) => SELECT_SIZE[props.size].width};
        background-color: #ffffff;
        border-radius: 4px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        font-weight: 500;
        text-align: center;
        font-size: 12px;
    }

    .react-select__option {
        background-color: transparent; /* option 배경색 */
        color: black; /* option 텍스트 색상 */
        text-align: left;
    }

    .react-select__option:hover {
        background-color: #C86733;
        color: #FFF;
    }

    .react-select__option--is-disabled {
        color: #adadad; /* option 텍스트 색상 */
    }

    .react-select__option--is-disabled:hover {
        background-color: transparent;
        color: #adadad; /* option 텍스트 색상 */
    }


    .react-select__option--is-selected {
        background-color: #C86733; /* 클릭된 option 배경색 */
        color: white; /* 클릭된 option 텍스트 색상 */
    }

    .react-select__option--is-focused {
        border: 0;
        *color: #fff; /* hover 상태의 option 텍스트 색상 */
    }

    .react-select__placeholder {
        color: #b0b0b0;
        font-weight: 600;
    }

    .react-select__indicator-separator {
        display: none;
    }

    .react-select__indicator {
        padding: 0;
    }

    &.unBorder {
        & .react-select__control {
            border: 0;
            //width: 120px;
        }
    }
`;

export default SelectBox;
