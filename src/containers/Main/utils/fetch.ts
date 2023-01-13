import axios from "axios";

type GetUsersResponse = {
  color: string;
  id: number;
  name: string;
  pantone_value: string;
  year: number;
};

interface userResponse {
  data: GetUsersResponse[];
}
export const fetchProducts = async (page: string | null, id: string | null) => {
  try {
    const { data, status } = await axios.get<userResponse>(
      `https://reqres.in/api/products?per_page=5
      ${page && `&page=${page}`}
      ${id && `&id=${id}`}

      `,
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
