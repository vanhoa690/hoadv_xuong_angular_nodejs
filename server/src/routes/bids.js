import { Router } from "express";
import BidsController from "../controllers/bids";

const bidsRouter = Router();

const bidsController = new BidsController();

bidsRouter.get("/", bidsController.getAllBids);
bidsRouter.get("/:id", bidsController.getBidDetail);
bidsRouter.post("/", bidsController.createBid);
bidsRouter.put("/:id", bidsController.updateBid);
bidsRouter.delete("/:id", bidsController.deleteBid);

export default bidsRouter;
