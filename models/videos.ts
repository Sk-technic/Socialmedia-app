import mongoose, {Schema,model,models} from "mongoose";


//crate a video reel ratio dimension
export const VIDEO_DIMENSION = {
    width: 1080,
    height: 1920
}as const

export interface Video {
    _id?: mongoose.Types.ObjectId;
    title: string;
    discription: string;
    videoUrl: string;
    thumbnailUrl: string;
    Controls?: Boolean; 
    transformation?: {
        height: number;
        width: number;
        quality?:number;
    }
}

const videoSchema = new Schema<Video>({
    title:{type: String, required:true},
    discription: {type: String, required: true},
    videoUrl: {type: String, required:true},
    thumbnailUrl: {type: String, required:true},
    Controls: {type: Boolean, default:true},
    transformation: {
        height:{type: Number, default: VIDEO_DIMENSION.height},
        width: {type: Number, default:VIDEO_DIMENSION.width},
        quality: {type: Number, min:1, max: 100}
    },
    
},
{ timestamps:true }
);



const Video = models?.Video || model<Video>("Video",videoSchema)

export default Video 


