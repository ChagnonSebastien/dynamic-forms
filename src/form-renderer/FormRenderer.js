import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import CheckboxQuestion from './CheckBoxQuestion';
import SelectOneQuestion from './SelectOneQuestion';

const FormRenderer = (props) => {
  const { form, answers, setAnswers, language, submit } = props;

  return (
    <Form>
      {form.map((formElement) => {
        const { data, id, type } = formElement;

        switch (type) {
          case 'checkbox':
            return (
              <CheckboxQuestion
                key={id}
                id={id}
                language={language}
                data={data}
                answer={answers.find((answer) => answer.id === id)}
                setAnswers={setAnswers}
              />
            );
          case 'select-one':
            return (
              <SelectOneQuestion
                key={id}
                id={id}
                language={language}
                data={data}
                answer={answers.find((answer) => answer.id === id)}
                setAnswers={setAnswers}
              />
            );
          case 'select-multi':
            return <>Select Multiple Question</>;
          case 'short-string':
            return <>Short Answer Question</>;
          case 'long-string':
            return <>Text Question</>;
          default:
            return <>Unknown Type</>;
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
    })
  })),
  answers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.oneOf([
      PropTypes.bool,
      PropTypes.string,
      PropTypes.number,
      PropTypes.arrayOf(PropTypes.string)
    ])
  })).isRequired,
  setAnswers: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
  submit: PropTypes.func.isRequired,
};

FormRenderer.defaultProps = { preview: false };

export default FormRenderer;