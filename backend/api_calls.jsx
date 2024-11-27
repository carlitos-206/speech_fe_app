const MAIN_URL = "https://3281cb61c179.ngrok.app"

export const connection_test = async () => {
    try {
        const response = await fetch(`${MAIN_URL}/`);
        const data = await response.json(); // Await the JSON parsing
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error in connection_test:", error);
        return null; // Handle the error gracefully
    }
};
// solution ... the call needs to be done within a .jsx file for react native