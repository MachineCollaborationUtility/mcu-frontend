/* global document */
import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import _ from 'lodash';

import File from './File';

export default class Files extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      fileUuid: undefined,
      fileName: undefined,
    };

    this.handleProcessFile = this.handleProcessFile.bind(this);
    this.close = this.close.bind(this);
    this.startJob = this.startJob.bind(this);
    this.change = this.change.bind(this);
  }

  handleProcessFile(fileInfo) {
    this.setState({
      showModal: true,
      fileUuid: fileInfo.uuid,
      fileName: fileInfo.name,
    });
  }

  close() {
    this.setState({ showModal: false });
  }

  change(event) {
    const botUuid = event.target.value;
    this.setState({ botUuid });
  }

  createBotList() {
    const options = [];
    _.entries(this.props.bots).forEach(([botUuid, bot]) => {
      // Only allow jobs to be stared on a bot in the state "connected"
      if (bot.state !== 'idle') {
        return;
      }

      // If the bot specifies an array of supported file fileTypes
      // Then make sure the selected file is consumable by the bot
      if (bot.info.fileTypes.length > 0) {
        // Check if any of the supported files match the file we are about to process
        const supportedFileList = bot.info.fileTypes.filter(
          filetype => this.state.fileName && this.state.fileName.indexOf(filetype) !== -1,
        );
        // If there's no match, don't add the bot to the option list
        if (supportedFileList.length <= 0) {
          return;
        }
      }

      options.push(
        <option key={botUuid} value={botUuid}>
          {bot.settings.name}
        </option>,
      );
    });

    return (
      <select id="process-file-modal" name="botList" onChange={this.change} form="newJobForm">
        {options}
      </select>
    );
  }

  async startJob() {
    // // Grab the currently selected value from the select form
    const botUuid = document.getElementById('process-file-modal').value;
    if (botUuid == undefined) {
      return;
    }

    // TODO, upload the file before requesting the job to start, if kicking off a remote job

    const commandObject = {
      botId: botUuid,
      botUuid: this.props.endpoint,
      command: 'startJob',
      fileUuid: this.state.fileUuid,
    };

    this.props.client.emit('command', commandObject);

    this.close();
  }

  renderModal() {
    return (
      <Modal show={this.state.showModal} onHide={this.close}>
        <Modal.Header closeButton>
          <Modal.Title>Select bot to process file</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>{this.state.fileUuid}</div>
          <div>{this.state.fileName}</div>
          {this.createBotList()}
          <button onClick={this.startJob}>Start Job</button>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={this.close}>Close</button>
        </Modal.Footer>
      </Modal>
    );
  }

  render() {
    const fileListArray = _.entries(this.props.files);

    // Sort the files so the most recently used is first
    fileListArray.sort(
      (a, b) => new Date(a[1].dateChanged).getTime() > new Date(b[1].dateChanged).getTime(),
    );

    const files = fileListArray.map(([fileKey, file]) => (
      <File key={file.uuid} file={file} handleProcessFile={this.handleProcessFile} />
    ));

    const modal = this.renderModal();

    return (
      <div>
        {modal}
        <div id="files" className="container">
          <h1>Files</h1>
          <button className="upload" onClick={this.props.dropzoneOpener}>
            Upload File
          </button>
          <br />
          <br />
          <div>{files}</div>
        </div>
      </div>
    );
  }
}
