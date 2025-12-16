"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.END = exports.START = exports.MIN = void 0;
exports.createSlots = createSlots;
const dayjs_1 = __importDefault(require("dayjs"));
exports.MIN = 30;
exports.START = 9;
exports.END = 18;
function createSlots() {
    const slots = [];
    const startTime = (0, dayjs_1.default)().hour(exports.START).minute(0);
    const endTime = (0, dayjs_1.default)().hour(exports.END).minute(0);
    while (startTime.isBefore(endTime)) {
        const start = startTime.format("HH:mm");
        startTime.add(exports.MIN, "minutes");
        const end = startTime.format("HH:mm");
        slots.push({
            start: start,
            end: end,
        });
    }
    return slots;
}
//# sourceMappingURL=slotCreate.js.map