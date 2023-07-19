import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { Recipe } from "../pages/Recipe/Recipe";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/recipe" element={<Recipe />}></Route>
    </Routes>
  );
}

export default App;
