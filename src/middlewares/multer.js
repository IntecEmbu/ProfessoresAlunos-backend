import multer from 'multer';

//caminho da pasta na qual o arquivo foi salvo.
const dirmulter = (multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './console2/upload_back_end_nodejs/public/upload/users')
        },
        filename: (req, file, cb) => {
            cb(null, Date.now().toString() + "_" + file.originalname)
        }
    }),
    fileFilter: (req, file, cb) => {
        const extensaoImg = ['image/png', 'image/jpg', 'image/jpeg', 'video/webm', 'application/pdf'].find(formatoAceito => formatoAceito == file.mimetype);

        if (extensaoImg) {
            return cb(null, true);
        }

        return cb(null, false);
    }
}));

export default dirmulter;