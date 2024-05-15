import api from "@flatfile/api";
import { FlatfileListener } from "@flatfile/listener";
import { recordHook } from "@flatfile/plugin-record-hook";
import { FlatfileEvent } from "@flatfile/listener";
import { responseRejectionHandler, RejectionResponse } from "@flatfile/util-response-rejection";
import axios, { AxiosResponse } from 'axios';
import moment from "moment";

/**
 * Example Listener
 */

const VALIDATIONMESSAGE = {
  V001: "Vendor %s is not in system to %s. Invalid Vendor",
  V002: "The vendor cannot be deleted. It has %s references in system",
  V003: "Vendor %s already exists in system. You cant't insert same vendor",
  V004: "Vendor %s for this address type is not in system to %s. Invalid Vendor",
  V005: "Vendor %s already exists in system. You can't insert same address type",
  V006: "Vendor %s for this contact level %s is not in system. %s not allowed",
  V007: "Vendor %s with contact level %s already exists in system. %s not allowed",
  V008: "Vendor %s for tax payment type %s and year %s is not in system. %s not allowed",
  V009: "This tax payment type has already been associated with a 1099 payment for this vendor",
  V010: "Withholding Flat Amount OR Withholding Percentage, Only 1 field should have value",
  V011: "Withholding Flat Amount and Withholding Percentage must be 0 if withoulding used is No",
  V012: "The withholding percentage should be less than 1",
  V013: "The withholding flat amount should be a maximum of 14 digits.",
  V014: "Either the withholding percentage or flat amount must have a value.",
  REQUIRED: "This field is required.",
  DATEFORMAT: "The required date format should be MM/DD/YYYY.",
  VENDORNUMBER: "The vendor number should be a maximum of 6 digits.",
  VENDORNAME: "The vendor name should be a maximum of 30 characters.",
  SORTNAME: "The vendor short anme should be a maximum of 20 characters.",
  VENDORTAXID: "The vendor tax id should be a maximum of 15 characters.",
  VENDORCODE: "The vendor user code should be a maximum of 3 characters.",
  PAYMENTTERMSCODE: "The payment terms code should be a maximum of 3 characters.",
  PRIMARYFOBPOINT: "The primary fob point should be a maximum of 25 characters.",
  SPECIALINFO: "The special information should be a maximum of 60 characters.",
  DISCOUNTPERCENTAGE: "The discount percentage should be a maximum of 8 digits.",
  BOXNUMBER1099: "The box number should be a maximum of 2 digits.",
  SICCODE: "The sic code should be a maximum of 5 digits.",
  FILLER: "The filler should be a maximum of 41 characters.",
  VENDORUSER: "The vendor user should be a maximum of 32 characters.",
  BANK_PHONE_NUMBER: "The phone number should be 10 digits.",
  BANK_ABA_ROUTING_NUMBER: "The bank's routing number should be 9 digits.",
  BANK_ACCOUNT_NUMBER: "The bank account number should be a maximum of 17 characters.",
  BANK_ACCOUNT_TYPE: "The bank account type should be a maximum of one character.",
  REQUIREDIFPAYMENTTYPEAP:"This field is required if Payment Type is 'ACH' or 'Payment Manager'.",
  REQUIREDIFPAYMENTTYPEA:"This field is required if Payment Type is 'ACH'.",
  INVALIDDATERANGE: "Invalid date range. From date should be less than To date",
  REQUIREDFORCERTIFIEDVENDOR: "This field is required if Certified catalog vendor is Yes",
  CERTIFICATION_NUMBER:"The certification number should be a maximum of 30 digits.",
	DEFAULT_EMAIL_ADDRESS:"The email address should be valid with maximum of 45 characters.",
  CUSTOMER_NUMBER: "The customer number should be a maximum of 15 characters.",
  VENDORTAXIDREQUIRED: "This field is required if Vendor 1099 is Yes."
};


