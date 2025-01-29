import reducer, {
  setUser,
  setIsAuthChecked,
  logout,
  login,
  getUser,
  getIsAuthChecked,
} from '../user';

describe("userSlice", () => {
  const initialState = {
    user: null,
    isAuthChecked: false,
  };

  const mockUser = {
    id: "1",
    name: "John Doe",
    email: "johndoe@example.com",
  };

  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("should handle setUser", () => {
    const nextState = reducer(initialState, setUser(mockUser));
    expect(nextState.user).toEqual(mockUser);
  });

  it("should handle setIsAuthChecked", () => {
    const nextState = reducer(initialState, setIsAuthChecked(true));
    expect(nextState.isAuthChecked).toBe(true);
  });

  it("should handle logout", () => {
    const currentState = {
      user: mockUser,
      isAuthChecked: true,
    };
    const nextState = reducer(currentState, logout());
    expect(nextState.user).toBeNull();
    expect(nextState.isAuthChecked).toBe(true);
  });

  it("should handle login", () => {
    const nextState = reducer(initialState, login(mockUser));
    expect(nextState.user).toEqual(mockUser);
    expect(nextState.isAuthChecked).toBe(true);
  });

  it("should select user using getUser", () => {
    const state = {
      user: {
        user: mockUser,
        isAuthChecked: true,
      },
    };
    expect(getUser(state)).toEqual(mockUser);
  });

  it("should select isAuthChecked using getIsAuthChecked", () => {
    const state = {
      user: {
        user: mockUser,
        isAuthChecked: true,
      },
    };
    expect(getIsAuthChecked(state)).toBe(true);
  });
});