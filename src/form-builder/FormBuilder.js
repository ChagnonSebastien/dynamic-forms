import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Row, Col, Badge, Jumbotron } from 'react-bootstrap';
import {v4 as uuid} from 'uuid';
import QuestionBuilder from './QuestionBuilder';

const FormBuilder = (props) => {
  const { form, setForm, languages, preview } = props;

  const [testAnsewers, setTestAnswers] = useState([]);
  const [previewLanguage, setPreviewLanguage] = useState(languages[0]);

  const addQuestion = (index) => setForm(
    (prevForm) => {
      const newForm = [];
      for (let i = 0; i <= prevForm.length; i++) {
        if (i === index) {
          newForm.push({
            id: uuid(),
            type: "checkbox",
            data: {}
          })
        } else if (i < index) {
          newForm.push(prevForm[i]);
        } else {
          newForm.push(prevForm[i-1]);
        }
      }
      return newForm;
    }
  );

  return (
    <Jumbotron style={{ background: '#ddd', position: 'relative' }}>
      {preview && form.length > 0
        ? (
          <div
            style={{
              position: 'absolute',
              right: '0',
              top: '1rem',
              bottom: '1rem',
              display: 'flex',
              flexFlow: 'column',
              justifyContent: 'flex-end',
            }}
          >
            <div
              style={{
                position:'sticky',
                bottom: '1rem',
                zIndex: 100,
              }}
            >
              <div
                style={{
                  backgroundColor: '#FFF',
                  padding: '1rem',
                  borderRadius: '10px 0 0 10px',
                  borderWidth: '1px 0 1px 1px',
                  borderColor: '#999',
                  borderStyle: 'solid',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <p>Preview Language</p>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                  }}
                >
                  {languages.map((language) => (
                    <Badge
                      key={`preview-${language}`}
                      className="mx-1"
                      pill
                      variant={language === previewLanguage
                        ? 'primary'
                        : 'secondary'}
                      onClick={() => setPreviewLanguage(language)}
                    >
                      {language}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : null}

      {form.map((formElement, index) => (
        <QuestionBuilder
          key={formElement.id}
          languages={languages}
          content={formElement}
          setForm={setForm}
          index={index}
          first={index === 0}
          last={index === form.length - 1}
          preview={preview}
          previewLanguage={previewLanguage}
          answer={testAnsewers.find((answer) => answer.id === formElement.id)}
          setAnswers={setTestAnswers}
        />
      ))}

      <br />
      <Row className="justify-content-center">
        <Col xs="auto">
          <Button onClick={() => addQuestion(form.length)}>
            Insert New Question
          </Button>
        </Col>
      </Row>
    </Jumbotron>
  )
};

FormBuilder.propTypes = {
  form: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
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
        value: PropTypes.bool,
        values: PropTypes.arrayOf(PropTypes.string),
        numerical: PropTypes.bool,
        decimal: PropTypes.bool,
        min: PropTypes.number,
        max: PropTypes.number,
      }),
    })
  })),
  setForm: PropTypes.func.isRequired,
  languages: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  preview: PropTypes.bool,
};

FormBuilder.defaultProps = { preview: false };

export default FormBuilder;