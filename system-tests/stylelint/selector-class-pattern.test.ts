import { describe, it, expect } from 'vitest';
import * as os from 'os';

const { EOL } = os;

describe('Test CSS Selector Pattern', () => {
  const pattern = /^[a-z]([a-zA-Z0-9]+){1}(__[a-zA-Z0-9]+)?(--[a-zA-Z0-9]+){0,2}$/;

  type TestCaseType = {
    selector: string;
    matches: boolean;
    description: string;
  };

  const testCases: TestCaseType[] = [
    { selector: 'myBlock', matches: true, description: '' },
    { selector: 'myBlock__element', matches: true, description: '' },
    { selector: 'myBlock--modifier', matches: true, description: '' },
    { selector: 'myBlock--modifier1--modifier2', matches: true, description: '' },
    { selector: 'MyBlock', matches: false, description: 'cannot start with a capital letter' },
    {
      selector: 'myBlock--modifier1--modifier2--modifier3',
      matches: false,
      description: 'cannot have more than two modifiers',
    },
    {
      selector: 'myBlock_element',
      matches: false,
      description: 'should follow the pattern block__element',
    },
    {
      selector: 'myBlock__element__modifier',
      matches: false,
      description: 'should follow the pattern block__element--modifier',
    },
    {
      selector: 'myBlock__element-modifier',
      matches: false,
      description: 'should follow the pattern block__element--modifier',
    },
    {
      selector: 'myBlock__element-name',
      matches: false,
      description: 'camelCase should be used in namings',
    },
    { selector: '123myBlock', matches: false, description: 'block name cannot start with a digit' },
    {
      selector: '_myBlock',
      matches: false,
      description: 'block name cannot start with an underscore',
    },
  ];

  testCases.forEach(({ selector, matches, description }: TestCaseType) => {
    const additionalInfo = description ? `${EOL}Explanation: ${description}` : '';

    it(`should ${matches ? 'match' : 'not match'} the pattern for "${selector}" ${additionalInfo}`, () => {
      expect(pattern.test(selector)).toBe(matches);
    });
  });
});
