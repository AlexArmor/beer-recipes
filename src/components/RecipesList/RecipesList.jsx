import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRecipes } from "../../zustand/store";
import { shallow } from "zustand/shallow";
import { truncateString } from "../../helpers/string";
import css from "./RecipesList.module.css";

export function RecipesList() {
  const [shortRecipes, setShortRecipes] = useState([]);
  const [idArray, setIdArray] = useState([]);
  const { fetchRecipes, deleteItems, recipes, setPage } = useRecipes(
    (state) => ({
      fetchRecipes: state.fetchRecipes,
      recipes: state.recipes,
      deleteItems: state.deleteItems,
      setPage: state.setPage,
    }),
    shallow
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (recipes.length) {
      if (recipes.length < 15) {
        console.log("Зашёл в IF ELSE где проверка на длину");
        setPage();
        fetchRecipes();
      }
      const renderData = recipes.slice(0, 15);
      setShortRecipes(renderData);
    } else {
      console.log("Зашёл в ELSE");
      fetchRecipes();
    }

    function getMoreByScroll() {
      if (
        window.scrollY + document.documentElement.clientHeight >=
          document.documentElement.scrollHeight &&
        recipes.length > 10
      ) {
        const dataForStore = recipes.slice(5);
        const stateData = shortRecipes.slice(5);
        deleteItems(dataForStore);
        setShortRecipes(stateData);
      }
    }

    window.addEventListener("scroll", getMoreByScroll);

    return () => {
      window.removeEventListener("scroll", getMoreByScroll);
    };
  }, [recipes]);

  const onRightButtonClick = (event, id) => {
    event.preventDefault();
    if (idArray.includes(id)) {
      const dataID = idArray.filter((item) => item !== id);
      setIdArray(dataID);
    } else {
      setIdArray([...idArray, id]);
    }
  };

  const onDeleteButtonClick = () => {
    const filteredDataForShortRecipes = shortRecipes.filter(
      (item) => !idArray.includes(item.id)
    );
    const filteredDataRecipes = recipes.filter(
      (item) => !idArray.includes(item.id)
    );
    deleteItems(filteredDataRecipes);
    setShortRecipes(filteredDataForShortRecipes);
    setIdArray([]);
  };

  return (
    <div className={css.main}>
      <ul className={css.list}>
        {shortRecipes.map((item) => (
          <li
            className={css.itemList}
            key={item.id}
            onClick={() => navigate("/recipe", { state: { item } })}
          >
            <div
              className={`${css.container} ${
                idArray.includes(item.id) ? css.active : undefined
              }`}
              onContextMenu={(event) => onRightButtonClick(event, item.id)}
            >
              <div className={css.image}>
                <img className={css.beerIcon} src={item.image_url} />
              </div>
              <div className={css.info}>
                <h3 className={css.title}>name: {item.name}</h3>
                <p className={css.description}>
                  {truncateString(item.description)}
                </p>
                <p className={css.contributor}>author: {item.contributed_by}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <button
        className={css.btn}
        type="button"
        disabled={idArray.length ? false : true}
        onClick={onDeleteButtonClick}
      >
        Delete selected
      </button>
    </div>
  );
}
