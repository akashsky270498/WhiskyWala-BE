import {Schema} from "mongoose";

export default function addMessageMethods(schema: Schema) {
    schema.methods.softDelete = async function() {
        this.isDeleted = true;
        await this.save();
        return this;
    };

    schema.methods.restore = async function() {
        this.restore = false;
        await this.save();
        return this;
    };

    schema.methods.generatePreview = function() {
        return this.content.length > 50 ? this.content.substring(0, 50) + "..." : this.content;
    };
}