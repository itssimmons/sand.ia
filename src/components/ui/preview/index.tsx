import { lazy } from "react";

export const Preview = {
  Info: lazy(() => import("./info")),
  WebView: lazy(() => import("./webview")),
  Reload: lazy(() => import("./reload")),
  UrlBar: lazy(() => import("./url-bar")),
};
