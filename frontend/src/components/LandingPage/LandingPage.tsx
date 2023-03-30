import { Typography } from '@mui/material';
import { Container } from '@mui/system';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { GridRowProduct, Product } from '../../types';

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

  useEffect(() => {
    const getProducts = async () => {
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
    };

    getProducts().catch(console.error);
  }, []);

  return (
    <div>
      <Typography
        style={{ marginBottom: '50px', marginTop: '50px' }}
        variant="h4"
      >
        Product Management App
      </Typography>
      <div style={{ height: '75vh', width: '100%' }}>
        <DataGrid rows={rows} columns={columns} />
      </div>
    </div>
  );
}

export default LandingPage;
