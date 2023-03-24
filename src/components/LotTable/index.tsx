import fetchLots from "@/api/lot/fetchLots";
import { useUserContext } from "@/context/UserContext";
import { ILot } from "@/types";
import { getCurrentPrice } from "@/utils/bid";
import {
  DataGrid,
  GridColDef,
  GridColumnHeaderParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { isEmpty } from "lodash";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import AddBidModal from "../AddBidModal";
import { Button } from "../Button";

export interface ILotTableProps {
  filter?: any;
}

export default function LotTable({ filter = {} }: ILotTableProps) {
  const { theme: applicationTheme } = useTheme();
  const { user, setRefetchLots } = useUserContext();

  const [isBidModalOpen, toggleBidModal] = useState(false);
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
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row?.auctionTime?.startTime || ""} ${
          params.row.lastName || ""
        }`,
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
        if (filter.fetchType === "personal") {
          return (
            <Button
              onClick={() => {
                toggleBidModal(true);
                setSelectedRow({ ...params.row });
              }}
            >
              Publish Item
            </Button>
          );
        }
        return (
          <Button
            onClick={() => {
              toggleBidModal(true);
              setSelectedRow({ ...params.row });
            }}
          >
            Add Bid
          </Button>
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
    </>
  );
}
