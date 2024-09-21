import React from "react";
import PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/types";
import {
  CurrencyIcon,
  Button,
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-construction.module.css";

const BurgerConstructor = ({ data }) => {
  const buns = data.filter((bun) => bun.type === "bun");
  const sauces = data.filter((sauce) => sauce.type === "sauce");
  const mains = data.filter((main) => main.type === "main");

  return (
    <section className={styles.container}>
      <div className={styles.constructor_container}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={200}
          thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
        />
        <div className={styles.constructor_items}>
          {buns.map((e) => (
            <div key={e._id}>
              <DragIcon type="primary" />
              <ConstructorElement
                isLocked={false}
                text={e.name}
                price={e.price}
                thumbnail={e.image}
              />
            </div>
          ))}
          {sauces.map((e) => (
            <div key={e._id}>
              <DragIcon type="primary" />
              <ConstructorElement
                isLocked={true}
                text={e.name}
                price={e.price}
                thumbnail={e.image}
              />
            </div>
          ))}
          {mains.map((e) => (
            <div key={e._id}>
              <DragIcon type="primary" />
              <ConstructorElement
                isLocked={true}
                text={e.name}
                price={e.price}
                thumbnail={e.image}
              />
            </div>
          ))}
        </div>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (низ)"
          price={200}
          thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
        />
      </div>
      <div className={styles.footer}>
        <div className={styles.footer_inner}>
          <p className="text text_type_digits-medium">610</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(ingredientPropType.isRequired))
    .isRequired,
};

export { BurgerConstructor };
