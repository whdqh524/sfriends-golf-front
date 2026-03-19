import React from "react";
import styled from "styled-components";
import {theme} from "@/styles/theme";

const CardSection = ({title, children}) => {
    return (<>
        {(title) && (<CardSectionHeader>
                <Title>{title}</Title>
            </CardSectionHeader>)}
        <Section>
            <Content>{children}</Content>
        </Section>
    </>);
};

export default CardSection;

const CardSectionHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
`
const Section = styled.section`
    background: #fff;
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 20px;

    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

    @media (min-width: 1024px) {
        padding: 20px 24px;
        margin-bottom: 50px;
    }
`;

const Title = styled.h2`
    color: ${theme.colors.gray.black};
    font-size: 20px;
    font-weight: 700;
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;
