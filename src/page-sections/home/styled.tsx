import styled from "styled-components";
import Box from "@component/Box";

const StyledProductCategory = styled(Box)`
  display: flex;
  cursor: pointer;
  min-width: 240px;
  border-radius: 5px;
  align-items: center;
  padding: 0.5rem 1rem;

  &:hover {
    box-shadow: ${({ theme }) => theme?.shadows?.regular || "0 1px 4px rgba(0, 0, 0, 0.12)"};
  }

  .product-category-title {
    font-size: 17px;
    font-weight: 600;
    margin-left: 1rem;
    text-transform: capitalize;
  }

  .show-all {
    width: 100%;
    font-size: 16px;
    text-align: center;
  }
`;

export default StyledProductCategory;
