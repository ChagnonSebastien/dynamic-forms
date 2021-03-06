import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Form, InputGroup, Col, FormControl } from 'react-bootstrap';

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

const LongTextBuilder = ({ id, data, setData, language }) => {
  const questionRef = data.questions
    ? data.questions.find((question) => question.language === language)
    : null;

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
              value={questionRef ? questionRef.text : ''}
              placeholder={`${language.toUpperCase()} question...`}
              onChange={(event) => {
                event.persist();
                setData((prevData) => {
                  const { questions, ...otherDataProps } = prevData;

                  if (questionRef) {
                    return { 
                      questions: questions.map((q) => (
                        q.language === language
                          ? { language, text: event.target.value }
                          : q
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
      <Form.Row>
        <Col xs="auto">
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
                    required: { status: event.target.checked, value: true },
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
        {data.required && data.required.status
          ? (
            <Col>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>
                    {`Minimum ${((data.required && data.required.numerical) || false) ? 'Value' : 'Length'}`}
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  placeholder="Leave empty if no restriction"
                  value={((data.required && data.required.min !== undefined) || false) ? data.required.min : ''}
                  onChange={(event => {
                    const newValue = event.target.value;
                    const isEmpty = newValue === '';
                    const validAmount = RegExp('^[0-9]*$').test(newValue);
                    if (isEmpty) {
                      setData((prevData) => {
                        const { required, ...otherDataProps } = prevData;
                        return {
                          required: { ...required, min: undefined },
                          ...otherDataProps,
                        };
                      });
                    } else if (validAmount) {
                      setData((prevData) => {
                        const { required, ...otherDataProps } = prevData;
                        return {
                          required: { ...required, min: newValue.replace(',', '.') },
                          ...otherDataProps,
                        };
                      });
                    }
                  })}
                />
              </InputGroup>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>
                    {`Maximum ${(data.required && data.required.numerical) || false ? 'Value' : 'Length'}`}
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  placeholder="Leave empty if no restriction"
                  value={((data.required && data.required.max !== undefined) || false) ? data.required.max : ''}
                  onChange={(event => {
                    const newValue = event.target.value;
                    const isEmpty = newValue === '';
                    const validAmount = RegExp('^[0-9]*$').test(newValue);
                    if (isEmpty) {
                      setData((prevData) => {
                        const { required, ...otherDataProps } = prevData;
                        return {
                          required: { ...required, max: undefined },
                          ...otherDataProps,
                        };
                      });
                    } else if (validAmount) {
                      setData((prevData) => {
                        const { required, ...otherDataProps } = prevData;
                        return {
                          required: { ...required, max: newValue.replace(',', '.') },
                          ...otherDataProps,
                        };
                      });
                    }
                  })}
                />
              </InputGroup>
            </Col>
          ) : null}
      </Form.Row>
    </Form>
  );
};

LongTextBuilder.propTypes = {
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
  setData: PropTypes.func.isRequired,
};

LongTextBuilder.defaultProps = {};

export default memo(LongTextBuilder);