import mammoth from "mammoth";
import { extractText } from "unpdf";


export async function readDocumentText(file: File): Promise<string> {
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