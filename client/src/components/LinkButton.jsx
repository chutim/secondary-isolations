import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

const LinkButton = props => {
  const {
    history,
    location,
    match,
    staticContext,
    to,
    onClick,
    kit,
    // ⬆ filtering out props that `button` doesn’t know what to do with.
    ...rest
  } = props;
  return (
    <button
      {...rest} // `children` is just another prop!
      onClick={event => {
        onClick && onClick(event);
        history.push(to, kit);
      }}
    />
  );
};

LinkButton.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default withRouter(LinkButton);

//thanks to: https://stackoverflow.com/questions/42463263/wrapping-a-react-router-link-in-an-html-button
//wrapping a button tag with a react Link or 'a' tag, or vice versa, is not valid HTML and can cause problems
