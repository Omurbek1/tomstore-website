type SalesChartData = {
  labels: string[];
  data: number[];
};

type SummaryCard = {
  amount: string;
  title: string;
  subtitle: string;
};

type CountrySale = {
  amount: number;
  name: string;
  flagUrl: string;
};

const summaryCards: SummaryCard[] = [
  {
    amount: "304 500 сом",
    title: "Earnings",
    subtitle: "after associated vendor fees",
  },
  {
    amount: "40 000 сом",
    title: "Balance",
    subtitle: "ready for processing",
  },
  {
    amount: "8",
    title: "Pending Orders",
    subtitle: "current month",
  },
];

const countrySales: CountrySale[] = [
  {
    amount: 130,
    name: "Kyrgyzstan",
    flagUrl: "https://purecatamphetamine.github.io/country-flag-icons/3x2/KG.svg",
  },
  {
    amount: 110,
    name: "Kazakhstan",
    flagUrl: "https://purecatamphetamine.github.io/country-flag-icons/3x2/KZ.svg",
  },
  {
    amount: 90,
    name: "Uzbekistan",
    flagUrl: "https://purecatamphetamine.github.io/country-flag-icons/3x2/UZ.svg",
  },
];

const sales: SalesChartData = {
  labels: [
    "May 01",
    "May 02",
    "May 03",
    "May 04",
    "May 05",
    "May 06",
    "May 07",
  ],
  data: [10, 18, 14, 22, 19, 28, 32],
};

const getSales = async (): Promise<SalesChartData> => sales;

const getSummeryCards = async (): Promise<SummaryCard[]> => summaryCards;

const getCountryBasedSales = async (): Promise<CountrySale[]> => countrySales;

export default { getSales, getSummeryCards, getCountryBasedSales };
