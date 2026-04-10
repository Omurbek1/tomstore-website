import type { NavigationItem } from "./types";

const navigations: NavigationItem[] = [
  {
    id: "laptops",
    icon: "laptop",
    titleKey: "nav.laptops",
    href: "/catalog/laptops",
    menuComponent: "MegaMenu1",
    menuData: {
      categories: [
        {
          titleKey: "nav.officeAndStudy",
          href: "/catalog/laptops/office",
          subCategories: [
            { titleKey: "nav.budgetLaptops", href: "/catalog/laptops/budget" },
            { titleKey: "nav.studyLaptops", href: "/catalog/laptops/study" },
            { titleKey: "nav.officeLaptops", href: "/catalog/laptops/office" },
            { titleKey: "nav.ssdLaptops", href: "/catalog/laptops/ssd" },
            { titleKey: "nav.lightLaptops", href: "/catalog/laptops/light" },
            { titleKey: "nav.touchLaptops", href: "/catalog/laptops/touch" },
          ],
        },
        {
          titleKey: "nav.gamingLaptops",
          href: "/catalog/laptops/gaming",
          subCategories: [
            { titleKey: "nav.rtx3050", href: "/catalog/laptops/rtx-3050" },
            { titleKey: "nav.rtx4050", href: "/catalog/laptops/rtx-4050" },
            { titleKey: "nav.rtx4060", href: "/catalog/laptops/rtx-4060" },
            {
              titleKey: "nav.highRefresh",
              href: "/catalog/laptops/high-refresh",
            },
            {
              titleKey: "nav.gamingCheap",
              href: "/catalog/laptops/gaming-budget",
            },
            { titleKey: "nav.gamingPro", href: "/catalog/laptops/gaming-pro" },
          ],
        },
        {
          titleKey: "nav.byBrand",
          href: "/catalog/laptops/brands",
          subCategories: [
            { titleKey: "brand.hp", href: "/catalog/laptops/hp" },
            { titleKey: "brand.dell", href: "/catalog/laptops/dell" },
            { titleKey: "brand.lenovo", href: "/catalog/laptops/lenovo" },
            { titleKey: "brand.acer", href: "/catalog/laptops/acer" },
            { titleKey: "brand.asus", href: "/catalog/laptops/asus" },
            { titleKey: "brand.msi", href: "/catalog/laptops/msi" },
          ],
        },
        {
          titleKey: "nav.premium",
          href: "/catalog/laptops/premium",
          subCategories: [
            { titleKey: "nav.ultrabook", href: "/catalog/laptops/ultrabook" },
            { titleKey: "nav.business", href: "/catalog/laptops/business" },
            { titleKey: "nav.macLike", href: "/catalog/laptops/premium" },
            { titleKey: "nav.designWork", href: "/catalog/laptops/design" },
          ],
        },
      ],
    },
  },

  {
    id: "printers",
    icon: "printer",
    titleKey: "nav.printers",
    href: "/catalog/printers",
    menuComponent: "MegaMenu1",
    menuData: {
      categories: [
        {
          titleKey: "nav.inkjet",
          href: "/catalog/printers/inkjet",
          subCategories: [
            { titleKey: "brand.epson", href: "/catalog/printers/epson" },
            { titleKey: "brand.canon", href: "/catalog/printers/canon" },
            { titleKey: "nav.homePrinters", href: "/catalog/printers/home" },
            { titleKey: "nav.wifiPrinters", href: "/catalog/printers/wifi" },
            { titleKey: "nav.photoPrinters", href: "/catalog/printers/photo" },
          ],
        },
        {
          titleKey: "nav.laser",
          href: "/catalog/printers/laser",
          subCategories: [
            { titleKey: "nav.monoLaser", href: "/catalog/printers/mono" },
            { titleKey: "nav.colorLaser", href: "/catalog/printers/color" },
            {
              titleKey: "nav.officePrinters",
              href: "/catalog/printers/office",
            },
            { titleKey: "nav.fastPrinters", href: "/catalog/printers/fast" },
          ],
        },
        {
          titleKey: "nav.mfu",
          href: "/catalog/printers/mfu",
          subCategories: [
            { titleKey: "nav.printScanCopy", href: "/catalog/printers/mfu" },
            { titleKey: "nav.officeMfu", href: "/catalog/printers/mfu-office" },
            {
              titleKey: "nav.businessMfu",
              href: "/catalog/printers/mfu-business",
            },
          ],
        },
        {
          titleKey: "nav.supplies",
          href: "/catalog/supplies",
          subCategories: [
            { titleKey: "nav.inks", href: "/catalog/supplies/ink" },
            { titleKey: "nav.cartridges", href: "/catalog/supplies/cartridge" },
            { titleKey: "nav.toner", href: "/catalog/supplies/toner" },
            { titleKey: "nav.paper", href: "/catalog/supplies/paper" },
          ],
        },
      ],
    },
  },

  {
    id: "computers",
    icon: "desktop",
    titleKey: "nav.computers",
    href: "/catalog/computers",
    menuComponent: "MegaMenu1",
    menuData: {
      categories: [
        {
          titleKey: "nav.readyPc",
          href: "/catalog/pc",
          subCategories: [
            { titleKey: "nav.officePc", href: "/catalog/pc/office" },
            { titleKey: "nav.homePc", href: "/catalog/pc/home" },
            { titleKey: "nav.gamingPc", href: "/catalog/pc/gaming" },
            { titleKey: "nav.businessPc", href: "/catalog/pc/business" },
          ],
        },
        {
          titleKey: "nav.buildPc",
          href: "/catalog/build",
          subCategories: [
            { titleKey: "nav.customPc", href: "/catalog/build/custom" },
            { titleKey: "nav.gamingBuild", href: "/catalog/build/gaming" },
            { titleKey: "nav.workstation", href: "/catalog/build/workstation" },
          ],
        },
        {
          titleKey: "nav.monitors",
          href: "/catalog/monitors",
          subCategories: [
            { titleKey: "nav.monitor24", href: "/catalog/monitors/24" },
            { titleKey: "nav.monitor27", href: "/catalog/monitors/27" },
            {
              titleKey: "nav.gamingMonitors",
              href: "/catalog/monitors/gaming",
            },
            { titleKey: "nav.curved", href: "/catalog/monitors/curved" },
          ],
        },
      ],
    },
  },

  {
    id: "components",
    icon: "cpu",
    titleKey: "nav.components",
    href: "/catalog/components",
    menuComponent: "MegaMenu1",
    menuData: {
      categories: [
        {
          titleKey: "nav.coreParts",
          href: "/catalog/components/core",
          subCategories: [
            { titleKey: "nav.cpu", href: "/catalog/components/cpu" },
            {
              titleKey: "nav.motherboard",
              href: "/catalog/components/motherboard",
            },
            { titleKey: "nav.ram", href: "/catalog/components/ram" },
            { titleKey: "nav.ssd", href: "/catalog/components/ssd" },
          ],
        },
        {
          titleKey: "nav.graphics",
          href: "/catalog/components/gpu",
          subCategories: [
            { titleKey: "nav.gpu", href: "/catalog/components/gpu" },
            { titleKey: "nav.power", href: "/catalog/components/power" },
            { titleKey: "nav.cooling", href: "/catalog/components/cooling" },
            { titleKey: "nav.case", href: "/catalog/components/case" },
          ],
        },
      ],
    },
  },

  {
    id: "accessories",
    icon: "mouse",
    titleKey: "nav.accessories",
    href: "/catalog/accessories",
    menuComponent: "MegaMenu1",
    menuData: {
      categories: [
        {
          titleKey: "nav.peripherals",
          href: "/catalog/peripherals",
          subCategories: [
            { titleKey: "nav.mouse", href: "/catalog/peripherals/mouse" },
            { titleKey: "nav.keyboard", href: "/catalog/peripherals/keyboard" },
            {
              titleKey: "nav.headphones",
              href: "/catalog/peripherals/headphones",
            },
            { titleKey: "nav.speakers", href: "/catalog/peripherals/speakers" },
          ],
        },
        {
          titleKey: "nav.pcAccessories",
          href: "/catalog/pc-accessories",
          subCategories: [
            { titleKey: "nav.bags", href: "/catalog/bags" },
            { titleKey: "nav.stands", href: "/catalog/stands" },
            { titleKey: "nav.webcams", href: "/catalog/webcams" },
          ],
        },
      ],
    },
  },

  {
    id: "network",
    icon: "router",
    titleKey: "nav.network",
    href: "/catalog/network",
    menuComponent: "MegaMenu1",
    menuData: {
      categories: [
        {
          titleKey: "nav.wifi",
          href: "/catalog/network/wifi",
          subCategories: [
            { titleKey: "nav.routers", href: "/catalog/network/router" },
            { titleKey: "nav.mesh", href: "/catalog/network/mesh" },
            { titleKey: "nav.adapters", href: "/catalog/network/adapter" },
          ],
        },
        {
          titleKey: "nav.cables",
          href: "/catalog/network/cables",
          subCategories: [
            { titleKey: "nav.hdmi", href: "/catalog/network/hdmi" },
            { titleKey: "nav.typec", href: "/catalog/network/typec" },
            { titleKey: "nav.usb", href: "/catalog/network/usb" },
          ],
        },
      ],
    },
  },

  // 🔥 ВАЖНО ДЛЯ ПРОДАЖ
  {
    id: "sale",
    icon: "gift-1",
    titleKey: "nav.sale",
    href: "/catalog/sale",
  },
  {
    id: "installment",
    icon: "credit-card",
    titleKey: "nav.installment",
    href: "/catalog/installment",
  },
  {
    id: "combo",
    icon: "bundle",
    titleKey: "nav.combo",
    href: "/catalog/combo",
  },
];

export default navigations;
