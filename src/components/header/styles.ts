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

  .site-logo {
    height: 60px;
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

  /* ── Tablet (≤900px): single row, smaller logo, hide extras ── */
  @media only screen and (max-width: 900px) {
    .site-logo {
      height: 40px;
    }

    .logo {
      margin-right: 0.5rem;
      flex-shrink: 0;
    }

    .icon-holder,
    .category-holder {
      display: none;
    }

    .header-right {
      display: flex !important;
      flex-shrink: 0;
      margin-left: 0.5rem;
    }

    .header-right .desktop-only {
      display: none !important;
    }
  }

  /* ── Mobile (≤600px): two-row layout ── */
  @media only screen and (max-width: 600px) {
    height: ${layoutConstant.mobileHeaderHeight};

    .container {
      flex-wrap: wrap;
      align-content: center;
      padding-top: 8px;
      padding-bottom: 8px;
      row-gap: 8px;
      height: 100%;
    }

    /* Row 1: logo (left) */
    .logo {
      order: 1;
      flex: 0 0 auto;
      margin-right: 0;
    }

    /* Row 1: cart/user (right, pushed to end) */
    .header-right {
      order: 2;
      flex: 0 0 auto;
      margin-left: auto;
    }

    /* Row 2: search bar (full width) */
    .search-wrap {
      order: 3;
      flex: 0 0 100%;
      margin-left: 0;
      margin-right: 0;

      > * {
        width: 100%;
        max-width: 100%;
      }
    }

    .site-logo {
      height: 34px;
    }
  }
`;

export default StyledHeader;
