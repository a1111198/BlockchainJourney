require('dotenv').config()
const UniswapFactoryABI = require('./ABIs/UniswapFactoryABI')
const exchangeABI = require('./ABIs/exchangeABI')
const tokenABI = require('./ABIs/tokenABI')

const { Web3 } = require('web3')

// Connect to Ethereum network via Infura
const web3 = new Web3(
  new Web3.providers.HttpProvider(
    'https://goerli.infura.io/v3/769edce84fc04006b7383bc1ccefc813'
  )
)

// Set up contract interaction (using Uniswap V1 contract ABI and address)
const uniswapContractAddress = '0x6ce570d02d73d4c384b46135e87f8c592a8c86da'

const factoryContract = new web3.eth.Contract(
  UniswapFactoryABI,
  uniswapContractAddress
)

const tokenAddress = '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984' // Replace with the actual test token address

async function getExchangeAddress () {
  try {
    const exchangeAddress = await factoryContract.methods
      .getExchange(tokenAddress)
      .call()
    if (exchangeAddress === '0x0000000000000000000000000000000000000000') {
      console.log('Token does not have an exchange yet.')
    } else {
      console.log('Exchange Address:', exchangeAddress)
      return exchangeAddress
    }
  } catch (error) {
    console.error('Error fetching exchange address:', error)
  }
  return null
}

// Interact with the contract
async function main () {
  const exchangeAddress = await getExchangeAddress()
  if (exchangeAddress != null) {
    const exchangeContract = new web3.eth.Contract(exchangeABI, exchangeAddress)
    const tokenAddress = await exchangeContract.methods
      .tokenAddress(exchangeAddress)
      .call()
    console.log('TOKEN ADDRESS IS', tokenAddress)
    const tokenContract = new web3.eth.Contract(tokenABI, tokenAddress)
    const tokenReserve = await tokenContract.methods
      .balanceOf(exchangeAddress)
      .call()
    console.log('Price Of ETH Reserve is', tokenReserve)
  }
}

main().catch(console.error)
