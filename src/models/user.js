import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
    },
}, {
    timestamps: true,
    versionKey: false,
});

userSchema.pre("save", function() {
    if (!this.username) {
        this.username = this.email;
    }
});


userSchema.methods.toJSON = function() {
    const obj = this.toObject();
    delete obj.password;
    return obj;
};

export const User = mongoose.model("User", userSchema);