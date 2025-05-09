import api from "./index";

export const getPing = async () => {
  return api.get("/api/v1/pingpong/ping");
};
