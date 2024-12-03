import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "../../pages/home";
import { LoginPage } from "../../pages/login";
import { RegisterPage } from "../../pages/register";
import { ResetPassword } from "../../pages/reset-password";
import { ForgotPassword } from "../../pages/forgot-password";
import { LayoutHeader } from "../app-header/layout-header";
import { FeedOrders } from "../../pages/orders/orders";
import { ChangeDataForm } from "../../pages/profile/change-data-form";
import { LayoutProfile } from "../../pages/profile/layout-profile";
import { Modal } from "../uikit/modal";
import { IngredientDetails } from "../uikit/modal-content/ingredient-details";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useGetFetchQuery } from "../../services/fetch-ingredients";
import { FC, useEffect, useState } from "react";
import { getUser, refreshToken } from "../../utils/api";
import { setUser } from "../../services/safety/user";
import { setIsAuthChecked } from "../../services/safety/user";
import { OnlyAuth, OnlyUnAuth } from "../protected/protected-route";
import { NotFoundPages } from "../../pages/not-found-pages";
import { Feed } from "../../pages/feed/feed";
import { Iingredient } from "../../utils/types";
import { useAppDispatch } from "../../services/hooks/redux";
import { ViewOrder } from "../uikit/modal-content/view-order";

const App: FC = () => {
  const { data, error, isSuccess } = useGetFetchQuery(undefined);

  const ingredients: Iingredient[] = data || [];
  const [ingredientId, setIngredientId] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const location = useLocation();
  const state = location.state;

  useEffect(() => {
    const fetchUser = async (): Promise<void> => {
      if (localStorage.getItem("accessToken")) {
        try {
          const user = await getUser();
          dispatch(setUser(user));
        } catch (err) {
          if (typeof err === "object" && err !== null && "message" in err) {
            const errorMessage = (err as { message: string }).message;
            if (errorMessage === "jwt expired") {
              await refreshToken();
              fetchUser();
            }
          }
        } finally {
          dispatch(setIsAuthChecked(true));
        }
      } else {
        dispatch(setIsAuthChecked(true));
      }
      const ingredientIdFromUrl: string | undefined = location.pathname
        .split("/")
        .pop();
      if (ingredientIdFromUrl) {
        setIngredientId(ingredientIdFromUrl);
      }
    };

    fetchUser();
  }, [location, dispatch]);

  if (error) return <h1>{JSON.stringify(error)}</h1>;
  if (!isSuccess) return <h1>Загрузка...</h1>;
  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        {state?.backgroundLocationOrder && (
          <Routes location={state.backgroundLocation}>
            <Route
              path="/feed/:number"
              element={
                <Modal>
                  <ViewOrder ingredients={ingredients} />
                </Modal>
              }
            />
          </Routes>
        )}
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
            <Route path="/feed" element={<Feed ingredients={ingredients} />} />
            <Route
              path="/feed/:number"
              element={
                <Modal>
                  <ViewOrder ingredients={ingredients} />
                </Modal>
              }
            />
            <Route
              path="/ingredients/:id"
              element={<IngredientDetails ingredients={ingredients} />}
            />
            <Route
              path="/profile"
              element={
                <OnlyAuth onlyUnAuth={false} component={<LayoutProfile />} />
              }
            >
              <Route index element={<ChangeDataForm />} />
              <Route
                path="orders"
                element={<FeedOrders />}
              />
            </Route>
            <Route
              path="/login"
              element={
                <OnlyUnAuth onlyUnAuth={true} component={<LoginPage />} />
              }
            />
            <Route
              path="/register"
              element={
                <OnlyUnAuth onlyUnAuth={true} component={<RegisterPage />} />
              }
            />
            <Route
              path="/reset-password"
              element={
                <OnlyUnAuth onlyUnAuth={true} component={<ResetPassword />} />
              }
            />
            <Route
              path="/forgot-password"
              element={
                <OnlyUnAuth onlyUnAuth={true} component={<ForgotPassword />} />
              }
            />

            <Route path="*" element={<NotFoundPages />} />
          </Route>
        </Routes>
      </div>
    </DndProvider>
  );
};

export { App };
