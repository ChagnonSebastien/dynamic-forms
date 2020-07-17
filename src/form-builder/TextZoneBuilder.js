import React, { memo } from 'react';
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

const TextZoneBuilder = ({ id, data, setData, language }) => {
  const questionRef = data.questions
    ? data.questions.find((question) => question.language === language)
    : null;

  return (
    <Form>
      <Form.Row>
        <Col>
          <InputGroup className="mb-2">
            <InputGroup.Prepend>
              <InputGroup.Text>Text</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              as="textarea"
              rows="3"
              value={questionRef ? questionRef.text : ''}
              placeholder={`${language.toUpperCase()} text...`}
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
    </Form>
  );
};

TextZoneBuilder.propTypes = {
  id: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  data: PropTypes.shape({
    questions: PropTypes.arrayOf(PropTypes.shape({
      language: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })),
  }).isRequired,
  setData: PropTypes.func.isRequired,
};

TextZoneBuilder.defaultProps = {};

export default memo(TextZoneBuilder);