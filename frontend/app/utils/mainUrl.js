// export const mainUrl = ;
export const mainUrl =
  process.env.NEXT_PUBLIC_REACT_NODE_ENV === "development"
    ? "http://localhost:5000/api/v1"
    : "https://e-commerce-app-y9k1.onrender.com/api/v1";

// http://localhost:5000
// https://e-commerce-app-y9k1.onrender.com/api/v1
