import styled from "styled-components";
import { layoutConstant } from "utils/constants";

const StyledHeader = styled.header`
  z-index: 111;
  position: relative;
  height: ${layoutConstant.headerHeight};
  background: ${({ theme }) => theme.colors.body.paper};

  .container {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .logo {
    img {
      display: block;
    }
  }

  .icon-holder {
    span {
      font-size: 12px;
      line-height: 1;
      margin-bottom: 4px;
    }
    h4 {
      margin: 0px;
      font-size: 14px;
      line-height: 1;
      font-weight: 600;
    }
    div {
      margin-left: 6px;
    }
  }

  .user {
    cursor: pointer;
  }

  @media only screen and (max-width: 900px) {
    height: ${layoutConstant.mobileHeaderHeight};

    .logo {
      margin-right: 0.5rem;
      svg {
        width: 64px;
        height: auto;
      }
    }

    .icon-holder,
    .category-holder {
      display: none;
    }

    .header-right {
      display: flex !important;
      margin-left: 0.5rem;
    }

    .header-right .desktop-only {
      display: none !important;
    }
  }
`;

export default StyledHeader;
