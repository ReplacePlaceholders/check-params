export default ({ validate, rules }) => {
  return ({ message, params, prefix, suffix }) => {
    const values = { message, params, prefix, suffix };
    let result = { valid: true };

    for (const name in rules) {
      const value = values[name];

      if (!validate(value, rules[name])) {
        const receivedType =
          value === null
            ? 'null'
            : Array.isArray(value)
              ? 'array'
              : typeof value;

        result = {
          valid: false,
          parameter: name,
          receivedType,
        };

        break;
      }
    }

    return result;
  };
};