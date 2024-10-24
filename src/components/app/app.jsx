import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "../../pages/home";
import { LoginPage } from "../../pages/login";
import { RegisterPage } from "../../pages/register";
import { ResetPassword } from "../../pages/reset-password";
import { ForgotPassword } from "../../pages/forgot-password";
import { LayoutHeader } from "../app-header/layout-header";
import { Orders } from "../../pages/orders/orders";
import { ChangeDataForm } from "../../pages/profile/change-data-form";
import { LayoutProfile } from "../../pages/profile/layout-profile";
import { Modal } from "../uikit/modal";
import { IngredientDetails } from "../uikit/modal-content/ingredient-details";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useGetFetchQuery } from "../../services/fetch-ingredients";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../utils/api";
import { setUser } from "../../services/safety/user";
import { setIsAuthChecked } from "../../services/safety/user";

const App = () => {
  const {
    ingredients = [],
    error,
    isSucces,
  } = useGetFetchQuery(undefined, {
    selectFromResult: ({ data }) => ({
      ingredients: data?.ingredients,
    }),
  });

  const [ingredientId, setIngredientId] = useState(null);
  const dispatch = useDispatch();

  const location = useLocation();
  const state = location.state;

  useEffect(() => {
    const fetchUser = async () => {
      if (localStorage.getItem("accessToken")) {
        try {
          const user = await getUser();
          dispatch(setUser(user));
        } catch (err) {
          console.error("Failed to fetch user:", err);
        } finally {
          dispatch(setIsAuthChecked(true));
        }
      } else {
        dispatch(setIsAuthChecked(true));
      }
      const ingredientIdFromUrl = location.pathname.split("/").pop();
      setIngredientId(ingredientIdFromUrl);
    };

    fetchUser();
  }, [location, dispatch]);

  const user = useSelector((state) => state.user.user);
  const auth = useSelector((state) => state.user.isAuthChecked);
  console.log(user);
  console.log(auth);
  // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MTc5OGE5ZDgyOWJlMDAxYzc3N2E1NiIsImlhdCI6MTcyOTc1NzIzNCwiZXhwIjoxNzI5NzU4NDM0fQ.DLWFvtTYp54HL--hA7orpfzE_7z6WlXZPjJAwOjDXEY

  if (error) return <h1>{error}</h1>;
  if (isSucces) return ingredients;

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        {state?.backgroundLocation && ingredientId && (
          <Routes>
            <Route
              path="/ingredients/:id"
              element={
                <Modal title="Детали ингредиента">
                  <IngredientDetails ingredients={ingredients} />
                </Modal>
              }
            />
          </Routes>
        )}
        <Routes location={state?.backgroundLocation || location}>
          <Route element={<LayoutHeader />}>
            <Route path="/" element={<HomePage ingredients={ingredients} />} />
            <Route
              path="/ingredients/:id"
              element={<IngredientDetails ingredients={ingredients} />}
            />
            <Route path="/profile" element={<LayoutProfile />}>
              <Route index element={<ChangeDataForm />} />
              <Route path="orders" element={<Orders />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Route>
        </Routes>
      </div>
    </DndProvider>
  );
};

export { App };
