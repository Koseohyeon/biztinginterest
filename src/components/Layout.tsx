
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

export default function Layout({ children }:{ children: React.ReactNode }) {

  return (

    <div className="tw-min-h-screen tw-flex tw-flex-col">

      <Header />

      <main className="tw-flex-1 tw-max-w-7xl tw-mx-auto tw-w-full tw-p-8">
        {children}
      </main>

      <Footer />

    </div>

  );

}