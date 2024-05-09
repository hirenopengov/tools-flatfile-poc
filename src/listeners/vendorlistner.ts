import api from "@flatfile/api";
import { FlatfileListener } from "@flatfile/listener";
import { recordHook } from "@flatfile/plugin-record-hook";
import { FlatfileEvent } from "@flatfile/listener";
import { responseRejectionHandler, RejectionResponse } from "@flatfile/util-response-rejection";
import axios, { AxiosResponse } from 'axios';

/**
 * Example Listener
 */
export const listener = FlatfileListener.create((listener) => {
  listener.on("**", (event) => {
    console.log(`Received event: ${event.topic}`);
  });


  listener.use(
    recordHook("Vendors", (record) => {
      const numberPattern: RegExp = /^\d{1,6}$/;
      const namePattern: RegExp = /^.{0,30}$/;

      record.validate(
        "VENDOR_NUMBER",
        (value) => typeof value === "string" && numberPattern.test(value),
        "The vendor number should be a maximum of 6 digits."
      );

      record.validate(
        "VENDOR_NAME",
        (value) => typeof value === "string" && namePattern.test(value),
        "The vendor name should be a maximum of 30 characters."
      );

      record.validate(
        "WITHHOLDING_FLAT_AMOUNT",
        (value) => typeof value !== 'number' || (value > 99999999999.99 && value < 0),
        "The WITHHOLDING_FLAT_AMOUNT should be a between 0 and 99999999999.99."
      );


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
