import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function formPathModal(show, handleClose) {

  function onClickConfirm(){
    const input = document.getElementById("path");
    console.warn("axios로 보내기", input)
    handleClose();
  } 

  return (
    <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>설문 주소를 넣어 주세요.</Modal.Title>
    </Modal.Header>
    <Modal.Body className='text-center'>
        <input id="path" type="text" className="text-center" placeholder='설문 주소'> </input>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="primary" onClick={onClickConfirm}>
        확인
      </Button>
    </Modal.Footer>
  </Modal>
  );
}

export default formPathModal;