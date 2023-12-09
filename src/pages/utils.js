import { setFirebaseData } from './firebase';
import parseCSV from './parseCSV';

export const importCSVData = async (file) => {
  try {
    const parsedData = await parseCSV(file);
    // Use the parsedData variable to process or upload the data as needed
    // Add the parsed data to the Firebase Realtime Database
    await setFirebaseData('csvData', parsedData);
  } catch (error) {
    console.error('Error processing CSV file:', error);
  }
};
export default parseCSV 