import reducer, {
  addFilling,
  deleteFilling,
  addBuns,
  deleteBuns,
  transferIngredients,
  clearConstructor,
} from "../constructor-ingredients-save";

describe("constructorSlice", () => {
  const initialState = {
    burgerFilling: [],
    burgerBuns: [],
  };

  it("should handle initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("should add filling correctly", () => {
    const ingredient = { name: "Lettuce", type: "vegetable", price: 1 };
    const action = addFilling(ingredient);
    const newState = reducer(initialState, action);

    expect(newState.burgerFilling.length).toBe(1);
    expect(newState.burgerFilling[0].name).toBe("Lettuce");
    expect(newState.burgerFilling[0].uniqueid).toBeDefined();
  });

  it("should not add bun to filling", () => {
    const bun = { name: "Bun", type: "bun", price: 2 };
    const action = addFilling(bun);
    const newState = reducer(initialState, action);

    expect(newState.burgerFilling.length).toBe(0);
  });

  it("should delete filling correctly", () => {
    const ingredient = { name: "Lettuce", type: "vegetable", price: 1 };
    const addAction = addFilling(ingredient);
    const addState = reducer(initialState, addAction);
    const deleteAction = deleteFilling(addState.burgerFilling[0].uniqueid);
    const deleteState = reducer(addState, deleteAction);

    expect(deleteState.burgerFilling.length).toBe(0);
  });

  it("should add buns correctly", () => {
    const bun = { name: "Bun", type: "bun", price: 2 };
    const action = addBuns(bun);
    const newState = reducer(initialState, action);

    expect(newState.burgerBuns.length).toBe(1);
    expect(newState.burgerBuns[0].name).toBe("Bun");
    expect(newState.burgerBuns[0].uniqueid).toBeDefined();
  });

  it("should delete buns correctly", () => {
    const bun = { name: "Bun", type: "bun", price: 2 };
    const addAction = addBuns(bun);
    const addState = reducer(initialState, addAction);
    const deleteAction = deleteBuns(addState.burgerBuns[0].uniqueid);
    const deleteState = reducer(addState, deleteAction);

    expect(deleteState.burgerBuns.length).toBe(0);
  });

  it("should transfer ingredients correctly", () => {
    const ingredient1 = { name: "Lettuce", type: "vegetable", price: 1 };
    const ingredient2 = { name: "Tomato", type: "vegetable", price: 1.5 };

    const addAction1 = addFilling(ingredient1);
    const addAction2 = addFilling(ingredient2);
    let state = reducer(initialState, addAction1);
    state = reducer(state, addAction2);

    expect(state.burgerFilling[0].name).toBe("Lettuce");
    expect(state.burgerFilling[1].name).toBe("Tomato");

    const transferAction = transferIngredients({ dragIndex: 0, hoverIndex: 1 });
    const newState = reducer(state, transferAction);

    expect(newState.burgerFilling[0].name).toBe("Tomato");
    expect(newState.burgerFilling[1].name).toBe("Lettuce");
  });

  it("should clear the constructor", () => {
    const ingredient = { name: "Lettuce", type: "vegetable", price: 1 };
    const bun = { name: "Bun", type: "bun", price: 2 };
    const addAction1 = addFilling(ingredient);
    const addAction2 = addBuns(bun);
    let state = reducer(initialState, addAction1);
    state = reducer(state, addAction2);

    expect(state.burgerFilling.length).toBe(1);
    expect(state.burgerBuns.length).toBe(1);

    const clearAction = clearConstructor();
    const newState = reducer(state, clearAction);

    expect(newState.burgerFilling.length).toBe(0);
    expect(newState.burgerBuns.length).toBe(0);
  });
});
