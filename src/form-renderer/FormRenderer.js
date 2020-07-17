import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import CheckboxQuestion, { verifyAnswer as checkboxVerify} from './CheckBoxQuestion';
import SelectOneQuestion, { verifyAnswer as selectOneVerify} from './SelectOneQuestion';
import SelectAtLeastOneQuestion, { verifyAnswer as selectAtLeastOneVerify} from './SelectAtLeastOneQuestion';
import ShortTextQuestion, { verifyAnswer as shortTextVerify} from './ShortTextQuestion';
import LongTextQuestion, { verifyAnswer as longTextVerify} from './LongTextQuestion';
import TextZone from './TextZone';

const FormRenderer = (props) => {
  const { form, answers, setAnswers, language, submit, preventValidationOnErrors } = props;

  const [errors, setErrors] = useState([]);

  return (
    <Form>
      {form.map((formElement) => {
        const { data, id, type } = formElement;

        const elementProps = {
          key: id, id, language, data, setAnswers,
          answer: answers.find((answer) => answer.id === id),
          error: errors.find((answer) => answer.id === id)
        }

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
      <Button onClick={() => {
        const individualErrors = form.map((formElement) => {
          const { data, id, type } = formElement;

          let error;
          switch (type) {
            case 'checkbox':
              error = checkboxVerify(data, answers.find((answer) => answer.id === id));
              break;
            case 'select-one':
              error = selectOneVerify(data, answers.find((answer) => answer.id === id));
              break;
            case 'select-at-least-one':
              error = selectAtLeastOneVerify(data, answers.find((answer) => answer.id === id));
              break;
            case 'short-string':
              error = shortTextVerify(data, answers.find((answer) => answer.id === id));
              break;
            case 'long-string':
              error = longTextVerify(data, answers.find((answer) => answer.id === id));
              break;
            default:
          }
          return { id, error };
        }).filter((potentialError) => potentialError.error);

        if (preventValidationOnErrors && individualErrors.length > 0) {
          setErrors(individualErrors);
        } else {
          submit(individualErrors);
        }
      }}>
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
  preventValidationOnErrors: PropTypes.bool,
};

FormRenderer.defaultProps = {
  preview: false,
  preventValidationOnErrors: false,
};

export default FormRenderer;