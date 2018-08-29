import * as React from 'react'
import * as Masonry from 'masonry-layout'
import styled from 'styled-components'
import { GridContainer, GridRow, GridColumn } from 'components'
import data from '../../data'
import './style.css'

class Main extends React.PureComponent<any, any> {
  public grid: string | Element
  public msnry: Masonry

  public componentDidMount() {
    const grid = this.grid
    this.msnry = new Masonry(grid, {
      itemSelector: '.story',
      columnWidth: 300,
      gutter: 20,
      fitWidth: true,
    })
    this.msnry.reloadItems()
    this.msnry.layout()
  }

  public render() {
    return (
      <div
        ref={node => {
          this.grid = node
        }}
        style={{ margin: '100px auto' }}
      >
        {data.map(i => (
          <div className="story">{i.story}</div>
        ))}
      </div>
    )
    // return (
    //   <GridContainer>
    //     <GridRow>
    //       <GridColumn>
    //         <div
    //           ref={node => {
    //             this.grid = node
    //           }}
    //         >
    //           {data.map(i => (
    //             <GridColumn className="story">{i.story}</GridColumn>
    //           ))}
    //         </div>
    //       </GridColumn>
    //     </GridRow>
    //   </GridContainer>
    // )
  }
}

export default Main
