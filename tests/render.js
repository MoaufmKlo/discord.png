/* eslint-env jest */
const discordpng = require('../')

jest.setTimeout(10000)

test('Render a message with: content', () => {
  return discordpng.render({}, { display: 'cozy' })
})
