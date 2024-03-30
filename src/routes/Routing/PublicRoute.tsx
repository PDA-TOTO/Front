import { ReactNode } from "react";
import { useAppSelector } from "../../lib/hooks/reduxHooks";
import { Navigate } from "react-router-dom";

type Props = {
  component: ReactNode;
};

export default function PublicRoute({ component }: Props) {
  const isUser = useAppSelector((state) => state.user.isUser);

  return isUser ? <Navigate to={"/"}></Navigate> : component;
}
