import React from 'react';
import PropTypes from 'prop-types';

const Heading = (props) => {
  const Element = `h${props.level}`;

  console.log('%c HEADING props.children', 'color: blue;');
  console.log(props.children);
  return(
    <Element className={props.class}>
      {props.text ? props.text:''}
      {
        // Allow Heading to render child component for such as accordion.
        props.children
      }
    </Element>
  );
};

Heading.propTypes = {
  /** The heading text  */
  text: PropTypes.string.isRequired,
  /** The heading level */
  level: PropTypes.number,
  /** A passable heading classname */
  class: PropTypes.string
};

Heading.defaultProps = {
  level: 1
};

export default Heading;
