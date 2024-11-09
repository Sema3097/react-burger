import React, { FC, useState } from "react";
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
  clearConstructor,
} from "../../services/constructor-ingredients-save";
import { openModal } from "../../services/getting-and-updating-modal";
import { BurgerCostructorIngredient } from "./burger-costructor-ingredient";
import { useSendDataMutation } from "../../services/getting-order";
import { closesModal } from "../../services/getting-and-updating-modal";
import { useNavigate } from "react-router-dom";
import { Preloader } from "../uikit/modal-content/preloader";
import { refreshToken } from "../../utils/api";
import { Iingredient, IUserAuth } from "../../utils/types";

const BurgerConstructor: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const [sendData, { isLoading, isError, data: responseData }] =
    useSendDataMutation();

  const dispatch = useDispatch();

  const burgerFilling = useSelector(
    (state: { filling: { burgerFilling: Iingredient[] } }) =>
      state.filling.burgerFilling
  );
  const burgerBuns = useSelector(
    (state: { filling: { burgerBuns: Iingredient[] } }) =>
      state.filling.burgerBuns
  );
  const isOpenModalWindow = useSelector(
    (state: { updatingModal: { isOpenModal: boolean } }) =>
      state.updatingModal.isOpenModal
  );

  const closeOrderDetails = (): void => {
    dispatch(closesModal());
  };

  const allIngredients = [
    ...burgerBuns.map((item: Iingredient) => item._id),
    ...burgerFilling.map((item: Iingredient) => item._id),
    ...burgerBuns.map((item: Iingredient) => item._id),
  ];

  const user: IUserAuth = useSelector(
    (state: { user: { user: IUserAuth } }) => state.user.user
  );

  const navigate = useNavigate();

  const openModalWindow = async (): Promise<void> => {
    if (user) {
      setLoading(true);
      setTimeout(async () => {
        try {
          const dataToSend = { ingredients: allIngredients };
          await sendData(dataToSend);
          dispatch(openModal());
          dispatch(clearConstructor(null));
        } catch (error) {
          if (error instanceof Error && error.message === "jwt expired") {
            try {
              await refreshToken();
              openModalWindow();
            } catch (refreshError) {
              console.error("Failed to refresh token", refreshError);
            }
          }
        } finally {
          setLoading(false);
        }
      }, 15000);
    } else {
      navigate("/login");
    }
  };

  const deleteBurgerBuns = (uniqueid: string) => {
    dispatch(deleteBuns(uniqueid));
  };

  const [, dropRef] = useDrop({
    accept: "filling",
    drop: (item: Iingredient) => {
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
                handleClose={() => {
                  if (bun.uniqueid) {
                    deleteBurgerBuns(bun.uniqueid);
                  }
                }}
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
                handleClose={() => {
                  if (bun.uniqueid) {
                    deleteBurgerBuns(bun.uniqueid);
                  }
                }}
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
      {loading ? (
        <Modal loading={loading} closeOrderDetails={closeOrderDetails}>
          <Preloader />
        </Modal>
      ) : isLoading ? (
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
