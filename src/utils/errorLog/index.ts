import fs from "fs/promises";
import path from "path";
import moment from "moment";

interface LogData {
  route: string;
  line: number;
  message: string;
  [key: string]: any;
}

export default async function errorLog(newData: LogData): Promise<void> {
  const fileName = `error_log_${getFormattedDate()}.json`;
  const filePath = path.join(process.cwd(), "error-log", fileName);

  try {
    if (await fileExists(filePath)) {
      const existingData = await fs.readFile(filePath, "utf8");
      const dataToAppend: LogData[] = JSON.parse(existingData);
      dataToAppend.push(newData);

      await fs.writeFile(filePath, JSON.stringify(dataToAppend, null, 2));
      console.log(`Data successfully appended to ${fileName}`);
    } else {
      await fs.writeFile(filePath, JSON.stringify([newData], null, 2));
      console.log(`Data successfully saved to ${fileName}`);
    }
  } catch (error) {
    console.error("Something went wrong:", error);
  }
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch (error) {
    return false;
  }
}

function getFormattedDate(): string {
  return moment().format('YYYY-MM-DD');
}
