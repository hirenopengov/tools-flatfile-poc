import api from "@flatfile/api";
import { FlatfileListener } from "@flatfile/listener";
import { recordHook } from "@flatfile/plugin-record-hook";

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


  listener.filter({ job: "workbook:submitActionFg" }, (configure) => {
    configure.on("job:ready", async ({ context: { jobId } }) => {
      try {
        await api.jobs.ack(jobId, {
          info: "Getting started.",
          progress: 10,
        });


        // Make changes after cells in a Sheet have been updated
        console.log("Make changes here when an action is clicked");

        await api.jobs.complete(jobId, {
          outcome: {
            acknowledge: true,
            message: "This is now complete.",
            next: {
              type: "wait",
            },
          },
        });
      } catch (error: any) {
        console.error("Error:", error.stack);

        await api.jobs.fail(jobId, {
          outcome: {
            message: "This job encountered an error.",
          },
        });
      }
    });
  });
});
