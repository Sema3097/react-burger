import reducer, { openModal, closesModal } from "../getting-and-updating-modal";

describe("gettingAndUpdatingModal slice", () => {
  const initialState = {
    isOpenModal: false,
  };

  it("should handle initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("should handle openModal action", () => {
    const action = openModal();
    const newState = reducer(initialState, action);

    expect(newState.isOpenModal).toBe(true);
  });

  it("should handle closesModal action", () => {
    const action = closesModal();
    const newState = reducer(initialState, action);

    expect(newState.isOpenModal).toBe(false);
  });

  it("should toggle modal state correctly", () => {
    const openAction = openModal();
    let state = reducer(initialState, openAction);
    expect(state.isOpenModal).toBe(true);

    const closeAction = closesModal();
    state = reducer(state, closeAction);
    expect(state.isOpenModal).toBe(false);
  });
});
