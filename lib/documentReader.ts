export async function readDocumentText(file: File): Promise<string> {
    if (file.type === "text/plain" || file.name.endsWith(".txt")) {
        return file.text();
    }

    throw new Error("unsupported file type");
}