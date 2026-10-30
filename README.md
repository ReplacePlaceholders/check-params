# @replace-params/check-params

A parameter validation configuration for placeholder replacement operations, built on the validation engine provided by `@replace-placeholder/validation`.

## Features

- Configure validation rules for parameters used in placeholder replacement.
- Use the validation engine and registered validators from `@replace-placeholder/validation`.
- Define parameter-specific validation rules independently from the validation engine.
- Configure validator options for individual parameters.
- Stop validation after the first invalid parameter.
- Return structured validation results.
- Report the name and received type of the first invalid parameter.
- Keep validation configuration separate from the underlying validation logic.

## Installation

```bash
npm install @replace-params/check-params
```

This package uses `@replace-placeholder/validation` as its underlying validation engine.

The validation engine provides the validation logic and registered validators, while `@replace-params/check-params` defines the rules and applies them to the parameters required for placeholder replacement.

## Usage

```js
import checkParams from '@replace-params/check-params';

const result = checkParams({
  message: 'Hello {name}',
  params: { name: 'Andrii' },
  prefix: '{',
  suffix: '}',
});

console.log(result);
// { valid: true }
```

Custom delimiters can also be provided:

```js
import checkParams from '@replace-params/check-params';

const result = checkParams({
  message: 'Full name: [firstname], [last_name]',
  params: {
    firstname: 'Andrii',
    last_name: 'Kotsiuba',
  },
  prefix: '[',
  suffix: ']',
});

console.log(result);
// { valid: true }
```

## Validation Rules

This package defines validation rules for the following parameters and passes them to the underlying validation engine:

| Parameter | Validator | Description |
|---|---|---|
| `message` | `string` | Must be a string. |
| `params` | `object` | Must be an object and cannot be `null`. |
| `prefix` | `non-empty-string` | Must be a non-empty string. |
| `suffix` | `non-empty-string` | Must be a non-empty string. |

The validation rules are defined independently in `rules.json`.

## Validation Results

The package applies the configured validation rules using the underlying validation engine and returns an object describing the validation result.

### Successful Validation

When all parameters satisfy their validation rules, the utility returns:

```js
{
  valid: true,
}
```

### Failed Validation

When a parameter does not satisfy its validation rule, the utility returns:

```js
{
  valid: false,
  parameter: 'message',
  receivedType: 'number',
}
```

| Property | Type | Description |
|---|---|---|
| `valid` | `boolean` | Indicates whether all parameters are valid. |
| `parameter` | `string` | Name of the first invalid parameter. |
| `receivedType` | `string` | Actual type of the invalid value. |

The `receivedType` property reports the following values:

| Value | Result |
|---|---|
| `null` | `null` |
| `[]` | `array` |
| `'text'` | `string` |
| `123` | `number` |
| `true` | `boolean` |
| `undefined` | `undefined` |

Validation stops after the first invalid parameter. The order of validation follows the order of properties in the validation rules.

## API

### `checkParams(params)`

Validates the parameters required for placeholder replacement using the configured validation rules.

**Parameters:**

- `params` (`object`) — an object containing the following properties:

| Property | Type | Description |
|---|---|---|
| `message` | `string` | The message containing placeholders. |
| `params` | `object` | An object containing placeholder names and their replacement values. |
| `prefix` | `string` | The opening placeholder delimiter. |
| `suffix` | `string` | The closing placeholder delimiter. |

**Returns:** `object` — a validation result.

- `{ valid: true }` when all parameters are valid.
- `{ valid: false, parameter, receivedType }` when validation fails.

## Requirements

- Node.js >= 20

## License

MIT