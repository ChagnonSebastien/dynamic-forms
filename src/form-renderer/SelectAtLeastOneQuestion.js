import React from 'react';
import PropTypes from 'prop-types';
import { Form, Col } from 'react-bootstrap';

const SelectAtLeastOneQuestion = (props) => {
  const { language, data, answer, setAnswers, id } = props;
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
          {answers.map((a) => {
            const answerLabelRef = a.content ? a.content.find((specific) => specific.language === language) : undefined;
            const answerLabel = answerLabelRef ? answerLabelRef.text : '';
            return (
              <Form.Check
                key={a.id}
                label={answerLabel}
                checked={(answer && answer.values && answer.values.includes(a.id)) || false}
                onChange={(event) => {
                  event.persist();
                  setAnswers((prevAnswers) => {
                    const oldSpecificAnswersRef = prevAnswers.find((prevAnswer) => prevAnswer.id === id);
                    const oldSpecificAnswers = oldSpecificAnswersRef ? oldSpecificAnswersRef.values : [];
                    const newSpecificAnswers = oldSpecificAnswers ? oldSpecificAnswers.filter((n) => n !== a.id) : []
                    if (event.target.checked) {
                      newSpecificAnswers.push(a.id);
                    }
                    const newAnswers = prevAnswers.filter((a) => a.id !== id);
                    newAnswers.push({
                      id,
                      values: newSpecificAnswers,
                    });
                    return newAnswers;
                  });
                }}
              />
            );
          })}
        </Form.Group>
      </Col>
    </Form.Row>
  );
};

SelectAtLeastOneQuestion.propTypes = {
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
    values: PropTypes.arrayOf(PropTypes.string),
  }),
};

SelectAtLeastOneQuestion.defaultProps = { answer: undefined };

export default SelectAtLeastOneQuestion;