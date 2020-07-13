import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Row } from 'react-bootstrap';
import {v4 as uuid} from 'uuid';
import QuestionBuilder from './QuestionBuilder';

const FormBuilder = (props) => {
  const { submitForm, languages } = props;

  const [form, setForm] = useState([]);

  const addQuestion = (index) => setForm(
    (prevForm) => {
      const newForm = [];
      for (let i = 0; i <= prevForm.length; i++) {
        if (i === index) {
          newForm.push({
            id: uuid(),
            type: "select-one",
            data: {}
          })
        } else if (i < index) {
          newForm.push(prevForm[i]);
        } else {
          newForm.push(prevForm[i-1]);
        }
      }
      return newForm;
    }
  );

  return (
    <>
      {form.map((formElement, index) => (
        <QuestionBuilder
          key={formElement.id}
          languages={languages}
          content={formElement}
          setForm={setForm}
        />
      ))}

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
};

FormBuilder.propTypes = {
  initialForm: PropTypes.shape({}),
  submitForm: PropTypes.func.isRequired,
  languages: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

FormBuilder.defaultProps = { initialForm: {} };

export default FormBuilder;