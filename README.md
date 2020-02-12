# Console Calculator

[![CI badge](https://github.com/bondarenkosa/nodejs-console-calculator/workflows/Node.js%20CI/badge.svg)](https://github.com/bondarenkosa/nodejs-console-calculator/actions?query=workflow%3A%22Node.js+CI%22)

Calculate math expression from a string.

## Installation

### Running with Git

```console
$ git clone https://github.com/bondarenkosa/nodejs-console-calculator.git && cd nodejs-console-calculator
```

```console
$ make install
```

## Usage

### Operators

| Individual operators | Operator type |
| --- | --- |
| `( … )` | Grouping |
| `- …` | Unary Negation |
| `… ** …` | Exponentiation |
| `… * …` | Multiplication |
| `… / …` | Division |
| `… + …` | Addition |
| `… - …` | Subtraction |

```console
$ make run
```

```console
Enter the expression: (2 + 3 ** 2) ** 3
Result: -1331
Repeat? [y/n]:
```

#### More operators

Open **./src/operations.js**

Add:

```js
...
{
    type: 'binary',
    precedence: 16,
    operators: [
      {
        name: 'Exponentiation',
        operator: '**',
        fn: (x, y) => x ** y,
      },
    ],
  },
...
```
