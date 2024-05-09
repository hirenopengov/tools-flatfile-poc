
{
	"schema": {
		"properties": {
			"VENDOR_NUMBER": {
				"label": "VENDOR_NUMBER",
				"type": "string",
				"regexp": {
					"pattern": "^\\d{1,6}$",
					"flags": "",
					"ignoreBlanks": true
				},
				"description": "The vendor number should be a maximum of 6 digits."
			},
			"VENDOR_NAME": {
				"label": "VENDOR_NAME",
				"type": "string",
				"regexp": {
					"pattern": "^.{0,30}$",
					"flags": "",
					"ignoreBlanks": true
				},
				"description": "The vendor name should be a maximum of 30 characters."
			},
			"VENDOR_SORT_NAME": {
				"label": "VENDOR_SORT_NAME",
				"type": "string",
				"regexp": {
					"pattern": "^.{0,20}$",
					"flags": "",
					"ignoreBlanks": true
				},
				"description": "The vendor sort name should be a maximum of 20 characters."
			},
			"VENDOR_TAX_ID": {
				"label": "VENDOR_TAX_ID",
				"type": "string",
				"regexp": {
					"pattern": "^.{0,15}$",
					"flags": "",
					"ignoreBlanks": true
				},
				"description": "The vendor tax id should be a maximum of 15 characters."
			},
			"DATE_OF_LAST_PO": {
				"label": "DATE_OF_LAST_PO",
				"type": "string",
				"description": "The format for the date must be MM/DD/YYYY."
			},
			"DATE_OF_LAST_INVOICE": {
				"label": "DATE_OF_LAST_INVOICE",
				"type": "string",
				"description": "The format for the date must be MM/DD/YYYY."
			},
			"VENDOR_USER_CODE1": {
				"label": "VENDOR_USER_CODE1",
				"type": "string",
				"regexp": {
					"pattern": "^.{0,3}$",
					"flags": "",
					"ignoreBlanks": true
				},
				"description": "The vendor user code should be a maximum of 3 characters."
			},
			"VENDOR_USER_CODE2": {
				"label": "VENDOR_USER_CODE2",
				"type": "string",
				"regexp": {
					"pattern": "^.{0,3}$",
					"flags": "",
					"ignoreBlanks": true
				},
				"description": "The vendor user code should be a maximum of 3 characters."
			},
			"VENDOR_USER_CODE3": {
				"label": "VENDOR_USER_CODE3",
				"type": "string",
				"regexp": {
					"pattern": "^.{0,3}$",
					"flags": "",
					"ignoreBlanks": true
				},
				"description": "The vendor user code should be a maximum of 3 characters."
			},
			"VENDOR_USER_CODE4": {
				"label": "VENDOR_USER_CODE4",
				"type": "string",
				"regexp": {
					"pattern": "^.{0,3}$",
					"flags": "",
					"ignoreBlanks": true
				},
				"description": "The vendor user code should be a maximum of 3 characters."
			},
			"VENDOR_USER_CODE5": {
				"label": "VENDOR_USER_CODE5",
				"type": "string",
				"regexp": {
					"pattern": "^.{0,3}$",
					"flags": "",
					"ignoreBlanks": true
				},
				"description": "The vendor user code should be a maximum of 3 characters."
			},
			"PAYMENT_TERMS_CODE": {
				"label": "PAYMENT_TERMS_CODE",
				"type": "string",
				"regexp": {
					"pattern": "^.{0,3}$",
					"flags": "",
					"ignoreBlanks": true
				},
				"description": "The code of payment terms should be a maximum of 3 characters."
			},
			"PRIMARY_FOB_POINT": {
				"label": "PRIMARY_FOB_POINT",
				"type": "string",
				"regexp": {
					"pattern": "^.{0,25}$",
					"flags": "",
					"ignoreBlanks": true
				},
				"description": "The primary fob point should be a maximum of 25 characters."
			},
			"ALLOW_ORDERING": {
				"label": "ALLOW_ORDERING",
				"type": "string",
				"description": "Allow default order Yes",
				"default": "Y",
				"enumLabel": [
					"Y",
					"N"
				],
				"enum": [
					"Y",
					"N"
				]
			},
			"SPECIAL_INFO": {
				"label": "SPECIAL_INFO",
				"type": "string",
				"regexp": {
					"pattern": "^.{0,60}$",
					"flags": "",
					"ignoreBlanks": true
				},
				"description": "The special information should be a maximum of 60 characters."
			},
			"DISCOUNT_PERCENTAGE": {
				"label": "DISCOUNT_PERCENTAGE",
				"type": "string",
				"regexp": {
					"pattern": "^\\d[0-9.]{0,7}$",
					"flags": "",
					"ignoreBlanks": true
				},
				"description": "The discount percentage should be a maximum of 8 digits.",
				"default": "0"
			},
			"BOX_NUMBER_1099": {
				"label": "BOX_NUMBER_1099",
				"type": "string",
				"regexp": {
					"pattern": "^\\d{1,2}$",
					"flags": "",
					"ignoreBlanks": true
				},
				"description": "The box number should be a maximum of 2 digits.",
				"default": "0"
			},
			"SIC_CODE": {
				"label": "SIC_CODE",
				"type": "string",
				"regexp": {
					"pattern": "^\\d{1,5}$",
					"flags": "",
					"ignoreBlanks": true
				},
				"description": "The sic code should be a maximum of 5 digits.",
				"default": "0"
			},
			"LOCAL_VENDOR": {
				"label": "LOCAL_VENDOR",
				"type": "string",
				"regexp": {
					"pattern": "^.{0,1}$",
					"flags": "",
					"ignoreBlanks": true
				},
				"description": "The local vendor should be a maximum of one character.",
				"default": "N"
			},
			"PRINT_1099": {
				"label": "PRINT_1099",
				"type": "string",
				"regexp": {
					"pattern": "^.{0,1}$",
					"flags": "",
					"ignoreBlanks": true
				},
				"description": "The print should be a maximum of one character.",
				"default": "N"
			},
			"INSURANCE_REQUIRED": {
				"label": "INSURANCE_REQUIRED",
				"type": "string",
				"regexp": {
					"pattern": "^.{0,1}$",
					"flags": "",
					"ignoreBlanks": true
				},
				"description": "The insurance should be a maximum of one character.",
				"default": "N"
			},
			"DATE_INSURANCE_EXP": {
				"label": "DATE_INSURANCE_EXP",
				"type": "string",
				"description": "The format for the date must be MM/DD/YYYY."
			},
			"FILLER": {
				"label": "FILLER",
				"type": "string",
				"regexp": {
					"pattern": "^.{0,41}$",
					"flags": "",
					"ignoreBlanks": true
				},
				"description": "The filter should be a maximum of 41 characters."
			},
			"CONTRACT_VENDOR": {
				"label": "CONTRACT_VENDOR",
				"type": "string",
				"regexp": {
					"pattern": "^.{0,1}$",
					"flags": "",
					"ignoreBlanks": true
				},
				"description": "The contract vendor should be a maximum of one character.",
				"default": "N"
			},
			"DATE_CONTRACT_EXP": {
				"label": "DATE_CONTRACT_EXP",
				"type": "string",
				"description": "The format for the date must be MM/DD/YYYY."
			},
			"MISCELLANEOUS_VENDOR": {
				"label": "MISCELLANEOUS VENDOR",
				"type": "string",
				"regexp": {
					"pattern": "^.{0,1}$",
					"flags": "",
					"ignoreBlanks": true
				},
				"description": "The miscellaneous vendor should be a maximum of one character.",
				"default": "N"
			},
			"WITHHOLDING_USED": {
				"label": "WITHHOLDING_USED",
				"type": "string",
				"default": "N",
				"regexp": {
					"pattern": "^.{0,1}$",
					"flags": "",
					"ignoreBlanks": true
				},
				"description": "The withholding used should be a maximum of one character."
			},
			"VENDOR_USER1": {
				"label": "VENDOR_USER1",
				"type": "string",
				"regexp": {
					"pattern": "^.{0,32}$",
					"flags": "",
					"ignoreBlanks": true
				},
				"description": "The vendor user should be a maximum of 32 characters."
			},
			"VENDOR_USER2": {
				"label": "VENDOR_USER2",
				"type": "string",
				"regexp": {
					"pattern": "^.{0,32}$",
					"flags": "",
					"ignoreBlanks": true
				},
				"description": "The vendor user should be a maximum of 32 characters."
			},
			"CONTRACT_DATE_MODIFIED": {
				"label": "CONTRACT_DATE_MODIFIED",
				"type": "string",
				"description": "The format for the date must be MM/DD/YYYY."
			},
			"CONTRACT_USERID_MODIFIED": {
				"label": "CONTRACT_USERID_MODIFIED",
				"type": "string",
				"regexp": {
					"pattern": "^.{0,10}$",
					"flags": "",
					"ignoreBlanks": true
				},
				"description": "The contract amendment date by the user cannot exceed 10 digits."
			},
			"BANK_PHONE_NUMBER": {
				"label": "BANK_PHONE_NUMBER",
				"type": "string",
				"regexp": {
					"pattern": "^\\d{1,10}$",
					"flags": "",
					"ignoreBlanks": true
				},
				"description": "The phone number should be 10 digits."
			},
			"BANK_ABA_ROUTING_NUMBER": {
				"label": "BANK_ABA_ROUTING_NUMBER",
				"type": "string",
				"regexp": {
					"pattern": "^\\d{9}$",
					"flags": "",
					"ignoreBlanks": true
				},
				"description": "The bank's routing number should be 9 digits."
			},
			"BANK_ACCOUNT_NUMBER": {
				"label": "BANK_ACCOUNT_NUMBER",
				"type": "string",
				"regexp": {
					"pattern": "^.{0,17}$",
					"flags": "",
					"ignoreBlanks": true
				},
				"description": "The bank account number should be a maximum of 17 characters."
			},
			"BANK_ACCOUNT_TYPE": {
				"label": "BANK_ACCOUNT_TYPE",
				"type": "string",
				"regexp": {
					"pattern": "^.{0,1}$",
					"flags": "",
					"ignoreBlanks": true
				},
				"description": "The bank account type should be a maximum of one character."
			},
			"HUB_VENDOR": {
				"label": "HUB_VENDOR",
				"type": "string",
				"default": "N",
				"regexp": {
					"pattern": "^.{0,1}$",
					"flags": "",
					"ignoreBlanks": true
				},
				"description": "The hub vendor should be a maximum of one character."
			},
			"CERTIFIED_CATALOG_VENDOR": {
				"label": "CERTIFIED_CATALOG_VENDOR",
				"type": "string",
				"default": "N",
				"regexp": {
					"pattern": "^.{0,1}$",
					"flags": "",
					"ignoreBlanks": true
				},
				"description": "The certified catalog vendor must be a maximum of a single character."
			},
			"CERTIFICATION_EFFECTIVE_FROM": {
				"label": "CERTIFICATION_EFFECTIVE_FROM",
				"type": "string",
				"description": "The format for the date must be MM/DD/YYYY."
			},
			"CERTIFICATION_EFFECTIVE_TO": {
				"label": "CERTIFICATION_EFFECTIVE_TO",
				"type": "string",
				"description": "The format for the date must be MM/DD/YYYY."
			},
			"CERTIFICATION_NUMBER": {
				"label": "CERTIFICATION_NUMBER",
				"type": "string",
				"regexp": {
					"pattern": "^.{0,30}$",
					"flags": "",
					"ignoreBlanks": true
				},
				"description": "The certification number should be a maximum of 30 digits."
			},
			"DEFAULT_EMAIL_ADDRESS": {
				"label": "DEFAULT_EMAIL_ADDRESS",
				"type": "string",
				"regexp": {
					"pattern": "^.{0,45}$",
					"flags": "",
					"ignoreBlanks": true
				},
				"description": "The email address should be a maximum of 45 characters."
			},
			"WITHHOLDING_FLAT_AMOUNT": {
				"label": "WITHHOLDING_FLAT_AMOUNT",
				"type": "number",
				"description": "The withholding flat amount should be a maximum of 14 including with 2 decimals",
				"default": "0",
				"minimum": 0,
				"maximum": 99999999999.99
			},
			"WITHHOLDING_PERCENTAGE": {
				"label": "WITHHOLDING PERCENTAGE",
				"type": "number",
				"description": "The withholding percentage should be less than 1",
				"default": "0",
				"minimum": 0,
				"maximum": 0.9999
			},
			"CUSTOMER_NUMBER": {
				"label": "CUSTOMER_NUMBER",
				"type": "string",
				"regexp": {
					"pattern": "^.{0,15}$",
					"flags": "",
					"ignoreBlanks": true
				},
				"description": "The customer number should be a maximum of 15 characters."
			},
			"PAYMENT_TYPE": {
				"label": "PAYMENT_TYPE",
				"type": "string",
				"default": "C",
				"description": "The payment type should be a maximum of single character.",
				"enumLabel": [
					"Check",
					"Wire Transfer",
					"EFTPS",
					"ACH",
					"Payment Manager"
				],
				"enum": [
					"C",
					"W",
					"E",
					"A",
					"P"
				]
			},
			"STANDARD_ENTRY_CLASS_CODE": {
				"label": "STANDARD_ENTRY_CLASS_CODE",
				"type": "string",
				"regexp": {
					"pattern": "^.{3}$",
					"flags": "",
					"ignoreBlanks": true
				},
				"description": "The standard entry class code should be 3 character."
			},
			"ACH_EMAIL_ADDRESS_LIST": {
				"label": "ACH_EMAIL_ADDRESS_LIST",
				"type": "string",
				"regexp": {
					"pattern": "^.{0,400}$",
					"flags": "",
					"ignoreBlanks": true
				},
				"description": "The email address list should be a maximum of 400 characters."
			},
			"ATTORNEY_VENDOR": {
				"label": "ATTORNEY_VENDOR",
				"type": "string",
				"default": "N",
				"regexp": {
					"pattern": "^.{0,1}$",
					"flags": "",
					"ignoreBlanks": true
				},
				"description": "The attorney vendor should be a maximum of single character."
			},
			"TAX_PAYMENT_TYPE": {
				"label": "TAX_PAYMENT_TYPE",
				"type": "string",
				"regexp": {
					"pattern": "^.{0,5}$",
					"flags": "",
					"ignoreBlanks": true
				},
				"description": "The tax payment type should have max 5 characters."
			},
			"IS_SSIS_VENDOR": {
				"label": "IS_SSIS_VENDOR",
				"type": "string",
				"default": "N",
				"regexp": {
					"pattern": "^.{0,1}$",
					"flags": "",
					"ignoreBlanks": true
				},
				"description": "The ssis vendor should be a maximum of single character."
			},
			"SOCIAL_SECURITY_NUMBER": {
				"label": "SOCIAL_SECURITY_NUMBER",
				"type": "string",
				"regexp": {
					"pattern": "^\\d{1,9}$",
					"flags": "",
					"ignoreBlanks": true
				},
				"description": "The social security number should be a maximum of 9 digits.",
				"default": "0"
			},
			"CONTRACT_START_DATE": {
				"label": "CONTRACT_START_DATE",
				"type": "string",
				"description": "The format for the date must be MM/DD/YYYY."
			},
			"CONTRACT_AMOUNT": {
				"label": "CONTRACT_AMOUNT",
				"type": "string",
				"regexp": {
					"pattern": "^\\d{1,13}$",
					"flags": "",
					"ignoreBlanks": true
				},
				"description": "The contract amount should be a maximum of 13 digits."
			},
			"INDEPENDENT_CONTRACTOR": {
				"label": "INDEPENDENT_CONTRACTOR",
				"type": "string",
				"default": "N",
				"regexp": {
					"pattern": "^.{0,1}$",
					"flags": "",
					"ignoreBlanks": true
				},
				"description": "The independent contractor should be a maximum of single character."
			},
			"OPERATION": {
				"type": "string",
				"label": "OPERATION",
				"default": "Add",
				"enumLabel": [
					"Add",
					"Update",
					"Delete"
				],
				"enum": [
					"Add",
					"Modify",
					"Remove"
				],
				"description": "Value is case sensitive from (Add, Modify, Remove) Default is Add"
			}
		},
		"type": "object",
		"required": [],
		"unique": [],
		"allowCustomFields": true
	}
}















