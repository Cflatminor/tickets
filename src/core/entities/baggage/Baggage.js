import Entity from "app/core/entities/Entity";

// let baggage_allowance = {
//     "number_of_pieces": 1,
//     "max_weight": {
//
//     }
// }
//
// let baggage_allowance2 =  {
//     "number_of_pieces": 0,
//     "max_weight": {
//
//     }
// }
//
// let baggage_allowance3 = {
//     "max_weight": {
//         "value": 20,
//         "unit": "Kilograms"
//     }
// }

class Baggage extends Entity {
    /**
     * @public
     * @method isAllow
     * @return {boolean}
     */
    isAllow() {
        return Boolean(this.entity.number_of_pieces || this.entity?.max_weight?.value);
    }
}

export default Baggage;
