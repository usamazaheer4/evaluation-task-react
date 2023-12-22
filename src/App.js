import { useState } from "react";
import { Button } from "react-bootstrap";
import ModalForm from "./components/modal";

function App() {
  const [modalShow, setModalShow] = useState(false);
  return (
    <div className="App">
      <ModalForm show={modalShow} onHide={() => setModalShow(false)} />
      <div className="text-center mt-5">
        <Button as="a" variant="primary" onClick={() => setModalShow(true)}>
          open modal
        </Button>
      </div>
    </div>
  );
}

export default App;
