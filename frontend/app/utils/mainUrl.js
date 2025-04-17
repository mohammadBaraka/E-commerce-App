// export const mainUrl = ;
export const mainUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/api/v1"
    : "https://e-commerce-app-y9k1.onrender.com/api/v1";
//
