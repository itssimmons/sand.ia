import { lazy } from "react";

export const Editor = {
  List: lazy(() => import("./list")),
  Chatbox: lazy(() => import("./chatbox")),
};
