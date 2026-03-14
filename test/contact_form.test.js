const { JSDOM } = require('jsdom');

let $;

const setupScript = async ({ scriptName, contactEndpoint = 'https://formspree.io/f/demo' }) => {
  jest.resetModules();
  const dom = new JSDOM(`<!DOCTYPE html><html><body>
    <form id="contactForm">
      <input id="name" />
      <input id="email" />
      <textarea id="message"></textarea>
    </form>
    <div id="success"></div>
  </body></html>`);

  dom.window.document.readyState = 'complete';
  global.window = dom.window;
  global.document = dom.window.document;
  global.window.NORIADE_BASE_PATH = '/preview';
  global.window.NORIADE_CONTACT_ENDPOINT = contactEndpoint;
  global.window.NORIADE_CONTACT_MESSAGES = {
    success: 'Message sent ok.',
    error: 'Message failed.'
  };

  $ = require('jquery');
  global.$ = global.jQuery = $;

  $.fn.jqBootstrapValidation = jest.fn(function(opts) {
    return this;
  });
  $.ajax = jest.fn();

  require(`../js/${scriptName}`);

  $('#name').val('Jane');
  $('#email').val('jane@example.com');
  $('#message').val('Hello');

  await new Promise((resolve) => setTimeout(resolve, 20));
};

describe('contact_me.js', () => {
  beforeEach(async () => {
    await setupScript({ scriptName: 'contact_me.js' });
  });

  test('shows success message and resets form on AJAX success', async () => {
    $.ajax.mockImplementation(({ success }) => success());
    const event = { preventDefault: jest.fn() };
    await new Promise((resolve) => setTimeout(resolve, 20));
    const options = $.fn.jqBootstrapValidation.mock.calls[0][0];
    options.submitSuccess($('#contactForm'), event);

    expect($.ajax.mock.calls[0][0].url).toBe('/preview/mail/contact_me.php');
    expect($('#success .alert-success').length).toBe(1);
    expect($('#success .alert-success').text()).toContain('Message sent ok.');
    expect($('#name').val()).toBe('');
    expect($('#email').val()).toBe('');
    expect($('#message').val()).toBe('');
  });

  test('shows error message and resets form on AJAX error', async () => {
    $.ajax.mockImplementation(({ error }) => error());
    const event = { preventDefault: jest.fn() };
    await new Promise((resolve) => setTimeout(resolve, 20));
    const options = $.fn.jqBootstrapValidation.mock.calls[0][0];
    options.submitSuccess($('#contactForm'), event);

    expect($.ajax.mock.calls[0][0].url).toBe('/preview/mail/contact_me.php');
    const html = $('#success .alert-danger').html();
    expect(html).toContain('Message failed.');
    expect(html).toContain('</strong>');
    expect($('#name').val()).toBe('');
    expect($('#email').val()).toBe('');
    expect($('#message').val()).toBe('');
  });
});

describe('contact_me_static.js', () => {
  beforeEach(async () => {
    await setupScript({ scriptName: 'contact_me_static.js' });
  });

  test('posts to the configured static endpoint and renders feedback', async () => {
    $.ajax.mockImplementation(({ success }) => success());
    const event = { preventDefault: jest.fn() };
    await new Promise((resolve) => setTimeout(resolve, 20));
    const options = $.fn.jqBootstrapValidation.mock.calls[0][0];
    options.submitSuccess($('#contactForm'), event);

    expect($.ajax.mock.calls[0][0].url).toBe('https://formspree.io/f/demo');
    expect($.ajax.mock.calls[0][0].data).toEqual({
      name: 'Jane',
      _replyto: 'jane@example.com',
      _subject: 'Website contact form',
      message: 'Hello'
    });
    expect($('#success .alert-success').text()).toContain('Message sent ok.');
    expect($('#name').val()).toBe('');
  });
});
