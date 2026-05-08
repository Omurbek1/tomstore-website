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

  /* ── Desktop left (phone / email / logo) ── */
  .topbar-left {
    display: flex;
    align-items: center;

    .email { margin-inline-start: 20px; }

    .logo {
      display: none;
      img { display: block; height: 36px; }
    }

    span { margin-left: 10px; }

    .phone,
    .email {
      display: flex;
      align-items: center;
    }

    @media only screen and (max-width: 900px) {
      .logo { display: block; }
      *:not(.logo) { display: none; }
    }
  }

  /* ── Mobile left (lang + phone dropdown) — hidden on desktop ── */
  .mobile-left {
    display: none;
    align-items: center;
    gap: 6px;
  }

  /* ── Desktop right (links / lang / currency) ── */
  .topbar-right {
    display: flex;
    align-items: center;

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

    .menu-item-holder > div .country-flag {
      width: 14px;
      height: 10px;
      margin-right: 0.5rem;
    }

    @media only screen and (max-width: 900px) {
      .link { display: none; }
    }
  }

  /* ── Tablet (≤900px) ── */
  @media only screen and (max-width: 900px) {
    .topbar-left .logo { display: block; }
  }

  /* ── Mobile (≤600px) ── */
  @media only screen and (max-width: 600px) {
    height: 40px;

    .container {
      justify-content: space-between;
    }

    /* Show mobile-left, hide desktop blocks */
    .mobile-left {
      display: flex;
    }

    .topbar-left {
      display: none !important;
    }

    /* topbar-right visible on mobile: flag + currency, no text */
    .topbar-right {
      display: flex;
      align-items: center;
      gap: 2px;

      .link { display: none; }

      .dropdown-handler {
        height: 40px;
        padding: 0 6px;
        gap: 4px;

        span { display: none; }
        svg:last-child { display: none; }
      }
    }
  }

  .ig-link {
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(255, 255, 255, 0.8);
    padding: 0 6px;
    height: 40px;
    transition: color 0.15s, transform 0.15s;

    &:hover {
      color: #fff;
      transform: scale(1.15);
    }
  }
`;
