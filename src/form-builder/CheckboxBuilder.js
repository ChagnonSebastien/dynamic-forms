import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Form, Badge, Col } from 'react-bootstrap';

const CheckboxBuilder = (props) => {
  const { content, update, languages } = props;

  const [selectedLanguage, setSelectedLanguage] = useState(languages[0])

  const checkFields = (language) => {
    if (!content.question) return false;

    const specificQuestion = content.question.find((specificQuestion) => (
      specificQuestion.language === language
    ));

    return specificQuestion && specificQuestion.text;
  }

  const getQuestion = (language) => {
    if (!content.question) return '';

    const specificQuestion = content.question.find((specificQuestion) => (
      specificQuestion.language === language
    ));
    
    if (!specificQuestion || !specificQuestion.text) return ''
    return specificQuestion.text;
  }

  const setQuestion = (text, language) => {
    const contentCopy = JSON.parse(JSON.stringify(content));
    if (!contentCopy.question) {
      contentCopy.question = [];
    }

    const specificQuestionIndex = content.question.findIndex((specificQuestion) => (
      specificQuestion.language === language
    ));

    if (specificQuestionIndex === -1) {
      contentCopy.question.push({ language, text })
    } else {
      contentCopy.question[specificQuestionIndex].text = text;
    }

    update(contentCopy);
  }

  return (
    <>
      <Row>
        <Col>
          {languages.map((language) => (
            <Badge
              pill
              variant={checkFields(language) ? 'success' : 'danger'}
              style={{
                border: language === selectedLanguage
                          ? '3px solid #666'
                          : null,
                margin: '0 0.3rem',
              }}
              onClick={() => setSelectedLanguage(language)}
            >
              {language}
            </Badge>
          ))}
        </Col>
      </Row>
      <Form>
        <Form.Group controlId="questionText">
          <Form.Label>Question</Form.Label>
          <Form.Control
            type="text"
            value={getQuestion(selectedLanguage)}
            onChange={(event) => setQuestion(
              event.target.value,
              selectedLanguage
            )}
          />
        </Form.Group>
      </Form>
    </>
  )
};

CheckboxBuilder.propTypes = {
  content: PropTypes.shape({
    type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    questions: PropTypes.arrayOf(PropTypes.shape({
      language: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }))
  }).isRequired,
  update: PropTypes.func.isRequired,
  languages: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export default CheckboxBuilder;