import { lazy } from "react";

export default {
  url: "/knowledge",
  // image: "/media/Belts",
  title: "Knowledge",
  component: lazy(() => import("web/knowledge/Knowledge")),
};
