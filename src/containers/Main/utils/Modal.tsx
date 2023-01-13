import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { Box, Typography, DialogContent } from "@mui/material";
const style = {};
const Modal = ({ handleShowModal, modalProduct }: any) => {
  return (
    <Dialog open={true} onClose={handleShowModal} sx={style}>
      <DialogContent sx={{ background: "white" }}>
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "center ",
            fontSize: "30px",
            textTransform: "uppercase",
          }}
        >
          {modalProduct.name}
        </DialogTitle>
        <Box display="flex" gap="10px" alignItems="center">
          <Typography variant="h6">Color:</Typography>
          <Typography color={modalProduct.color} variant="h6">
            {modalProduct.color}
          </Typography>
        </Box>
        <Typography variant="h6">
          Pantone Value: {modalProduct.pantone_value}
        </Typography>
        <Typography variant="h6">Year: {modalProduct.year}</Typography>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
