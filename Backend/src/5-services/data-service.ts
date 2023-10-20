import { CategoryModel, ICategoryModel } from "../3-models/category-model";
import { ResourceNotFoundError } from "../3-models/error-models";
import { EventModel, IEventModel } from "../3-models/event-model";

function getAllCategories(): Promise<ICategoryModel[]> {
    return CategoryModel.find().exec();
}

function getEventsByCategory(categoryId: string): Promise<IEventModel[]> {
    return EventModel.find({ categoryId }).populate("category").exec();
}

function addEvent(event: IEventModel): Promise<IEventModel> {
    event.validateSync();
    return event.save();
}

async function deleteEvent(_id: string): Promise<void> {
    const deletedEvent = await EventModel.findByIdAndDelete(_id).exec();
    if (!deletedEvent) throw new ResourceNotFoundError(_id);
}

export default {
    getAllCategories,
    getEventsByCategory,
    addEvent,
    deleteEvent
};

