import multer from "multer";

const storageConfig = multer.diskStorage({
     destination:(req,file,cb)=>{
        cb(null,'./uploads')
     },
     filename: (req, file, cb) => {
         cb(null, new Date().toISOString().replace(/:/g, '_') + "_" + file.originalname);  // ":" cause issues in windows devices so replace it
     }
})
export const uploadFile=multer({storage:storageConfig})


