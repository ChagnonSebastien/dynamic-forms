import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Badge, Col, Card, InputGroup, Row } from 'react-bootstrap';
import CheckboxBuilder, { checkFields as checkboxCheck } from './CheckboxBuilder';
import SelectOneBuilder, { checkFields as selectOneCheck } from './SelectOneBuilder';
import SelectAtLeastOneBuilder, { checkFields as selectAtLeastOneCheck } from './SelectAtLeastOneBuilder';
import { FaArrowUp, FaTrash, FaArrowDown } from 'react-icons/fa';
import CheckboxQuestion from '../form-renderer/CheckBoxQuestion';
import SelectOneQuestion from '../form-renderer/SelectOneQuestion';

const QuestionBuilder = (props) => {
  const { content, setForm, languages, index, first, last, preview, previewLanguage, answer, setAnswers } = props;
  const { data, id, type } = content;

  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  let elementEditor = null;
  let elementPreview = null;
  let languageValidator = () => true;

  const builderProps = { id, language: selectedLanguage, data, setForm };
  const previewProps = preview ? { id, language: previewLanguage, data, answer, setAnswers } : undefined;

  switch (type) {
    case 'checkbox':
      elementEditor = <CheckboxBuilder {...builderProps} />;
      languageValidator=checkboxCheck;
      if (preview) {
        elementPreview = <CheckboxQuestion {...previewProps} />;
      }
      break;
    case 'select-one':
      elementEditor = <SelectOneBuilder {...builderProps} />;
      languageValidator=selectOneCheck;
      if (preview) {
        elementPreview = <SelectOneQuestion {...previewProps} />;
      }
      break;
    case 'select-at-least-one':
      elementEditor = <SelectAtLeastOneBuilder {...builderProps} />;
      languageValidator=selectAtLeastOneCheck;
      if (preview) {
        elementPreview = null
      }
      break;
    case 'short-string':
      elementEditor = <>Short Answer Question</>
      break;
    case 'long-string':
      elementEditor = <>Text Question</>
      break;
    default:
      elementEditor = <>Unknown Type</>
  }

  return (
    <Row>
      <Col>
        <Card>
          <Row noGutters>
            <Col
              xs="auto"
              style={{
                display: 'flex',
                justifyContent: 'space-evenly',
                flexDirection: 'column',
                margin: '0 0 0 1rem',
              }}
            >
              <div>
                {!first
                  ? (
                    <FaArrowUp
                      onClick={() => setForm((prevForm) => prevForm.map((question, i, questions) => {
                        if (index === i) {
                          return questions[index - 1];
                        }
                        if (index - 1 === i) {
                          return questions[index];
                        }

                        return question;
                      }))}
                    />
                  ) : null}
              </div>
              <div>
                <FaTrash
                  onClick={() => setForm((prevForm) => prevForm.filter((question, i) => i !== index))}
                />
              </div>
              <div>
                {!last
                  ? (
                    <FaArrowDown
                      onClick={() => setForm((prevForm) => prevForm.map((question, i, questions) => {
                        if (index === i) {
                          return questions[index + 1];
                        }
                        if (index + 1 === i) {
                          return questions[index];
                        }

                        return question;
                      }))}
                    />
                  ) : null}
              </div>
            </Col>
            <Col>
              <Card.Body>
                <Form>
                  <Form.Row>
                    <Col>
                      <InputGroup>
                        <Form.Control
                          as="select"
                          style={{ margin: '0 0 0 0' }}
                          onChange={(event) => {
                            event.persist();
                            setForm((prefForm) => prefForm.map((question) => {
                              if (question.id === id) {
                                const { type, ...otherProps } = question;
                                return { type: event.target.value, ...otherProps };
                              }
                              return question;
                            }));
                          }}
                          value={type}
                        >
                          <option value="checkbox">
                            Checkbox Question
                          </option>
                          <option value="select-one">
                            Select One Question
                          </option>
                          <option value="select-at-least-one">
                            Select At Least One Question
                          </option>
                          <option value="short-string">
                            Short Answer Question
                          </option>
                          <option value="long-string">
                            Text Question
                          </option>
                        </Form.Control>
                        <InputGroup.Append>
                          <InputGroup.Text>
                            {languages.map((language) => (
                              <Badge
                                key={`${id}-${language}`}
                                className="mx-1"
                                pill
                                variant={languageValidator(data, language) ? 'success' : 'danger'}
                                style={{
                                border: language === selectedLanguage
                                  ? '3px solid #000'
                                  : null,
                                }}
                                onClick={() => setSelectedLanguage(language)}
                              >
                                {language}
                              </Badge>
                            ))}
                          </InputGroup.Text>
                        </InputGroup.Append>
                      </InputGroup>
                    </Col>
                  </Form.Row>
                </Form>
                <br />
                {elementEditor}
              </Card.Body>
            </Col>
          </Row>
        </Card>
      </Col>
      {preview
        ? (
          <Col
            style={{
              display: 'flex',
              justifyContent: 'space-evenly',
              flexDirection: 'column',
              margin: '0 0 0 1rem',
            }}
          >
            {elementPreview}
          </Col>
        ) : null}
    </Row>
  )
};

QuestionBuilder.propTypes = {
  content: PropTypes.shape({
    type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    data: PropTypes.shape({
      questions: PropTypes.arrayOf(PropTypes.shape({
        language: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
      })),
    }).isRequired,
  }).isRequired,
  setForm: PropTypes.func.isRequired,
  languages: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  index: PropTypes.number.isRequired,
  first: PropTypes.bool.isRequired,
  last: PropTypes.bool.isRequired,
  preview: PropTypes.bool.isRequired,
  previewLanguage: PropTypes.string,
  answer: PropTypes.shape({
    value: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string,
      PropTypes.number,
      PropTypes.arrayOf(PropTypes.string)
    ])
  }),
  setAnswers: PropTypes.func.isRequired,
};

QuestionBuilder.defaultProps = {
  answer: undefined,
  previewLanguage: 'fr',
};

export default QuestionBuilder;