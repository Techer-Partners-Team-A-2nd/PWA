import "./App.css";

import { Container, Nav, Navbar } from "react-bootstrap";
import { Routes, Route, Link } from "react-router-dom";
import Bus from "./components/bus";
import Find from "./components/find";

function App() {
  return (
    <div className="App">
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/bus">버스</Nav.Link>
            <Nav.Link href="/metro">지하철</Nav.Link>
            <Nav.Link href="/find">길찾기</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<p>jang public transport</p>} />
        <Route path="/bus" element={<Bus />} />
        <Route path="/metro" element={<p>jang public metro</p>} />
        <Route path="/find" element={<Find />} />
      </Routes>
    </div>
  );
}

export default App;
