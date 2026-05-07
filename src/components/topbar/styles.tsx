import styled from "styled-components";

export const StyledTopbar = styled.div`
  background: ${({ theme }) => theme.colors.secondary.main};
  color: white;
  height: 40px;
  font-size: 12px;
  .container {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .phone,
  .email,
  .topbar-left,
  .topbar-right {
    display: flex;
    align-items: center;
  }
  .topbar-left {
    .email {
      margin-inline-start: 20px;
    }
    .logo {
      display: none;
      img {
        display: block;
        height: 36px;
      }
    }
    span {
      margin-left: 10px;
    }
    @media only screen and (max-width: 900px) {
      .logo {
        display: block;
      }
      *:not(.logo) {
        display: none;
      }
    }
  }

  @media only screen and (max-width: 600px) {
    height: 36px;

    .topbar-left .logo {
      display: none !important;
    }

    .container {
      justify-content: flex-end;
    }
  }

  .topbar-right {
    .link {
      padding-right: 30px;
      color: white;
    }
    .dropdown-handler {
      display: flex;
      align-items: center;
      height: 40px;
      cursor: pointer;
      .country-flag {
        width: 20px;
        height: 14px;
        border-radius: 3px;
        box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.2);
        flex-shrink: 0;
      }
      span {
        margin-right: 0.25rem;
        margin-left: 0.5rem;
      }
    }

    .menu-item-holder > div {
      .country-flag {
        width: 14px;
        height: 10px;
        margin-right: 0.5rem;
      }
    }
    @media only screen and (max-width: 900px) {
      .link {
        display: none;
      }
    }

    @media only screen and (max-width: 600px) {
      justify-content: flex-end;
      width: 100%;
      gap: 4px;

      .dropdown-handler {
        height: 36px;
        padding: 0 8px;
        gap: 0;

        span { display: none; }
        svg:last-child { display: none; }
      }
    }
  }
`;
