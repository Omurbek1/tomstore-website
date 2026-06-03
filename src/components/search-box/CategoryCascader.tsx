"use client";

import { Cascader, ConfigProvider } from "antd";
import { IconChevronDown } from "@tabler/icons-react";

export type CatalogOption = {
  label: string;
  value: string;
  searchValue: string;
  children?: CatalogOption[];
};

type Props = {
  options: CatalogOption[];
  value: string[];
  ariaLabel: string;
  onChange: (value: (string | number)[], selectedOptions?: CatalogOption[]) => void;
};

const filterCatalogOptions = (inputValue: string, path: CatalogOption[]): boolean =>
  path.some((opt) => opt.label.toLowerCase().includes(inputValue.toLowerCase()));

// Иерархический выбор категории. Вынесен в отдельный модуль и грузится лениво
// (next/dynamic, ssr:false) из SearchInputWithCategory — так AntD не попадает
// в критический бандл витрины, а поведение/стили поиска сохраняются 1:1.
// Собственный ConfigProvider нужен, т.к. глобальный убран из layout витрины.
export default function CategoryCascader({ options, value, ariaLabel, onChange }: Props) {
  return (
    <ConfigProvider theme={{ token: { colorPrimary: "#C81E3A", borderRadius: 10 } }}>
      <Cascader
        allowClear={false}
        aria-label={ariaLabel}
        changeOnSelect
        expandTrigger="hover"
        options={options}
        value={value}
        onChange={onChange as any}
        showSearch={{ filter: filterCatalogOptions }}
        suffixIcon={<IconChevronDown size={18} stroke={1.5} />}
        displayRender={(labels) => labels[labels.length - 1]}
        classNames={{ popup: { root: "tomstore-category-cascader-popup" } }}
      />
    </ConfigProvider>
  );
}
