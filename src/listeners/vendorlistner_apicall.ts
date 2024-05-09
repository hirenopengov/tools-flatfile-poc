import api from "@flatfile/api";
import { FlatfileListener } from "@flatfile/listener";
import { recordHook } from "@flatfile/plugin-record-hook";
import { FlatfileEvent } from "@flatfile/listener";

//import { fetchData } from "./api";
//import { fetchVendorData } from "./api";
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
	
    return record;
  })
);


listener
.filter({ job: "workbook:submitActionFg" })
.on("job:ready", async (event: FlatfileEvent) => {
  const { context, payload } = event;
  const { jobId, workbookId } = context;
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
   
   
   if (workbook && workbook.data && workbook.data.sheets) {
    const sheet = workbook.data.sheets[0].id;
    //console.log(sheet);
   
    let records = await api.records.get(sheet);
    //let mixedVariable: any;
    for (const record of records.data.records) {
     // console.log('startrecord');
     // console.log(record.values);
  
    const jsonData: { [key: string]: any } = {};
    for (const key in record.values) {
    
          //console.log(key);
          //console.log(record.values[key].value);
          jsonData[key] = record.values[key].value;
         
  }
  //console.log(jsonData);
  data.push(jsonData);
   
  }
  console.log(data);
 
} else {
    console.error("Workbook or workbook data is undefined.");
}
  
    // let records: { [name: string]: any } = {};

    // records = await api.records.get(sheet);

    // // Send the data to our webhook.site URL
    
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
   // result.res = response.data;
console.log(result);
    // // If the call fails throw an error
    // if (response.status !== 200) {
    //   throw new Error("Failed to submit data to webhook.site");
    // }
    if (result.res?.errors) {
      if (result.res?.data?.length) {
          result.res.data.forEach((record: any, index: number) => {
              // If we get server-side validation errors, then display in flatfile for review.
              let err = [];
              if (record.errors?.length) {
                  err = record.errors.map((e: any) => ({
                      field: e.key,
                      message: e.message
                  }));
              }
              //console.log(err);
              // Do something with 'err', like pushing it to an array or displaying it
              console.log(index);
              console.log("error start");
              console.log(err);
              console.log("error end");
          });
      }
  }
    // Otherwise, complete the job
    await api.jobs.complete(jobId, {
      outcome: {
        message: `Data was successfully submitted to Webhook.site. Go check it out at ${webhookReceiver}.`,
      },
    });
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


// listener.filter({ job: "workbook:submitActionFg" }, (configure) => {

//     configure.on(
//       "job:ready", 
//       async ({ context: { jobId } }) => {
//       try {
//         await api.jobs.ack(jobId, {
//           info: "Getting started.",
//           progress: 10,
//         });


//         // Make changes after cells in a Sheet have been updated
//         console.log("Make changes here when an action is clicked");
//         const sheet = workbooks.data[0].sheets;
//         fetchVendorData();
//         await api.jobs.complete(jobId, {
//           outcome: {
//             acknowledge: true,
//             message: "This is now complete.",
//             next: {
//               type: "wait",
//             },
//           },
//         });
//       } catch (error: any) {
//         console.error("Error:", error.stack);

//         await api.jobs.fail(jobId, {
//           outcome: {
//             message: "This job encountered an error.",
//           },
//         });
//       }
//     });
//   });

  
  // listener.on(
  //   'job:ready',
  //   { operation: 'processRecords' },
  //   async (event: FlatfileEvent) => {
  //     const { jobId, sheetId } = event.context
  //     try {
  //       await api.jobs.ack(jobId, { info: 'Processing records' })

  //       await processRecords(
  //         sheetId,
  //         async (records, pageNumber, totalPageCount) => {
  //           // process the records...
  //           await api.jobs.ack(jobId, {
  //             info: `Processing ${records.length} records on page ${pageNumber} of ${totalPageCount}`,
  //             progress: (pageNumber / totalPageCount) * 100,
  //           })
  //         }
  //       )

  //       await api.jobs.complete(jobId, { info: 'Completed processing records' })
  //     } catch (e) {
  //       console.error(e)
  //       await api.jobs.fail(jobId, { info: 'Failed processing records' })
  //     }
  //   }
  // )
  // async function makeExternalAPICall(): Promise<any> {
  //   try {
  //     // Construct your API request, including any necessary headers, URL, and request body
  //     const apiEndpoint = 'http://fms.opengov.devvm.cloudvm.com/oci/api/v2/import/validate';
      // const requestBody = { "data": [
      //   {
      //       "PAYMENT_DATE": "01/10/2024",
      //       "SERVICE_ACCOUNT_NUMBER": "",
      //       "TRANSACTION_AMOUNT": 11,
      //       "AR_INVOICE_REFERENCE_NO": "4444",
      //       "TIME_PAYMENT_ENTERED": "121241",
      //       "TENDER_TYPE": "C",
      //       "TENDER_REFERENCE_NUMBER": "",
      //       "ALLOW_OVER_PAYMENT": "Y",
      //       "OPERATION": "Add"
      //   }
      //   ],"interface": {
      // "type": "ARBT",
      // "subtype": "ARBTPYMT"
      // },
      // "calledby": "opengov" };
  //     const headers = {
  //       'Content-Type': 'application/json',
  //       // Add any other headers as needed
  //     };
      
  //     // Make the API call using Axios
  //     const response: AxiosResponse<any> = await axios.post(apiEndpoint, requestBody, { headers });
  
  //     // Return the response data
  //     alert(response.data);
  //     return response.data;
  //   } catch (error: any) {
  //     // If there's an error in the API call, handle it
  //     throw new Error('Error making API call: ' + error.message);
  //   }
  // }
});
