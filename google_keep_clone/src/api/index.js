import { createApi } from "@reduxjs/toolkit/query/react";

const SERVER_URL = process.env.REACT_APP_API_URL;

export const api = createApi({
    baseUrl: SERVER_URL,
})

export default api;