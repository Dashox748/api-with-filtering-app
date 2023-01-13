import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
} from "@mui/material";

import { BasicTableInf, ProductsInf } from "./interfaces";
import { Link } from "react-router-dom";

export default function BasicTable({
  products,
  handleShowModal,
  filterProductsToModal,
}: BasicTableInf) {
  return (
    <Box width="100%">
      {products?.length === 1 && (
        <Link
          to="/products"
          style={{
            textDecoration: "none",
            display: "flex",
          }}
        >
          <Button sx={{ marginLeft: "auto" }}>reset</Button>
        </Link>
      )}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="right">ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="right">Year</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products &&
              products?.map((item: ProductsInf) => (
                <TableRow
                  key={item.name}
                  sx={{ background: item.color, cursor: "pointer" }}
                  onClick={() => {
                    handleShowModal();
                    filterProductsToModal(item.id);
                  }}
                >
                  <TableCell sx={{ border: 0 }} align="right">
                    {item.id}
                  </TableCell>
                  <TableCell sx={{ border: 0 }}>{item.name}</TableCell>
                  <TableCell sx={{ border: 0 }} align="right">
                    {item.year}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
