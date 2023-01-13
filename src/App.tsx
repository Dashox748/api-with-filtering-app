import "./App.css";
import Main from "./containers/Main/Main";
import { Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";
function App() {
  return (
    <Container maxWidth="xl" sx={{ display: "flex", justifyContent: "center" }}>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/products" element={<Main />} />
      </Routes>
    </Container>
  );
}

export default App;
