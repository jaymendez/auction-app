import {
  DataGrid,
  GridColDef,
  GridColumnHeaderParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { isEmpty } from "lodash";
import moment from "moment";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

import fetchLots from "@/api/lot/fetchLots";
import { useUserContext } from "@/context/UserContext";
import { ILot } from "@/types";
import { getCurrentPrice } from "@/utils/bid";

import AddBidModal from "../AddBidModal";
import AddItemModal from "../AddItemModal";
import RowActions from "./RowActions";
import { TFilterValue } from "./Toolbar";

const momentDurationFormatSetup = require("moment-duration-format");

export interface ILotTableProps {
  filter: TFilterValue;
}

momentDurationFormatSetup(moment);

export default function LotTable({ filter }: ILotTableProps) {
  const { theme: applicationTheme } = useTheme();
  const { user, setRefetchLots } = useUserContext();

  const [isBidModalOpen, toggleBidModal] = useState(false);
  const [isItemModalOpen, toggleItemModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState<ILot>();

  const {
    data: rows = [],
    isLoading,
    refetch,
  } = useQuery([user, filter], fetchLots, {
    select: ({ data }: any) => {
      return data?.data.map((item: ILot) => ({ ...item, id: item._id }));
    },
  });

  useEffect(() => {
    setRefetchLots(refetch);
  }, [refetch]);

  const columnsDraft: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      minWidth: 300,
      maxWidth: 400,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      maxWidth: 270,
      renderCell: (params) => {
        return <span className="capitalize">{params?.value}</span>;
      },
    },
    {
      field: "startingPrice",
      headerName: "Current Price",
      flex: 1,
      maxWidth: 270,
      valueGetter: (params: GridValueGetterParams) => {
        const price = getCurrentPrice(params.row);
        return `$ ${price}`;
      },
    },
    {
      field: "time",
      headerName: "Duration",
      flex: 1,
      maxWidth: 270,
      valueGetter: (params: GridValueGetterParams) => {
        const { startTime, endTime } = params.row?.auctionTime ?? {
          startTime: "",
          endTime: "",
        };
        if (startTime && endTime) {
          // if (endDate?.diff(startDate) <= 0) {
          if (moment(endTime).diff(moment()) > 0) {
            return `${moment
              .duration(moment(endTime).diff(moment()))
              .format("d [days] h [hrs], m [min]")}`;
          }
          return "Bidding Finished";
        }
        return "";
      },
    },
    {
      field: "action",
      headerName: "Actions",
      sortable: false,
      flex: 1,
      hideSortIcons: true,
      renderCell: (params) => {
        if (!user) {
          return "";
        }
        return (
          <RowActions
            filter={filter}
            row={params.row}
            refetch={refetch}
            openItemModal={() => {
              toggleItemModal(true);
              setSelectedRow({ ...params.row });
            }}
            openBidModal={() => {
              toggleBidModal(true);
              setSelectedRow({ ...params.row });
            }}
          />
        );
      },
    },
  ];

  const columns = columnsDraft
    .filter((col) => !(isEmpty(user) && col.field === "action"))
    .map((col) => {
      return {
        ...col,
        renderHeader(params: GridColumnHeaderParams<any, any, any>) {
          return (
            <strong className="font-semibold">
              {params.colDef.headerName}
            </strong>
          );
        },
      };
    });

  return (
    <>
      <DataGrid
        style={{
          backgroundColor: applicationTheme === "light" ? "white" : "#152238",
          fontSize: "1rem",
        }}
        autoHeight
        rowHeight={75}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        loading={isLoading}
      />
      {isBidModalOpen && (
        <AddBidModal
          isOpen={isBidModalOpen}
          toggleModal={toggleBidModal}
          refetchLots={refetch}
          // item={rows.find((row: any) => row.id === selectedRow)}
          item={selectedRow}
        />
      )}
      {isItemModalOpen && (
        <AddItemModal
          isOpen={isItemModalOpen}
          toggleModal={toggleItemModal}
          item={selectedRow}
        />
      )}
    </>
  );
}
