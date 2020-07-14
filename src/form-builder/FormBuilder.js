import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import {v4 as uuid} from 'uuid';
import QuestionBuilder from './QuestionBuilder';

const FormBuilder = (props) => {
  const { form, setForm, languages, preview } = props;

  const [testAnsewers, setTestAnswers] = useState([]);

  const addQuestion = (index) => setForm(
    (prevForm) => {
      const newForm = [];
      for (let i = 0; i <= prevForm.length; i++) {
        if (i === index) {
          newForm.push({
            id: uuid(),
            type: "checkbox",
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
          index={index}
          first={index === 0}
          last={index === form.length - 1}
          preview={preview}
          answer={testAnsewers.find((answer) => answer.id === formElement.id)}
          setAnswers={setTestAnswers}
        />
      ))}

      <br />
      <Button onClick={() => addQuestion(form.length)}>
        Insert New Question
      </Button>
    </>
  )
};

FormBuilder.propTypes = {
  form: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    data: PropTypes.shape({
      questions: PropTypes.arrayOf(PropTypes.shape({
        language: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
      })),
    })
  })),
  setForm: PropTypes.func.isRequired,
  languages: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  preview: PropTypes.bool,
};

FormBuilder.defaultProps = { preview: false };

export default FormBuilder;