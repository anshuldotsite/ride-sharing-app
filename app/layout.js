import "./styles/globals.css";
import Providers from "./providers";
import ClientToast from "./components/clientToast";

export const metadata = {
  title: "RideShare",
  description: "Ride sharing web app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Providers>
          {children}
          <ClientToast />
        </Providers>
      </body>
    </html>
  );
}
