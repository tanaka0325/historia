import * as React from 'react';

interface ModalProps {
  closeModal: () => void;
  isActive: boolean;
}

export class Modal extends React.Component<ModalProps, {}> {
  closeModal = () => {
    this.props.closeModal();
  };

  render() {
    const activeModalClassName = this.props.isActive
      ? 'modal is-active'
      : 'modal';
    return (
      <div className={activeModalClassName}>
        <div className="modal-background" onClick={this.closeModal} />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Modal title</p>
            <button
              className="delete"
              aria-label="close"
              onClick={this.closeModal}
            />
          </header>
          <section className="modal-card-body">
            <p>aaaaaaaaaaaaa</p>
          </section>
          <footer className="modal-card-foot">
            <button className="button is-success">Save changes</button>
            <button className="button" onClick={this.closeModal}>
              Cancel
            </button>
          </footer>
        </div>
      </div>
    );
  }
}
