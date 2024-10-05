import React from "react";
import PropTypes from "prop-types";
import { ingredientPropType } from "../../../utils/types";
import styles from "./modal-content.module.css";
import { useSelector } from "react-redux";

const IngredientDetails = () => {
  const ingredientDescription = useSelector(
    (state) => state.addData.ingredientDescription
  );

  return (
    <>
      <div className={styles.IngredientDetails_container}>
        <img
          className={styles.IngredientDetails_img}
          src={ingredientDescription.image}
          alt="logo"
        />
        <h2
          className={`${styles.IngredientDetails_title} text text_type_main-medium`}
        >
          {ingredientDescription.name}
        </h2>
        <div
          className={`${styles.IngredientDetails_inner} text text_type_main-default text_color_inactive`}
        >
          <div className={styles.IngredientDetails_description}>
            <p className={styles.description_title}>Калории, ккал</p>
            <p
              className={`${styles.description_info} text text_type_digits-default`}
            >
              {ingredientDescription.calories}
            </p>
          </div>
          <div className={styles.IngredientDetails_description}>
            <p className={styles.description_title}>Белки, г</p>
            <p
              className={`${styles.description_info} text text_type_digits-default`}
            >
              {ingredientDescription.proteins}
            </p>
          </div>
          <div className={styles.IngredientDetails_description}>
            <p className={styles.description_title}>Жиры, г</p>
            <p
              className={`${styles.description_info} text text_type_digits-default`}
            >
              {ingredientDescription.fat}
            </p>
          </div>
          <div className={styles.IngredientDetails_description}>
            <p className={styles.description_title}>Углеводы, г</p>
            <p
              className={`${styles.description_info} text text_type_digits-default`}
            >
              {ingredientDescription.carbohydrates}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

// IngredientDetails.propTypes = {
//   ingredientDescription: PropTypes.shape(ingredientPropType.isRequired)
//     .isRequired,
// };

export { IngredientDetails };
