export const EOSMethods = {
  DBSize: {
    get: "get"
  },
  chain: {
    abi: "get_abi",
    account: "get_account",
    atob: "abi_json_to_bin",
    balance: "get_currency_balance",
    block: "get_block",
    blockHeaderState: "get_block_header_state",
    btoa: "abi_bin_to_json",
    code: "get_code",
    info: "get_info",
    rawCodeAndABI: "get_raw_code_and_abi",
    sendTx: "push_transaction",
    sendTxList: "push_transactions"
  },
  history: {
    actions: "get_actions",
    ctrlAccounts: "get_controlled_accounts",
    keyAccounts: "get_key_accounts",
    tx: "get_transaction"
  },
  net: {
    connect: "connect",
    connections: "connections",
    disconnect: "disconnect",
    status: "status"
  }
};

export const EosModule = {
  DBSize: "DBSize",
  chain: "chain",
  history: "history",
  net: "net"
};

export interface IEosTrx {
  // executed  = 0, ///< succeed, no error handler executed
  // soft_fail = 1, ///< objectively failed (not executed), error handler executed
  // hard_fail = 2, ///< objectively failed and error handler objectively failed thus no state change
  // delayed   = 3, ///< transaction delayed/deferred/scheduled for future execution
  // expired   = 4  ///< transaction expired and storage space refunded to user
  status: "executed" | "soft_fail" | "hard_fail" | "delayed" | "expired";
  // millisecond
  cpu_usage_us: number;
  // bytes
  net_usage_words: number;
  // `trx` may be a `string`
  trx: {
    // txid
    id: string;
    signatures: string[];
    compression: "none" | "zlib";
    packed_context_free_data: string;
    context_free_data: any[];
    packed_trx: string;
    transaction: {
      expiration: string;
      ref_block_num: number;
      ref_block_prefix: number;
      max_net_usage_ms: number;
      max_cpu_usage_ms: number;
      delay_sec: number;
      context_free_actions: any[];
      /** spell-checker: disable */
      actions: Array<{
        // EOS transfer is "eosio.token"
        account: string;
        name: string;
        authorization: Array<{ actor: string; permission: string }>;
        data: any;
        hex_data: string;
      }>;
      transaction_extensions: any[];
    };
  };
}

export interface IEosChainInfo {
  server_version: string;
  chain_id: string;
  head_block_num: number;
  last_irreversible_block_num: number;
  last_irreversible_block_id: string;
  head_block_id: string;
  head_block_time: string;
  head_block_producer: string;
  virtual_block_cpu_limit: number;
  virtual_block_net_limit: number;
  block_cpu_limit: number;
  block_net_limit: number;
  server_version_string: string;
}

export interface IEosBlockInfo {
  timestamp: string;
  producer: string;
  confirmed: number;
  previous: string;
  transaction_mroot: string;
  action_mroot: string;
  schedule_version: number;
  new_producers: any;
  header_extensions: any[];
  producer_signature: string;
  transactions: IEosTrx[];
  block_extensions: any[];
  id: string;
  block_num: number;
  ref_block_prefix: number;
}

export interface IEosAccount {
  account_name: string;
  head_block_number: number;
  head_block_time: string;
  privileged: boolean;
  last_code_update: string;
  created_at: string;
  ram_quota: number;
  net_weight: number;
  cpu_weight: number;

  net_limit: {
    used: number;
    available: number;
    max: number;
  };

  cpu_limit: {
    used: number;
    available: number;
    max: number;
  };
  ram_usage: number;
  permissions: Array<{
    perm_name: string;
    parent: string;
    required_auth: {
      threshold: number;
      key: Array<{ key: string; weight: number }>;
    };
    accounts: any[];
    waits: any[];
  }>;
  total_resources: {
    owner: string;
    net_weight: string;
    cpu_weight: string;
    ram_bytes: number;
  };
  self_delegated_bandwidth: any;
  refund_request: any;
  voter_info: any;
}
