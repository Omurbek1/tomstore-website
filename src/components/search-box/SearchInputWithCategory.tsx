import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { IconChevronDown, IconSearch } from "@tabler/icons-react";
import debounce from "lodash/debounce";
import { useTranslations } from "next-intl";

import Box from "@component/Box";
import Menu from "@component/menu/Menu";
import Card from "@component/Card";
import FlexBox from "@component/FlexBox";
import MenuItem from "@component/MenuItem";
import { Span } from "@component/Typography";
import TextField from "@component/text-field";
import { Link } from "i18n/navigation";
import StyledSearchBox from "./styled";

const dropdownVariants = {
  hidden: {
    y: -10,
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    y: 0,
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.2,
      easing: [0.25, 0.46, 0.45, 0.94],
    },
  },
  exit: {
    y: -10,
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.15 },
  },
};

export default function SearchInputWithCategory() {
  const t = useTranslations("search");
  const [resultList, setResultList] = useState<(typeof dummySearchResults)[number][]>([]);
  const [category, setCategory] = useState<(typeof categoryKeys)[number]>("all");

  const handleCategoryChange = (cat: (typeof categoryKeys)[number]) => () => setCategory(cat);

  const search = debounce((e) => {
    const value = e.target?.value;

    if (!value) setResultList([]);
    else setResultList([...dummySearchResults]);
  }, 200);

  const handleSearch = useCallback((event: any) => {
    event.persist();
    search(event);
  }, []);

  const handleDocumentClick = () => setResultList([]);

  useEffect(() => {
    window.addEventListener("click", handleDocumentClick);
    return () => window.removeEventListener("click", handleDocumentClick);
  }, []);

  return (
    <Box
      zIndex={99}
      position="relative"
      flex="1 1 0"
      maxWidth="670px"
      mx="auto"
    >
      <StyledSearchBox>
        <IconSearch size={18} stroke={1.5} className="search-icon" />

        <TextField
          fullWidth
          onChange={handleSearch}
          className="search-field"
          placeholder={t("placeholder")}
        />

        <Menu
          direction="right"
          className="category-dropdown"
          handler={(openMenu) => (
            <FlexBox
              className="dropdown-handler"
              alignItems="center"
              onClick={openMenu}
            >
              <span>{t(`categories.${category}`)}</span>
              <IconChevronDown size={18} stroke={1.5} />
            </FlexBox>
          )}
        >
          {categoryKeys.map((item) => (
            <MenuItem key={item} onClick={handleCategoryChange(item)}>
              {t(`categories.${item}`)}
            </MenuItem>
          ))}
        </Menu>
      </StyledSearchBox>

      {/* SEARCH RESULT */}
      <AnimatePresence>
        {resultList.length > 0 && (
          <motion.div
            exit="exit"
            initial="hidden"
            animate="visible"
            variants={dropdownVariants}
            style={{
              top: "100%",
              zIndex: 99,
              width: "100%",
              position: "absolute",
            }}
          >
            <Card
              py="0.5rem"
              mt="0.25rem"
              boxShadow="large"
              borderRadius=".5rem"
            >
              {resultList.map((item) => (
                <Link href={`/product/search/${item.slug}`} key={item.slug}>
                  <MenuItem key={item.slug}>
                    <Span fontSize="14px">{t(`results.${item.translationKey}`)}</Span>
                  </MenuItem>
                </Link>
              ))}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}

const categoryKeys = ["all", "car", "clothes", "electronics", "laptop", "desktop", "camera", "toys"] as const;

const dummySearchResults = [
  { slug: "macbook-air-13", translationKey: "macbookAir13" },
  { slug: "asus-k555la", translationKey: "asusK555la" },
  { slug: "acer-aspire-x453", translationKey: "acerAspireX453" },
  { slug: "ipad-mini-3", translationKey: "ipadMini3" }
] as const;
