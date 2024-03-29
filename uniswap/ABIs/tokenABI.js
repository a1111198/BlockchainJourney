const tokenABI = [
  {
    name: 'Transfer',
    inputs: [
      { type: 'address', name: '_from', indexed: true },
      { type: 'address', name: '_to', indexed: true },
      { type: 'uint256', name: '_value', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    name: 'Approval',
    inputs: [
      { type: 'address', name: '_owner', indexed: true },
      { type: 'address', name: '_spender', indexed: true },
      { type: 'uint256', name: '_value', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  },
  {
    name: '__init__',
    outputs: [],
    inputs: [
      { type: 'bytes32', name: '_name' },
      { type: 'bytes32', name: '_symbol' },
      { type: 'uint256', name: '_decimals' },
      { type: 'uint256', name: '_supply' }
    ],
    constant: false,
    payable: false,
    type: 'constructor'
  },
  {
    name: 'deposit',
    outputs: [],
    inputs: [],
    constant: false,
    payable: true,
    type: 'function',
    gas: 74279
  },
  {
    name: 'withdraw',
    outputs: [{ type: 'bool', name: 'out' }],
    inputs: [{ type: 'uint256', name: '_value' }],
    constant: false,
    payable: false,
    type: 'function',
    gas: 108706
  },
  {
    name: 'totalSupply',
    outputs: [{ type: 'uint256', name: 'out' }],
    inputs: [],
    constant: true,
    payable: false,
    type: 'function',
    gas: 543
  },
  {
    name: 'balanceOf',
    outputs: [{ type: 'uint256', name: 'out' }],
    inputs: [{ type: 'address', name: '_owner' }],
    constant: true,
    payable: false,
    type: 'function',
    gas: 745
  },
  {
    name: 'transfer',
    outputs: [{ type: 'bool', name: 'out' }],
    inputs: [
      { type: 'address', name: '_to' },
      { type: 'uint256', name: '_value' }
    ],
    constant: false,
    payable: false,
    type: 'function',
    gas: 74698
  },
  {
    name: 'transferFrom',
    outputs: [{ type: 'bool', name: 'out' }],
    inputs: [
      { type: 'address', name: '_from' },
      { type: 'address', name: '_to' },
      { type: 'uint256', name: '_value' }
    ],
    constant: false,
    payable: false,
    type: 'function',
    gas: 110600
  },
  {
    name: 'approve',
    outputs: [{ type: 'bool', name: 'out' }],
    inputs: [
      { type: 'address', name: '_spender' },
      { type: 'uint256', name: '_value' }
    ],
    constant: false,
    payable: false,
    type: 'function',
    gas: 37888
  },
  {
    name: 'allowance',
    outputs: [{ type: 'uint256', name: 'out' }],
    inputs: [
      { type: 'address', name: '_owner' },
      { type: 'address', name: '_spender' }
    ],
    constant: true,
    payable: false,
    type: 'function',
    gas: 1025
  },
  {
    name: 'name',
    outputs: [{ type: 'bytes32', name: 'out' }],
    inputs: [],
    constant: true,
    payable: false,
    type: 'function',
    gas: 723
  },
  {
    name: 'symbol',
    outputs: [{ type: 'bytes32', name: 'out' }],
    inputs: [],
    constant: true,
    payable: false,
    type: 'function',
    gas: 753
  },
  {
    name: 'decimals',
    outputs: [{ type: 'uint256', name: 'out' }],
    inputs: [],
    constant: true,
    payable: false,
    type: 'function',
    gas: 783
  }
]
module.exports = tokenABI
