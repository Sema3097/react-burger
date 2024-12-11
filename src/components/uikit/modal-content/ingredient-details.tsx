import React, { FC } from "react";
import styles from "./modal-content.module.css";
import { useParams } from "react-router-dom";
import { Iingredient } from "../../../utils/types";

interface IIngredientDetails {
  ingredients: Iingredient[];
}

const IngredientDetails: FC<IIngredientDetails> = ({ ingredients }) => {
  const { id } = useParams<Record<string, string | undefined>>();
  const ingredient = ingredients.find((elem) => elem._id === id);

  if (!ingredient) {
    return <h1>Подождите...</h1>;
  }

  return (
    <>
      <div className={styles.IngredientDetails_container}>
        <img
          className={styles.IngredientDetails_img}
          src={ingredient.image}
          alt="logo"
        />
        <h2
          className={`${styles.IngredientDetails_title} text text_type_main-medium`}
        >
          {ingredient.name}
        </h2>
        <div
          className={`${styles.IngredientDetails_inner} text text_type_main-default text_color_inactive`}
        >
          <div className={styles.IngredientDetails_description}>
            <p className={styles.description_title}>Калории, ккал</p>
            <p
              className={`${styles.description_info} text text_type_digits-default`}
            >
              {ingredient.calories}
            </p>
          </div>
          <div className={styles.IngredientDetails_description}>
            <p className={styles.description_title}>Белки, г</p>
            <p
              className={`${styles.description_info} text text_type_digits-default`}
            >
              {ingredient.proteins}
            </p>
          </div>
          <div className={styles.IngredientDetails_description}>
            <p className={styles.description_title}>Жиры, г</p>
            <p
              className={`${styles.description_info} text text_type_digits-default`}
            >
              {ingredient.fat}
            </p>
          </div>
          <div className={styles.IngredientDetails_description}>
            <p className={styles.description_title}>Углеводы, г</p>
            <p
              className={`${styles.description_info} text text_type_digits-default`}
            >
              {ingredient.carbohydrates}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export { IngredientDetails };
