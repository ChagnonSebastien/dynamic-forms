import React from 'react';
import PropTypes from 'prop-types';
import { Form, Col } from 'react-bootstrap';

export const verifyAnswer = (data, answer) => {
  if (!((data.required && data.required.status) || false)) {
    return undefined;
  }

  if (!(answer && answer.value) || false) {
    return 'Field can\'t be empty';
  }

  const validAnswers = (data.required.values || false) ? data.required.values : [];
  if (!validAnswers.includes(answer.value)) {
    return 'Invalid answer';
  }

  return undefined;
};

const SelectOneQuestion = (props) => {
  const { language, data, answer, setAnswers, id, error } = props;
  const labelRef = data.questions ? data.questions.find((specific) => specific.language === language) : undefined;
  const labelText = labelRef ? labelRef.text : '';

  const label = (
    <>
      {labelText}
      {error ? <div style={{ color: 'red', fontSize: '0.8rem' }} className="ml-4">*{error.error}</div> : null}
    </>
  );

  const answers = data.answers ? data.answers : [];

  return (
    <Form.Row className="mt-4">
      <Col>
        <Form.Group>
          <Form.Label >
            {label}
          </Form.Label>
          <Form.Control
            as="select"
            value={(answer && answer.value) || 'undefined-selection'}
            onChange={(event) => {
              event.persist();
              setAnswers((prevAnswers) => {
                const newAnswers = prevAnswers.filter((a) => a.id !== id);
                if (event.target.value !== 'undefined-selection') {
                  newAnswers.push({
                    id,
                    value: event.target.value,
                  });
                }
                return newAnswers;
              })
            }}
          >
            <option value="undefined-selection"></option>
            {answers.map((a) => {
              const answerLabelRef = a.content ? a.content.find((specific) => specific.language === language) : undefined;
              const answerLabel = answerLabelRef ? answerLabelRef.text : '';
              return <option key={a.id} value={a.id}>{answerLabel}</option>
            })}
          </Form.Control>
        </Form.Group>
      </Col>
    </Form.Row>
  );
};

SelectOneQuestion.propTypes = {
  id: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
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
      values: PropTypes.arrayOf(PropTypes.string),
    }),
  }).isRequired,
  setAnswers: PropTypes.func.isRequired,
  answer: PropTypes.shape({
    value: PropTypes.string,
  }),
  error: PropTypes.shape({
    id: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired,
  }),
};

SelectOneQuestion.defaultProps = {
  answer: undefined,
  error: undefined,
};

export default SelectOneQuestion;