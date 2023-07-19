import { HiArrowLeft } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import css from "./Recipe.module.css";

export function Recipe() {
  const location = useLocation();
  const recipeItem = location.state?.item;

  return (
    <div className={css.main}>
      <Link className={css.goBackIcon} to={`/`}>
        <HiArrowLeft size="30" /> Go back
      </Link>
      <div className={css.container}>
        <div className={css.imageWrapper}>
          <img src={recipeItem.image_url} alt="container for beer" />
        </div>
        <div>
          <h3 className={css.title}>Name: {recipeItem.name}</h3>
          <p className={css.tagline}>Tagline: {recipeItem.tagline}</p>
          <p className={css.description}>
            Description: {recipeItem.description}
          </p>
          <p className={css.textPh}>ph: {recipeItem.ph}</p>
          <p className={css.textSrm}>srm: {recipeItem.srm}</p>
          <p className={css.brewersTips}>
            Brewers tips: {recipeItem.brewers_tips}
          </p>
          <p className={css.contributor}>
            Contributed by: {recipeItem.contributed_by}
          </p>
        </div>
      </div>
    </div>
  );
}
