import { Flatfile } from "@flatfile/api";

export const workbook: Flatfile.CreateWorkbookConfig = {
  name: "Vendor All Data",
  labels: ["pinned"],
  sheets: [
    {
      name: "Vendor",
      slug: "Vendors",
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
          key: "ADDRESS_TYPE",
          type: "string",
          label: "ADDRESS_TYPE",
		  description: "The type of address should be a maximum of single character."
		  //"regexp": {
		//			"pattern": "^.{0,1}$",
		//			"flags": "",
		//			"ignoreBlanks": true
		//		},
        },
		{
          key: "ENTITY_ADDRESS_1",
          type: "string",
          label: "ENTITY_ADDRESS_1",
		  description: "An entity's address should be a maximum of 30 characters."
		  //"regexp": {
		//			"pattern": "^.{0,30}$",
		//			"flags": "",
		//			"ignoreBlanks": true
		//		},
        },
		{
          key: "ENTITY_ADDRESS_2",
          type: "string",
          label: "ENTITY_ADDRESS_2",
		  description: "An entity's address should be a maximum of 30 characters."
		  //"regexp": {
		//			"pattern": "^.{0,30}$",
		//			"flags": "",
		//			"ignoreBlanks": true
		//		},
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