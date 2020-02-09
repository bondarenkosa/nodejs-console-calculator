export default class Parser {
  constructor(parserFn) {
    this.parserFn = parserFn;
  }

  static from(parserFn) {
    return new Parser(parserFn);
  }

  parse(string) {
    return this.parserFn(string);
  }

  or(p2) {
    return Parser.from((tokens) => this.parse(tokens) || p2.parse(tokens));
  }

  static char(ch) {
    return Parser.from((input) => {
      if (!input.startsWith(ch)) {
        return null;
      }
      return {
        result: ch,
        rest: input.slice(ch.length),
      };
    });
  }

  static any(...ps) {
    return ps.flat().reduce((anyP, p) => anyP.or(p));
  }

  static anyFromString(str) {
    const parsers = str.split('').map(Parser.char);
    return Parser.any(parsers);
  }

  static inject(injectedValue) {
    return Parser.from((tokens) => ({
      result: injectedValue,
      rest: tokens,
    }));
  }

  chain(step) {
    return Parser.from((tokens) => {
      const res1 = this.parse(tokens);
      if (!res1) {
        return null;
      }

      const p2 = step(res1.result);

      return p2.parse(res1.rest);
    });
  }

  map(f) {
    return this.chain((x) => Parser.inject(f(x)));
  }

  static many0(p1) {
    return p1.chain((r) => Parser.many0(p1)
      .chain((rs) => Parser.inject([r, ...rs])))
      .or(Parser.inject([]));
  }

  static many1(p1) {
    return p1.chain((r) => Parser.many0(p1)
      .chain((rs) => Parser.inject([r, ...rs])));
  }
}
