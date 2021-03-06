import React from 'react';
import PropTypes from 'prop-types';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { Tagger } from 'modules/common/components';

const propTypes = {
  type: PropTypes.string.isRequired,
  targets: PropTypes.arrayOf(Object).isRequired,
  trigger: PropTypes.element.isRequired,
  afterSave: PropTypes.func,
  refetchQueries: PropTypes.array,
  container: PropTypes.element
};

const contextTypes = {
  __: PropTypes.func
};

function TaggerPopover(props, { __ }) {
  const {
    targets,
    type,
    trigger,
    afterSave,
    refetchQueries,
    container
  } = props;

  const popover = (
    <Popover id="tags-popover" title={__('Choose your tags')}>
      <Tagger
        targets={targets}
        type={type}
        event="onExit"
        refetchQueries={refetchQueries}
        afterSave={afterSave}
      />
    </Popover>
  );

  return (
    <OverlayTrigger
      trigger="click"
      placement="bottom"
      overlay={popover}
      container={container}
      rootClose
    >
      {trigger}
    </OverlayTrigger>
  );
}

TaggerPopover.propTypes = propTypes;
TaggerPopover.contextTypes = contextTypes;

export default TaggerPopover;
