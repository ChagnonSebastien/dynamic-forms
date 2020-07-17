import React from 'react';
import PropTypes from 'prop-types';
import { Form, Col, FormGroup } from 'react-bootstrap';

export const verifyAnswer = (data, answer) => {
  if (!((data.required && data.required.status) || false)) {
    return undefined;
  }

  const numerical = data.required.numerical || false;
  const min = (data.required.min !== undefined || false) ? Number(data.required.min) : (numerical ? Number.MIN_SAFE_INTEGER : 1);
  const max = (data.required.max !== undefined || false) ? Number(data.required.max) : Number.MAX_VALUE;
  const value = ((answer && answer.text) || false) ? (numerical ? Number (answer.text) : answer.text.length) : 0;

  if (value < min) {
    return `Answer ${numerical ? '' : 'length '}is below required value`;
  }
  if (value > max) {
    return `Answer ${numerical ? '' : 'length '}is above required value`;
  }

  return undefined;
}

const ShortTextQuestion = (props) => {
  const { language, data, answer, setAnswers, id, error } = props;
  const labelRef = data.questions ? data.questions.find((specific) => specific.language === language) : undefined;
  const labelText = labelRef ? labelRef.text : '';

  const label = (
    <>
      {labelText}
      {error ? <div style={{ color: 'red', fontSize: '0.8rem' }} className="ml-4">*{error.error}</div> : null}
    </>
  );

  return (
    <Form.Row className="mt-4">
      <Col>
        <FormGroup>
          <Form.Label>
            {label}
          </Form.Label>
          <Form.Control
            type="text"
            value={((answer && answer.text !== undefined) || false) ? answer.text : ''}
            onChange={(event) => {
              const newValue = event.target.value;
              if ((data.required && data.required.numerical) || false) {
                const isEmpty = newValue === '';
                const validAmount = RegExp(data.required.decimal ? '^-?[0-9]*[\\.,]?[0-9]*$' : '^[0-9]*$').test(newValue);
                if (isEmpty) {
                  setAnswers((prevAnswers) => {
                    const newAnswers = prevAnswers.filter((a) => a.id !== id);
                    newAnswers.push({ id });
                    return newAnswers;
                  });
                } else if (validAmount) {
                  setAnswers((prevAnswers) => {
                    const newAnswers = prevAnswers.filter((a) => a.id !== id);
                    newAnswers.push({ id, text: newValue.replace(',', '.') });
                    return newAnswers;
                  });
                }
              } else {
                setAnswers((prevAnswers) => {
                  const newAnswers = prevAnswers.filter((a) => a.id !== id);
                  newAnswers.push({ id, text: newValue });
                  return newAnswers;
                })
              }
            }}
          />
        </FormGroup>
      </Col>
    </Form.Row>
  );
};

ShortTextQuestion.propTypes = {
  id: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  data: PropTypes.shape({
    questions: PropTypes.arrayOf(PropTypes.shape({
      language: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })),
    required: PropTypes.shape({
      status: PropTypes.bool.isRequired,
      numerical: PropTypes.bool,
      decimal: PropTypes.bool,
      min: PropTypes.string,
      max: PropTypes.string,
    }),
  }).isRequired,
  setAnswers: PropTypes.func.isRequired,
  answer: PropTypes.shape({
    text: PropTypes.string,
  }),
  error: PropTypes.shape({
    id: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired,
  }),
};

ShortTextQuestion.defaultProps = {
  answer: undefined,
  error: undefined,
};

export default ShortTextQuestion;