import fs from "fs";
import winston from "winston"
const fsPromise = fs.promises;

// async function log(logData) {
//   try {
//     logData = ` \n ${new Date().toString()}  . Log Data:  ${logData}; `
//     await fsPromise.appendFile("log.txt", logData);
//   } catch (err) {
//     console.log(err);
//   }
// }
export const logger =winston.createLogger({
  level: 'info',
  format:winston.format.json(),
  defaultMeta:{service :'request-logging'},
  transports:[
    new winston.transports.File({filename:'log.txt'})
  ]
})
const loggerMiddleware = async (req, res, next) => {
  const logData = ` ${new Date().toString()} --${req.url} - ${JSON.stringify(req.body)}`;
  logger.info(logData);
  next();
};
export default loggerMiddleware;
