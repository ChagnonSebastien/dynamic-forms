import React, { useState } from 'react';
import { Container, Row, Col, Jumbotron } from 'react-bootstrap';
import FormBuilder from './form-builder/FormBuilder';

const App = () => {
  const [form, setForm] = useState([]);

  const updateForm = (updateFunction) => {
    console.table(updateFunction(form))
    setForm(updateFunction)
  }

  return (
    <Container fluid>
      <Row>
        <Col>
          <Jumbotron style={{ background: '#ddd' }}>
            <FormBuilder
              form={form}
              setForm={updateForm}
              languages={['fr', 'en', 'es']}
              preview
            />
          </Jumbotron>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
