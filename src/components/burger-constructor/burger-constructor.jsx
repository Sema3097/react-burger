import React from "react";
import {
  CurrencyIcon,
  Button,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-construction.module.css";
import { Modal } from "../uikit/modal";
import { OrderDetails } from "../uikit/modal-content/order-details";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import {
  addFilling,
  addBuns,
  deleteBuns,
  clearConstructor
} from "../../services/constructor-ingredients-save";
import { openModal } from "../../services/getting-and-updating-modal";
import { BurgerCostructorIngredient } from "./burger-costructor-ingredient";
import { useSendDataMutation } from "../../services/getting-order";
import { closesModal } from "../../services/getting-and-updating-modal";

const BurgerConstructor = () => {
  const [sendData, { isLoading, isError, data: responseData }] =
    useSendDataMutation();

  const dispatch = useDispatch();

  const burgerFilling = useSelector((state) => state.filling.burgerFilling);
  const burgerBuns = useSelector((state) => state.filling.burgerBuns);
  const isOpenModalWindow = useSelector(
    (state) => state.updatingModal.isOpenModal
  );

  const closeOrderDetails = () => {
    dispatch(closesModal(false));
  };

  const allIngredients = [
    ...burgerBuns.map((item) => item._id),
    ...burgerFilling.map((item) => item._id),
    ...burgerBuns.map((item) => item._id),
  ];

  const openModalWindow = async () => {
    try {
      const dataToSend = { ingredients: allIngredients };
      await sendData(dataToSend)
        .then(() => {
          dispatch(openModal(true));
          dispatch(clearConstructor());
        });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteBurgerBuns = (uniqueid) => {
    dispatch(deleteBuns(uniqueid));
  };

  const [, dropRef] = useDrop({
    accept: "filling",
    drop: (item) => {
      if (item.type === "bun") {
        dispatch(addBuns(item));
      } else {
        dispatch(addFilling(item));
      }
    },
  });

  const totalPrice = burgerFilling.reduce(
    (acc, item) => acc + item.price,
    0 + burgerBuns.reduce((acc, item) => acc + item.price, 0) * 2
  );

  return (
    <section className={styles.container} ref={dropRef}>
      <div className={styles.constructor_container}>
        <div>
          {burgerBuns.length === 0 ? (
            <h1 className="text text_type_main-medium text_color_inactive">
              Добавьте булку
            </h1>
          ) : (
            burgerBuns.map((bun) => (
              <ConstructorElement
                key={bun.uniqueid}
                type="top"
                isLocked={false}
                text={bun.name + "(верх)"}
                price={bun.price}
                thumbnail={bun.image}
                handleClose={() => deleteBurgerBuns(bun.uniqueid)}
              />
            ))
          )}
        </div>
        <div className={styles.constructor_items}>
          {burgerFilling.length === 0 ? (
            <h1
              className={`${styles.burgerFilling_title} text text_type_main-medium text_color_inactive`}
            >
              Список игредиентов пуст
            </h1>
          ) : (
            burgerFilling.map((ingredient, index) => (
              <BurgerCostructorIngredient
                key={ingredient.uniqueid}
                ingredient={ingredient}
                index={index}
                id={ingredient._id}
              />
            ))
          )}
        </div>
        <div>
          {burgerBuns.length === 0 ? (
            <h1 className="text text_type_main-medium text_color_inactive">
              Добавьте булку
            </h1>
          ) : (
            burgerBuns.map((bun) => (
              <ConstructorElement
                key={bun.uniqueid}
                type="bottom"
                isLocked={false}
                text={bun.name + "(низ)"}
                price={bun.price}
                thumbnail={bun.image}
                handleClose={() => deleteBurgerBuns(bun.uniqueid)}
              />
            ))
          )}
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.footer_inner}>
          <p className="text text_type_digits-medium">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          onClick={openModalWindow}
          htmlType="button"
          type="primary"
          size="large"
        >
          Оформить заказ
        </Button>
      </div>
      {isLoading ? (
        <h1>Подождите...</h1>
      ) : (
        responseData &&
        isOpenModalWindow &&
        (isError ? (
          <h1>Произошла ошибка, попробуйте повторить позже</h1>
        ) : (
          <Modal closeOrderDetails={closeOrderDetails}>
            <OrderDetails responseData={responseData} />
          </Modal>
        ))
      )}
    </section>
  );
};

export { BurgerConstructor };
