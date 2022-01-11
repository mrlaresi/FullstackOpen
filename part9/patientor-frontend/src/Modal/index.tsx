import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  error?: string;
  title: string;
  form: JSX.Element
}

const BaseModal = ({ modalOpen, onClose, error, title, form }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>{title}</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      {form}
    </Modal.Content>
  </Modal>
);

export default BaseModal;
