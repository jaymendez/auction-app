export interface IUser {
  _id: string;
  email: string;
  password: string;
  moneyAmount: number;
}

export type TAuthUser = Pick<IUser, "email" | "password">;

export interface ILot {
  _id: string;
  name: string;
  userId: string;
  bids: TBid[];
  startingPrice: number;
  status: string;
  auctionTime: AuctionTime;
}

export type TBid = {
  userId: string;
  price: string | number;
};

export interface AuctionTime {
  startTime: string;
  endTime: string;
}

export type ModalProps = {
  isOpen: boolean;
  toggleModal: (v: boolean) => void;
};
