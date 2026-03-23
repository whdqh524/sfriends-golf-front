import {createGlobalStyle} from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`


    ${reset}
    *, *::before, *::after {
        box-sizing: border-box;
    }

    * {
        font-family: 'Noto Sans KR', sans-serif !important;
    }

    html, body, #root, #contentWrap {
        height: 100%;
        //overflow: hidden;
        /* 🔥 스크롤바 숨기기 */
        -ms-overflow-style: none; /* IE, Edge */
        scrollbar-width: none; /* Firefox */

        &::-webkit-scrollbar {
            display: none; /* Chrome, Safari */
        }
    }

    body {
        min-width: 320px !important;
    }

    #root {
        position: relative;
    }

    //button {
    //  cursor: pointer;
    //  background: none;
    //  border: 0;
    //  outline: 0;
    //  padding: 0;
    //}

    a {
        text-decoration: none;
        color: inherit;
        cursor: pointer;
    }

    :root {
        --Primary-50_-FBF6EF: #FBF6EF;
        --Primary-70_-FCF3E5: #FCF3E5;
        --Primary-100_-FCEDD6: #FCEDD6;
        --Primary-200_-F9D7AF: #F9D7AF;
        --Primary-300_-EEB683: #EEB683;
        --Primary-400_-DE9561: #DE9561;
        --primary-500-c-86733: #C86733;
        --Primary-600_-AC4B25: #AC4B25;
        --Primary-700_-903419: #903419;
        --Primary-800_-742010: #742010;
        --Primary-900_-601209: #601209;


        --Secondary-Red_-E75434: #E75434;
        --Secondary-Blue_-0D99FF: #0D99FF;
        --common-txt-border: #A76CEF;
        --Secondary-Yellow_-FFD333: #FFD333;

        --disabled-bg-no-color: #FAFAFA;
        --disabled-bg-colored: #F5F5F5;
        --Gray-200_-EEEEEE: #EEE;
        --Gray-300_-DFDFDF: #DFDFDF;
        --Gray-400_-C8C8C8: #C8C8C8;
        --Gray-500_-B0B0B0: #B0B0B0;
        --Gray-600_-949494: #949494;
        --place-holder-on-dk: #757575;
        --txt-table-label: #555;
        --hovered-on-lgt-2-dk: #3B3B3B;
        --darker-line-bg-on-dk: #333;
        --Gray-1000_-262626: #262626;
        --Black_-161616: #161616;
    }

    div.table-grid-wrap {
        border-bottom: 1px solid var(--Gray-200_-EEEEEE, #EEE);
        display: flex;
        align-items: center;

        &:first-of-type {
            border-top: 1px solid var(--Gray-200_-EEEEEE, #EEE);
        }

        div.row {
            flex: 1;
            display: flex;
            align-items: center;

            div.name {
                display: flex;
                align-items: center;
                gap: 4px;
                flex-basis: 120px;
                padding: 13px 20px;
                background-color: var(--disabled-bg-no-color, #FAFAFA);
                min-height: 48px;

                color: var(--txt-table-label, #555);
                font-size: 13px;
                font-style: normal;
                font-weight: 400;
                line-height: 22px;
            }

            div.contents {
                padding: 8px 16px;
                flex: 1;
                background-color: #fff;
                height: 48px;
            }
        }
    }

    /*
    ** 스크롤바 커스텀
    */
    /* 스크롤바 전체 영역 */
    ::-webkit-scrollbar {
        width: 4px; /* 세로축 스크롤바 폭 너비 */
        height: 80px; /* 가로축 스크롤바 폭 너비 b0b0b0 */
    }

    ::-webkit-scrollbar-thumb {
        background: #b0b0b0; /* 스크롤바 막대 색상 */
        border: 0; /* 스크롤바 막대 테두리 설정  */
        border-radius: 8px;
    }

    ::-webkit-scrollbar-track {
        background: transparent; /* 스크롤바 뒷 배경 색상 */
    }

    button,
    a,
    div {
        -webkit-tap-highlight-color: transparent;
    }

    button {
        -webkit-appearance: none;
    }
    
`;

export default GlobalStyle;
