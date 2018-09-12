import 'react-image-crop/dist/ReactCrop.css'
import * as React from 'react'
import { Mutation } from 'react-apollo'
import * as ReactCrop from 'react-image-crop'
import { POST_PHOTO } from '../../constants/mutations'

const percentToPx = (a: number, b: number) => a * (b / 100)

class ImageUploader extends React.Component<any, any> {
  state = {
    src: null,
    file: null,
    image: {
      naturalWidth: 0,
      naturalHeight: 0,
    },
    crop: {
      x: 0,
      y: 0,
      width: 50,
      height: 50,
      aspect: 1,
    },
  }

  onSelectFile = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader()
      this.setState({
        file: e.target.files[0],
      })
      reader.addEventListener(
        'load',
        () => {
          this.setState({
            src: reader.result,
          })
        },
        false
      )
      reader.readAsDataURL(e.target.files[0])
    }
  }

  onImageLoaded = (image: any) => {
    this.setState({
      crop: ReactCrop.makeAspectCrop(
        {
          x: 0,
          y: 0,
          aspect: 1,
          width: 50,
          height: 50,
        },
        image.naturalWidth / image.naturalHeight
      ),
      image,
    })
  }

  onCropChange = (crop: any) => {
    this.setState({ crop })
  }

  render() {
    const {
      src,
      crop,
      file,
      image: { naturalWidth, naturalHeight },
    } = this.state
    return (
      <Mutation mutation={POST_PHOTO}>
        {addAvatar => (
          <>
            <input type="file" onChange={this.onSelectFile} />
            {src && (
              <ReactCrop
                src={src}
                crop={crop}
                minHeight={50}
                minWidth={50}
                onImageLoaded={this.onImageLoaded}
                onChange={this.onCropChange}
                keepSelection
              />
            )}
            <button
              onClick={() => {
                addAvatar({
                  variables: {
                    file,
                    width: percentToPx(naturalWidth, crop.width),
                    height: percentToPx(naturalHeight, crop.height),
                    x: percentToPx(naturalWidth, crop.x),
                    y: percentToPx(naturalHeight, crop.y),
                  },
                })
              }}
            >
              POST
            </button>
          </>
        )}
      </Mutation>
    )
  }
}

export default ImageUploader
