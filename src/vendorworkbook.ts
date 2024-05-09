import { Flatfile } from "@flatfile/api";

export const workbook: Flatfile.CreateWorkbookConfig = {
  name: "Vendor All Data",
  labels: ["pinned"],
  sheets: [
    {
      name: "Vendor",
      description: "A list of products available for sale",
      slug: "Vendors",
      allowAdditionalFields: true,
      fields: [
        {
          key: "VENDOR_NUMBER",
          type: "string",
          label: "VENDOR_NUMBER",
          description: "The vendor number should be a maximum of 6 digits."
          //"regexp": {
          //			"pattern": "^\\d{1,6}$",
          //			"flags": "",
          //			"ignoreBlanks": true
          //		},
        },
        {
          key: "VENDOR_NAME",
          type: "string",
          label: "VENDOR_NAME",
          description: "The vendor name should be a maximum of 30 characters."
          //"regexp": {
          //			"pattern": "^.{0,30}$",
          //			"flags": "",
          //			"ignoreBlanks": true
          //		},
        },
        {
          key: "VENDOR_SORT_NAME",
          type: "string",
          label: "VENDOR_SORT_NAME",
          description: "The vendor sort name should be a maximum of 20 characters."
          //"regexp": {
          //			"pattern": "^.{0,20}$",
          //			"flags": "",
          //			"ignoreBlanks": true
          //		},
        },
        {
          key: "VENDOR_TAX_ID",
          type: "string",
          label: "VENDOR_TAX_ID",
          description: "The vendor tax id should be a maximum of 15 characters."
          //"regexp": {
          //			"pattern": "^.{0,15}$", 
          //			"flags": "",
          //			"ignoreBlanks": true
          //		},
        },
        {
          key: "DATE_OF_LAST_PO",
          type: "string",
          label: "DATE_OF_LAST_PO",
          description: "The format for the date must be MM/DD/YYYY."
        },
        {
          key: "DATE_OF_LAST_INVOICE",
          type: "string",
          label: "DATE_OF_LAST_INVOICE",
          description: "The format for the date must be MM/DD/YYYY."
        },
        {
          key: "VENDOR_USER_CODE1",
          type: "string",
          label: "VENDOR_USER_CODE1",
          description: "The vendor user code should be a maximum of 3 characters."
          // "regexp": {
          //   "pattern": "^.{0,3}$",
          //   "flags": "",
          //   "ignoreBlanks": true
          // },

        },
        {
          key: "VENDOR_USER_CODE2",
          type: "string",
          label: "VENDOR_USER_CODE2",
          description: "The vendor user code should be a maximum of 3 characters."
          // "regexp": {
          //   "pattern": "^.{0,3}$",
          //   "flags": "",
          //   "ignoreBlanks": true
          // },
        },
        {
          key: "VENDOR_USER_CODE3",
          type: "string",
          label: "VENDOR_USER_CODE3",
          description: "The vendor user code should be a maximum of 3 characters."
          // "regexp": {
          //   "pattern": "^.{0,3}$",
          //   "flags": "",
          //   "ignoreBlanks": true
          // },
        },
        {
          key: "VENDOR_USER_CODE4",
          type: "string",
          label: "VENDOR_USER_CODE4",
          description: "The vendor user code should be a maximum of 3 characters."
          // "regexp": {
          //   "pattern": "^.{0,3}$",
          //   "flags": "",
          //   "ignoreBlanks": true
          // },
        },
        {
          key: "VENDOR_USER_CODE5",
          type: "string",
          label: "VENDOR_USER_CODE5",
          description: "The vendor user code should be a maximum of 3 characters."
          // "regexp": {
          //   "pattern": "^.{0,3}$",
          //   "flags": "",
          //   "ignoreBlanks": true
          // },
        },
        {
          key: "PAYMENT_TERMS_CODE",
          type: "string",
          label: "PAYMENT_TERMS_CODE",
          description: "The code of payment terms should be a maximum of 3 characters."
          // "regexp": {
          //   "pattern": "^.{0,3}$",
          //   "flags": "",
          //   "ignoreBlanks": true
          // },

        },
        {
          key: "PRIMARY_FOB_POINT",
          type: "string",
          label: "PRIMARY_FOB_POINT",
          description: "The primary fob point should be a maximum of 25 characters."
          // "regexp": {
          //   "pattern": "^.{0,25}$",
          //   "flags": "",
          //   "ignoreBlanks": true
          // },

        },
        {
          key: "ALLOW_ORDERING",
          type: "enum",
          label: "ALLOW_ORDERING",
          description: "Allow default order Yes",
          config: {
            //defaultValue: "Y",
            options: [
              { value: "Y", label: "Yes" },
              { value: "N", label: "No" }
            ]
          }
        },
        {
          key: "SPECIAL_INFO",
          type: "string",
          label: "SPECIAL_INFO",
          description: "The special information should be a maximum of 60 characters."
          //   "regexp": {
          //     "pattern": "^.{0,60}$",
          //     "flags": "",
          //     "ignoreBlanks": true
          //   },
        },
        {
          key: "DISCOUNT_PERCENTAGE",
          type: "string",
          label: "DISCOUNT_PERCENTAGE",
          description: "The discount percentage should be a maximum of 8 digits.",
          //defaultValue: "0"
          //   "regexp": {
          //     "pattern": "^\\d[0-9.]{0,7}$",
          //     "flags": "",
          //     "ignoreBlanks": true
          //   },
        },
        {
          key: "BOX_NUMBER_1099",
          type: "string",
          label: "BOX_NUMBER_1099",
          description: "The box number should be a maximum of 2 digits.",
          //defaultValue: "0"
          //   "regexp": {
          //     "pattern": "^\\d{1,2}$",
          //     "flags": "",
          //     "ignoreBlanks": true
          //   },
        },
        {
          key: "SIC_CODE",
          type: "string",
          label: "SIC_CODE",
          description: "The sic code should be a maximum of 5 digits.",
          //defaultValue: "0"
          //   "regexp": {
          //     "pattern": "^\\d{1,5}$",
          //     "flags": "",
          //     "ignoreBlanks": true
          //   },
        },
        {
          key: "LOCAL_VENDOR",
          type: "string",
          label: "LOCAL_VENDOR",
          description: "The local vendor should be a maximum of one character.",
          //defaultValue: "N"
          //   "regexp": {
          //     "pattern": "^.{0,1}$",
          //     "flags": "",
          //     "ignoreBlanks": true
          //   },
        },
        {
          key: "PRINT_1099",
          type: "string",
          label: "PRINT_1099",
          description: "The print should be a maximum of one character.",
          //defaultValue: "N"
          //   "regexp": {
          //     "pattern": "^.{0,1}$",
          //     "flags": "",
          //     "ignoreBlanks": true
          //   },
        },
        {
          key: "INSURANCE_REQUIRED",
          type: "string",
          label: "INSURANCE_REQUIRED",
          description: "The insurance should be a maximum of one character.",
          //defaultValue: "N"
          //   "regexp": {
          //     "pattern": "^.{0,1}$",
          //     "flags": "",
          //     "ignoreBlanks": true
          //   },
        },
        {
          key: "DATE_INSURANCE_EXP",
          type: "string",
          label: "DATE_INSURANCE_EXP",
          description: "The format for the date must be MM/DD/YYYY.",
        },
        {
          key: "FILLER",
          type: "string",
          label: "FILLER",
          description: "The filter should be a maximum of 41 characters.",
          //   "regexp": {
          //     "pattern": "^.{0,41}$",
          //     "flags": "",
          //     "ignoreBlanks": true
          //   },
        },
        {
          key: "CONTRACT_VENDOR",
          type: "string",
          label: "CONTRACT_VENDOR",
          description: "The contract vendor should be a maximum of one character.",
         // defaultValue: "N"
          //   "regexp": {
          //     "pattern": "^.{0,1}$",
          //     "flags": "",
          //     "ignoreBlanks": true
          //   },
        },
        {
          key: "DATE_CONTRACT_EXP",
          type: "string",
          label: "DATE_CONTRACT_EXP",
          description: "The format for the date must be MM/DD/YYYY."
        },
        {
          key: "MISCELLANEOUS_VENDOR",
          type: "string",
          label: "MISCELLANEOUS_VENDOR",
          description: "The miscellaneous vendor should be a maximum of one character.",
          //defaultValue: "N"
          //   "regexp": {
          //     "pattern": "^.{0,1}$",
          //     "flags": "",
          //     "ignoreBlanks": true
          //   },
        },
        {
          key: "WITHHOLDING_USED",
          type: "string",
          label: "WITHHOLDING_USED",
          description: "The withholding used should be a maximum of one character.",
          //defaultValue: "N"
          //   "regexp": {
          //     "pattern": "^.{0,1}$",
          //     "flags": "",
          //     "ignoreBlanks": true
          //   },
        },
        {
          key: "VENDOR_USER1",
          type: "string",
          label: "VENDOR_USER1",
          description: "The vendor user should be a maximum of 32 characters.",
          //   "regexp": {
          //     "pattern": "^.{0,32}$",
          //     "flags": "",
          //     "ignoreBlanks": true
          //   },
        },
        {
          key: "VENDOR_USER2",
          type: "string",
          label: "VENDOR_USER2",
          description: "The vendor user should be a maximum of 32 characters.",
          //   "regexp": {
          //     "pattern": "^.{0,32}$",
          //     "flags": "",
          //     "ignoreBlanks": true
          //   },
        },
        {
          key: "CONTRACT_DATE_MODIFIED",
          type: "string",
          label: "CONTRACT_DATE_MODIFIED",
          description: "The format for the date must be MM/DD/YYYY."
        },
        {
          key: "CONTRACT_USERID_MODIFIED",
          type: "string",
          label: "CONTRACT_USERID_MODIFIED",
          description: "The contract amendment date by the user cannot exceed 10 digits."
          //   "regexp": {
          //     "pattern": "^.{0,10}$",
          //     "flags": "",
          //     "ignoreBlanks": true
          //   },
        },
        {
          key: "BANK_PHONE_NUMBER",
          type: "string",
          label: "BANK_PHONE_NUMBER",
          description: "The phone number should be 10 digits."
          //   "regexp": {
          //     "pattern": "^\\d{1,10}$",
          //     "flags": "",
          //     "ignoreBlanks": true
          //   },
        },
        {
          key: "BANK_ABA_ROUTING_NUMBER",
          type: "string",
          label: "BANK_ABA_ROUTING_NUMBER",
          description: "The bank's routing number should be 9 digits."
          //   "regexp": {
          //     "pattern": "^\\d{9}$",
          //     "flags": "",
          //     "ignoreBlanks": true
          //   },
        },
        {
          key: "BANK_ACCOUNT_NUMBER",
          type: "string",
          label: "BANK_ACCOUNT_NUMBER",
          description: "The bank account number should be a maximum of 17 characters."
          //   "regexp": {
          //     "pattern": "^.{0,17}$",
          //     "flags": "",
          //     "ignoreBlanks": true
          //   },
        },
        {
          key: "BANK_ACCOUNT_TYPE",
          type: "string",
          label: "BANK_ACCOUNT_TYPE",
          description: "The bank account type should be a maximum of one character."
          //   "regexp": {
          //     "pattern": "^.{0,1}$",
          //     "flags": "",
          //     "ignoreBlanks": true
          //   },
        },
        {
          key: "HUB_VENDOR",
          type: "string",
          label: "HUB_VENDOR",
          //defaultValue: "N",
          description: "The hub vendor should be a maximum of one character."
          //   "regexp": {
          //     "pattern": "^.{0,1}$",
          //     "flags": "",
          //     "ignoreBlanks": true
          //   },
        },
        {
          key: "CERTIFIED_CATALOG_VENDOR",
          type: "string",
          label: "CERTIFIED_CATALOG_VENDOR",
          //defaultValue: "N",
          description: "The certified catalog vendor must be a maximum of a single character."
          //   "regexp": {
          //     "pattern": "^.{0,1}$",
          //     "flags": "",
          //     "ignoreBlanks": true
          //   },
        },
        {
          key: "CERTIFICATION_EFFECTIVE_FROM",
          type: "string",
          label: "CERTIFICATION_EFFECTIVE_FROM",
          description: "The format for the date must be MM/DD/YYYY."
        },
        {
          key: "CERTIFICATION_EFFECTIVE_TO",
          type: "string",
          label: "CERTIFICATION_EFFECTIVE_TO",
          description: "The format for the date must be MM/DD/YYYY."
        },
        {
          key: "CERTIFICATION_NUMBER",
          type: "string",
          label: "CERTIFICATION_NUMBER",
          description: "The certification number should be a maximum of 30 digits."
          //   "regexp": {
          //     "pattern": "^.{0,30}$",
          //     "flags": "",
          //     "ignoreBlanks": true
          //   },
        },
        {
          key: "DEFAULT_EMAIL_ADDRESS",
          type: "string",
          label: "DEFAULT_EMAIL_ADDRESS",
          description: "The email address should be a maximum of 45 characters."
          //   "regexp": {
          //     "pattern": "^.{0,45}$",
          //     "flags": "",
          //     "ignoreBlanks": true
          //   },
        },
        {
          key: "WITHHOLDING_FLAT_AMOUNT",
          type: "number",
          label: "WITHHOLDING_FLAT_AMOUNT",
          description: "The withholding flat amount should be a maximum of 14 including with 2 decimals",
          //defaultValue: "0",
          //   "minimum": 0,
          //   "maximum": 99999999999.99
        },
        {
          key: "WITHHOLDING_PERCENTAGE",
          type: "number",
          label: "WITHHOLDING_PERCENTAGE",
          description: "The withholding percentage should be less than 1",
          //defaultValue: "0",
          //   "minimum": 0,
          //   "maximum": 0.9999
          //   "minimum": 0,
          //   "maximum": 99999999999.99
        },
        {
          key: "CUSTOMER_NUMBER",
          type: "string",
          label: "CUSTOMER_NUMBER",
          description: "The customer number should be a maximum of 15 characters.",
          //   "regexp": {
          //     "pattern": "^.{0,15}$",
          //     "flags": "",
          //     "ignoreBlanks": true
          //   },
        },
        {
          key: "PAYMENT_TYPE",
          type: "enum",
          label: "PAYMENT_TYPE",
          description: "The payment type should be a maximum of single character.",
          config: {
            //defaultValue: "C",
            options: [
              { value: "C", label: "Check" },
              { value: "W", label: "Wire Transfer" },
              { value: "E", label: "EFTPS" },
              { value: "A", label: "ACH" },
              { value: "P", label: "Payment Manager" }
            ],
          }
        },
        {
          key: "STANDARD_ENTRY_CLASS_CODE",
          type: "string",
          label: "STANDARD_ENTRY_CLASS_CODE",
          description: "The standard entry class code should be 3 character."
          //   "regexp": {
          //     "pattern": "^.{3}$",
          //     "flags": "",
          //     "ignoreBlanks": true
          //   },
        },
        {
          key: "ACH_EMAIL_ADDRESS_LIST",
          type: "string",
          label: "ACH_EMAIL_ADDRESS_LIST",
          description: "The email address list should be a maximum of 400 characters."
          //   "regexp": {
          //     "pattern": "^.{0,400}$",
          //     "flags": "",
          //     "ignoreBlanks": true
          //   },
        },
        {
          key: "ATTORNEY_VENDOR",
          type: "string",
          label: "ATTORNEY_VENDOR",
          //defaultValue: "N",
          description: "The attorney vendor should be a maximum of single character."
          //   "regexp": {
          //     "pattern": "^.{0,1}$",
          //     "flags": "",
          //     "ignoreBlanks": true
          //   },
        },
        {
          key: "TAX_PAYMENT_TYPE",
          type: "string",
          label: "TAX_PAYMENT_TYPE",
          description: "The tax payment type should have max 5 characters."
          //   "regexp": {
          //     "pattern": "^.{0,5}$",
          //     "flags": "",
          //     "ignoreBlanks": true
          //   },
        },
        {
          key: "IS_SSIS_VENDOR",
          type: "string",
          label: "IS_SSIS_VENDOR",
          //defaultValue: "N",
          description: "The ssis vendor should be a maximum of single character."
          //   "regexp": {
          //     "pattern": "^.{0,1}$",
          //     "flags": "",
          //     "ignoreBlanks": true
          //   },
        },
        {
          key: "SOCIAL_SECURITY_NUMBER",
          type: "string",
          label: "SOCIAL_SECURITY_NUMBER",
          //defaultValue: "0",
          description: "The social security number should be a maximum of 9 digits.",
          //   "regexp": {
          //     "pattern": "^\\d{1,9}$",
          //     "flags": "",
          //     "ignoreBlanks": true
          //   },
        },
        {
          key: "CONTRACT_START_DATE",
          type: "string",
          label: "CONTRACT_START_DATE",
          description: "The format for the date must be MM/DD/YYYY."
        },
        {
          key: "CONTRACT_AMOUNT",
          type: "string",
          label: "CONTRACT_AMOUNT",
          description: "The contract amount should be a maximum of 13 digits."
          //   "regexp": {
          //     "pattern": "^\\d{1,13}$",
          //     "flags": "",
          //     "ignoreBlanks": true
          //   },
        },
        {
          key: "INDEPENDENT_CONTRACTOR",
          type: "string",
          label: "INDEPENDENT_CONTRACTOR",
          //defaultValue: "N",
          description: "The independent contractor should be a maximum of single character."
          //   "regexp": {
          //     "pattern": "^.{0,1}$",
          //     "flags": "",
          //     "ignoreBlanks": true
          //   },
        },
        {
          key: "OPERATION",
          type: "enum",
          label: "OPERATION",
          description: "Value is case sensitive from (Add, Modify, Remove) Default is Add",
          config: {
            //defaultValue: "Add",
            options: [
              { value: "Add", label: "Add" },
              { value: "Update", label: "Modify" },
              { value: "Delete", label: "Remove" }
            ],
          }
        }
      ],
    },
  ],
  actions: [
    {
      operation: "submitActionFg",
      mode: "foreground",
      label: "Submit foreground",
      description: "Submit data to webhook.site",
      primary: true,
    },
  ],
};