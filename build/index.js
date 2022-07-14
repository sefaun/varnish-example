"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const app = (0, express_1.default)();
        app.use((0, morgan_1.default)('dev'));
        app.use((0, cors_1.default)());
        app.use(express_1.default.urlencoded({ extended: true }));
        app.use(express_1.default.json());
        app.get('/api/test1', (_req, res, _next) => {
            return res.status(200).json({ status: true, message: "Test-1" });
        });
        app.get('/api/test2', (_req, res, _next) => {
            return res.status(200).json({ status: true, message: "Test-2" });
        });
        // Not Found
        app.use((_req, res, _next) => {
            return res.status(404).json({ success: false, message: 'Not Found' });
        });
        const port = 5000;
        app.listen(port, () => console.log(`🟢 Server is Running on Port ${port}`));
    }
    catch (error) {
        return start();
    }
});
start();
//# sourceMappingURL=index.js.map