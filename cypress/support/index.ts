declare namespace Cypress {
  interface Chainable {
    getByData(
      dataTestAttribute: string,
      exist?: boolean
    ): Chainable<JQuery<HTMLElement>>;
  }
}
declare namespace Cypress {
  interface Chainable {
    simpleInput(
      name: string,
      type: string,
      selector?: string
    ): Chainable<JQuery<HTMLElement>>;
  }
}
