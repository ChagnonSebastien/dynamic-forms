import React from 'react';
import PropTypes from 'prop-types';
import { Form, InputGroup, Col, Button } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import { v4 as uuid } from 'uuid';

export const checkFields = (data, language) => {
  if (!data || !data.questions || !data.answers) {
    return false;
  }

  if (data.answers.length === 0) {
    return false;
  }

  const questionRef = data.questions.find((question) => question.language === language);
  if (!questionRef || !questionRef.text){
    return false;
  }

  const answerLanguageOK = data.answers.map((answer) => answer.content.find((specific) => specific.language === language));
  const allAnswersSet = answerLanguageOK.reduce((notFound, value) => notFound && (value !== undefined && value.text), true);
  if (!allAnswersSet) {
    return false;
  }

  return true;
}

const SelectOneBuilder = ({ id, data, setData, language }) => {
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
                setData((prevData) => {
                  const { questions, ...otherDataProps } = prevData;

                  if (questionRef) {
                    return { 
                      questions: questions.map((question) => (
                        question.language === language
                          ? { language, text: event.target.value }
                          : question
                      )),
                      ...otherDataProps,
                    };
                  }

                  const newQuestions = questions ? questions.map((question) => question) : [];
                  newQuestions.push({ language, text: event.target.value });
                  return { questions: newQuestions, ...otherDataProps };
                });
              }}
            />
          </InputGroup>
        </Col>
      </Form.Row>
      <Form.Row className="mb-2">
        <Col>
          <Form.Check
            type="checkbox"
            label="Is restricted?"
            checked={(data.required && data.required.status) || false}
            onChange={(event) => {
              event.persist();
              setData((prevData) => {
                const { required, ...otherDataProps } = prevData;
                if (!required) {
                  return {
                    required: { status: event.target.checked, values: [] },
                    ...otherDataProps,
                  };
                }

                return {
                  required: { ...required, status: event.target.checked },
                  ...otherDataProps,
                };
              });
            }}
          />
        </Col>
        <Col xs="auto">
          <Button
            size="sm"
            onClick={() => setData((prevData) => {
              const { answers, ...otherDataProps } = prevData;
              if (!answers) {
                return {
                  answers: [{
                    id: uuid(),
                    content: [],
                  }],
                  ...otherDataProps,
                };
              }

              const newAnswers = answers.map((answer) => answer);
              newAnswers.push({
                id: uuid(),
                content: [],
              });
              return {
                answers: newAnswers,
                ...otherDataProps,
              };
            })}
          >
            New Choice
          </Button>
        </Col>
      </Form.Row>
      {data.answers
        ? data.answers.map((answer, index) => {
          const { content } = answer;
          const specificRef = content.find((specific) => specific.language === language);
          return (
            <Form.Row key={answer.id}>
              <Col xs="auto">
                <Form.Check
                  className="ml-3"
                  type="checkbox"
                  label="Valid Answer?"
                  checked={(data.required && data.required.status && data.required.values && data.required.values.includes(answer.id)) || false}
                  disabled={!((data.required && data.required.status) || false)}
                  onChange={(event) => {
                    event.persist();
                    setData((prevData) => {
                      const { required, ...otherDataProps } = prevData;
                      if (!required) {
                        return prevData;
                      }

                      const newValues = required.values ? required.values.filter((value) => value !== answer.id) : [];
                      if (event.target.checked) {
                        newValues.push(answer.id);
                      }
                      return {
                        required: { ...required, values: newValues },
                        ...otherDataProps,
                      };
                    });
                  }}
                />
              </Col>
              <Col>
                <Form.Control
                  type="text"
                  size="sm"
                  value={specificRef ? specificRef.text : ''}
                  placeholder="Option"
                  onChange={(event) => {
                    event.persist();
                    setData((prevData) => {
                      const { answers, ...otherDataProps } = prevData;
                      return {
                        answers: answers.map((a, i) => {
                          if (i === index) {
                            if (specificRef) {
                              return {
                                id: a.id,
                                content: content.map((specific) => (
                                  specific.language === language
                                    ? { language, text: event.target.value }
                                    : specific
                                ))
                              };
                            }

                            const newContent = content ? content.map((specific) => specific) : [];
                            newContent.push({ language, text: event.target.value });
                            return { id: a.id, content: newContent };
                          }
                          return a;
                        }),
                        ...otherDataProps,
                      };
                    });
                  }}
                />
              </Col>
              <Col xs="auto">
                <FaTrash
                  onClick={() => setData((prevData) => {
                    const { answers, ...otherDataProps } = prevData;
                    return {
                      answers: answers.filter((_, i) => i !== index),
                      ...otherDataProps,
                    };
                  })}
                />
              </Col>
            </Form.Row>
          )
        }) : null}
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
  setData: PropTypes.func.isRequired,
};

SelectOneBuilder.defaultProps = {};

export default SelectOneBuilder;