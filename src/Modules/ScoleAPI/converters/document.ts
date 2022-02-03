import {GoldinDocument} from "../types/Goldin/Document";
import {Document} from "../types/Document";

export default function convertDocument(source: GoldinDocument): Document {
    return {
        class: source.Uclass,
        pupil: source.pupil,
        type: source.vid,
        dateStart: source.start,
        dateEnd: source.fin,
        prim: source.prim,
        id: source._id
    }
}