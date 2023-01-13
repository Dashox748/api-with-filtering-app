import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function BasicTable({
  products,
  handleShowModal,
  filterProductsToModal,
}: any) {
  return (
    <TableContainer component={Paper}>
      <Table
        sx={{
          maxWidth: 650,
        }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell align="right">ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell align="right">Year</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products &&
            products.map((item: any, index: number) => (
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
  );
}
