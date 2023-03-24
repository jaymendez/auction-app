import { ILot } from "@/types";

export const getActiveBid = (lot: ILot) => {
  if (lot?.bids?.length) {
    const currentBid = lot.bids.find((item) => item.status === "ongoing");
    if (currentBid) {
      return currentBid;
    }
  }
  return null;
};

export const getCurrentPrice = (lot: ILot) => {
  const bid = getActiveBid(lot);
  if (bid) {
    return bid.transactionAmount;
  }
  return lot.startingPrice;
};
