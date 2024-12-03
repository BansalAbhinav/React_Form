import Fetched from "./components/Fetched";
import Footer from "./components/Footer";
import Header from "./components/Header";

const App = () => {
  return (
    <>
      <div className="min-h-[100vh] flex flex-col">
        <Header />
        <Fetched />
        <Footer />
      </div>
    </>
  );
};
export default App;
