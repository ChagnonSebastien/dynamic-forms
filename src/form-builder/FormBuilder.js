import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import {v4 as uuid} from 'uuid';
import QuestionBuilder from './QuestionBuilder';

const FormBuilder = (props) => {
  const { form, setForm, languages } = props;

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
          index={index}
          first={index === 0}
          last={index === form.length - 1}
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
  form: PropTypes.shape({}),
  setForm: PropTypes.func.isRequired,
  languages: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

FormBuilder.defaultProps = { initialForm: {} };

export default FormBuilder;