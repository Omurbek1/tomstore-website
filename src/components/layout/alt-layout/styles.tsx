import styled from "styled-components";

export const StyledRoot = styled.div`
  .header-container {
    box-shadow: ${({ theme }) => theme?.shadows?.regular || "0 1px 4px rgba(0, 0, 0, 0.12)"};
  }
`;
