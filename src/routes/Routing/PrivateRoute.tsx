import { ReactNode, useEffect } from "react";
import { useAppSelector } from "../../lib/hooks/reduxHooks";
import { Navigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";

type Props = {
  component: ReactNode;
};

export default function PrivateRoute({ component }: Props) {
  const isUser = useAppSelector((state) => state.user.isUser);

  useEffect(() => {
    if (!isUser) notifications.show({ message: "로그인 후 이용 가능합니다." });
  }, []);

  return isUser ? component : <Navigate to={"/login"}></Navigate>;
}
