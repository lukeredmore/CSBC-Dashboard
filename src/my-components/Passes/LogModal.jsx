import React from 'react'
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'shards-react'

import './LogModal.scss'

class LogModal extends React.Component {
  state = {
    data: null
  }

  componentDidMount() {
      this.setState({ data: this.props.logDisplayed })
  }

  close = () => {
    this.props.onCancel();
    this.setState({ data: null });
  }

  dateToDisplay = dateString => {
    let date = new Date(dateString)
    return `${date.toLocaleDateString('en-us')} - ${date.toLocaleTimeString()}`
  }

  render() {
    if (this.state.data) {
      return (
        <Modal open={true} toggle={this.props.toggle} className="log-modal">
          <ModalHeader>{`Log - ${this.props.name}`}</ModalHeader>
          <ModalBody>
            {Array.from(this.state.data).reverse().map(e => (
              <div className="modal-row">
                <span className="status">{e.status}</span>
                <span className="time">{this.dateToDisplay(e.time)}</span>
              </div>
            ))}
          </ModalBody>
          <ModalFooter>
            <Button theme="primary" onClick={this.close}>
              Done
            </Button>
          </ModalFooter>
        </Modal>
      );
    } else return <div></div>
  }
}

export default LogModal
