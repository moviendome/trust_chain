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
          "name": "address",
          "type": "string"
        },
        {
          "name": "profile",
          "type": "string"
        },
        {
          "name": "cover",
          "type": "string"
        },
        {
          "name": "latitude",
          "type": "i64"
        },
        {
          "name": "longitude",
          "type": "i64"
        },
        {
          "name": "category",
          "type": "string"
        }
      ]
    },
    {
      "name": "createReview",
      "discriminator": [
        69,
        237,
        87,
        43,
        238,
        125,
        40,
        1
      ],
      "accounts": [
        {
          "name": "reviewEntry",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "arg",
                "path": "title"
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
          "name": "business",
          "writable": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "title",
          "type": "string"
        },
        {
          "name": "rating",
          "type": "u8"
        },
        {
          "name": "comment",
          "type": "string"
        }
      ]
    },
    {
      "name": "deleteBusiness",
      "discriminator": [
        99,
        122,
        133,
        17,
        244,
        83,
        107,
        134
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
    },
    {
      "name": "reviewEntryState",
      "discriminator": [
        69,
        125,
        157,
        177,
        151,
        166,
        41,
        97
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "nameTooLong",
      "msg": "The provided name should be 50 characters long maximum."
    },
    {
      "code": 6001,
      "name": "addressTooLong",
      "msg": "The provided address should be 100 characters long maximum."
    },
    {
      "code": 6002,
      "name": "profileTooLong",
      "msg": "The provided profile should be 200 characters long maximum."
    },
    {
      "code": 6003,
      "name": "coverTooLong",
      "msg": "The provided cover should be 200 characters long maximum."
    },
    {
      "code": 6004,
      "name": "categoryTooLong",
      "msg": "The provided category should be 50 characters long maximum."
    },
    {
      "code": 6005,
      "name": "titleTooLong",
      "msg": "The provided title should be 50 characters long maximum."
    },
    {
      "code": 6006,
      "name": "commentTooLong",
      "msg": "The provided comment should be 200 characters long maximum."
    },
    {
      "code": 6007,
      "name": "invalidRating",
      "msg": "The provided rating should be between 1 and 5."
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
            "name": "category",
            "type": "string"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "address",
            "type": "string"
          },
          {
            "name": "profile",
            "type": "string"
          },
          {
            "name": "cover",
            "type": "string"
          },
          {
            "name": "latitude",
            "type": "i64"
          },
          {
            "name": "longitude",
            "type": "i64"
          },
          {
            "name": "createdAt",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "reviewEntryState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "business",
            "type": "pubkey"
          },
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "title",
            "type": "string"
          },
          {
            "name": "rating",
            "type": "u8"
          },
          {
            "name": "comment",
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
