import React, { useState } from 'react';
import { Container, Row, Col, Jumbotron } from 'react-bootstrap';
import FormBuilder from './form-builder/FormBuilder';

const App = () => {
  const [formContent, setFormContent] = useState();
  const [formAnswers, setFormAnswers] = useState();

  return (
    <Container fluid>
      <Row>
        <Col>
          <Jumbotron style={{ background: '#ddd' }}>
            <FormBuilder
              initialForm={{}}
              submitForm={(form) => setFormContent(form)}
              languages={['fr', 'en', 'es']}
            />
          </Jumbotron>
        </Col>
        <Col >
          <Jumbotron style={{ background: '#ddd' }}>
            Form
          </Jumbotron>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
