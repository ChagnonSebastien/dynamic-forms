import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Badge, Col, Card, InputGroup } from 'react-bootstrap';
import CheckboxBuilder, { checkFields as checkboxCheck } from './CheckboxBuilder';

const QuestionBuilder = (props) => {
  const { content, setForm, languages } = props;
  const { data, id, type } = content;

  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  let elementEditor = null;
  let languageValidator = () => true;

  switch (type) {
    case 'checkbox':
      elementEditor = (
        <CheckboxBuilder
          id={id}
          language={selectedLanguage}
          data={data}
          setForm={setForm}
        />
      );
      languageValidator=checkboxCheck;
      break;
    case 'select-one':
      elementEditor = <>Select One Question</>
      break;
    case 'select-multi':
      elementEditor = <>Select Multiple Question</>
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
    <Card>
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
                  <option value="select-multi">
                    Select Multiple Question
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
    </Card>
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
};

export default QuestionBuilder;