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
import { useEffect, FC } from "react";
import { getUser, refreshToken } from "../../utils/api";
import { setUser, setIsAuthChecked } from "../../services/safety/user";
import { OnlyAuth, OnlyUnAuth } from "../protected/protected-route";
import { NotFoundPages } from "../../pages/not-found-pages";
import { Feed } from "../../pages/feed/feed";
import { ViewOrder } from "../uikit/modal-content/view-order";
import { useAppDispatch } from "../../services/hooks/redux";
import { Iingredient } from "../../utils/types";

const App: FC = () => {
  const { data, error, isSuccess } = useGetFetchQuery(undefined);
  const ingredients: Iingredient[] = data || [];
  const dispatch = useAppDispatch();

  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  useEffect(() => {
    const fetchUserAndInitialize = async () => {
      const refreshAndSetUser = async () => {
        try {
          const user = await getUser();
          dispatch(setUser(user));
        } catch (err) {
          if ((err as Error)?.message === "jwt expired") {
            await refreshToken();
            const user = await getUser();
            dispatch(setUser(user));
          } else {
            throw err;
          }
        }
      };
  
      try {
        if (localStorage.getItem("accessToken")) {
          await refreshAndSetUser();
        }
      } catch (err) {
        console.error("Ошибка при загрузке пользователя:", err);
      } finally {
        dispatch(setIsAuthChecked(true));
      }
    };
  
    fetchUserAndInitialize();
  }, [dispatch]);

  if (error) return <h1>{JSON.stringify(error)}</h1>;
  if (!isSuccess) return <h1>Загрузка...</h1>;

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        {state?.backgroundLocation && (
          <Routes>
            <Route
              path="/ingredients/:id"
              element={
                <Modal title="Детали ингредиента">
                  <IngredientDetails ingredients={ingredients} />
                </Modal>
              }
            />
            <Route
              path="/feed/:number"
              element={
                <Modal>
                  <ViewOrder ingredients={ingredients} />
                </Modal>
              }
            />
            <Route
              path="/profile/orders/:number"
              element={
                <Modal>
                  <ViewOrder ingredients={ingredients} />
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
              element={<ViewOrder ingredients={ingredients} />}
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
              <Route
                path="/profile/orders/:number"
                element={<ViewOrder ingredients={ingredients} />}
              />
              <Route index element={<ChangeDataForm />} />
              <Route
                path="orders"
                element={<FeedOrders ingredients={ingredients} />}
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