import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

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
      <Form.Group controlId="questionText">
        <Form.Label>Question</Form.Label>
        <Form.Control
          type="text"
          value={question}
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
      </Form.Group>
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
  }).isRequired,
  setForm: PropTypes.func.isRequired,
};

CheckboxBuilder.defaultProps = { data: { question: '' } };

export default CheckboxBuilder;