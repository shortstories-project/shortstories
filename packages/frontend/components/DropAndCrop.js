import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import ReactDropzone from 'react-dropzone'
import ReactCrop, { makeAspectCrop } from 'react-image-crop'
import Button from './Button'
import { CURRENT_USER_QUERY } from './User'
import { USER_QUERY } from './UserProfile'

const POST_PHOTO_MUTATION = gql`
  mutation POST_PHOTO_MUTATION(
    $file: Upload!
    $width: Float!
    $height: Float!
    $x: Float!
    $y: Float!
  ) {
    postPhoto(file: $file, width: $width, height: $height, x: $x, y: $y) {
      photo
    }
  }
`

const imageMaxSize = 10000000 // bytes
const acceptedFileTypes =
  'image/x-png, image/png, image/jpg, image/jpeg, image/gif'
const acceptedFileTypesArray = acceptedFileTypes
  .split(',')
  .map(type => type.trim())
const percentToPx = (a, b) => a * (b / 100)

const CropStyles = styled.div`
  display: flex;
  flex-direction: column;
  .buttons {
    display: flex;
    width: 100%;
    button {
      width: 50%;
      &:last-child {
        background-color: #32cd32;
        &:hover {
          background-color: #228b22;
        }
      }
    }
  }
`

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

class DropAndCrop extends Component {
  static propTypes = {
    afterSave: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired,
  }

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
  }

  verifyFile = files => {
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
    return null
  }

  onDrop = (files, rejectedFiles) => {
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

  onImageLoaded = image => {
    this.setState({
      crop: makeAspectCrop(
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

  onCropChange = crop => {
    this.setState({ crop })
  }

  saveAndContinue = postPhoto => {
    const { afterSave } = this.props
    postPhoto().then(() => {
      afterSave()
    })
  }

  render() {
    const { userId } = this.props
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
            <img src="/static/icons/upload.svg" alt="Upload avatar" />
            <p>Drop image</p>
          </Dropzone>
        ) : (
          <Mutation
            mutation={POST_PHOTO_MUTATION}
            refetchQueries={[
              { query: USER_QUERY, variables: { id: userId } },
              { query: CURRENT_USER_QUERY },
            ]}
            variables={{
              file,
              width: percentToPx(naturalWidth, crop.width),
              height: percentToPx(naturalHeight, crop.height),
              x: percentToPx(naturalWidth, crop.x),
              y: percentToPx(naturalHeight, crop.y),
            }}
          >
            {postPhoto => (
              <CropStyles>
                <ReactCrop
                  src={imgSrc}
                  crop={crop}
                  onImageLoaded={this.onImageLoaded}
                  onChange={this.onCropChange}
                  keepSelection
                />
                <div className="buttons">
                  <Button
                    onClick={() => {
                      this.setState({
                        imgSrc: null,
                      })
                    }}
                  >
                    Select another file
                  </Button>
                  <Button
                    onClick={() => {
                      this.saveAndContinue(postPhoto)
                    }}
                  >
                    Save and continue
                  </Button>
                </div>
              </CropStyles>
            )}
          </Mutation>
        )}
      </section>
    )
  }
}

export default DropAndCrop
