import React from "react";
import { theme } from "@/styles/theme";
import styled from "styled-components";

const SideNav = () => {
    return <StyledAside>사이드 네비게이션</StyledAside>;
};

export default SideNav;


export const StyledAside = styled.aside`
  width: 250px;
  height: calc(100vh - ${theme.size.headerHeight});
  position: sticky;
  left: 0;
  flex-shrink: 0;
  z-index: 10;
`;