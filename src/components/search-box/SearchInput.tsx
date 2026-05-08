import { useCallback, useEffect, useState } from "react";
import debounce from "lodash-es/debounce";
import { IconSearch } from "@tabler/icons-react";
import { useTranslations } from "next-intl";

import Box from "@component/Box";
import Card from "@component/Card";
import Icon from "@component/icon/Icon";
import MenuItem from "@component/MenuItem";
import { Button } from "@component/buttons";
import { Span } from "@component/Typography";
import TextField from "@component/text-field";
import { Link } from "@i18n/navigation";
import SearchBoxStyle from "./styled";

export default function SearchInput() {
  const t = useTranslations("search");
  const [resultList, setResultList] = useState<(typeof dummySearchResults)[number][]>([]);

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
    <Box position="relative" flex="1 1 0" maxWidth="670px" mx="auto">
      <SearchBoxStyle>
        <IconSearch className="search-icon" size={18} />

        <TextField
          fullWidth
          onChange={handleSearch}
          className="search-field"
          placeholder={t("placeholder")}
        />

        <Button className="search-button" variant="contained" color="primary">
          {t("searchButton")}
        </Button>

        <Box className="menu-button" ml="14px" cursor="pointer">
          <Icon color="primary">menu</Icon>
        </Box>
      </SearchBoxStyle>

      {!!resultList.length && (
        <Card position="absolute" top="100%" py="0.5rem" width="100%" boxShadow="large" zIndex={99}>
          {resultList.map((item) => (
            <Link href={`/product/search/${item.slug}`} key={item.slug}>
              <MenuItem key={item.slug}>
                <Span fontSize="14px">{t(`results.${item.translationKey}`)}</Span>
              </MenuItem>
            </Link>
          ))}
        </Card>
      )}
    </Box>
  );
}

const dummySearchResults = [
  { slug: "macbook-air-13", translationKey: "macbookAir13" },
  { slug: "asus-k555la", translationKey: "asusK555la" },
  { slug: "acer-aspire-x453", translationKey: "acerAspireX453" },
  { slug: "ipad-mini-3", translationKey: "ipadMini3" }
] as const;
