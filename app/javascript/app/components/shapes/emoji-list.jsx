import PropTypes from 'prop-types';

import EmojiShape from './emoji';

const EmojiListShape = PropTypes.shape({
  status: PropTypes.string.isRequired,
  keyword: PropTypes.string,
  order: PropTypes.string.isRequired,
  list: PropTypes.arrayOf(EmojiShape.isRequired).isRequired,
});

export default EmojiListShape;
