import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-construction.module.css";
import { useDispatch } from "react-redux";
import {
  deleteFilling,
  transferIngredients,
} from "../../services/constructor-ingredients-save";

const BurgerCostructorIngredient = ({ id, ingredient, index }) => {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const deleteIngredient = (uniqueid) => {
    dispatch(deleteFilling(uniqueid));
  };
  const moveIngredients = (dragIndex, hoverIndex) => {
    dispatch(transferIngredients({ dragIndex, hoverIndex }));
  };

  const [{ isDragging }, dragRef] = useDrag({
    type: "ingredient",
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: "ingredient",
    hover: (item, monitor) => {
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveIngredients(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const opacity = isDragging ? 0 : 1;

  dragRef(dropRef(ref));

  return (
    <div
      ref={ref}
      className={styles.constructor_items_filling}
      style={{ opacity }}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        isLocked={false}
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() => deleteIngredient(ingredient.uniqueid)}
      />
    </div>
  );
};

export { BurgerCostructorIngredient };
