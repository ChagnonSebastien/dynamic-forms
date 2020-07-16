import React from 'react';
import PropTypes from 'prop-types';
import { Form, Col, FormGroup } from 'react-bootstrap';

const ShortTextQuestion = (props) => {
  const { language, data, answer, setAnswers, id } = props;
  const labelRef = data.questions ? data.questions.find((specific) => specific.language === language) : undefined;
  const label = labelRef ? labelRef.text : '';

  return (
    <Form.Row>
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
                const validAmount = RegExp(data.required.decimal ? '^[0-9]*[\\.,]?[0-9]*$' : '^[0-9]*$').test(newValue);
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
};

ShortTextQuestion.defaultProps = { answer: undefined };

export default ShortTextQuestion;