const { Client } = require('@notionhq/client');
const { expect } = require('chai');

const databaseIdOfPoints = 'd15bac4b710c4081b1a70aee4fff9ffb'
const databaseIdOfBills = '80a493f8808c491d97ccf6ac84c4ddd5'
const robotBalance = 'secret_qZyXqZktEuSgJ5VTdQ2r95uUv9AS7kNlLeiIJXl1cIk'

let testCreatedDataPoints = {
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
    "Tags": {
        "select": {
            "name": "Testing1.0"
        }
    },
    "Points": {
        type: 'number',
        number: 0.114,
    },
}

let testCreatedDataBills = {
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
    "Tags": {
        "multi_select":
            [
                { "name": "Testing" }
            ]
    },
    "Pay": {
        type: 'number',
        number: 0.114,
    },
}

describe('DatabaseTest', () => {

    it('1. Create a points page into database', async () => {

        const notion = new Client({ auth: robotBalance });

        const response = await notion.pages.create({
            parent: {
                database_id: databaseIdOfPoints,
            },
            properties: testCreatedDataPoints
        });

        console.log(response);

        expect(response).to.have.property('id')

    }).timeout(90000)

    it('2. Bills should be created in a database', async () => {

        const notion = new Client({ auth: robotBalance });

        const response = await notion.pages.create({
            parent: {
                database_id: databaseIdOfBills,
            },
            properties: testCreatedDataBills
        });

        console.log(response);
        expect(response).to.have.property('id')

    }).timeout(90000)

    it('3. Query Bills created today.', async () => {

        const notion = new Client({ auth: robotBalance });
        const today = new Date().toISOString().slice(0, 10);

        const response = await notion.databases.query({
            database_id: databaseIdOfBills,
            filter: {
                property: 'Created time',
                created_time: {
                    on_or_after: today,
                },
            },
        });

        const sum = response.results.reduce((acc, page) => {
            const value = page.properties['Pay'].number;
            return acc + value;
        }, 0);
        console.log('sum is :==== ', sum);

        expect(response).to.have.property('results')
    }).timeout(90000)

    it('4. Query total Bills value.', async () => {

        const notion = new Client({ auth: robotBalance });
        const today = new Date().toISOString().slice(0, 10);

        const response = await notion.databases.query({
            database_id: databaseIdOfBills,
            // filter: {
            //     property: 'Created time',
            //     created_time: {
            //         on_or_after: today,
            //     },
            // },
        });

        const sum = response.results.reduce((acc, page) => {
            const value = page.properties['Pay'].number;
            return acc + value;
        }, 0);
        console.log('sum is :==== ', sum);

        expect(response).to.have.property('results')
    }).timeout(90000)


    it('5. Query Bills record last created.', async () => {

        const notion = new Client({ auth: robotBalance });
        const today = new Date().toISOString().slice(0, 10);

        const response = await notion.databases.query({
            database_id: databaseIdOfBills,
            sorts: [
                {
                  property: 'Created time',
                  direction: 'descending',
                },
              ],
              page_size: 1,
        });

        console.log(response.results[0].properties.Pay.number);

    }).timeout(90000)
})

