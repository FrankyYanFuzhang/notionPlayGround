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

    it('1. Points should retrieve a database', async () => {

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

    it('2. Bills should retrieve a database', async () => {

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


})

