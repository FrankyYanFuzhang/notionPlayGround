const { Client } = require("@notionhq/client");

// Initializing a client
const notion = new Client({ auth: process.env.NOTION_API_KEY });


(async () => {

    // The ID of the page you want to append a block to
    const pageId = "2f0b0805de5848cdb8b4a58766fd8517";

    // Retrieve the page
    const page = await notion.pages.retrieve({ page_id: pageId });

    const t1='test'
    const t2='→'
    const t3='done'
    

    // Construct the paragraph block
    const newBlock = {
        object: "block",
        type: "paragraph",
        paragraph: {
            "rich_text": [
                {
                    "text": {
                        "content": [t1]+[t2]+[t3]
                    }
                }
            ]
        },
    };

    const response = await notion.blocks.children.append({
        // block_id: "testPage-2f0b0805de5848cdb8b4a58766fd8517",
        block_id: "2f0b0805de5848cdb8b4a58766fd8517",
        children: [newBlock],
    });

    if (response) {
        console.log("Block added successfully!");
    } else {
        console.log("Error adding block.");
    }

})()
