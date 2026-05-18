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
    transition: background-color 0.3s ease, color 0.2s ease;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
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

  h1, h2, h3, h4, h5, h6 {
    color: ${({ theme }) => theme.colors.text.primary};
  }

  .cursor-pointer { cursor: pointer; }

  /* ── Text selection ── */
  ::selection {
    background: ${({ theme }) => theme.colors.primary.main}33;
    color: ${({ theme }) => theme.colors.text.primary};
  }

  /* ── Focus ring ── */
  :focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary.main};
    outline-offset: 2px;
    border-radius: 4px;
  }

  /* ── Custom scrollbar ── */
  ::-webkit-scrollbar { width: 5px; height: 5px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) =>
      theme.isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.13)"};
    border-radius: 3px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) =>
      theme.isDark ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.22)"};
  }
  ::-webkit-scrollbar-corner { background: transparent; }

  /* ── Card / surface shadow ring (dark mode only) ── */
  ${({ theme }) =>
    theme.isDark
      ? `
    .card-ring {
      box-shadow: 0 0 0 1px rgba(255,255,255,0.06);
    }
  `
      : ""}

  /* ────────────────────────────────────────────────────────────────────
     Ant Design overrides for dark mode — portals render outside the
     ThemeProvider tree so styled-components can't reach them directly.
     We target [data-theme="dark"] which is set on <html> by DarkModeContext.
  ──────────────────────────────────────────────────────────────────── */
  [data-theme="dark"] {

    /* ── Dropdowns (Cascader, Select, AutoComplete) ── */
    .ant-cascader-dropdown,
    .ant-select-dropdown,
    .ant-picker-dropdown {
      background-color: #141c30 !important;
      border: 1px solid #252e46 !important;
      box-shadow: 0 8px 32px rgba(0,0,0,0.6) !important;

      .ant-cascader-menu-item,
      .ant-select-item,
      .ant-select-item-group { background: transparent; color: #eaf0ff !important; }

      .ant-cascader-menu { border-right-color: #252e46 !important; }

      .ant-cascader-menu-item:hover,
      .ant-select-item-option-active:not(.ant-select-item-option-disabled) {
        background-color: #1c2338 !important;
      }

      .ant-cascader-menu-item-active,
      .ant-select-item-option-selected:not(.ant-select-item-option-disabled) {
        background-color: rgba(200,30,58,0.20) !important;
        color: #eaf0ff !important;
        font-weight: 600;
      }

      .ant-select-item-empty { color: #6e7fa0 !important; }
    }

    /* ── Drawer ── */
    .ant-drawer-content    { background-color: #0f1525 !important; }
    .ant-drawer-header     { background-color: #0f1525 !important; border-bottom-color: #1c2338 !important; }
    .ant-drawer-title      { color: #eaf0ff !important; }
    .ant-drawer-close      { color: #8fa3cc !important; }
    .ant-drawer-close:hover { color: #eaf0ff !important; }

    /* ── Modal ── */
    .ant-modal-content  { background-color: #0f1525 !important; box-shadow: 0 16px 48px rgba(0,0,0,0.65) !important; }
    .ant-modal-header   { background-color: #0f1525 !important; border-bottom-color: #1c2338 !important; }
    .ant-modal-title    { color: #eaf0ff !important; }
    .ant-modal-close    { color: #8fa3cc !important; }
    .ant-modal-close:hover { color: #eaf0ff !important; }
    .ant-modal-footer   { border-top-color: #1c2338 !important; }

    /* ── Inputs ── */
    .ant-input,
    .ant-input-affix-wrapper,
    .ant-input-number,
    .ant-picker {
      background-color: #141c30 !important;
      border-color: #252e46 !important;
      color: #eaf0ff !important;
    }
    .ant-input::placeholder,
    .ant-input-affix-wrapper input::placeholder { color: #6e7fa0 !important; }
    .ant-input:focus,
    .ant-input-affix-wrapper:focus,
    .ant-input-affix-wrapper-focused {
      border-color: #C81E3A !important;
      box-shadow: 0 0 0 2px rgba(200,30,58,0.18) !important;
    }
    .ant-input-prefix, .ant-input-suffix { color: #6e7fa0 !important; }

    /* ── Select ── */
    .ant-select-selector {
      background-color: #141c30 !important;
      border-color: #252e46 !important;
      color: #eaf0ff !important;
    }
    .ant-select-focused .ant-select-selector {
      border-color: #C81E3A !important;
      box-shadow: 0 0 0 2px rgba(200,30,58,0.18) !important;
    }
    .ant-select-arrow { color: #6e7fa0 !important; }
    .ant-select-clear { background: #141c30 !important; color: #6e7fa0 !important; }

    /* ── Checkbox ── */
    .ant-checkbox-inner {
      background-color: #141c30 !important;
      border-color: #252e46 !important;
    }
    .ant-checkbox-checked .ant-checkbox-inner {
      background-color: #C81E3A !important;
      border-color: #C81E3A !important;
    }
    .ant-checkbox-wrapper { color: #eaf0ff !important; }

    /* ── Table ── */
    .ant-table          { background-color: #0f1525 !important; }
    .ant-table-thead > tr > th {
      background-color: #141c30 !important;
      color: #8fa3cc !important;
      border-bottom-color: #252e46 !important;
    }
    .ant-table-tbody > tr > td { border-bottom-color: #1c2338 !important; }
    .ant-table-tbody > tr:hover > td { background-color: #141c30 !important; }
    .ant-table-column-sorter { color: #6e7fa0 !important; }

    /* ── Pagination ── */
    .ant-pagination-item { background: #141c30 !important; border-color: #252e46 !important; }
    .ant-pagination-item a { color: #eaf0ff !important; }
    .ant-pagination-item-active { background: rgba(200,30,58,0.18) !important; border-color: #C81E3A !important; }
    .ant-pagination-item-active a { color: #C81E3A !important; }
    .ant-pagination-prev .ant-pagination-item-link,
    .ant-pagination-next .ant-pagination-item-link {
      background: #141c30 !important;
      border-color: #252e46 !important;
      color: #eaf0ff !important;
    }

    /* ── Tabs ── */
    .ant-tabs-nav { border-bottom-color: #1c2338 !important; }
    .ant-tabs-nav::before { border-bottom-color: #1c2338 !important; }

    /* ── Tag ── */
    .ant-tag { background: #141c30 !important; border-color: #252e46 !important; color: #b0bdd8 !important; }

    /* ── Divider ── */
    .ant-divider { border-color: #1c2338 !important; }

    /* ── Spin ── */
    .ant-spin-dot-item { background-color: #C81E3A !important; }

    /* ── Tooltip ── */
    .ant-tooltip-inner { background: #141c30 !important; color: #eaf0ff !important; }
    .ant-tooltip-arrow::before { background: #141c30 !important; }

    /* ── Notification / Message ── */
    .ant-notification-notice,
    .ant-message-notice-content {
      background-color: #141c30 !important;
      border: 1px solid #252e46 !important;
      box-shadow: 0 8px 24px rgba(0,0,0,0.5) !important;
      color: #eaf0ff !important;
    }
    .ant-notification-notice-message { color: #eaf0ff !important; }
    .ant-notification-notice-description { color: #8fa3cc !important; }

    /* ── Form label ── */
    .ant-form-item-label > label { color: #8fa3cc !important; }
    .ant-form-item-explain-error { color: #ff6b83 !important; }

    /* ── Radio ── */
    .ant-radio-inner {
      background-color: #141c30 !important;
      border-color: #252e46 !important;
    }
    .ant-radio-checked .ant-radio-inner { border-color: #C81E3A !important; }
    .ant-radio-checked .ant-radio-inner::after { background-color: #C81E3A !important; }
    .ant-radio-wrapper { color: #eaf0ff !important; }

    /* ── DatePicker ── */
    .ant-picker-panel-container { background: #141c30 !important; border-color: #252e46 !important; }
    .ant-picker-header, .ant-picker-footer { border-color: #252e46 !important; color: #eaf0ff !important; }
    .ant-picker-content th { color: #6e7fa0 !important; }
    .ant-picker-cell-inner { color: #eaf0ff !important; }
    .ant-picker-cell-disabled .ant-picker-cell-inner { color: #4a5572 !important; }
  }
`;

export default GlobalStyles;
