import validate from '@replace-placeholder/validation';

import RULES from './rules.json' with { type: 'json' };
import factory from './check.js';

export default factory({
  validate,
  rules: RULES,
});
