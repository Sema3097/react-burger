import React, { FC, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-construction.module.css";
import {
  deleteFilling,
  transferIngredients,
} from "../../services/constructor-ingredients-save";
import { Iingredient } from "../../utils/types";
import { useAppDispatch } from "../../services/hooks/redux";

interface IBurgerCostructorIngredient {
  id: string;
  ingredient: Iingredient;
  index: number;
}

interface ITranstionItem {
  id: string;
  index: number;
}

const BurgerCostructorIngredient: FC<IBurgerCostructorIngredient> = ({
  id,
  ingredient,
  index,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const dispatch = useAppDispatch();
  const deleteIngredient = (uniqueid: string) => {
    dispatch(deleteFilling(uniqueid));
  };
  const moveIngredients = (dragIndex: number, hoverIndex: number) => {
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
    hover: (item: ITranstionItem, monitor) => {
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      if (!hoverBoundingRect) return;

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      if (clientOffset) {
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
        }
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
        }
        moveIngredients(dragIndex, hoverIndex);
        item.index = hoverIndex;
      }
    },
  });

  const opacity: number = isDragging ? 0 : 1;

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
        handleClose={() => {
          if (ingredient.uniqueid) {
            deleteIngredient(ingredient.uniqueid);
          }
        }}
      />
    </div>
  );
};

export { BurgerCostructorIngredient };
