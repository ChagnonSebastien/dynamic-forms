import React, { useState } from 'react';
import { Container, Row, Col, Jumbotron } from 'react-bootstrap';
import FormBuilder from './form-builder/FormBuilder';
import FormRenderer from './form-renderer/FormRenderer';

const App = () => {
  const [form, setForm] = useState([]);
  const [answers, setAnswers] = useState([]);

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
      <Row>
        <Col>
          <FormRenderer
            form={form}
            language="fr"
            answers={answers}
            setAnswers={setAnswers}
            submit={() => console.log('submit!')}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
