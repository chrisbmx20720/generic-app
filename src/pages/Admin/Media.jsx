import {React,useState} from 'react'
import { ImageGallery } from '../../components/test/ImageGallery'
import {UploadImage} from '../../components/test/UploadImage'
import { Row, Col, Button } from 'react-bootstrap';

export default function Media() {

  return (
    <div>
      <Row>
        <Col className="d-flex align-items-center mb-4">
            <h2 className="mb-0">Media Library</h2>
            <Button variant="outline-dark" className="ms-3">Add New File</Button>
        </Col>
    </Row>

      <UploadImage/>
      <ImageGallery/>
    </div>
  )
}
