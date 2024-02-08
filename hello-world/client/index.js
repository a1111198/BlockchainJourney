const ethers = require('ethers')
require('dotenv').config()

async function readMessage (contract) {
  const currentMessage = await contract.message()
  console.log('Current Message:', currentMessage)
}
async function updateMessage (contractWithSigner, newMessage) {
  const tx = await contractWithSigner.update(newMessage)
  await tx.wait() // Wait for the transaction to be mined
  console.log('Message updated!')
}
// Assuming contract is already set up as shown previously

function setupEventListener (contract) {
  contract.on('UpdatedMessages', (oldStr, newStr, event) => {
    console.log(`Message Updated from: ${oldStr} to: ${newStr}`)
    // You can access the event details if needed
    console.log(event)
  })

  console.log('Listening for UpdatedMessages events...')
}

async function main () {
  const provider = new ethers.providers.JsonRpcProvider(process.env.API_URL)
  const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider)
  const contractABI = [
    {
      inputs: [
        {
          internalType: 'string',
          name: 'initMessage',
          type: 'string'
        }
      ],
      stateMutability: 'nonpayable',
      type: 'constructor'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'string',
          name: 'oldStr',
          type: 'string'
        },
        {
          indexed: false,
          internalType: 'string',
          name: 'newStr',
          type: 'string'
        }
      ],
      name: 'UpdatedMessages',
      type: 'event'
    },
    {
      inputs: [],
      name: 'message',
      outputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'string',
          name: 'newMessage',
          type: 'string'
        }
      ],
      name: 'update',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    }
  ]
  const contractAddress = '0x0bb688cbbae08c4dbe179486a40204724bce0ce6'
  const contract = new ethers.Contract(contractAddress, contractABI, provider)
  //   setupEventListener(contract)
  //   await readMessage(contract).catch(console.error)
    const contractWithSigner = contract.connect(signer)
    await updateMessage(
      contractWithSigner,
      'Hey'
      ).catch(console.error)
  // No filter parameters, to get all events
  const eventFilter = contract.filters.UpdatedMessages(null, null)

  const events = await provider.getLogs({
    ...eventFilter,
    fromBlock: 0, // Adjust based on deployment block, if known, to optimize
    toBlock: 'latest'
  })

  const parsedEvents = events.map(event => contract.interface.parseLog(event))
  console.log('All UpdatedMessages Events:')
  parsedEvents.forEach(event => {
    console.log(
      `Message Updated from: ${event.args.oldStr} to: ${event.args.newStr} at block number: ${event}`
    )
  })
}

main()
