import React from 'react';
import PropTypes from 'prop-types';
import { Form, Col } from 'react-bootstrap';

const LongTextQuestion = (props) => {
  const { language, data, answer, setAnswers, id } = props;
  const labelRef = data.questions ? data.questions.find((specific) => specific.language === language) : undefined;
  const label = labelRef ? labelRef.text : '';

  return (
    <Form.Row>
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
};

LongTextQuestion.defaultProps = { answer: undefined };

export default LongTextQuestion;