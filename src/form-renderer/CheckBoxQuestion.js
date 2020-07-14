import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

const CheckboxQuestion = (props) => {
  const { language, data } = props;
  const labelRef = data.questions ? data.questions.find((specific) => specific.language === language) : undefined;
  const label = labelRef ? labelRef.text : '';

  return (
    <Form.Check 
        type="checkbox"
        label={label}
      />
  );
};

CheckboxQuestion.propTypes = {
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
  setAnswers: PropTypes.func.isRequired,
};

CheckboxQuestion.defaultProps = { data: { question: '' } };

export default CheckboxQuestion;