import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Form, Col } from 'react-bootstrap';

export const verifyAnswer = (data, answer) => {
  if (!((data.required && data.required.status) || false)) {
    return undefined;
  }

  const min = (data.required.min !== undefined || false) ? Number(data.required.min) : 1;
  const max = (data.required.max !== undefined || false) ? Number(data.required.max) : Number.MAX_SAFE_INTEGER;
  const value = ((answer && answer.text) || false) ? answer.text.length : 0;

  if (value < min) {
    return 'Answer length is below required value'
  }
  if (value > max) {
    return 'Answer length is above required value'
  }

  return undefined;
}

const LongTextQuestion = (props) => {
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
        <Form.Group>
          <Form.Label>
            {label}
          </Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            value={((answer && answer.text !== undefined) || false) ? answer.text : ''}
            onChange={(event) => {
              const newValue = event.target.value;
              setAnswers((prevAnswers) => {
                const newAnswers = prevAnswers.filter((a) => a.id !== id);
                newAnswers.push({ id, text: newValue });
                return newAnswers;
              })
            }}
          />
        </Form.Group>
      </Col>
    </Form.Row>
  );
};

LongTextQuestion.propTypes = {
  id: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  data: PropTypes.shape({
    questions: PropTypes.arrayOf(PropTypes.shape({
      language: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })),
    required: PropTypes.shape({
      status: PropTypes.bool.isRequired,
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

LongTextQuestion.defaultProps = {
  answer: undefined,
  error: undefined,
};

export default memo(LongTextQuestion);