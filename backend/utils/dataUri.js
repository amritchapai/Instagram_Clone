import DatauriParser from "datauri/parser.js"
import path from "path";

const parser = new DatauriParser();
const getDataURI = (file)=>{
    const extName = path.extname(file.originalName).toString();
    return parser.format(extName, file.buffer).content;
}


export default getDataURI;