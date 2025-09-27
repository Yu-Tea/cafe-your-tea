import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home";
import Header from "./shared/components/Header";
import Footer from "./shared/components/Footer";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
