import axios from "axios";
class CloudinaryService {
    cloudName: string;
    uploadPreset: string;

    constructor() {
        this.cloudName = "dumcjdzxo";
        this.uploadPreset = "eventNexus";
    }

    async uploadImage(filePath: FormData): Promise<FormData> {
        const res = await axios.post<FormData>(
            `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`,
            filePath
        );
        return res.data;
    }
}

export const cloudinaryService = new CloudinaryService();