import React from 'react';
import PropTypes from 'prop-types';
import { Form, Col } from 'react-bootstrap';

const SelectOneQuestion = (props) => {
  const { language, data } = props;
  const labelRef = data.questions ? data.questions.find((specific) => specific.language === language) : undefined;
  const label = labelRef ? labelRef.text : '';

  const answers = data.answers ? data.answers : [];

  return (
    <Form.Row>
      <Col xs="auto">
        <Form.Group>
          <Form.Label>
            {label}
          </Form.Label>
          <Form.Control
            as="select"
          >
            {answers.map((answer) => {
              const answerLabelRef = answer.content ? answer.content.find((specific) => specific.language === language) : undefined;
              const answerLabel = answerLabelRef ? answerLabelRef.text : '';
              return <option value={answer.id}>{answerLabel}</option>
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
    restricted: PropTypes.arrayOf(PropTypes.shape({
      status: PropTypes.bool.isRequired,
      value: PropTypes.bool.isRequired,
    })),
  }).isRequired,
  setAnswers: PropTypes.func.isRequired,
};

SelectOneQuestion.defaultProps = {};

export default SelectOneQuestion;