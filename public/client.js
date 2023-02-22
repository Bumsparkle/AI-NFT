// Define a function to create an NFT
const createNFT = async (nftData) => {
    // Prompt the user to connect their wallet
    if (typeof window.ethereum === 'undefined') {
      throw new Error('Please install MetaMask or another Web3 wallet to use this dApp!');
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await window.ethereum.enable();
    const signer = provider.getSigner();
  
    // Create the NFT on the blockchain
    const createResult = await contract.createNFT(nftData.tokenURI);
  
    // Get the ID of the created NFT
    const nftId = createResult.events[0].args.tokenId.toString();
  
    // Set the metadata for the NFT
    const metadata = {
      name: nftData.name,
      description: nftData.description,
      image: nftData.image,
    };
  
    const setMetadataResult = await contract.setMetadata(nftId, metadata);
  
    // Transfer ownership of the NFT to the user's wallet
    const transferResult = await contract.transferFrom(contractAddress, nftData.owner, nftId);
  
    // Return the ID of the created NFT
    return nftId;
  };
  
  $(document).ready(function() {
    $('#create-nft-form').submit(async function(event) {
      event.preventDefault();
  
      const nftData = {
        tokenURI: 'https://dalle.ai/api/generate',
        name: 'My NFT',
        description: 'This is my first NFT',
        image: 'https://dalle.ai/api/generate'
      };
  
      try {
        const nftId = await createNFT(nftData);
        alert(`NFT created with ID: ${nftId}`);
      } catch (error) {
        alert(`Failed to create NFT: ${error.message}`);
      }
    });
  });