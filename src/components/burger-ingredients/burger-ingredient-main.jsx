import React from "react";
import PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/types";
import { useGetFetchQuery } from "../../services/fetch-ingredients";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./item-ingredient.module.css";
import { useDispatch } from "react-redux";
import { openModal } from "../../services/add-data-to-modal";
import { addData } from "../../services/add-data-to-modal";

const BurgerIngredientMain = () => {
  const {
    ingredients = [],
    error,
    isSucces,
  } = useGetFetchQuery(undefined, {
    selectFromResult: ({ data }) => ({
      ingredients: data?.ingredients,
    }),
  });

  const mains = ingredients.filter((sauce) => sauce.type === "main");

  const dispatch = useDispatch();
  const openModalWindow = (e) => {
    dispatch(openModal(true));
    dispatch(addData(e));
  };

  if (error) return <h1>{error}</h1>;
  if (isSucces) return ingredients;

  return (
    <div className={styles.main}>
      <h2>Начинка</h2>
      <div className={styles.main_inner}>
        {mains.map((e) => (
          <div key={e._id} className={styles.main_item}>
            <div
              className={styles.main_item_card}
              onClick={() => openModalWindow(e)}
            >
              <Counter
                count={1}
                size="default"
                extraClass="m-1"
                className={styles.counter}
              />
              <img src={e.image} alt="logo" />
              <div className={styles.main_info}>
                <span className="text text_type_digits-default">{e.price}</span>
                <CurrencyIcon type="primary" />
              </div>
              <article className={`${styles.name} text text_type_main-default`}>
                {e.name}
              </article>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// BurgerIngredientMain.propTypes = {
//   ingredientsData: PropTypes.arrayOf(
//     PropTypes.shape(ingredientPropType.isRequired)
//   ).isRequired,
//   onOpen: PropTypes.func.isRequired,
// };

export { BurgerIngredientMain };