{
	"schema": {
		"properties": {
			"VENDOR_NUMBER": {
				"label": "VENDOR_NUMBER",
				"type": "string",
				"regexp": {
					"pattern": "^\\d{1,6}$",
					"flags": "",
					"ignoreBlanks": false
				},
				"description": "The vendor number should be a maximum of 6 digits."
			},
			"ADDRESS_TYPE": {
				"label": "ADDRESS_TYPE",
				"type": "string",
				"regexp": {
					"pattern": "^.{0,1}$",
					"flags": "",
					"ignoreBlanks": true
				},
				"description": "The type of address should be a maximum of single character."
			},
			"ENTITY_ADDRESS_1": {
				"label": "ENTITY_ADDRESS_1",
				"type": "string",
				"regexp": {
					"pattern": "^.{0,30}$",
					"flags": "",
					"ignoreBlanks": true
				},
				"description": "An entity's address should be a maximum of 30 characters."
			},
			"ENTITY_ADDRESS_2": {
				"label": "ENTITY_ADDRESS_2",
				"type": "string",
				"regexp": {
					"pattern": "^.{0,30}$",
					"flags": "",
					"ignoreBlanks": true
				},
				"description": "An entity's address should be a maximum of 30 characters."
			},
			"ENTITY_CITY": {
				"label": "ENTITY_CITY",
				"type": "string",
				"regexp": {
					"pattern": "^.{0,20}$",
					"flags": "",
					"ignoreBlanks": true
				},
				"description": "An entity's city should be a maximum of 20 characters."
			},
			"ENTITY_LONG_STATE": {
				"label": "ENTITY_LONG_STATE",
				"type": "string",
				"regexp": {
					"pattern": "^.{0,15}$",
					"flags": "",
					"ignoreBlanks": true
				},
				"description": "An entity's state should be a maximum of 15 characters."
			},
			"ENTITY_ZIP_11": {
				"label": "ENTITY_ZIP_11",
				"type": "string",
				"regexp": {
					"pattern": "^.{0,11}$",
					"flags": "",
					"ignoreBlanks": true
				},
				"description": "An entity's zip should be a maximum of 11 characters."
			},
			"ATTENTION_NAME": {
				"label": "ATTENTION_NAME",
				"type": "string",
				"regexp": {
					"pattern": "^.{0,30}$",
					"flags": "",
					"ignoreBlanks": true
				},
				"description": "The attention name should be a maximum of 30 characters."
			},
			"ENTITY_PHONE_NUMBER": {
				"label": "ENTITY_PHONE_NUMBER",
				"type": "string",
				"regexp": {
					"pattern": "^\\d{10}$",
					"flags": "",
					"ignoreBlanks": true
				},
				"description": "The phone number should be 10 digits."
			},
			"ENTITY_FAX_NUMBER": {
				"label": "ENTITY_FAX_NUMBER",
				"type": "string",
				"regexp": {
					"pattern": "^\\d{10}$",
					"flags": "",
					"ignoreBlanks": true
				},
				"description": "An entity's fax number should be 10 digits."
			},
			"COUNTRY_CODE": {
				"label": "COUNTRY_CODE",
				"type": "string",
				"regexp": {
					"pattern": "^.{0,3}$",
					"flags": "",
					"ignoreBlanks": true
				},
				"description": "The country code should be a maximum of 3 characters."
			},
			"VENDOR_WEBSITE": {
				"label": "VENDOR_WEBSITE",
				"type": "string",
				"regexp": {
					"pattern": "^.{0,45}$",
					"flags": "",
					"ignoreBlanks": true
				},
				"description": "The vendor website should be a maximum of 45 characters."
			},
			"VENDOR_EMAIL": {
				"label": "VENDOR_EMAIL",
				"type": "string",
				"regexp": {
					"pattern": "^.{0,45}$",
					"flags": "",
					"ignoreBlanks": true
				},
				"description": "The vendor email should be a maximum of 45 characters."
			},
			"OPERATION": {
				"type": "string",
				"label": "OPERATION",
				"default": "Add",
				"enumLabel": [
					"Add",
					"Update",
					"Delete"
				],
				"enum": [
					"Add",
					"Modify",
					"Remove"
				]
			}
		},
		"type": "object",
		"required": [
			"VENDOR_NUMBER",
			"ADDRESS_TYPE"
		],
		"unique": [],
		"allowCustomFields": true
	}
}



