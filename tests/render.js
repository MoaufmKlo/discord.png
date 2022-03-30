/* eslint-env jest */
const discordpng = require('../')

test('Render a message with: content', () => {
  return discordpng.render({ content: 'Hello, world!' }, { display: 'compact', color: 'light' })
})

test('Render a message with: content, embeds', () => {
  return discordpng.render({
    content: 'Hello, world!',
    embeds: [
      {
        title: 'Hello, world!',
        description: 'Hello, world!',
        color: 1234567
      },
      {
        title: 'Hello, world!',
        description: 'Hello, world!',
        color: 1234567,
        fields: [
          {
            name: 'Hello, world!',
            value: 'Hello, world!'
          },
          {
            name: 'Hello, world!',
            value: 'Hello, world!'
          }
        ]
      }
    ],
    bot: true
  }, { display: 'cozy', color: 'light' })
})
