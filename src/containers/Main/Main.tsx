import { useEffect, useState, FormEvent } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { Box, InputBase } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import BasicTable from "./utils/customGrid";
import { fetchProducts } from "./utils/fetch";
import Modal from "./utils/Modal";

const Main = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState<string>("");
  const [products, setProducts] = useState<any>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalProduct, setModalProduct] = useState<any>();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isNaN(Number(event.target.value))) return;
    setInputValue(event.target.value);
  };

  useEffect(() => {
    (async () => {
      setProducts(
        await fetchProducts(searchParams.get("page"), searchParams.get("id"))
      );
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
    setModalProduct(products.find((xd: any) => xd.id === item));
  };
  return (
    <Box
      marginTop="50px"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      {showModal && (
        <Modal handleShowModal={handleShowModal} modalProduct={modalProduct} />
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
            color: "gray",
          }}
          placeholder="Search by id..."
        />
      </form>
      <BasicTable
        products={products}
        handleShowModal={handleShowModal}
        filterProductsToModal={filterProductsToModal}
      />
      <Pagination
        color="primary"
        sx={{ margin: "20px auto 50px auto", color: "white!important" }}
        count={products?.length === 1 ? 1 : 3}
        defaultPage={1}
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
