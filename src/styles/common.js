// styles/common.js
import styled from "styled-components";

export const Container = styled.div`
    padding: 16px 0;
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 70px;

    @media (min-width: 1024px) {
        max-width: 700px;
        margin: 0 auto;
        padding: 24px;
    }
`

export const Button = styled.button`
  width: 100%;
  padding: 14px;
  border-radius: 12px;
  border: none;
  font-weight: 600;
  background: #FD5A1E;
  color: #fff;

  &:active {
    transform: scale(0.97);
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #ddd;
`;