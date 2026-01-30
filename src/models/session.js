import mongoose from "mongoose";

const sessionSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    accessToken: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
        required: true
    },
    accessTokenValidUntil: {
        type: Date,
        required: true
    },
    refreshTokenValidUntil: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
});

sessionSchema.methods.toJSON = function() {
    const obj = this.toObject();
    delete obj.accessToken;
    delete obj.refreshToken;
    return obj;
};

export const Session = mongoose.model("Session", sessionSchema);