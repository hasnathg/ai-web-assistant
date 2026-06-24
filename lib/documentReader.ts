import mammoth from "mammoth";
import { extractText } from "unpdf";


const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB *1024 * 1024;

const SUPPORTED_FILE_TYPES = [
    "text/plain",
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

function validateDocumentFile(file: File) {
    const isSupportedType =
    SUPPORTED_FILE_TYPES.includes(file.type) ||
    file.name.endsWith(".txt") ||
    file.name.endsWith(".pdf") ||
    file.name.endsWith(".docx");

    if (!isSupportedType) {
        throw new Error("Unsupported file type. Please upload TXT, PDF, or DOCX. ");
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
        throw new Error(`File is too large. Maxmimum size is ${MAX_FILE_SIZE_MB}MB`);
    }
}




export async function readDocumentText(file: File): Promise<string> {
    validateDocumentFile(file);
    
    if (file.type === "text/plain" || file.name.endsWith(".txt")) {
        return file.text();
    }

    if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
        const arrayBuffer = await file.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);

        const { text } = await extractText(uint8Array);

        return text.join("\n").trim();
  }

  if (file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || file.name.endsWith(".docx")
) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = await mammoth.extractRawText({
        buffer,
    });
    return result.value.trim();
  }

    throw new Error("unsupported file type");
}