import axios from "axios";

export const fetchProducts = async (page: string | null, id: string | null) => {
  try {
    const { data } = await axios.get(
      `https://reqres.in/api/products?per_page=5
      ${page && `&page=${page}`}
      ${id && `&id=${id}`}`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    if (data.data.length > 1) return data.data;
    return [data.data];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
      return error.message;
    } else {
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
};
