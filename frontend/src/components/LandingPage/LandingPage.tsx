import { Typography } from '@mui/material';
import { Container } from '@mui/system';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { GridRowProduct } from '../../types';

function generateData(n: number): GridRowProduct[] {
  const data: GridRowProduct[] = [];

  for (let i = 0; i < n; i++) {
    data.push({
      id: i,
      foo: ['one', 'two', 'three'],
      blah: `blah_${i}`,
    });
  }
  return data;
}

const columns: GridColDef[] = [
  { field: 'foo', headerName: 'Foo', width: 150 },
  { field: 'blah', headerName: 'Blah', width: 150 },
];

function LandingPage() {
  return (
    <Container maxWidth="sm">
      <Typography variant="h4">Product Management App</Typography>
      <div style={{ height: '75vh', width: '100%' }}>
        <DataGrid rows={generateData(5)} columns={columns} />
      </div>
    </Container>
  );
}

export default LandingPage;
