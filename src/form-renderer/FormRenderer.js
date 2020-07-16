import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import CheckboxQuestion from './CheckBoxQuestion';
import SelectOneQuestion from './SelectOneQuestion';
import SelectAtLeastOneQuestion from './SelectAtLeastOneQuestion';
import ShortTextQuestion from './ShortTextQuestion';
import LongTextQuestion from './LongTextQuestion';
import TextZone from './TextZone';

const FormRenderer = (props) => {
  const { form, answers, setAnswers, language, submit } = props;

  return (
    <Form>
      {form.map((formElement) => {
        const { data, id, type } = formElement;

        const elementProps = {key: id, id, language, data, answer: answers.find((answer) => answer.id === id), setAnswers}
        switch (type) {
          case 'checkbox':
            return <CheckboxQuestion {...elementProps} />;
          case 'select-one':
            return <SelectOneQuestion {...elementProps} />;
          case 'select-at-least-one':
            return <SelectAtLeastOneQuestion {...elementProps} />;
          case 'short-string':
            return <ShortTextQuestion {...elementProps} />;
          case 'long-string':
            return <LongTextQuestion {...elementProps} />;
          case 'text-zone':
            return <TextZone {...elementProps} />;
          default:
            return <p key={id}>Unknown Type</p>;
        }
      })}
      <br />
      <Button onClick={submit}>
        Submit
      </Button>
    </Form>
  )
};

FormRenderer.propTypes = {
  form: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    data: PropTypes.shape({
      questions: PropTypes.arrayOf(PropTypes.shape({
        language: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
      })),
      answers: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        content: PropTypes.arrayOf(PropTypes.shape({
          language: PropTypes.string.isRequired,
          text: PropTypes.string.isRequired,
        })).isRequired,
      })),
      required: PropTypes.shape({
        status: PropTypes.bool.isRequired,
        value: PropTypes.bool,
        values: PropTypes.arrayOf(PropTypes.string),
        numerical: PropTypes.bool,
        decimal: PropTypes.bool,
        min: PropTypes.string,
        max: PropTypes.string,
      }),
    })
  })),
  answers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.string,
    checked: PropTypes.bool,
    values: PropTypes.arrayOf(PropTypes.string),
    text: PropTypes.string,
  })),
  setAnswers: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
  submit: PropTypes.func.isRequired,
};

FormRenderer.defaultProps = { preview: false };

export default FormRenderer;