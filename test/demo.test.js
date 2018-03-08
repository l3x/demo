const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3')
const web3 = new Web3(ganache.provider())
const { interface, bytecode } = require('../compile')

let accounts
let demo

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts()

  // Use one of those accounts to deploy the contract
  demo = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: ['Hello, World!']
    })
    .send({ from: accounts[0], gas: '1000000' })
})

describe('Demo', () => {
  it('deploys a contract', () => {
    assert.ok(demo.options.address)
  })

  it('has a default message', async () => {
    const message = await demo.methods.message().call();
    assert.equal(message, 'Hello, World!')
  })

  it('can change the message', async () => {
    await demo.methods.setMessage('bye').send({ from: accounts[0] })
    const message = await demo.methods.message().call()
    assert.equal(message, 'bye')
  })
})
