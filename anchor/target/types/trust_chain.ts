/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/trust_chain.json`.
 */
export type TrustChain = {
  "address": "F3G1Aa1T1qMjf9EGnBgkJ86t1fzYC2Fg6nWma843YUNe",
  "metadata": {
    "name": "trustChain",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "createBusiness",
      "discriminator": [
        151,
        158,
        148,
        231,
        53,
        237,
        97,
        61
      ],
      "accounts": [
        {
          "name": "businessEntry",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "arg",
                "path": "name"
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "owner",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "avatar",
          "type": "string"
        },
        {
          "name": "category",
          "type": "string"
        },
        {
          "name": "url",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "businessEntryState",
      "discriminator": [
        63,
        147,
        80,
        107,
        107,
        188,
        179,
        104
      ]
    }
  ],
  "types": [
    {
      "name": "businessEntryState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "avatar",
            "type": "string"
          },
          {
            "name": "category",
            "type": "string"
          },
          {
            "name": "url",
            "type": "string"
          },
          {
            "name": "createdAt",
            "type": "i64"
          }
        ]
      }
    }
  ]
};
