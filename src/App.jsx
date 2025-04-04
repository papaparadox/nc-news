import Header from "./components/header/Header";
import { Routes, Route } from "react-router";
import "./styles.css";
import ListOfArticles from "./components/main/ListOfArticles";
import ListOfTopics from "./components/main/ListOfTopics";
import ArticleById from "./components/main/ArticleById";
import ErrorPage from "./components/main/ErrorPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<ListOfArticles key={location.pathname} />} />
        <Route path='/articles/:article_id' element={<ArticleById />} />
        <Route path='/topics' element={<ListOfTopics />} />
        <Route path='/:topic_name/articles' element={<ListOfArticles />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
