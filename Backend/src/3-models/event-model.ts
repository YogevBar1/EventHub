import mongoose, { Document, ObjectId, Schema, model } from "mongoose";
import { CategoryModel } from "./category-model";

//1.Interface 
export interface IEventModel extends Document{
    categoryId: mongoose.Schema.Types.ObjectId;
    eventDate: string;
    eventDescription: string;
    eventAddress: string;
    eventAmountPeople: number;
}

// 2. Schema
export const EventSchema = new Schema<IEventModel>({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId
    },
    eventDate:{
        type: String,
        required: [true, "Missing event date."]
    },
    eventDescription: {
        type: String,
        required: [true, "Missing event description."]
    },
    eventAddress: {
        type: String,
        required: [true, "Missing event address."]
    },
    eventAmountPeople: {
        type: Number,
        required: [true, "Missing event amount people."]
    }
}, {
    versionKey: false, // don't add __v to an added document.
    toJSON: { virtuals: true }, // Return foreign key in JSON.
    id: false // Don't add id on top of _id.
});

EventSchema.virtual("category", {
    ref: CategoryModel, // Foreign Model.
    localField: "categoryId", // foreign key.
    foreignField: "_id", // primary key.
    justOne: true // Shop has one category.
});


// 3. Model:
export const EventModel = model<IEventModel>("EventModel", EventSchema, "events_table");
