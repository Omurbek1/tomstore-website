// API FUNCTIONS
import { getTranslations } from "next-intl/server";
import api from "@utils/__api__/market-1";
// PAGE SECTION COMPONENTS
import Section1 from "@sections/home/Section1";
import Section2 from "@sections/home/Section2";
import Section3 from "@sections/home/Section3";
import Section4 from "@sections/home/Section4";
import Section5 from "@sections/home/Section5";
import Section6 from "@sections/home/Section6";
import Section7 from "@sections/home/Section7";
import Section8 from "@sections/home/Section8";
import Section10 from "@sections/home/Section10";
import Section11 from "@sections/home/Section11";
import Section12 from "@sections/home/Section12";
import Section13 from "@sections/home/Section13";

export default async function HomePage() {
  const t = await getTranslations("home");
  const [
    carList,
    carBrands,
    mobileList,
    opticsList,
    mobileShops,
    opticsShops,
    mobileBrands,
    opticsBrands,
  ] = await Promise.all([
    api.getCarList(),
    api.getCarBrands(),
    api.getMobileList(),
    api.getOpticsList(),
    api.getMobileShops(),
    api.getOpticsShops(),
    api.getMobileBrands(),
    api.getOpticsBrands(),
  ]);

  return (
    <main>
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
      <Section13 />
      <Section6 carBrands={carBrands} carList={carList} />
      <Section7
        shops={mobileShops}
        brands={mobileBrands}
        title={t("mobilePhones")}
        productList={mobileList}
      />
      <Section8 />
      <Section7
        shops={opticsShops}
        brands={opticsBrands}
        title={t("opticsWatch")}
        productList={opticsList}
      />
      <Section10 />
      <Section11 />
      <Section12 />
    </main>
  );
}
