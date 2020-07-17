import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Form, Col } from 'react-bootstrap';

export const verifyAnswer = (data, answer) => {
  if (!((data.required && data.required.status) || false)) {
    return undefined;
  }

  const answerState = (answer && answer.checked) || false;
  const requiredState = data.required.value || false;
  const valid = answerState === requiredState;
  return valid ? undefined : `This field must be ${requiredState ? '' : 'un'}checked`;
}

const CheckboxQuestion = (props) => {
  const { language, data, answer, setAnswers, id, error } = props;
  const labelRef = data.questions ? data.questions.find((specific) => specific.language === language) : undefined;
  const labelText = labelRef ? labelRef.text : '';

  const label = (
    <>
      {labelText}
      {error ? <span style={{ color: 'red', fontSize: '0.8rem' }} className="ml-4">*{error.error}</span> : null}
    </>
  );
  
  return (
    <Form.Row>
      <Col>
        <Form.Check 
          type="checkbox"
          label={label}
          checked={(answer && answer.checked) || false}
          onChange={(event) => {
            event.persist();
            setAnswers((prevAnswers) => {
              const newAnswers = prevAnswers.filter((a) => a.id !== id);
              newAnswers.push({
                id,
                checked: event.target.checked,
              });
              return newAnswers;
            })
          }}
        />
      </Col>
    </Form.Row>
  );
};

CheckboxQuestion.propTypes = {
  id: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  data: PropTypes.shape({
    questions: PropTypes.arrayOf(PropTypes.shape({
      language: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })),
    required: PropTypes.shape({
      status: PropTypes.bool.isRequired,
      value: PropTypes.bool,
    }),
  }).isRequired,
  setAnswers: PropTypes.func.isRequired,
  answer: PropTypes.shape({
    checked: PropTypes.bool,
  }),
  error: PropTypes.shape({
    id: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired,
  }),
};

CheckboxQuestion.defaultProps = {
  answer: undefined,
  error: undefined,
};

export default memo(CheckboxQuestion);