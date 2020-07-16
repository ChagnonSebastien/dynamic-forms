import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

const TextZone = (props) => {
  const { language, data } = props;
  const labelRef = data.questions ? data.questions.find((specific) => specific.language === language) : undefined;
  const label = labelRef ? labelRef.text : '';

  return (
    <Card border="dark">
      <Card.Body>
        <Card.Text style={{ whiteSpace: 'pre-wrap' }}>
          {label}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

TextZone.propTypes = {
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
};

TextZone.defaultProps = { answer: undefined };

export default TextZone;