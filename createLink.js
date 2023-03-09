const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_API_KEY });

(async () => {
  const response = await notion.pages.create({
    parent: {
      database_id: '04c068968c914c72ba064a4cf4318cbb',
    },
    properties: {
      'Name': {
        type: 'title',
        title: [
          {
            type: 'text',
            text: {
              content: 'Test',
            },
          },
        ],
      },
      Tags: {
        "multi_select": [
            {
              "name": "Test"
            }
          ]
      },
    },
  });
  console.log(response);
})();