import Box from "../Box";
import Card from "../Card";
import FlexBox from "../FlexBox";
import NavLink from "../nav-link";
import MenuItem from "../MenuItem";
import Container from "../Container";
import { Span } from "../Typography";
import StyledNavbar from "./styles";
import navbarNavigations from "@data/navbarNavigations";

interface Nav {
  title: string;
  url?: string;
  extLink?: boolean;
  child?: Nav[];
}

type NavbarProps = { navListOpen?: boolean };

const NavItem = ({ nav, isRoot = false }: { nav: Nav; isRoot?: boolean }) => {
  const href = nav.url || "/";
  const childList = nav.child || [];
  const label = <Span fontSize="14px">{nav.title}</Span>;

  if (nav.url && nav.extLink) {
    return (
      <NavLink href={href} target="_blank" className="nav-link" rel="noopener noreferrer">
        {nav.title}
      </NavLink>
    );
  }

  if (nav.child) {
    if (isRoot) {
      return (
        <FlexBox className="root" position="relative" flexDirection="column" alignItems="center">
          <Span className="nav-link">{nav.title}</Span>
          <Box className="root-child">
            <Card mt="1.25rem" py="0.5rem" borderRadius={8} boxShadow="large" minWidth="230px">
              {childList.map((child) => (
                <NavItem key={child.title} nav={child} />
              ))}
            </Card>
          </Box>
        </FlexBox>
      );
    }

    return (
      <Box className="parent" position="relative" minWidth="230px">
        <MenuItem color="gray.700">
          <Span flex="1 1 0" fontSize="14px">{nav.title}</Span>
        </MenuItem>
        <Box className="child" pl="0.5rem">
          <Card py="0.5rem" borderRadius={8} boxShadow="large" minWidth="230px">
            {childList.map((child) => (
              <NavItem key={child.title} nav={child} />
            ))}
          </Card>
        </Box>
      </Box>
    );
  }

  if (nav.url) {
    return (
      <NavLink href={href} className={isRoot ? "nav-link" : ""}>
        {isRoot ? nav.title : <MenuItem>{label}</MenuItem>}
      </NavLink>
    );
  }

  return null;
};

export default function Navbar2(_props: NavbarProps) {
  return (
    <StyledNavbar>
      <Container display="flex" justifyContent="space-between" alignItems="center" height="100%">
        <FlexBox alignItems="center" gap="1.5rem">
          {navbarNavigations.map((nav) => (
            <NavItem key={nav.title} nav={nav} isRoot />
          ))}
        </FlexBox>
      </Container>
    </StyledNavbar>
  );
}
