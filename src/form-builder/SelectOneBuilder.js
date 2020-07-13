import React from 'react';
import PropTypes from 'prop-types';
import { Form, InputGroup, Col, Button } from 'react-bootstrap';
import { v4 as uuid } from 'uuid';

export const checkFields = (data, language) => {
  if (!data || !data.questions) {
    return false;
  }

  const questionRef = data.questions.find((question) => question.language === language);
  if (!questionRef || !questionRef.text){
    return false;
  }

  return true;
}

const SelectOneBuilder = ({ id, data, setForm, language }) => {
  const questionRef = data.questions
    ? data.questions.find((question) => question.language === language)
    : null;

  const question = questionRef ? questionRef.text : '';
  
  return (
    <Form>
      <Form.Row>
        <Col>
          <InputGroup className="mb-2">
            <InputGroup.Prepend>
              <InputGroup.Text>Question</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              type="text"
              value={question}
              placeholder={`${language.toUpperCase()} question...`}
              onChange={(event) => {
                event.persist();
                setForm((prefForm) => prefForm.map((question) => {
                  if (question.id === id) {
                    const { data, ...otherQuestionProps } = question;
                    const { questions, ...otherDataProps } = data;

                    if (questionRef) {
                      return {
                        data: { 
                          questions: questions.map((question) => (
                            question.language === language
                              ? { language, text: event.target.value }
                              : question
                          )),
                          ...otherDataProps,
                        },
                        ...otherQuestionProps,
                      };
                    }

                    const newQuestions = questions ? questions.map((question) => question) : [];
                    newQuestions.push({ language, text: event.target.value });
                    return {
                      data: { questions: newQuestions, ...otherDataProps },
                      ...otherQuestionProps,
                    };
                  }
                  return question;
                }));
              }}
            />
          </InputGroup>
        </Col>
      </Form.Row>
      <Form.Row>
        <Col xs="auto">
          <Form.Check
            type="checkbox"
            label="Is restricted?"
            onChange={(event) => {
              event.persist();
              setForm((prefForm) => prefForm.map((question) => {
                if (question.id === id) {
                  const { data, ...otherQuestionProps } = question;
                  const { required, ...otherDataProps } = data;
                  if (!required) {
                    return {
                      data: {
                        required: { status: event.target.checked, value: [] },
                        ...otherDataProps,
                      },
                      ...otherQuestionProps,
                    }
                  }

                  return {
                    data: {
                      required: { status: event.target.checked, value: required.value },
                      ...otherDataProps,
                    },
                    ...otherQuestionProps,
                  }
                }
                return question;
              }));
            }}
          />
        </Col>
      </Form.Row>
      {data.answers
        ? data.answers.map((answer, index) => (
          <Form.Row>
            <Col>
              <p>Choice</p>
            </Col>
          </Form.Row>
        )) : null}
      <Form.Row className="justify-content-md-end">
        <Col xs="auto">
          <Button
            size="sm"
            onClick={() => setForm((prefForm) => prefForm.map((question) => {
              if (question.id === id) {
                const { data, ...otherQuestionProps } = question;
                const { answers, ...otherDataProps } = data;
                if (!answers) {
                  return {
                    data: {
                      answers: [{
                        id: uuid(),
                        content: [],
                      }],
                      ...otherDataProps,
                    },
                    ...otherQuestionProps,
                  }
                }

                const newAnswers = answers.map((answer) => answer);
                newAnswers.push({
                  id: uuid(),
                  content: [],
                });
                return {
                  data: {
                    answers: newAnswers,
                    ...otherDataProps,
                  },
                  ...otherQuestionProps,
                }
              }
              return question;
            }))}
          >
            New Choice
          </Button>
        </Col>
      </Form.Row>
    </Form>
  );
};

SelectOneBuilder.propTypes = {
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
  setForm: PropTypes.func.isRequired,
};

SelectOneBuilder.defaultProps = { data: { question: '' } };

export default SelectOneBuilder;