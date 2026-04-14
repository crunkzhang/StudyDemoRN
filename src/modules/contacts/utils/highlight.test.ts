import {splitByHit} from './highlight';

describe('splitByHit', () => {
  it('空关键字返回整串', () => {
    expect(splitByHit('hello', '')).toEqual([{text: 'hello', hit: false}]);
  });
  it('无命中返回整串', () => {
    expect(splitByHit('hello', 'x')).toEqual([{text: 'hello', hit: false}]);
  });
  it('单次命中', () => {
    expect(splitByHit('hello', 'll')).toEqual([
      {text: 'he', hit: false},
      {text: 'll', hit: true},
      {text: 'o', hit: false},
    ]);
  });
  it('命中大小写不敏感', () => {
    expect(splitByHit('Hello', 'h')).toEqual([
      {text: 'H', hit: true},
      {text: 'ello', hit: false},
    ]);
  });
  it('多次命中', () => {
    expect(splitByHit('ababa', 'a')).toEqual([
      {text: 'a', hit: true},
      {text: 'b', hit: false},
      {text: 'a', hit: true},
      {text: 'b', hit: false},
      {text: 'a', hit: true},
    ]);
  });
});
