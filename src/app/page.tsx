import AppLayout from "@component/layout/layout-1";
import Navbar from "@component/navbar/Navbar";
import HomePage from "@sections/home/HomePage";

export default function Home() {
  return (
    <AppLayout navbar={<Navbar navListOpen />}>
      <HomePage />
    </AppLayout>
  );
}
