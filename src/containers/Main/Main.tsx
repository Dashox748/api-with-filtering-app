import { useEffect, useState, FormEvent } from "react";
import {
  useSearchParams,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import {
  Box,
  InputBase,
  Typography,
  Pagination,
  PaginationItem,
} from "@mui/material";

import Modal from "./utils/Modal";
import BasicTable from "./utils/customGrid";
import { fetchProducts } from "./utils/fetch";
import { ProductsInf } from "./utils/interfaces";

const Main = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get("page") || "1", 10);
  const [searchParams] = useSearchParams();

  const [inputValue, setInputValue] = useState<string>("");
  const [products, setProducts] = useState<ProductsInf[]>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalProduct, setModalProduct] = useState<ProductsInf>();
  const [showError, setShowError] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isNaN(Number(event.target.value))) return;
    setInputValue(event.target.value);
  };

  useEffect(() => {
    (async () => {
      const tempFetch = await fetchProducts(
        searchParams.get("page"),
        searchParams.get("id")
      );
      if (typeof tempFetch === "string") {
        setShowError(true);
        return;
      }
      setProducts(tempFetch);
      setShowError(false);
    })();
  }, [searchParams]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    navigate(`/products${inputValue !== "" ? `?id=${inputValue}` : ``}`);
    setInputValue("");
  };

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  const filterProductsToModal = (item: any) => {
    setModalProduct(products?.find((xd: any) => xd.id === item));
  };
  return (
    <Box
      marginTop="50px"
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap="1rem"
    >
      {showModal && (
        <Modal handleShowModal={handleShowModal} modalProduct={modalProduct!} />
      )}
      <form onSubmit={(event) => handleSubmit(event)}>
        <InputBase
          value={inputValue}
          onChange={handleChange}
          sx={{
            m: 2,
            flex: 1,
            maxWidth: "500px",
            background: "#1B2028",
            borderRadius: "10px",
            padding: "6px 25px",
            color: "lightgray",
          }}
          placeholder="Search by id..."
        />
        {showError && (
          <Box display="flex" justifyContent="center" marginBottom="1rem">
            <Typography color="red" variant="h5">
              Not Found
            </Typography>
          </Box>
        )}
      </form>
      <BasicTable
        products={products!}
        handleShowModal={handleShowModal}
        filterProductsToModal={filterProductsToModal}
      />
      <Pagination
        color="primary"
        sx={{
          marginTop: "1rem",
          a: { color: "#ffffff" },
        }}
        count={products?.length === 1 ? 1 : 3}
        page={page}
        renderItem={(item) => (
          <PaginationItem
            component={Link}
            to={`/products${item.page === 1 ? "" : `?page=${item.page}`}`}
            {...item}
          />
        )}
      />
    </Box>
  );
};
export default Main;
