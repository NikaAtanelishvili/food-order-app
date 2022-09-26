import styles from './Modal.module.css'
import ReactDOM from 'react-dom'

const Backdrop = props => {
  return <div onClick={props.onClose} className={styles.backdrop}></div>
}

const ModalOverlay = props => {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>{props.children}</div>
    </div>
  )
}

const portalElementModal = document.getElementById('overlays')

const Modal = props => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElementModal
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElementModal
      )}
    </>
  )
}

export default Modal
