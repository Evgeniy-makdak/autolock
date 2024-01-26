import { useEffect, useRef, useState } from 'react';

import { Autocomplete, TextField } from '@mui/material';

import { useLocalStorage } from '@shared/hooks/useLocalStorage';
import { selectedBranchStore } from '@shared/model/selected_branch/store';

import { searchGroups } from '../../../pages/groups/model/effects';
import style from './BranchSelect.module.scss';

const valueFormatter = (value) => {
  return value
    ? {
        value: value,
        label: value.name,
      }
    : null;
};
export const BranchSelect = () => {
  const [selectedBranch, setSelectedBranch] = selectedBranchStore.selectedBranch.useState();
  const { state: office, setItemState: setOffice } = useLocalStorage({
    key: 'office',
    value: selectedBranch,
  });
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const timeoutId = useRef(null);

  const value = valueFormatter(selectedBranch);

  const handleSearch = (query) => {
    searchGroups(query ?? '')
      .then((res) => {
        setOptions(res.map((item) => ({ value: item, label: item.name })));
        setLoading(false);
      })
      .catch((err) => {
        console.log('BranchSelect error', err?.response);
        setOptions([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    if (office) {
      setSelectedBranch(office);
    }

    setOptions([]);
    handleSearch();
    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  }, []);

  const onChange = (event, option) => {
    const office = options.find((item) => item.value.id === option?.value?.id);
    if (!office) {
      return;
    }
    setOffice(option?.value);
    setSelectedBranch(option?.value ?? null);
  };

  return (
    <div className={style.branchSelect}>
      <Autocomplete
        fullWidth
        noOptionsText={'Ничего не найдено'}
        loadingText={'Загрузка...'}
        options={loading ? [] : options}
        value={value}
        loading={loading}
        onChange={onChange}
        renderInput={(params) => {
          return <TextField {...params} label={'Выбранный филиал'} />;
        }}
      />
    </div>
  );
};

// export const BranchSelect = () => {
//   const [selectedBranch, setSelectedBranch] = selectedBranchStore.selectedBranch.useState();
//   const [loading, setLoading] = useState(false);
//   const [options, setOptions] = useState([]);
//   const timeoutId = useRef(null);

//   const valueFormatter = (value) => {
//     return value
//       ? {
//           value: value,
//           label: value.name,
//         }
//       : null;
//   };
//   const value = valueFormatter(selectedBranch);

//   const handleSearch = (query) => {
//     searchGroups(query ?? '')
//       .then((res) => {
//         setOptions(res.map((item) => ({ value: item, label: item.name })));
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.log('BranchSelect error', err?.response);
//         setOptions([]);
//         setLoading(false);
//       });
//   };

//   useEffect(() => {
//     setLoading(true);
//     setOptions([]);
//     handleSearch();
//     return () => {
//       if (timeoutId.current) {
//         clearTimeout(timeoutId.current);
//       }
//     };
//   }, []);

//   const filterOptions = (options, value) => {
//     return options.filter((item) => {
//       return (
//         !isEqual(item.value, value?.value) &&
//         (item?.label.toLowerCase().includes(value.inputValue?.toLowerCase().trim()) ?? true)
//       );
//     });
//   };

//   const isOptionEqualToValue = (option, value) => {
//     return isEqual(option.value, value?.value);
//   };

//   const onInputChange = (event, newValue) => {
//     setLoading(true);

//     if (timeoutId.current) {
//       clearTimeout(timeoutId.current);
//     }

//     const timeout = setTimeout(() => {
//       handleSearch(newValue);

//       timeoutId.current = null;
//     }, 300);

//     timeoutId.current = timeout;
//   };

//   const onChange = (event, option) => {
//     setSelectedBranch(option?.value ?? null);
//   };

//   const onBlur = () => {
//     if (selectedBranch) return;
//     setSelectedBranch({
//       id: 10,
//       name: 'Система',
//     });
//   };

//   return (
//     <div className={style.branchSelect}>
//       <Autocomplete
//         fullWidth
//         noOptionsText={'Ничего не найдено'}
//         loadingText={'Загрузка...'}
//         onBlur={onBlur}
//         options={loading ? [] : options}
//         value={value}
//         loading={loading}
//         onChange={onChange}
//         onInputChange={onInputChange}
//         filterOptions={filterOptions}
//         isOptionEqualToValue={isOptionEqualToValue}
//         getOptionLabel={(option) => option.label}
//         renderInput={(params) => {
//           return <TextField {...params} label={'Выбранный филиал'} />;
//         }}
//       />
//     </div>
//   );
// };