// import { logger } from "../middlewares/logger.middleware.js";
// export class ApplicationError extends Error {
//   constructor(message, status = 500) {
//     super(message);
//     this.status = status;
//     this.name = "ApplicationError";
//     let  msg= {
//       auth: false,
//       message: ` ${message}   ${new Date().toString()} `,
//     };
//     logger.error(msg);
//   }
// }


export default class ApplicationError extends Error{
    constructor(message, status) {
        super(message);
        this.status = status;
        this.name = "ApplicationError";
    }

}
