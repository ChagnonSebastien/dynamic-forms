import React from 'react';
import PropTypes from 'prop-types';
import { Form, Col } from 'react-bootstrap';

const CheckboxQuestion = (props) => {
  const { language, data, answer, setAnswers, id } = props;
  const labelRef = data.questions ? data.questions.find((specific) => specific.language === language) : undefined;
  const label = labelRef ? labelRef.text : '';

  return (
    <Form.Row>
      <Col>
        <Form.Check 
          type="checkbox"
          label={label}
          checked={answer.value || false}
          onChange={(event) => {
            event.persist();
            setAnswers((prevAnswers) => {
              const newAnswers = prevAnswers.filter((a) => a.id !== id);
              newAnswers.push({
                id,
                value: event.target.checked,
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
    value: PropTypes.bool,
  }),
};

CheckboxQuestion.defaultProps = { answer: {} };

export default CheckboxQuestion;