// Fill in the function below with your code, or select a template.

const moment = require('moment');

function validateDate(date) {
    return moment(date, 'MM/DD/YYYY', true).isValid()
}

module.exports = async ({ recordBatch, session, logger }) => {
    return recordBatch.records.forEach((record) => {
        const {
            VENDOR_NUMBER,
            VENDOR_NAME,
            VENDOR_SORT_NAME,
            ALLOW_ORDERING,
            VENDOR_TAX_ID,
            PRINT_1099,
            BANK_ABA_ROUTING_NUMBER,
            BANK_ACCOUNT_NUMBER,
            BANK_ACCOUNT_TYPE,
            CUSTOMER_NUMBER,
            TAX_PAYMENT_TYPE,
            PAYMENT_TYPE,
            DATE_OF_LAST_PO,
            DATE_OF_LAST_INVOICE,
            DATE_INSURANCE_EXP,
            DATE_CONTRACT_EXP,
            CONTRACT_DATE_MODIFIED,
            CERTIFICATION_EFFECTIVE_FROM,
            CERTIFICATION_EFFECTIVE_TO,
            CONTRACT_START_DATE,
            OPERATION
        } = record.value;

        if (OPERATION === 'Remove' && !VENDOR_NUMBER) {
            record.addError('VENDOR_NUMBER', 'Vendor number is required.');
        }

        if (OPERATION !== 'Remove' && !VENDOR_NAME) {
            record.addError('VENDOR_NAME', 'Vendor name is required.');
        }

        if (OPERATION !== 'Remove' && !VENDOR_SORT_NAME) {
            record.addError('VENDOR_SORT_NAME', 'Vendor sort name is required.');
        }

        if (PRINT_1099 === 'Y' && !VENDOR_TAX_ID) {
            record.addError('VENDOR_TAX_ID', 'Vendor tax id is required.');
        }

        if ((PAYMENT_TYPE === 'A' || PAYMENT_TYPE === 'P') && !BANK_ABA_ROUTING_NUMBER) {
            record.addError('BANK_ABA_ROUTING_NUMBER', 'Bank routing number is required.');
        }

        if ((PAYMENT_TYPE === 'A' || PAYMENT_TYPE === 'P') && !BANK_ACCOUNT_NUMBER) {
            record.addError('BANK_ACCOUNT_NUMBER', 'Bank account number is required.');
        }

        if ((PAYMENT_TYPE === 'A' || PAYMENT_TYPE === 'P') && !BANK_ACCOUNT_TYPE) {
            record.addError('BANK_ACCOUNT_TYPE', 'Bank account type is required.');
        }

        if (PAYMENT_TYPE === 'A' && !CUSTOMER_NUMBER) {
            record.addError('CUSTOMER_NUMBER', 'Customer number is required.');
        }

        if (PRINT_1099 === 'Y' && !TAX_PAYMENT_TYPE) {
            record.addError('TAX_PAYMENT_TYPE', 'Tax payment type is required.');
        }

        if (DATE_OF_LAST_PO && !validateDate(DATE_OF_LAST_PO)) {
            record.addError('DATE_OF_LAST_PO', 'The required date format should be MM/DD/YYYY.');
        }

        if (DATE_OF_LAST_INVOICE && !validateDate(DATE_OF_LAST_INVOICE)) {
            record.addError('DATE_OF_LAST_INVOICE', 'The required date format should be MM/DD/YYYY.');
        }

        if (DATE_INSURANCE_EXP && !validateDate(DATE_INSURANCE_EXP)) {
            record.addError('DATE_INSURANCE_EXP', 'The required date format should be MM/DD/YYYY.');
        }

        if (DATE_CONTRACT_EXP && !validateDate(DATE_CONTRACT_EXP)) {
            record.addError('DATE_CONTRACT_EXP', 'The required date format should be MM/DD/YYYY.');
        }

        if (CONTRACT_DATE_MODIFIED && !validateDate(CONTRACT_DATE_MODIFIED)) {
            record.addError('CONTRACT_DATE_MODIFIED', 'The required date format should be MM/DD/YYYY.');
        }

        if (CERTIFICATION_EFFECTIVE_FROM && !validateDate(CERTIFICATION_EFFECTIVE_FROM)) {
            record.addError('CERTIFICATION_EFFECTIVE_FROM', 'The required date format should be MM/DD/YYYY.');
        }

        if (CERTIFICATION_EFFECTIVE_TO && !validateDate(CERTIFICATION_EFFECTIVE_TO)) {
            record.addError('CERTIFICATION_EFFECTIVE_TO', 'The required date format should be MM/DD/YYYY.');
        }

        if (CONTRACT_START_DATE && !validateDate(CONTRACT_START_DATE)) {
            record.addError('CONTRACT_START_DATE', 'The required date format should be MM/DD/YYYY.');
        }

    })
}