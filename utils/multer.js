import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Specify the destination directory for uploaded files
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // Generate a unique filename for the uploaded file
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage });

const processFiles = (files) => {
  return new Promise((resolve, reject) => {
    upload.array("files")(files, {}, function (error) {
      if (error) {
        reject(error);
      } else {
        resolve({ success: true });
      }
    });
  });
};

export default processFiles;
