import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { GridRowProduct, Product } from '../../types';
import ControlledButton from '../ControlledButton/ControlledButton';
import LandingPageAlert from './LandingPageAlert';
import LandingPageHeader from './LandingPageHeader';

const columns: GridColDef[] = [
  { field: 'productId', headerName: 'Product ID', width: 125 },
  { field: 'productName', headerName: 'Product Name', width: 150 },
  { field: 'productOwnerName', headerName: 'Product Owner', width: 150 },
  { field: 'developers', headerName: 'Developers', width: 300 },
  { field: 'scrumMasterName', headerName: 'Scrum Master', width: 150 },
  { field: 'startDate', headerName: 'Start Date', width: 150 },
  { field: 'methodology', headerName: 'Methodology', width: 150 },
];

function LandingPage() {
  const [rows, setRows] = useState<GridRowProduct[]>([]);
  const [alertVisible, setAlertVisible] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(-1);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch('http://localhost:80/api/products');
        const data: Product[] = await response.json();

        const rowData: GridRowProduct[] = [];
        for (let i = 0; i < data.length; i++) {
          rowData.push({
            id: i,
            ...data[i],
          });
        }

        setRows(rowData);
        setAlertVisible(false);
      } catch {
        setAlertVisible(true);
      }
    };

    getProducts().catch(console.error);
  }, []);

  return (
    <>
      <LandingPageHeader />
      <LandingPageAlert visible={alertVisible} setVisible={setAlertVisible} />

      <ControlledButton
        variant="contained"
        disabled={selectedRowId < 0}
        text={'edit'}
      />
      <ControlledButton
        variant="contained"
        disabled={selectedRowId < 0}
        text={'delete'}
      />

      <div style={{ height: '75vh', width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          onRowSelectionModelChange={(selectedRows: GridRowSelectionModel) => {
            if (!selectedRows.length) setSelectedRowId(-1);
            else {
              const rowId = selectedRows[0] as number;
              setSelectedRowId(rowId);
            }
          }}
        />
      </div>
    </>
  );
}

export default LandingPage;
