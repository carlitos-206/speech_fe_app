const MAIN_URL = "https://3281cb61c179.ngrok.app"

export const connection_test = async () => {
    try {
        const response = await fetch(`${MAIN_URL}/`);
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error in connection_test:", error);
        return null;
    }
};
