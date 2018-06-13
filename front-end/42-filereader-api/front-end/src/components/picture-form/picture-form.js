import React from 'react';
import autoBind from '../../utils';
import PropTypes from 'prop-types';

const D23_005 = 'File Required';

const fileToBase64String = (file) => {
  return new Promise((resolve, reject) => {
    // Vinicio - error checks
    if (!file) {
      return reject(new Error(D23_005));
    }
    // Vinicio - load the file
    const fileReader = new FileReader();

    fileReader.addEventListener('load', () => resolve(fileReader.result));
    fileReader.addEventListener('error', reject);

    return fileReader.readAsDataURL(file);
  });
};

class PictureForm extends React.Component {
  constructor(props) {
    super(props); // Vinicio - In the ole times, Parent class was also called -> Super Class
    this.emptyState = {
      preview: undefined, // Vinicio - base64 representation of the picture we'll upload
      picture: '', // Vinicio -  this will be a path, used for the backend
      description: '',
    };
    this.state = this.emptyState;

    autoBind.call(this, PictureForm); // Vinicio - this is not a react/redux convention
  }
  //-------------------------------------------------------------------
  // Member functions
  //-------------------------------------------------------------------
  handleChange(event) {
    const { type, value, files } = event.target;

    if (type === 'file') {
      // --------------------------------------------------------------
      // ASYNC
      // --------------------------------------------------------------
      fileToBase64String(files[0])
        .then(preview => this.setState({ preview })); // { preview : result };
      // --------------------------------------------------------------
      this.setState({ // Async
        picture: files[0],
      }, () => {
        console.log('I will happen after the state has been changed');
      });
    } else { // Vinicio - I must be working in the descrpition
      this.setState({
        description: value,
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onComplete(this.state);
    this.setState(this.emptyState);
  }

  //-------------------------------------------------------------------
  // Lifecycle Hooks
  //-------------------------------------------------------------------
  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        className='picture-form'>
        <img src={this.state.preview}/>
        <label>Picture</label>
        <input
          type='file'
          name='photo'
          onChange={this.handleChange}
        />
        <label>Description</label>
        <input
          type='text'
          name='description'
          value={this.state.description}
          onChange={this.handleChange}
        />
        <button type='submit'> Upload a Picture! </button>
      </form>
    );
  }
}

PictureForm.propTypes = {
  onComplete: PropTypes.func,
};

export default PictureForm;
