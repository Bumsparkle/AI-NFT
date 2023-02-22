const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const { ethers } = require('ethers');
const { createAlchemyWeb3 } = require('@alch/alchemy-web3');


const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

// Initialize AlchemyWeb3 with your API key
//const alchemyWeb3 = createAlchemyWeb3('9KJKvQbksp68CJ4tOdkhuHso4S2zh068');
const alchemyWeb3 = createAlchemyWeb3('https://eth-goerli.g.alchemy.com/v2/9KJKvQbksp68CJ4tOdkhuHso4S2zh068');

// Load your contract ABI
const contractABI = require('./contract-abi.json');
console.log(contractABI);

// Replace this with your contract address
const contractAddress = '0xD06a9Feb63081Ec37F1fA188d9B3D9737dC63716';

// Create a new contract instance
const contract = new ethers.Contract(contractAddress, contractABI, alchemyWeb3);








// Define a route for generating NFTs using DALL-E API
app.post('/generate-nft', async (req, res) => {
  const { text } = req.body;

  try {
    // Call the DALL-E API to generate an image from the text
    const response = await axios.post('https://api.openai.com/v1/images/generations', {
      model: 'image-alpha-001',
      prompt: `Generate an NFT of ${text}`,
      num_images: 1,
      size: '256x256',
      response_format: 'url',
    }, {
      headers: {
        Authorization: `Bearer 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`,
      },
    });

    // Create an NFT with the generated image
    const nftId = await createNFT({
      owner: req.query.address,
      name: `NFT of ${text}`,
      description: `An NFT of ${text}`,
      image: response.data.data[0].url,
      tokenURI: response.data.data[0].url,
    });

    res.json({ success: true, nftId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to generate NFT' });
  }
});

// Define a route for the root URL
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

