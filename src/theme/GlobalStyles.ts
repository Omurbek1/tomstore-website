import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  html,
  body {
    margin: 0;
    padding: 0;
    font-size: 14px;
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.body.text};
    background: ${({ theme }) => theme.colors.body.default};
    transition: background-color 0.25s ease, color 0.2s ease;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  * {
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.body.text};
  }

  /* ── All headings follow text.primary so they're bright in dark mode ── */
  h1, h2, h3, h4, h5, h6 {
    color: ${({ theme }) => theme.colors.text.primary};
  }

  .cursor-pointer {
    cursor: pointer;
  }

  /* ── Ant Design portal popups (Cascader, Select, Drawer) in dark mode ── */
  /* Portals render at body level, outside styled-components ThemeProvider  */
  [data-theme="dark"] {
    .ant-cascader-dropdown,
    .ant-select-dropdown,
    .ant-picker-dropdown {
      background-color: #141a2f !important;
      border: 1px solid #1e2235 !important;
      box-shadow: 0 8px 32px rgba(0,0,0,0.55) !important;

      .ant-cascader-menu,
      .ant-cascader-menu-item,
      .ant-select-item,
      .ant-select-item-group {
        background-color: transparent;
        color: #e0e6f5 !important;
      }

      .ant-cascader-menu {
        border-right-color: #1e2235 !important;
      }

      .ant-cascader-menu-item:hover,
      .ant-select-item-option-active:not(.ant-select-item-option-disabled) {
        background-color: #192036 !important;
      }

      .ant-cascader-menu-item-active,
      .ant-select-item-option-selected:not(.ant-select-item-option-disabled) {
        background-color: rgba(200, 30, 58, 0.18) !important;
        color: #e0e6f5 !important;
        font-weight: 600;
      }

      .ant-select-item-empty {
        color: #6a7898 !important;
      }
    }

    /* Drawer panel */
    .ant-drawer-content {
      background-color: #10141f !important;
    }
    .ant-drawer-header {
      background-color: #10141f !important;
      border-bottom-color: #1e2235 !important;
    }
    .ant-drawer-title {
      color: #e0e6f5 !important;
    }
    .ant-drawer-close {
      color: #8896be !important;
    }
  }
`;

export default GlobalStyles;
