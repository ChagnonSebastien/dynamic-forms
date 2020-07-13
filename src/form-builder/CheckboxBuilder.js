import React from 'react';
import PropTypes from 'prop-types';
import { Form, InputGroup, Col } from 'react-bootstrap';

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

const CheckboxBuilder = ({ id, data, setForm, language }) => {
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
                        required: { status: event.target.checked, value: true },
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
        {data.required && data.required.status
          ? (
            <Col>
              <Form.Label>
                Answer Must Be:
              </Form.Label>
              <Form.Control
                as="select"
                value={data.required.value}
                onChange={(event) => {
                  event.persist();
                  setForm((prefForm) => prefForm.map((question) => {
                    if (question.id === id) {
                      const { data, ...otherQuestionProps } = question;
                      return {
                        data: {
                          ...data,
                          required: { status: true, value: event.target.value === 'true' },
                        },
                        ...otherQuestionProps,
                      }
                    }
                    return question;
                  }));
                }}
              >
                <option value={true}>True</option>
                <option value={false}>False</option>
              </Form.Control>
            </Col>
          ) : null}
      </Form.Row>
    </Form>
  );
};

CheckboxBuilder.propTypes = {
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

CheckboxBuilder.defaultProps = { data: { question: '' } };

export default CheckboxBuilder;