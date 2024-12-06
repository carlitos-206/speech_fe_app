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


export const backend_voice_audio = async (data) => {
    try {
        const response = await fetch(`${MAIN_URL}/audio`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ sound: data }),
        });
        if (response.ok) {
            const jsonResponse = await response.json();
            return jsonResponse;
        } else {
            console.error('Upload failed with status:', response.status);
            return { text: `Error: Upload failed with status ${response.status}` };
        }
    } catch (error) {
        console.error('Error during fetch operation:', error);
        return { text: 'Error: Unable to connect to the server' };
    }
};
