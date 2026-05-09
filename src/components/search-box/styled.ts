import styled from "styled-components";

const StyledSearchBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.colors.body.paper};
  border: 1px solid ${({ theme }) => theme.colors.text.disabled};
  border-radius: 8px;
  overflow: hidden;

  .search-icon {
    position: absolute;
    color: ${({ theme }) => theme.colors.text.hint};
    left: 1rem;
    z-index: 1;
  }

  .search-field {
    flex: 1 1 0;
    padding-left: 3rem;
    padding-right: 13.75rem;
    height: 44px;
    border-radius: 0;
    border: none !important;
    background: transparent !important;
    box-shadow: none !important;
  }
  .search-button {
    position: absolute;
    height: 100%;
    right: 0px;
    border-radius: 0 8px 8px 0;
    padding-left: 55px;
    padding-right: 55px;
  }
  .category-dropdown,
  .category-cascader {
    position: absolute;
    right: 0px;
    color: ${({ theme }) => theme.colors.text.hint};
  }

  .category-cascader {
    width: 208px;

    .ant-select {
      width: 100%;
      height: 44px;
    }

    .ant-select-selector {
      height: 44px !important;
      padding-left: 1.25rem !important;
      padding-right: 2.25rem !important;
      border: 0 !important;
      border-left: 1px solid ${({ theme }) => theme.colors.text.disabled} !important;
      border-radius: 0 8px 8px 0 !important;
      background: transparent !important;
      box-shadow: none !important;
    }

    .ant-select-selection-item {
      color: ${({ theme }) => theme.colors.text.primary};
      font-size: 14px;
      font-weight: 600;
      line-height: 42px !important;
    }

    .ant-select-arrow {
      right: 1rem;
      color: ${({ theme }) => theme.colors.text.secondary};
    }
  }

  .dropdown-handler {
    height: 40px;
    cursor: pointer;
    min-width: 90px;
    padding-left: 1.25rem;
    padding-right: 1rem;
    border-left: 1px solid ${({ theme }) => theme.colors.text.disabled};
    span {
      margin-right: 0.75rem;
    }
  }
  .menu-button {
    display: none;
  }
  @media only screen and (max-width: 900px) {
    .category-dropdown,
    .category-cascader {
      display: none;
    }
    .search-icon {
      left: 0.875rem;
    }
    .search-field {
      height: 40px;
      border-radius: 300px;
      padding-left: 2.5rem;
      padding-right: 1rem;
    }
    .search-button {
      padding-left: 1.25rem;
      padding-right: 1.25rem;
    }
    .menu-button {
      display: unset;
    }
  }

  @media only screen and (max-width: 600px) {
    width: 100%;

    .search-field {
      height: 38px;
      font-size: 14px;
    }
  }
`;

export default StyledSearchBox;
