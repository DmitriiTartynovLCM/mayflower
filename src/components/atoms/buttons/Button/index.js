import React from 'react';
import PropTypes from 'prop-types';

const Button = (button) => {
  const buttonSize = button.size ? ` ma__button--${button.size}` : '';
  const buttonStyle = button.outline ? ' ma__button--minor' : '';
  const buttonTheme = button.theme ? ` ma__button--${button.theme}` : '';
  const classNames = `ma__button${buttonSize}${buttonStyle}${buttonTheme}`;
  const Element = button.href ? 'a' : 'button';

  return(
    <Element
      className={classNames}
      type={button.type}
      href={button.href}
      title={button.info}
      aria-label={button.info}
      onClick={button.onClick}
    >
      {button.text}
    </Element>
  );
};

Button.propTypes = {
  /** Custom click handler function. */
  onClick: PropTypes.func,
  /** When populated with a url, this component renders a <a> vs a <button> */
  href: PropTypes.string,
  /** The text which renders in the standard browser tooltip on hover */
  info: PropTypes.string,
  /** Button or link text */
  text: PropTypes.string,
  /** HTML <button> 'type' attribute  */
  type: PropTypes.oneOf(['submit', 'reset', 'button', '']),
  /** Create a smaller button */
  size: PropTypes.oneOf(['', 'small']),
  /** Themes correspond to site color scheme i.e. sass variables */
  theme: PropTypes.oneOf(['', 'secondary', 'quaternary']),
  /** Whether or not to make a ghost button */
  outline: PropTypes.bool
};

Button.defaultProps = {
  onClick: () => {},
  href: '',
  info: '',
  type: 'button',
  text: 'Button',
  size: '',
  theme: '',
  outline: false
};

export default Button;
