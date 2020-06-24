import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Row, Form, Card, Col } from 'react-bootstrap';
import { FaArrowUp, FaTrash, FaArrowDown } from 'react-icons/fa';
import {v4 as uuid} from 'uuid';
import CheckboxBuilder from './CheckboxBuilder';

const FormBuilder = (props) => {
  const { submitForm, languages } = props;

  const [form, setForm] = useState([]);

  const addQuestion = (index) => {
    const formCopy = JSON.parse(JSON.stringify(form));
    formCopy.splice(index, 0, {
      id: uuid(),
      type: "checkbox",
      question: [],
    });
    setForm(formCopy);
  };

  const changeElementType = (index, type) => {
    const formCopy = JSON.parse(JSON.stringify(form));
    formCopy[index] = {
      id: formCopy[index].id,
      type,
      question: formCopy[index].question,
    };
    setForm(formCopy);
  };

  const elementUpdateHandler = (index, newValue) => {
    const formCopy = JSON.parse(JSON.stringify(form));
    formCopy[index] = newValue;
    setForm(formCopy);
  };

  console.log(form);

  return (
    <>
      {form.map((formElement, index) => {
        let elementEditor = null;
        switch (formElement.type) {
          case 'checkbox':
            elementEditor = (
              <CheckboxBuilder
                languages={languages}
                content={formElement}
                update={(newValue) => elementUpdateHandler(index, newValue)}
              />
            );
            break;
          case 'select-one':
            elementEditor = <>Select One Question</>
            break;
          case 'select-multi':
            elementEditor = <>Select Multiple Question</>
            break;
          case 'short-string':
            elementEditor = <>Short Answer Question</>
            break;
          case 'long-string':
            elementEditor = <>Text Question</>
            break;
          default:
            elementEditor = <>Unknown Type</>
        }

        return (
          <Card key={formElement.id}>
            <Row noGutters>
              <Col
                xs="auto"
                style={{
                  display: 'flex',
                  justifyContent: 'space-evenly',
                  flexDirection: 'column',
                  margin: '0 0 0 1rem',
                }}
              >
                <FaArrowUp />
                <FaTrash />
                <FaArrowDown />
              </Col>
              <Col>
                <Card.Body>
                  <Card.Title>
                    <Form>
                      <Form.Row className="align-items-left">
                        <Col xs="auto">
                          <Form.Control
                            as="select"
                            style={{ margin: '0 0 0 0' }}
                            onChange={(event) => {
                              changeElementType(index, event.target.value)
                            }}
                          >
                            <option value="checkbox">
                              Checkbox Question
                            </option>
                            <option value="select-one">
                              Select One Question
                            </option>
                            <option value="select-multi">
                              Select Multiple Question
                            </option>
                            <option value="short-string">
                              Short Answer Question
                            </option>
                            <option value="long-string">
                              Text Question
                            </option>
                          </Form.Control>
                        </Col>
                      </Form.Row>
                    </Form>
                  </Card.Title>
                  <Card.Text>
                    {elementEditor}
                  </Card.Text>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        );
      })}

      <br />
      <Button onClick={() => addQuestion(form.length)}>
        Insert New Question
      </Button>
      <Row className="justify-content-center">
        <Button onClick={() => submitForm(form)}>
          Submit Form
        </Button>
      </Row>
    </>
  )
}

FormBuilder.propTypes = {
  initialForm: PropTypes.shape({}),
  submitForm: PropTypes.func.isRequired,
  languages: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

FormBuilder.defaultProps = { initialForm: {} };

export default FormBuilder;