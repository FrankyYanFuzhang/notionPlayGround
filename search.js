const { Client } = require('@notionhq/client');

// Initializing a client
const notion = new Client({
    auth: "secret_qZyXqZktEuSgJ5VTdQ2r95uUv9AS7kNlLeiIJXl1cIk",
});

// Define the database ID and search parameters
const databaseId = '913bfc7b571c4f51a81b2dad412f2888';

(async () => {

    // Search the database
    const response = await notion.databases.query({
        database_id: databaseId,
        filter: {
            and: [
                {
                    property: 'Status',
                    status: {
                        "equals": "Doing",
                    },
                },
                {
                    property: 'Sub?',
                    select: {
                        "equals": "Father",
                    },
                }
            ]
        },
    });

    // Output the search results
    console.log(response.results[0].properties.Name.title[0].plain_text);
    let myArray = []
    // response.forEach((item) => {
    console.log(response.results.length)
    for(let i=0;i< response.results.length;i++){
        let id = response.results[i].id
        let arrayName = []

        for(let y=0; y<response.results[i].properties.Name.title.length;y++){
            arrayName.push(response.results[i].properties.Name.title[y].plain_text)
        }

        let name = arrayName.join("")
        let myObject = { name: name, id: id }
        myArray.push(myObject)
    }

    // console.log(typeof(response))
    console.log(myArray)
})()
