import 'react-image-crop/dist/ReactCrop.css'
import * as React from 'react'
import styled from 'styled-components'
import { Mutation } from 'react-apollo'
import ReactDropzone from 'react-dropzone'
import * as ReactImageCrop from 'react-image-crop'
import UploadIcon from './upload-icon'
import { POST_PHOTO } from '../../mutations/user'

const imageMaxSize = 10000000 // bytes
const acceptedFileTypes =
  'image/x-png, image/png, image/jpg, image/jpeg, image/gif'
const acceptedFileTypesArray = acceptedFileTypes
  .split(',')
  .map(type => type.trim())
const percentToPx = (a: number, b: number) => a * (b / 100)

const Dropzone = styled(ReactDropzone)`
  width: 480px;
  height: 400px;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
  > input {
    width: 100%;
  }
  > p {
    font-family: 'Montserrat';
    margin: 0;
    text-shadow: none;
  }
  > svg {
    > circle {
      fill: #f93d66;
    }
    > path {
      fill: #6d47d9;
      &:last-child {
        fill: #f93d66;
      }
    }
  }
`

class DropAndCrop extends React.Component<any, any> {
  state = {
    file: null,
    imgSrc: null,
    previewImage: {
      naturalWidth: 0,
      naturalHeight: 0,
    },
    crop: {
      x: 0,
      y: 0,
      aspect: 1 / 1,
      width: 0,
      height: 0,
    },
    errorMessage: '',
  }

  showErrorMessage = (msg: string) => {
    this.setState({
      errorMessage: msg,
    })
  }

  verifyFile = (files: any[]) => {
    if (files && files.length > 0) {
      const { type, size } = files[0]
      if (size > imageMaxSize) {
        this.showErrorMessage(
          `This file is not allowed. ${size} bytes is too large.`
        )
        return false
      }
      if (!acceptedFileTypesArray.includes(type)) {
        this.showErrorMessage(
          'This file is not allowed. Only images are allowed.'
        )
        return false
      }
      return true
    }
  }

  onDrop = (files: any, rejectedFiles: any) => {
    if (rejectedFiles && rejectedFiles.length > 0) {
      this.verifyFile(rejectedFiles)
    }

    if (files && files.length > 0) {
      const isVerified = this.verifyFile(files)
      if (isVerified) {
        const [file] = files
        const reader = new FileReader()
        this.setState({ file })
        reader.addEventListener(
          'load',
          () => {
            this.setState({
              imgSrc: reader.result,
            })
          },
          false
        )
        reader.readAsDataURL(file)
      }
    }
  }

  onImageLoaded = (image: any) => {
    this.setState({
      crop: ReactImageCrop.makeAspectCrop(
        {
          x: 0,
          y: 0,
          aspect: 1 / 1,
          width: 50,
          height: 50,
        },
        image.naturalWidth / image.naturalHeight
      ),
      previewImage: image,
    })
  }

  onCropChange = (crop: any) => {
    this.setState({ crop })
  }

  saveAndContinue = (postPhoto: any) => {
    postPhoto().then(() => {
      this.props.continue()
    })
  }

  render() {
    const {
      imgSrc,
      crop,
      file,
      previewImage: { naturalWidth, naturalHeight },
    } = this.state
    return (
      <section>
        {imgSrc === null ? (
          <Dropzone
            accept={acceptedFileTypes}
            maxSize={imageMaxSize}
            multiple={false}
            onDrop={this.onDrop}
          >
            <UploadIcon />
            <p>Drop image</p>
          </Dropzone>
        ) : (
          <Mutation
            mutation={POST_PHOTO}
            variables={{
              file,
              width: percentToPx(naturalWidth, crop.width),
              height: percentToPx(naturalHeight, crop.height),
              x: percentToPx(naturalWidth, crop.x),
              y: percentToPx(naturalHeight, crop.y),
            }}
          >
            {postPhoto => (
              <div>
                <ReactImageCrop
                  src={imgSrc}
                  crop={crop}
                  minHeight={50}
                  minWidth={50}
                  onImageLoaded={this.onImageLoaded}
                  onChange={this.onCropChange}
                  keepSelection
                />
                <button
                  onClick={() => {
                    this.setState({
                      imgSrc: null,
                    })
                  }}
                >
                  Select another file
                </button>
                <button
                  onClick={() => {
                    this.saveAndContinue(postPhoto)
                  }}
                >
                  Save and continue
                </button>
              </div>
            )}
          </Mutation>
        )}
      </section>
    )
  }
}

export default DropAndCrop
