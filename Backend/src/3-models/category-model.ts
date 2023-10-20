import { Document, Schema, model } from "mongoose";

// 1. Interface:
export interface ICategoryModel extends Document {
    categoryName: string;
}

// 2. Schema: 
export const CategorySchema = new Schema<ICategoryModel>({
    categoryName: {
        type: String,
        required: [true, "Missing category name."]
    }
}, {
    versionKey: false
});

// 3. Model:
export const CategoryModel = model<ICategoryModel>("CategoryModel", CategorySchema, "categories");
