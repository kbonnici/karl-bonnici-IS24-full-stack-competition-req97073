import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import appendRowIdToProduct from '../../utils/appendRowIdToProduct';
import { GridRowProduct, Product } from '../../utils/types';
import ControlledButton from '../ControlledButton/ControlledButton';
import Header from '../Header/Header';
import ControlledAlert from '../ControlledAlert/ControlledAlert';
import {
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';

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
  const [alertText, setAlertText] = useState('');
  const [selectedRowId, setSelectedRowId] = useState(-1);
  const [loading, setLoading] = useState(true);

  // bonus
  const [filterText, setFilterText] = useState('');
  const [filterType, setFilterType] = useState('scrumMasterName');
  const [filteredRows, setFilteredRows] = useState(rows);

  const getProducts = async () => {
    try {
      // simulate api taking a second to respond
      setTimeout(async () => {
        const response = await fetch('http://localhost:80/api/products');
        const data: Product[] = await response.json();

        const rowData = appendRowIdToProduct(data);

        setRows(rowData);
        setAlertVisible(false);
        setLoading(false);
      }, 1000);
    } catch {
      setAlertVisible(true);
      setAlertText('Unable to fetch products');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!filterText.length) {
      setRows(rows);
      setFilteredRows(rows);
      return;
    }

    if (filterType !== 'scrumMasterName' && filterType !== 'developers') return;

    let newRows = rows;
    newRows = newRows.filter((p: GridRowProduct) =>
      p[filterType as keyof typeof p].toString().includes(filterText)
    );
    setFilteredRows(newRows);
  }, [filterText, filterType]);

  const deleteProduct = async (productId: number) => {
    try {
      const response = await fetch(
        `http://localhost:80/api/product/${productId}`,
        {
          method: 'DELETE',
        }
      );

      const json = await response.json();
      if ('productId' in json) {
        setLoading(true);
        getProducts().catch(console.error);
      } else {
        // product doesnt exist
        setAlertText(JSON.stringify(json));
        setAlertVisible(true);
      }
    } catch {
      setAlertVisible(true);
      setAlertText(`failed to delete product ${productId}`);
    }
  };

  useEffect(() => {
    getProducts().catch(console.error);
  }, [rows]);

  return (
    <>
      <Header text={'Product Management App'} />
      <ControlledAlert
        visible={alertVisible}
        setVisible={setAlertVisible}
        text={alertText}
      />
      <div style={{ display: 'flex' }}>
        <FormControl>
          <InputLabel>Search Criteria</InputLabel>
          <Select
            value={filterType}
            label={'Criteria'}
            style={{ minWidth: '150px', marginRight: '10px' }}
            onChange={(e) => setFilterType(e.target.value as string)}
          >
            <MenuItem value="scrumMasterName">Scrum Master</MenuItem>
            <MenuItem value="developers">Developer</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel>Criteria</InputLabel>
          <Input
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
        </FormControl>
        <ControlledButton
          variant="outlined"
          disabled={selectedRowId < 0}
          text={'edit'}
          href={`/edit/${rows[selectedRowId]?.productId}`}
        />
        <ControlledButton
          variant="contained"
          disabled={selectedRowId < 0}
          color={'warning'}
          text={'delete'}
          onClick={async () => {
            const productId = rows[selectedRowId]?.productId;
            if (!productId) return;
            deleteProduct(productId);
          }}
        />
        <ControlledButton
          href={'/create'}
          variant="contained"
          color={'success'}
          text={'create'}
        />
      </div>

      <div style={{ height: '75vh', width: '100%' }}>
        <DataGrid
          rows={filterText.length > 0 ? filteredRows : rows}
          loading={loading}
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
