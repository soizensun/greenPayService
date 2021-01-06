const Product = require('../models/Product');

const product1 = new Product({
    "shopId":"5ff082189a0b630dc84df6bb",
    "name":"บิงกือเรไอศกรีมซามันโค",
    "tag":"food",
    "price": 45,
    "description":"food",
    "mainPicture":"https://backend.tops.co.th/media//catalog/product/8/8/8801104190718.jpg",
    "morePicture":["morePicture1 path", "morePicture2 path"]
})

async function run() {
  
   
    const docs = [
        {
            "shopId":"5ff082189a0b630dc84df6bb",
            "name":"บิงกือเรไอศกรีมซามันโค",
            "tag":"food",
            "price": 45,
            "description":"food",
            "mainPicture":"https://backend.tops.co.th/media//catalog/product/8/8/8801104190718.jpg",
            "morePicture":["morePicture1 path", "morePicture2 path"]
        },
        {
            "shopId":"5ff082189a0b630dc84df6bb",
            "name":"บิงกือเรไอศกรีมซามันโค",
            "tag":"food",
            "price": 45,
            "description":"food",
            "mainPicture":"https://backend.tops.co.th/media//catalog/product/8/8/8801104190718.jpg",
            "morePicture":["morePicture1 path", "morePicture2 path"]
        },
        {
            "shopId":"5ff082189a0b630dc84df6bb",
            "name":"บิงกือเรไอศกรีมซามันโค",
            "tag":"food",
            "price": 45,
            "description":"food",
            "mainPicture":"https://backend.tops.co.th/media//catalog/product/8/8/8801104190718.jpg",
            "morePicture":["morePicture1 path", "morePicture2 path"]
        }
    ];

    const options = { ordered: true };
    const result = await Product.insertMany(docs, options);
    console.log(`${result.insertedCount} documents were inserted`);
  
  
}

run().catch(console.dir);