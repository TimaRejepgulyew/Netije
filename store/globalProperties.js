export const state = () => ({
  whitespacePattern: /^[^\s]+$/
});

export const getters = {
  whitespacePattern({ whitespacePattern }) {
    return whitespacePattern;
  }
};