function validateDate(date: any): boolean {
  return moment(date, 'MM/DD/YYYY', true).isValid()
}

function isBeforeDate(date1: any, date2: any): boolean {
  if (date1 === null || date2 === null) {
      return false; // Handle null values
  }
  return moment(date1, 'MM/DD/YYYY').isBefore(moment(date2, 'MM/DD/YYYY'));
}

export const listener = FlatfileListener.create((listener) => {
  listener.on("**", (event) => {
    console.log(`Received event: ${event.topic}`);
  });

  const numberPattern: RegExp = /^\d{1,6}$/;
  const namePattern: RegExp = /^.{0,30}$/;
  const shortNamePattern: RegExp = /^.{0,20}$/;
  const taxIdPattern: RegExp = /^.{0,15}$/;
  const userCode: RegExp = /^.{0,3}$/;
  const paymentTermsCode: RegExp = /^.{0,3}$/;
  const fobPattern: RegExp = /^.{0,25}$/;
  const specialInfoPattern: RegExp = /^.{0,60}$/;
  const discPercentagePattern = new RegExp("^\\d[0-9.]{0,7}$");
  const boxNumberPattern = new RegExp("^\\d{1,2}$");
  const sicCodePattern = new RegExp("^\\d{1,5}$");
  const fillerPattern = new RegExp("^.{0,41}$");
  const vendorUserPattern = new RegExp("^.{0,32}$");
  const phoneNumberPattern = new RegExp("^\\d{1,10}$");
  const rountingNumberPattern = new RegExp("^\\d{9}$");
  const accountNumberPattern = new RegExp("^.{0,17}$");
  const certificationNumberPattern = new RegExp("^.{0,30}$");
	const emailAddressPattern = new RegExp("^(.{1,45})@[^\s@]+\.[^\s@]+$");
  const customerNumberPattern = new RegExp("^.{0,15}$");
  const yesNoOptions = ["Y", "N"];
  const operationOptions = ["Add", "Modify", "Remove"];;


  listener.use(
    recordHook("Vendors", (record) => {

      if (record.get("WITHHOLDING_FLAT_AMOUNT") === null) {
        record.set("WITHHOLDING_FLAT_AMOUNT", "0");
      }
      if (record.get("WITHHOLDING_PERCENTAGE") === null) {
        record.set("WITHHOLDING_PERCENTAGE", "0");
      }


      if (record.get("LOCAL_VENDOR") === null || !yesNoOptions.includes(String(record.get("LOCAL_VENDOR")))) {
        record.set("LOCAL_VENDOR", "N");
      }
      if (record.get("PRINT_1099") === null || !yesNoOptions.includes(String(record.get("PRINT_1099")))) {
        record.set("PRINT_1099", "N");
      }
      if (record.get("INSURANCE_REQUIRED") === null || !yesNoOptions.includes(String(record.get("INSURANCE_REQUIRED")))) {
        record.set("INSURANCE_REQUIRED", "N");
      }

      if (record.get("CONTRACT_VENDOR") === null || !yesNoOptions.includes(String(record.get("CONTRACT_VENDOR")))) {
        record.set("CONTRACT_VENDOR", "N");
      }
      if (record.get("MISCELLANEOUS_VENDOR") === null || !yesNoOptions.includes(String(record.get("MISCELLANEOUS_VENDOR")))) {
        record.set("MISCELLANEOUS_VENDOR", "N");
      }
      if (record.get("WITHHOLDING_USED") === null || !yesNoOptions.includes(String(record.get("WITHHOLDING_USED")))) {
        record.set("WITHHOLDING_USED", "N");
      }
      if (record.get("HUB_VENDOR") === null || !yesNoOptions.includes(String(record.get("HUB_VENDOR")))) {
        record.set("HUB_VENDOR", "N");
      }
      if (record.get("CERTIFIED_CATALOG_VENDOR") === null || !yesNoOptions.includes(String(record.get("CERTIFIED_CATALOG_VENDOR")))) {
        record.set("CERTIFIED_CATALOG_VENDOR", "N");
      }
      if (record.get("INDEPENDENT_CONTRACTOR") === null || !yesNoOptions.includes(String(record.get("INDEPENDENT_CONTRACTOR")))) {
        record.set("INDEPENDENT_CONTRACTOR", "N");
      }
      if (record.get("IS_SSIS_VENDOR") === null || !yesNoOptions.includes(String(record.get("IS_SSIS_VENDOR")))) {
        record.set("IS_SSIS_VENDOR", "N");
      }
      if (record.get("ATTORNEY_VENDOR") === null || !yesNoOptions.includes(String(record.get("ATTORNEY_VENDOR")))) {
        record.set("ATTORNEY_VENDOR", "N");
      }
      if (record.get("ALLOW_ORDERING") === null || !yesNoOptions.includes(String(record.get("ALLOW_ORDERING")))) {
        record.set("ALLOW_ORDERING", "Y");
      }
      if (record.get("OPERATION") === null || !operationOptions.includes(String(record.get("OPERATION")))) {
        record.set("OPERATION", "Add");
      }
      if (record.get("DISCOUNT_PERCENTAGE") === null) {
        record.set("DISCOUNT_PERCENTAGE", "0");
      }
      if (record.get("BOX_NUMBER_1099") === null) {
        record.set("BOX_NUMBER_1099", "0");
      }
      if (record.get("SIC_CODE") === null) {
        record.set("SIC_CODE", "0");
      }
      if (record.get("BANK_ACCOUNT_TYPE") === null) {
          record.set("BANK_ACCOUNT_TYPE", "");
      }
      if (record.get("PAYMENT_TYPE") === null) {
          record.set("PAYMENT_TYPE", "C");
      }

      let {
        VENDOR_NUMBER,
        VENDOR_NAME,
        VENDOR_SORT_NAME,
        WITHHOLDING_USED,
        VENDOR_TAX_ID,
        PRINT_1099,
        DATE_OF_LAST_PO,
        DATE_OF_LAST_INVOICE,
        VENDOR_USER_CODE1,
        VENDOR_USER_CODE2,
        VENDOR_USER_CODE3,
        VENDOR_USER_CODE4,
        VENDOR_USER_CODE5,
        PAYMENT_TERMS_CODE,
        PRIMARY_FOB_POINT,
        //ALLOW_ORDERING = Y,
        SPECIAL_INFO,
        DISCOUNT_PERCENTAGE,
        BOX_NUMBER_1099,
        SIC_CODE,
        DATE_INSURANCE_EXP,
        FILLER,
        //CONTRACT_VENDOR,
        DATE_CONTRACT_EXP,
        //MISCELLANEOUS_VENDOR,
        VENDOR_USER1,
        VENDOR_USER2,
        CONTRACT_DATE_MODIFIED,
        //CONTRACT_USERID_MODIFIED,
        BANK_PHONE_NUMBER,
        BANK_ABA_ROUTING_NUMBER,
        BANK_ACCOUNT_NUMBER,
        BANK_ACCOUNT_TYPE,
        //HUB_VENDOR,
        CERTIFIED_CATALOG_VENDOR,
        CERTIFICATION_EFFECTIVE_FROM,
        CERTIFICATION_EFFECTIVE_TO,
        CERTIFICATION_NUMBER,
        DEFAULT_EMAIL_ADDRESS,
        WITHHOLDING_FLAT_AMOUNT,
        WITHHOLDING_PERCENTAGE,
        CUSTOMER_NUMBER,
        PAYMENT_TYPE,
        // STANDARD_ENTRY_CLASS_CODE,
        // ACH_EMAIL_ADDRESS_LIST,
        // ATTORNEY_VENDOR,
        TAX_PAYMENT_TYPE,
        // IS_SSIS_VENDOR,
        // SOCIAL_SECURITY_NUMBER,
         CONTRACT_START_DATE,
        // CONTRACT_AMOUNT,
        // INDEPENDENT_CONTRACTOR,
        OPERATION
      } = record.value;

      if (typeof VENDOR_NUMBER === 'string' && !numberPattern.test(VENDOR_NUMBER)) {
        record.addError('VENDOR_NUMBER', VALIDATIONMESSAGE.VENDORNUMBER);
      }

      if (OPERATION === 'Remove' || OPERATION === 'Modify') {
        record.validate(
          "VENDOR_NUMBER",
          (value) => { if (!value) { return false; } return true; },
          VALIDATIONMESSAGE.REQUIRED
        );
      }

      if (OPERATION !== 'Remove') { //in case of add or edit

        record.validate(
          "VENDOR_NAME",
          (value) => { if (!value) { return false; } return true; },
          VALIDATIONMESSAGE.REQUIRED
        );
        if (typeof VENDOR_NAME === 'string' && !namePattern.test(VENDOR_NAME)) {
          record.addError('VENDOR_NAME', VALIDATIONMESSAGE.VENDORNAME);
        }

        record.validate(
          "VENDOR_SORT_NAME",
          (value) => { if (!value) { return false; } return true; },
          VALIDATIONMESSAGE.REQUIRED
        );
        if (typeof VENDOR_SORT_NAME === 'string' && !shortNamePattern.test(VENDOR_SORT_NAME)) {
          record.addError('VENDOR_SORT_NAME', VALIDATIONMESSAGE.SORTNAME);
        }

        if (PRINT_1099 === 'Y' && !VENDOR_TAX_ID) {
          record.addError('VENDOR_TAX_ID', VALIDATIONMESSAGE.VENDORTAXIDREQUIRED);
        }
        if (typeof VENDOR_TAX_ID === 'string' && !taxIdPattern.test(VENDOR_TAX_ID)) {
          record.addError('VENDOR_TAX_ID', VALIDATIONMESSAGE.VENDORTAXID);
        }

        if (typeof VENDOR_USER_CODE1 === 'string' && !userCode.test(VENDOR_USER_CODE1)) {
          record.addError('VENDOR_USER_CODE1', VALIDATIONMESSAGE.VENDORCODE);
        }
        if (typeof VENDOR_USER_CODE2 === 'string' && !userCode.test(VENDOR_USER_CODE2)) {
          record.addError('VENDOR_USER_CODE2', VALIDATIONMESSAGE.VENDORCODE);
        }
        if (typeof VENDOR_USER_CODE3 === 'string' && !userCode.test(VENDOR_USER_CODE3)) {
          record.addError('VENDOR_USER_CODE3', VALIDATIONMESSAGE.VENDORCODE);
        }
        if (typeof VENDOR_USER_CODE4 === 'string' && !userCode.test(VENDOR_USER_CODE4)) {
          record.addError('VENDOR_USER_CODE4', VALIDATIONMESSAGE.VENDORCODE);
        }
        if (typeof VENDOR_USER_CODE5 === 'string' && !userCode.test(VENDOR_USER_CODE5)) {
          record.addError('VENDOR_USER_CODE5', VALIDATIONMESSAGE.VENDORCODE);
        }

        if (typeof PAYMENT_TERMS_CODE === 'string' && !paymentTermsCode.test(PAYMENT_TERMS_CODE)) {
          record.addError('PAYMENT_TERMS_CODE', VALIDATIONMESSAGE.PAYMENTTERMSCODE);
        }
        if (typeof PRIMARY_FOB_POINT === 'string' && !fobPattern.test(PRIMARY_FOB_POINT)) {
          record.addError('PRIMARY_FOB_POINT', VALIDATIONMESSAGE.PRIMARYFOBPOINT);
        }
        if (typeof SPECIAL_INFO === 'string' && !specialInfoPattern.test(SPECIAL_INFO)) {
          record.addError('SPECIAL_INFO', VALIDATIONMESSAGE.SPECIALINFO);
        }
        if (typeof DISCOUNT_PERCENTAGE === 'string' && !discPercentagePattern.test(DISCOUNT_PERCENTAGE)) {
          record.addError('DISCOUNT_PERCENTAGE', VALIDATIONMESSAGE.DISCOUNTPERCENTAGE);
        }
        if (typeof BOX_NUMBER_1099 === 'string' && !boxNumberPattern.test(BOX_NUMBER_1099)) {
          record.addError('BOX_NUMBER_1099', VALIDATIONMESSAGE.BOXNUMBER1099);
        }
        if (typeof SIC_CODE === 'string' && !sicCodePattern.test(SIC_CODE)) {
          record.addError('SIC_CODE', VALIDATIONMESSAGE.SICCODE);
        }
        if (typeof FILLER === 'string' && !fillerPattern.test(FILLER)) {
          record.addError('FILLER', VALIDATIONMESSAGE.FILLER);
        }
        if (typeof VENDOR_USER1 === 'string' && !fillerPattern.test(VENDOR_USER1)) {
          record.addError('VENDOR_USER1', VALIDATIONMESSAGE.VENDORUSER);
        }
        if (typeof VENDOR_USER2 === 'string' && !vendorUserPattern.test(VENDOR_USER2)) {
          record.addError('VENDOR_USER2', VALIDATIONMESSAGE.VENDORUSER);
        }

        if (typeof BANK_PHONE_NUMBER === 'string' && !phoneNumberPattern.test(BANK_PHONE_NUMBER)) {
          record.addError('BANK_PHONE_NUMBER', VALIDATIONMESSAGE.BANK_PHONE_NUMBER);
        }
        
        if (typeof BANK_ACCOUNT_NUMBER === 'string' && !accountNumberPattern.test(BANK_ACCOUNT_NUMBER)) {
          record.addError('BANK_ACCOUNT_NUMBER', VALIDATIONMESSAGE.BANK_ACCOUNT_NUMBER);
        }
        if ((PAYMENT_TYPE === 'A' || PAYMENT_TYPE === 'P') && !BANK_ACCOUNT_NUMBER) {
          record.addError('BANK_ACCOUNT_NUMBER', VALIDATIONMESSAGE.REQUIREDIFPAYMENTTYPEAP);
        }

        if (typeof BANK_ABA_ROUTING_NUMBER === 'string' && !rountingNumberPattern.test(BANK_ABA_ROUTING_NUMBER)) {
          record.addError('BANK_ABA_ROUTING_NUMBER', VALIDATIONMESSAGE.BANK_ABA_ROUTING_NUMBER);
        }
        if ((PAYMENT_TYPE === 'A' || PAYMENT_TYPE === 'P') && !BANK_ABA_ROUTING_NUMBER) {
          record.addError('BANK_ABA_ROUTING_NUMBER', VALIDATIONMESSAGE.REQUIREDIFPAYMENTTYPEAP);
        }
        
       if ((PAYMENT_TYPE === 'A' || PAYMENT_TYPE === 'P') && !BANK_ACCOUNT_TYPE) {
          record.addError('BANK_ACCOUNT_TYPE', VALIDATIONMESSAGE.REQUIREDIFPAYMENTTYPEAP);
        }

        if (CERTIFIED_CATALOG_VENDOR === 'Y' && (!CERTIFICATION_EFFECTIVE_FROM || !CERTIFICATION_EFFECTIVE_TO)) {
          record.addError('CERTIFICATION_EFFECTIVE_FROM', VALIDATIONMESSAGE.REQUIREDFORCERTIFIEDVENDOR);
          record.addError('CERTIFICATION_EFFECTIVE_TO', VALIDATIONMESSAGE.REQUIREDFORCERTIFIEDVENDOR);
        }    
        if (CERTIFICATION_EFFECTIVE_FROM && !validateDate(CERTIFICATION_EFFECTIVE_FROM)) {
          record.addError('CERTIFICATION_EFFECTIVE_FROM', VALIDATIONMESSAGE.DATEFORMAT);
        }

        if (CERTIFICATION_EFFECTIVE_TO && !validateDate(CERTIFICATION_EFFECTIVE_TO)) {
          record.addError('CERTIFICATION_EFFECTIVE_TO', VALIDATIONMESSAGE.DATEFORMAT);
        }
              
        if (isBeforeDate(CERTIFICATION_EFFECTIVE_TO, CERTIFICATION_EFFECTIVE_FROM)) {
          record.addError('CERTIFICATION_EFFECTIVE_FROM', VALIDATIONMESSAGE.INVALIDDATERANGE);
          record.addError('CERTIFICATION_EFFECTIVE_TO', VALIDATIONMESSAGE.INVALIDDATERANGE);
        }

        if (typeof CERTIFICATION_NUMBER === 'string' && !certificationNumberPattern.test(CERTIFICATION_NUMBER)) {
          record.addError('CERTIFICATION_NUMBER', VALIDATIONMESSAGE.CERTIFICATION_NUMBER);
        }
        if (typeof DEFAULT_EMAIL_ADDRESS === 'string' && !emailAddressPattern.test(DEFAULT_EMAIL_ADDRESS)) {
          record.addError('DEFAULT_EMAIL_ADDRESS', VALIDATIONMESSAGE.DEFAULT_EMAIL_ADDRESS);
        }

        ///withholding validation start
        if (WITHHOLDING_USED === 'Y') {
          if (typeof WITHHOLDING_FLAT_AMOUNT === 'string' && WITHHOLDING_FLAT_AMOUNT > '0'
            && typeof WITHHOLDING_PERCENTAGE === 'string' && WITHHOLDING_PERCENTAGE > '0') {
            record.addError('WITHHOLDING_PERCENTAGE', VALIDATIONMESSAGE.V010);
            record.addError('WITHHOLDING_FLAT_AMOUNT', VALIDATIONMESSAGE.V010);
            return false;
          }

          if (typeof WITHHOLDING_FLAT_AMOUNT === 'string' && WITHHOLDING_FLAT_AMOUNT === '0'
            && typeof WITHHOLDING_PERCENTAGE === 'string' && WITHHOLDING_PERCENTAGE === '0') {
            record.addError('WITHHOLDING_PERCENTAGE', VALIDATIONMESSAGE.V014);
            record.addError('WITHHOLDING_FLAT_AMOUNT', VALIDATIONMESSAGE.V014);
            return false;
          }

          if (typeof WITHHOLDING_FLAT_AMOUNT === 'string' && WITHHOLDING_FLAT_AMOUNT == '0'
            && typeof WITHHOLDING_PERCENTAGE === 'string' &&
            (WITHHOLDING_PERCENTAGE <= '0' || WITHHOLDING_PERCENTAGE >= '0.9999')) {
            record.addError('WITHHOLDING_PERCENTAGE', VALIDATIONMESSAGE.V012);
            return false;
          }

          if (typeof WITHHOLDING_PERCENTAGE === 'string' && WITHHOLDING_PERCENTAGE === '0'
            && typeof WITHHOLDING_FLAT_AMOUNT === 'string' &&
            (WITHHOLDING_FLAT_AMOUNT <= '0' || WITHHOLDING_FLAT_AMOUNT.length > 14)) {
            alert(WITHHOLDING_FLAT_AMOUNT.length);
            record.addError('WITHHOLDING_FLAT_AMOUNT', VALIDATIONMESSAGE.V013);
            return false;
          }
        }

        if (WITHHOLDING_USED == 'N' &&
          ((typeof WITHHOLDING_FLAT_AMOUNT === 'string' && WITHHOLDING_FLAT_AMOUNT != '0')
            || (typeof WITHHOLDING_PERCENTAGE === 'string' && WITHHOLDING_PERCENTAGE != '0')
          )) {
          record.addError('WITHHOLDING_FLAT_AMOUNT', VALIDATIONMESSAGE.V011);
          record.addError('WITHHOLDING_PERCENTAGE', VALIDATIONMESSAGE.V011);
          return false;
        }
        ///withholding validation end

        if (typeof CUSTOMER_NUMBER === 'string' && !customerNumberPattern.test(CUSTOMER_NUMBER)) {
          record.addError('CUSTOMER_NUMBER', VALIDATIONMESSAGE.CUSTOMER_NUMBER);
        }
        if (PAYMENT_TYPE === 'A' && !CUSTOMER_NUMBER) {
          record.addError('CUSTOMER_NUMBER', VALIDATIONMESSAGE.REQUIREDIFPAYMENTTYPEA);
        }

        if (PRINT_1099 === 'Y' && !TAX_PAYMENT_TYPE) {
          record.addError('TAX_PAYMENT_TYPE', VALIDATIONMESSAGE.REQUIRED);
        }

        if (DATE_OF_LAST_PO && !validateDate(DATE_OF_LAST_PO)) {
          record.addError('DATE_OF_LAST_PO', VALIDATIONMESSAGE.DATEFORMAT);
        }

        if (DATE_OF_LAST_INVOICE && !validateDate(DATE_OF_LAST_INVOICE)) {
          record.addError('DATE_OF_LAST_INVOICE', VALIDATIONMESSAGE.DATEFORMAT);
        }

        if (DATE_INSURANCE_EXP && !validateDate(DATE_INSURANCE_EXP)) {
          record.addError('DATE_INSURANCE_EXP', VALIDATIONMESSAGE.DATEFORMAT);
        }

        if (DATE_CONTRACT_EXP && !validateDate(DATE_CONTRACT_EXP)) {
          record.addError('DATE_CONTRACT_EXP', VALIDATIONMESSAGE.DATEFORMAT);
        }

        if (CONTRACT_DATE_MODIFIED && !validateDate(CONTRACT_DATE_MODIFIED)) {
          record.addError('CONTRACT_DATE_MODIFIED', VALIDATIONMESSAGE.DATEFORMAT);
        }

        


        if (CONTRACT_START_DATE && !validateDate(CONTRACT_START_DATE)) {
          record.addError('CONTRACT_START_DATE', VALIDATIONMESSAGE.DATEFORMAT);
        }
      }





      //////////record hook start








      return record;
    })
  );

  let sheetId: string;
  let sheet;
  let records: any;
  listener
    .filter({ job: "workbook:submitActionFg" })
    .on("job:ready", async (event: FlatfileEvent): Promise<any> => {
      const { context, payload } = event;
      const { jobId, workbookId } = context;
      //let sheet;
      let webhookReceiver = 'http://fms.opengov.devvm.cloudvm.com/oci/api/v2/import/validate';
      //console.log(workbookId);
      console.log('payloadstart');
      console.log(payload);
      console.log('payloadend');
      //alert(workbookId);
      //alert(payload);
      // Acknowledge the job
      try {
        await api.jobs.ack(jobId, {
          info: "Starting job to submit action to webhook.site",
          progress: 10,
        });

        const workbook = await api.workbooks.get(workbookId);

        console.log('start');
        console.log(JSON.stringify(workbook));
        //  const workbookJson = JSON.stringify(workbook);
        //  const workbookData = JSON.parse(workbookJson);
        const data = [];
        // const cacheDataRecordIds = [];

        if (workbook && workbook.data && workbook.data.sheets) {

          sheet = workbook.data.sheets[0].id;
          sheetId = sheet;
          console.log("sheetId:" + sheet);

          records = await api.records.get(sheet);
          //alert(records.data.records[1].id);
          //let mixedVariable: any;
          for (const record of records.data.records) {
            // console.log('startrecord');
            //alert(record.id);
            // console.log(record.values);

            const jsonData: { [key: string]: any } = {};
            for (const key in record.values) {
              //console.log(key);
              //console.log(record.values[key].value);
              if (key == 'submissionStatus') {
                continue;
              }
              jsonData[key] = record.values[key].value;
            }
            //console.log(jsonData);
            //jsonData.splice('submissionStatus', 1);
            data.push(jsonData);
          }


        } else {
          console.error("Workbook or workbook data is undefined.");
        }
        console.log(data);

        const webhookReceiver =
          process.env.WEBHOOK_SITE_URL ||
          "http://fms.opengov.devvm.cloudvm.com/oci/api/v2/import/validate"; //update this
        const type: string = "APVND";
        const subtype: string = "APVNDVND";
        const calledby: string = "opengov";
        const payload = {
          data,
          calledby,
          interface: {
            type,
            subtype
          },
        };

        const response: AxiosResponse<any> = await axios.post(
          webhookReceiver,
          {
            ...payload,
            method: "POST"
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const result = response.data;

        interface ErrorRecord {
          field: string,
          message: string,
        };
        interface ErrorRecordList { // RecordRejections interface
          id: string, // The Record ID
          values: ErrorRecord[]
        };


        const responseErrorListArray: any[] = [];
        //let responseErrorList: ErrorRecordList;
        if (result.res?.errors) {
          let serverResponseError: string = result.res.message;
          console.log(serverResponseError);
          if (result.res?.data?.length) {


            result.res.data.forEach((record: any, index: string) => {
              let responseError: ErrorRecord[];
              if (record.errors?.length) {

                console.log(index);
                let rowid = records.data.records[index].id;
                responseError = record.errors.map((e: { key: string; message: string }) => ({
                  field: e.key,
                  message: e.message
                }));

                console.log(responseError);
                // const sheet = workbook.data.sheets[0].id;
                // let records = await api.records.get(sheet);
                // let rowid:string =records.data.records[index].id;
                //let mixedVariable: any;
                //for (const record of records.data.records) {
                //responseErrorList.id = index;
                //responseErrorList.values = responseError;

                const responseErrorList: ErrorRecordList = {
                  id: rowid, // Assign the ID
                  values: responseError, // Assign the array of ErrorRecords
                };
                responseErrorListArray.push(responseErrorList);
                console.log("set response in rejection interface format");
                console.log(responseErrorList);

              }

            });
            console.log("All erros formated in desired format");
            console.log(responseErrorListArray);
            console.log("All erros formated in desired format");


            const rejectionResponseFormatted: RejectionResponse = { // RejectionResponse interface
              id: workbookId, // The Workbook ID
              message: "Errorrrrrrrrrrrrrrrrs", // Optional
              deleteSubmitted: false, // Optional
              sheets: [
                { // SheetRejections interface
                  sheetId: sheetId, // The Sheet ID
                  rejectedRecords: responseErrorListArray
                }
                // other sheets...
              ]
            };


            const rejections: RejectionResponse = rejectionResponseFormatted;
            if (rejections) {
              //alert(rejections);
              console.log("Rejection:");
              console.log(rejections);
              const outcome = await responseRejectionHandler(rejections);
              await api.jobs.complete(jobId, outcome);
            }


            return;
          } else {
            throw new Error("Failed to submit data to webhook.site");
            // console.log(serverResponseError);
            // await api.jobs.fail(jobId, {
            //   outcome: {
            //     message: `This job failed. Reason is: ${serverResponseError}.`,
            //   },
            // });
            return;
          }
        }
        // Otherwise, complete the job

      } catch (error) {
        // If an error is thrown, fail the job
        console.log(`webhook.site[error]: ${JSON.stringify(error, null, 2)}`);
        await api.jobs.fail(jobId, {
          outcome: {
            message: `This job failed. Check your ${webhookReceiver}.`,
          },
        });
      }
    });

});
