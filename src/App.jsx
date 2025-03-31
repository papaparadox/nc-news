import Header from "./components/header/Header";
import { Routes, Route } from "react-router";
import "./styles.css";
import ListOfArticles from "./components/main/ListOfArticles";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<ListOfArticles />} />
      </Routes>
    </>
  );
}

export default App;
